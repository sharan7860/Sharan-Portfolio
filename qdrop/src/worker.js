const FILE_LIMIT = 25 * 1024 * 1024;
const FILE_TTL = 24 * 60 * 60 * 1000;
const LINK_TTL = 90 * 24 * 60 * 60 * 1000;
const FILE_STORAGE_BUDGET = 800 * 1024 * 1024;

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
});

const fail = (message, status = 400) => json({ error: message }, status);

function randomId(bytes = 9) {
  const value = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...value)).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function validId(id) {
  return /^[A-Za-z0-9_-]{12,32}$/.test(id);
}

function validateUrl(input) {
  let url;
  try { url = new URL(input); } catch { return null; }
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null;
  const host = url.hostname.toLowerCase().replace(/\.$/, '');
  if (!host.includes('.') || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')) return null;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    const parts = host.split('.').map(Number);
    if (parts.some(part => part > 255) || parts[0] === 0 || parts[0] === 10 || parts[0] === 127 || parts[0] >= 224 ||
        (parts[0] === 169 && parts[1] === 254) || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
        (parts[0] === 192 && parts[1] === 168)) return null;
  }
  if (host.includes(':') || host.endsWith('.internal') || host.endsWith('.test')) return null;
  return url.href.length <= 2048 ? url.href : null;
}

function youtubeVideoId(input) {
  let url;
  try { url = new URL(input); } catch { return null; }
  if (!['https:', 'http:'].includes(url.protocol)) return null;
  const host = url.hostname.toLowerCase();
  let id = null;
  if (host === 'youtu.be' || host === 'www.youtu.be') id = url.pathname.split('/')[1];
  else if (host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com') {
    id = url.pathname === '/watch' ? url.searchParams.get('v') : url.pathname.match(/^\/(?:shorts|live|embed)\/([^/]+)/)?.[1];
  }
  return /^[A-Za-z0-9_-]{11}$/.test(id || '') ? id : null;
}

function videoBackend(env) {
  if (!env.VIDEO_BACKEND_URL || !env.VIDEO_BACKEND_SECRET) return null;
  try {
    const url = new URL(env.VIDEO_BACKEND_URL);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    return url;
  } catch { return null; }
}

async function videoFormats(request, env, url) {
  const backend = videoBackend(env);
  if (!backend) return fail('Video downloads are not connected yet.', 503);
  const id = youtubeVideoId(url.searchParams.get('url') || '');
  if (!id) return fail('Enter a public YouTube video link.');
  if (!(await rateLimit(request, env, 'video-formats', 10))) return fail('Too many video checks. Try again in an hour.', 429);
  const endpoint = new URL('/formats', backend);
  endpoint.searchParams.set('video', id);
  const response = await fetch(endpoint, {
    headers: { 'X-Backend-Secret': env.VIDEO_BACKEND_SECRET },
    signal: AbortSignal.timeout(90000),
  });
  const result = await response.json();
  if (!response.ok) return fail(result.detail || 'Could not check this video.', response.status);
  return json(result);
}

