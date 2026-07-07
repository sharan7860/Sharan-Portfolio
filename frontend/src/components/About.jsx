import { useEffect, useRef } from 'react';
import { Brain, Cpu, Terminal, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const bgTextRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  const coreStrengths = [
    "Full Stack Development",
    "AI Engineering",
    "REST API Development",
    "Automation",
    "Machine Learning",
    "Problem Solving",
    "Clean Architecture"
  ];

  const currentFocus = [
    "AI Engineering",
    "Full Stack Applications",
    "Browser Automation",
    "Prompt Engineering",
    "Production-grade AI Systems"
  ];

  useEffect(() => {
    // Reveal animation for left and right columns driven by scroll progress
    gsap.fromTo(leftColRef.current, 
      { opacity: 0, y: 100, filter: 'blur(8px)' },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1
        }
      }
    );

    gsap.fromTo(rightColRef.current, 
      { opacity: 0, y: 140, filter: 'blur(8px)' },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 25%",
          scrub: 1
        }
      }
    );

    // Pinning / Parallax for background outline typography
    gsap.fromTo(bgTextRef.current,
      { y: -50, opacity: 0.02, scale: 0.9 },
      {
        y: 50,
        opacity: 0.1,
        scale: 1.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef}
      style={{ 
        padding: '160px 0', 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Massive sticky background outline typography */}
      <div 
        ref={bgTextRef}
        className="text-outline"
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          fontSize: 'clamp(6rem, 15vw, 15rem)',
          fontWeight: 900,
          fontFamily: 'var(--font-display)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          whiteSpace: 'nowrap',
          willChange: 'transform, opacity'
        }}
      >
        01 // PROFILE
      </div>

      <div className="content-container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '50px' }} className="about-details-layout">
          
          {/* Left Column: Bio & Philosophy */}
          <div 
            ref={leftColRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              willChange: 'transform, opacity, filter'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.82rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
                Profile Description
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', color: '#ffffff' }}>
                About Me
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                I'm a Software Engineer passionate about building intelligent products that combine modern frontend engineering, backend systems, artificial intelligence and automation.
              </p>
              
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                I enjoy designing applications that solve practical problems—from AI-powered financial platforms to browser automation systems—while focusing on scalability, clean architecture and exceptional user experience.
              </p>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                I regularly leverage AI engineering tools including Claude Code, GitHub Copilot and ChatGPT to accelerate development, while carefully reviewing, testing and refining generated code into production-quality solutions.
              </p>
            </div>

            {/* Engineering Philosophy Card */}
            <div 
              className="glass-panel"
              style={{
                padding: '30px',
                borderLeft: '4px solid var(--accent-cyan)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                backgroundColor: 'rgba(0, 242, 254, 0.01)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-cyan)' }}>
                <Brain size={20} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Engineering Philosophy
                </span>
              </div>
              <blockquote style={{ 
                fontSize: '1.12rem', 
                fontWeight: 500, 
                lineHeight: 1.6, 
                color: '#ffffff',
                fontStyle: 'italic',
                fontFamily: 'var(--font-sans)',
              }}>
                "I believe software should solve real problems through clean architecture, thoughtful engineering and practical AI integration."
              </blockquote>
            </div>
          </div>

          {/* Right Column: Core Strengths & Current Focus */}
          <div 
            ref={rightColRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              willChange: 'transform, opacity, filter',
              marginTop: '40px'
            }}
          >
            {/* Current Focus */}
            <div 
              className="glass-panel"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-cyan)' }}>
                <Terminal size={18} />
                <h3 style={{ fontSize: '1.18rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: '#ffffff' }}>
                  Current Focus
                </h3>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentFocus.map((focus) => (
                  <li key={focus} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.98rem', color: 'var(--text-secondary)' }}>
                    <span style={{ 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--accent-cyan)',
                      boxShadow: '0 0 8px var(--accent-cyan)',
                      flexShrink: 0
                    }} />
                    <span>{focus}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Strengths */}
            <div 
              className="glass-panel"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-purple)' }}>
                <Cpu size={18} />
                <h3 style={{ fontSize: '1.18rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: '#ffffff' }}>
                  Core Strengths
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {coreStrengths.map((strength) => (
                  <div 
                    key={strength} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px', 
                      fontSize: '0.92rem', 
                      color: 'var(--text-secondary)',
                      padding: '4px 0'
                    }}
                  >
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-purple)', flexShrink: 0 }} />
                    <span>{strength}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-details-layout {
            grid-template-columns: 1.15fr 0.85fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </section>
  );
}
