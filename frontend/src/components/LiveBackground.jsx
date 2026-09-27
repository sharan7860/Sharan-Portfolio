import { useEffect, useRef } from 'react';

const randomBetween = (min, max) => Math.random() * (max - min) + min;

export default function LiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isCompact = window.matchMedia('(max-width: 768px)');
    const pointer = { x: 0, y: 0 };
    let frameId;
    let width = 0;
    let height = 0;
    let particles = [];
    let reducedMotion = motionQuery.matches;

    const makeParticle = () => ({
      x: randomBetween(-720, 720),
      y: randomBetween(-420, 420),
      z: randomBetween(-240, 680),
      speed: randomBetween(0.22, 0.62),
      size: randomBetween(0.65, 1.9),
      hue: Math.random() > 0.72 ? 275 : 182,
    });

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const total = isCompact.matches ? 42 : 78;
      particles = Array.from({ length: total }, makeParticle);
    };

    const project = (particle) => {
      const depth = 660 / (660 + particle.z);
      return {
        x: width * 0.5 + (particle.x + pointer.x * 70) * depth,
        y: height * 0.5 + (particle.y + pointer.y * 48) * depth,
        depth,
      };
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const points = particles.map((particle) => ({ particle, point: project(particle) }));

      for (let first = 0; first < points.length; first += 1) {
        const { particle, point } = points[first];
        if (point.x < -30 || point.x > width + 30 || point.y < -30 || point.y > height + 30) continue;

        const glow = Math.min(0.72, 0.14 + point.depth * 0.27);
        context.beginPath();
        context.arc(point.x, point.y, particle.size * point.depth, 0, Math.PI * 2);
        context.fillStyle = `hsla(${particle.hue}, 95%, 72%, ${glow})`;
        context.shadowBlur = 10 * point.depth;
        context.shadowColor = particle.hue === 275 ? 'rgba(169, 98, 255, .7)' : 'rgba(55, 244, 222, .7)';
        context.fill();
        context.shadowBlur = 0;

        if (isCompact.matches) continue;
        for (let second = first + 1; second < points.length; second += 1) {
          const nearPoint = points[second].point;
          const distance = Math.hypot(point.x - nearPoint.x, point.y - nearPoint.y);
          if (distance > 105) continue;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(nearPoint.x, nearPoint.y);
          context.strokeStyle = `rgba(68, 243, 224, ${0.08 * (1 - distance / 105)})`;
          context.lineWidth = 0.6;
          context.stroke();
        }
      }
    };

    const animate = () => {
      particles.forEach((particle) => {
        particle.z -= particle.speed;
        particle.y += Math.sin((particle.x + particle.z) * 0.003) * 0.08;
        if (particle.z < -240) {
          Object.assign(particle, makeParticle(), { z: 680 });
        }
      });
      draw();
      frameId = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleMotionChange = (event) => {
      reducedMotion = event.matches;
      window.cancelAnimationFrame(frameId);
      if (reducedMotion) draw(); else animate();
    };

    resize();
    draw();
    if (!reducedMotion) frameId = window.requestAnimationFrame(animate);

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="live-3d-background" aria-hidden="true" />
      <div className="live-3d-orbit" aria-hidden="true">
        <span /><span /><span /><b />
      </div>
    </>
  );
}