async function videoDownload(request, env, url) {
  const backend = videoBackend(env);
  if (!backend) return fail('Video downloads are not connected yet.', 503);
  const id = youtubeVideoId(url.searchParams.get('url') || '');
  const height = Number(url.searchParams.get('quality'));
  if (!id || !Number.isInteger(height) || height < 144 || height > 1080) return fail('Choose a valid video and quality.');
  if (!(await rateLimit(request, env, 'video-downloads', 3))) return fail('Download limit reached. Try again in an hour.', 429);
  const expires = Math.floor(Date.now() / 1000) + 300;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(env.VIDEO_BACKEND_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${id}.${height}.${expires}`));
  const endpoint = new URL('/download', backend);
  endpoint.searchParams.set('video', id);
  endpoint.searchParams.set('height', String(height));
  endpoint.searchParams.set('expires', String(expires));
  endpoint.searchParams.set('signature', Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join(''));
  return new Response(null, { status: 302, headers: { Location: endpoint.href, 'Referrer-Policy': 'no-referrer', 'Cache-Control': 'no-store' } });
}

async function rateLimit(request, env, action, maximum) {
  if (!env.RATE_LIMIT_SALT) throw new Error('RATE_LIMIT_SALT is not configured');
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  const raw = new TextEncoder().encode(`${env.RATE_LIMIT_SALT}:${ip}:${action}`);
  const digest = await crypto.subtle.digest('SHA-256', raw);
  const key = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  const now = Date.now();
  const expires = now + 60 * 60 * 1000;
  await env.DB.prepare(`INSERT INTO rate_limits (key, count, expires_at) VALUES (?, 1, ?)
    ON CONFLICT(key) DO UPDATE SET
      count = CASE WHEN expires_at < ? THEN 1 ELSE count + 1 END,
      expires_at = CASE WHEN expires_at < ? THEN ? ELSE expires_at END`)
    .bind(key, expires, now, now, expires).run();
  const row = await env.DB.prepare('SELECT count FROM rate_limits WHERE key = ?').bind(key).first();
  return row.count <= maximum;
}

async function createLink(request, env, origin) {
  if (!(await rateLimit(request, env, 'links', 20))) return fail('Too many links created. Try again in an hour.', 429);
  let body;
  try { body = await request.json(); } catch { return fail('Send a valid URL.'); }
  const destination = validateUrl(body?.url);
  if (!destination) return fail('Enter a public http or https URL (up to 2,048 characters).');
  const code = randomId();
  const now = Date.now();
  await env.DB.prepare('INSERT INTO links (code, url, created_at, expires_at) VALUES (?, ?, ?, ?)')
    .bind(code, destination, now, now + LINK_TTL).run();
  return json({ code, shortUrl: `${origin}/s/${code}`, destination, expiresAt: now + LINK_TTL });
}

async function followLink(code, env) {
  if (!validId(code)) return fail('Link not found.', 404);
  const row = await env.DB.prepare('SELECT url, expires_at FROM links WHERE code = ?').bind(code).first();
  if (!row || row.expires_at < Date.now()) return fail('This link has expired or does not exist.', 404);
  await env.DB.prepare('UPDATE links SET visits = visits + 1 WHERE code = ?').bind(code).run();
  return new Response(null, { status: 302, headers: { Location: row.url, 'Referrer-Policy': 'no-referrer', 'Cache-Control': 'no-store' } });
}

async function uploadFile(request, env, origin) {
  if (!(await rateLimit(request, env, 'files', 6))) return fail('Upload limit reached. Try again in an hour.', 429);
  const length = Number(request.headers.get('Content-Length'));
  if (!Number.isInteger(length) || length < 1 || length > FILE_LIMIT) return fail('Choose a file between 1 byte and 25 MB.', 413);
  const encoded = request.headers.get('X-File-Name') || '';
  let name;
  try { name = decodeURIComponent(encoded); } catch { return fail('Invalid file name.'); }
  name = name.split(/[\\/]/).pop().replace(/[\x00-\x1f\x7f]/g, '').trim().slice(0, 180);
  if (!name) return fail('Choose a file with a name.');
  const type = (request.headers.get('Content-Type') || 'application/octet-stream').slice(0, 120);
  const id = randomId(18);
  const now = Date.now();
  const data = await request.arrayBuffer();
  if (!data.byteLength || data.byteLength > FILE_LIMIT || data.byteLength !== length) return fail('Upload size mismatch.', 400);
  const stored = await env.DB.prepare('SELECT COALESCE(SUM(size), 0) AS used FROM files WHERE expires_at > ?').bind(now).first();
  if (stored.used + data.byteLength > FILE_STORAGE_BUDGET) return fail('Temporary storage is full. Please try again later.', 503);
  await env.FILES.put(id, data, { expirationTtl: FILE_TTL / 1000 });
  try {
    await env.DB.prepare('INSERT INTO files (id, name, size, type, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(id, name, data.byteLength, type, now, now + FILE_TTL).run();
  } catch (error) {
    await env.FILES.delete(id);
    throw error;
  }
  return json({ id, name, size: data.byteLength, expiresAt: now + FILE_TTL, shareUrl: `${origin}/?file=${id}` });
}

async function fileInfo(id, env) {
  if (!validId(id)) return fail('File not found.', 404);
  const row = await env.DB.prepare('SELECT name, size, expires_at, downloads FROM files WHERE id = ?').bind(id).first();
  if (!row || row.expires_at < Date.now()) return fail('This file has expired or does not exist.', 404);
  return json(row);
}

async function downloadFile(id, env) {
  if (!validId(id)) return fail('File not found.', 404);
  const row = await env.DB.prepare('SELECT name, expires_at FROM files WHERE id = ?').bind(id).first();
  if (!row || row.expires_at < Date.now()) return fail('This file has expired or does not exist.', 404);
  const data = await env.FILES.get(id, 'arrayBuffer');
  if (!data) return fail('File not found.', 404);
  await env.DB.prepare('UPDATE files SET downloads = downloads + 1 WHERE id = ?').bind(id).run();
  const safeName = row.name.replace(/[^\x20-\x7e]|["\\]/g, '_');
  return new Response(data, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${safeName}"; filename*=UTF-8''${encodeURIComponent(row.name)}`,
      'Content-Length': String(data.byteLength),
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

async function cleanup(env) {
  const now = Date.now();
  const expired = await env.DB.prepare('SELECT id FROM files WHERE expires_at < ? LIMIT 100').bind(now).all();
  for (const row of expired.results) {
    await env.FILES.delete(row.id);
    await env.DB.prepare('DELETE FROM files WHERE id = ?').bind(row.id).run();
  }
  await env.DB.prepare('DELETE FROM links WHERE expires_at < ?').bind(now).run();
  await env.DB.prepare('DELETE FROM rate_limits WHERE expires_at < ?').bind(now).run();
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const origin = url.origin;
      const path = url.pathname;
      if (path === '/api/health') return json({ ok: true });
      if (path === '/api/videos/formats' && request.method === 'GET') return await videoFormats(request, env, url);
      if (path === '/api/videos/download' && request.method === 'GET') return await videoDownload(request, env, url);
      if (path === '/api/links' && request.method === 'POST') return await createLink(request, env, origin);
      if (path === '/api/files' && request.method === 'POST') return await uploadFile(request, env, origin);
      if (path.startsWith('/api/files/') && request.method === 'GET') return await fileInfo(path.slice(11), env);
      if (path.startsWith('/s/') && request.method === 'GET') return await followLink(path.slice(3), env);
      if (path.startsWith('/f/') && request.method === 'GET') return await downloadFile(path.slice(3), env);
      if (path.startsWith('/api/')) return fail('Not found.', 404);
      return env.ASSETS.fetch(request);
    } catch (error) {
      console.error(error);
      return fail('Something went wrong. Please try again.', 500);
    }
  },
  async scheduled(_event, env) {
    await cleanup(env);
  },
};
