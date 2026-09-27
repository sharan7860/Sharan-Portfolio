import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiveBackground from './LiveBackground';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const titleContainerRef = useRef(null);
  const metaContainerRef = useRef(null);
  const gridRef = useRef(null);
  const [focusMode, setFocusMode] = useState('Build');

  const focusModes = {
    Build: 'Full-stack products with clear, thoughtful interfaces.',
    Train: 'AI evaluation, code quality, and technical reasoning workflows.',
    Automate: 'Reliable browser and data workflows that remove repetitive work.',
  };

  useEffect(() => {
    const context = gsap.context(() => {
      // Fade the hero as it naturally scrolls out of view.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Scale title down and move it upward towards the navbar
      tl.to(titleContainerRef.current, {
        scale: 0.55,
        y: -120,
        opacity: 0,
        ease: "power2.out",
      }, 0);

      // Fade and translate description and buttons downward
      tl.to(metaContainerRef.current, {
        opacity: 0,
        y: 80,
        ease: "power2.out",
      }, 0);

      tl.to(gridRef.current, {
        scale: 1.18,
        opacity: 0,
        ease: 'power2.out',
      }, 0);
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef}
      style={{
        minHeight: '100vh',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#050505',
      }}
    >
      <LiveBackground />

      <div className="hero-command-lines" aria-hidden="true">
        <span>const craft = ['AI', 'systems', 'quality'];</span>
        <span>status: shipping meaningful software</span>
        <span>scroll to inspect the build</span>
      </div>

      {/* Subtle Cyber Grid Overlay */}
      <div 
        ref={gridRef}
        className="hero-grid-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 
            'linear-gradient(rgba(255, 255, 255, 0.005) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.005) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          backgroundPosition: 'center',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Ambient background glow */}
      <div 
        style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.06) 0%, rgba(0, 242, 254, 0) 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Core Layout Container */}
      <div 
        className="content-container" 
        style={{ 
          position: 'relative', 
          zIndex: 4, 
          width: '100%', 
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        {/* Title Container (scaled on scroll) */}
        <div ref={titleContainerRef} style={{ width: '100%', willChange: 'transform, opacity' }}>
          {/* Top Indicator Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.72rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              color: '#ffffff',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            <span style={{ 
              display: 'inline-block', 
              width: '6px', 
              height: '6px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--accent-cyan)',
              boxShadow: '0 0 10px var(--accent-cyan)',
            }} />
            <span>Software Engineer // AI Trainer // Full Stack</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', 
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              lineHeight: 1.15, 
              letterSpacing: '-1.5px', 
              marginBottom: '20px', 
              textTransform: 'uppercase',
              color: '#ffffff',
            }}
          >
            Building Intelligent Software<br />
            <span style={{ color: 'var(--accent-cyan)' }}>for Real-World Problems</span>
          </h1>
        </div>

        {/* Meta Container (fades on scroll) */}
        <div ref={metaContainerRef} style={{ width: '100%', willChange: 'transform, opacity' }}>
          {/* Subtitle */}
          <h2
            style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)',
              fontWeight: 500,
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
              marginBottom: '24px',
              maxWidth: '650px',
              margin: '0 auto 24px auto',
            }}
          >
            Software Engineer and AI Trainer specializing in AI-powered systems, full-stack development, code quality and automation.
          </h2>

          {/* Description */}
          <p
            style={{
              maxWidth: '600px',
              fontSize: 'clamp(0.9rem, 1.6vw, 0.98rem)',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              margin: '0 auto 40px auto',
            }}
          >
            I build and evaluate intelligent products across web engineering, AI models, automation, testing and deployment. My work spans React, TypeScript, FastAPI, Python, machine learning and AI-assisted engineering.
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                textDecoration: 'none',
                padding: '16px 32px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#000000',
                backgroundColor: '#ffffff',
                border: 'none',
                boxShadow: '0 8px 24px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="btn-primary"
            >
              View Projects
            </a>

            <a
              href="/Sharan-Kumar-Resume.pdf"
              download="Sharan-Kumar-Resume.pdf"
              style={{
                textDecoration: 'none',
                padding: '16px 32px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px 0 rgba(0, 242, 254, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              className="btn-secondary"
            >
              Download Resume
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                textDecoration: 'none',
                padding: '16px 32px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px 0 rgba(0, 242, 254, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              className="btn-secondary"
            >
              Get In Touch
            </a>
          </div>

          <div className="hero-focus-dock" aria-label="Current focus areas">
            <span className="hero-focus-label">Live focus</span>
            <div className="hero-focus-controls">
              {Object.keys(focusModes).map((mode) => (
                <button
                  type="button"
                  key={mode}
                  className={focusMode === mode ? 'is-active' : ''}
                  onClick={() => setFocusMode(mode)}
                  aria-pressed={focusMode === mode}
                >
                  <i />{mode}
                </button>
              ))}
            </div>
            <p key={focusMode}>{focusModes[focusMode]}</p>
          </div>
        </div>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span>Scroll to explore</span>
        <i />
      </div>

      <style>{`
        .btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 28px rgba(255, 255, 255, 0.25);
          background-color: var(--accent-cyan) !important;
        }
        
        .btn-secondary:hover {
          transform: translateY(-3px) scale(1.02);
          border-color: var(--accent-cyan);
          background-color: rgba(0, 242, 254, 0.05) !important;
          box-shadow: 0 0 25px rgba(0, 242, 254, 0.25), inset 0 0 15px rgba(0, 242, 254, 0.15) !important;
          animation: borderGlowPulse 2.5s infinite;
        }

        @keyframes borderGlowPulse {
          0%, 100% { box-shadow: 0 0 15px rgba(0, 242, 254, 0.15), inset 0 0 10px rgba(0, 242, 254, 0.05); }
          50% { box-shadow: 0 0 25px rgba(0, 242, 254, 0.35), inset 0 0 15px rgba(0, 242, 254, 0.15); }
        }

        @media (max-width: 768px) {
          #home h1 {
            font-size: clamp(2rem, 8vw, 3rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
