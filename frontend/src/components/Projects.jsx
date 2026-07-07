import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Play, Activity, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- INTERACTIVE DIGITAL MOCKUPS (PURE SVG + FRAMER MOTION) ---

// 1. Job Application Automation Mockup
function JobAutomationMockup() {
  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '260px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(157, 78, 221, 0.05), transparent 70%)',
        overflow: 'hidden',
        borderRadius: '12px',
      }}
    >
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(157, 78, 221, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(157, 78, 221, 0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(circle, black, transparent)',
          WebkitMaskImage: 'radial-gradient(circle, black, transparent)',
        }}
      />
      <svg width="85%" height="80%" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 1 }}>
        <rect x="10" y="10" width="380" height="220" rx="8" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="rgba(6,6,12,0.6)" />
        <line x1="10" y1="45" x2="390" y2="45" stroke="rgba(255,255,255,0.06)" />
        <circle cx="28" cy="28" r="4" fill="#ff5f56" />
        <circle cx="40" cy="28" r="4" fill="#ffbd2e" />
        <circle cx="52" cy="28" r="4" fill="#27c93f" />
        <text x="75" y="32" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="var(--font-mono)">PLAYWRIGHT_WORKER_01</text>
        <rect x="25" y="58" width="350" height="18" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
        <text x="35" y="70" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">https://workday.com/careers/apply/software_engineer</text>
        <rect x="25" y="85" width="350" height="130" rx="4" fill="rgba(0, 0, 0, 0.4)" stroke="rgba(255, 255, 255, 0.04)" />
        <text x="35" y="105" fill="#a5d6ff" fontSize="8" fontFamily="var(--font-mono)">[SYSTEM] Initializing Playwright browser worker...</text>
        <text x="35" y="120" fill="#a5d6ff" fontSize="8" fontFamily="var(--font-mono)">[SUCCESS] Navigated to target job portal</text>
        <text x="35" y="135" fill="#ff7b72" fontSize="8" fontFamily="var(--font-mono)">[PARSING] Resume parsed successfully: sharan_resume.pdf</text>
        <text x="35" y="150" fill="#79c0ff" fontSize="8" fontFamily="var(--font-mono)">[ACTION] Form field mapped: First Name -&gt; Sharan</text>
        <text x="35" y="165" fill="#79c0ff" fontSize="8" fontFamily="var(--font-mono)">[ACTION] Form field mapped: Last Name -&gt; Kumar</text>
        <text x="35" y="180" fill="#79c0ff" fontSize="8" fontFamily="var(--font-mono)">[ACTION] Custom field detected: AI Exp -&gt; Yes</text>
        <text x="35" y="195" fill="#56d364" fontSize="8" fontFamily="var(--font-mono)">&gt; [SUCCESS] Application submitted successfully</text>
      </svg>
    </div>
  );
}

// 2. Trader AI Mockup
function TraderAIMockup() {
  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '260px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 242, 254, 0.05), transparent 70%)',
        overflow: 'hidden',
        borderRadius: '12px',
      }}
    >
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(0, 242, 254, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 254, 0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(circle, black, transparent)',
          WebkitMaskImage: 'radial-gradient(circle, black, transparent)',
        }}
      />
      <svg width="85%" height="80%" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 1 }}>
        <rect x="10" y="10" width="380" height="220" rx="8" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="rgba(6,6,12,0.6)" />
        <line x1="10" y1="45" x2="390" y2="45" stroke="rgba(255,255,255,0.06)" />
        <circle cx="28" cy="28" r="4" fill="#ff5f56" />
        <circle cx="40" cy="28" r="4" fill="#ffbd2e" />
        <circle cx="52" cy="28" r="4" fill="#27c93f" />
        <text x="75" y="32" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="var(--font-mono)">TRADER_AI_v1.0.4</text>
        <path d="M 25 200 Q 80 180 120 150 T 220 160 T 320 80 T 375 70" stroke="url(#cyanGlow)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="375" cy="70" r="3" fill="#ffffff" />
        <text x="30" y="75" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)">INDEX: AI_ALPHA</text>
        <text x="30" y="95" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="var(--font-sans)">$94,821.50</text>
        <defs>
          <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-purple)" />
            <stop offset="100%" stopColor="var(--accent-cyan)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// 3. Stock Prediction ML Mockup
function StockMLMockup() {
  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '260px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(157, 78, 221, 0.06), transparent 70%)',
        overflow: 'hidden',
        borderRadius: '12px',
      }}
    >
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(157, 78, 221, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(157, 78, 221, 0.03) 1px, transparent 1px)',
          backgroundSize: '25px 25px',
          maskImage: 'radial-gradient(circle, black, transparent)',
          WebkitMaskImage: 'radial-gradient(circle, black, transparent)',
        }}
      />
      <svg width="85%" height="80%" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 1 }}>
        <rect x="10" y="10" width="380" height="220" rx="8" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="rgba(6,6,12,0.6)" />
        <line x1="10" y1="45" x2="390" y2="45" stroke="rgba(255,255,255,0.06)" />
        <circle cx="28" cy="28" r="4" fill="#ff5f56" />
        <circle cx="40" cy="28" r="4" fill="#ffbd2e" />
        <circle cx="52" cy="28" r="4" fill="#27c93f" />
        <text x="75" y="32" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="var(--font-mono)">MODEL_LSTM_PREDICT</text>
        <circle cx="60" cy="90" r="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" />
        <circle cx="60" cy="130" r="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" />
        <circle cx="140" cy="110" r="6" fill="rgba(0, 242, 254, 0.2)" stroke="var(--accent-cyan)" />
        <circle cx="220" cy="130" r="6" fill="rgba(157, 78, 221, 0.2)" stroke="var(--accent-purple)" />
        <circle cx="300" cy="130" r="8" fill="rgba(255, 255, 255, 0.3)" stroke="#ffffff" />
        <line x1="66" y1="90" x2="134" y2="110" stroke="rgba(255,255,255,0.08)" />
        <line x1="146" y1="110" x2="214" y2="130" stroke="rgba(0, 242, 254, 0.15)" />
        <line x1="226" y1="130" x2="292" y2="130" stroke="rgba(157, 78, 221, 0.2)" strokeWidth="1.5" />
        <text x="30" y="210" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)">EPOCH: 450 // LOSS: 0.0021</text>
      </svg>
    </div>
  );
}

// 4. Netflix Clone Mockup
function NetflixCloneMockup() {
  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '260px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(229, 9, 20, 0.06), transparent 70%)',
        overflow: 'hidden',
        borderRadius: '12px',
      }}
    >
      <svg width="85%" height="80%" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 1 }}>
        <rect x="10" y="10" width="380" height="220" rx="8" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="#000000" />
        <line x1="10" y1="45" x2="390" y2="45" stroke="rgba(255,255,255,0.06)" />
        <circle cx="28" cy="28" r="4" fill="#ff5f56" />
        <circle cx="40" cy="28" r="4" fill="#ffbd2e" />
        <circle cx="52" cy="28" r="4" fill="#27c93f" />
        <text x="75" y="32" fill="#E50914" fontSize="11" fontWeight="bold" letterSpacing="0.5px" fontFamily="var(--font-display)">NETFLIX</text>
        <rect x="25" y="58" width="350" height="90" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
        <rect x="40" y="75" width="120" height="15" fill="rgba(255,255,255,0.08)" rx="2" />
        <rect x="40" y="98" width="160" height="8" fill="rgba(255,255,255,0.04)" rx="2" />
        <rect x="40" y="128" width="45" height="14" fill="#ffffff" rx="2" />
        <path d="M 48 132 L 48 138 L 54 135 Z" fill="#000000" />
        <text x="59" y="139" fill="#000000" fontSize="8" fontWeight="bold" fontFamily="var(--font-sans)">PLAY</text>
        <rect x="25" y="174" width="75" height="42" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.05)" />
      </svg>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const bgTextRef = useRef(null);

  const projectsData = [
    {
      id: 'job-automation',
      num: '01',
      title: 'AI-Powered Job Application Automation System',
      tag: 'Automation',
      overview: 'End-to-end browser automation framework targeting automated job submissions.',
      problem: 'Job applications require repetitive manual input across highly fragmented applicant tracking systems (ATS) like Workday, Lever, and Greenhouse.',
      solution: 'Developed a robust browser automation network that leverages intelligent selector mapping and profile parsing to execute applications seamlessly.',
      features: [
        "Automated resume uploads & mapping",
        "Dynamic form field detection & fill",
        "Dynamic account creation workflows",
        "Smart selector fallback engine",
        "In-depth logs & session management"
      ],
      tags: ['Python', 'Playwright', 'JSON', 'Browser Automation'],
      mockup: <JobAutomationMockup />,
      github: 'https://github.com/sharan7860',
      demo: '#',
    },
    {
      id: 'stock-intelligence',
      num: '02',
      title: 'AI-Powered Stock Market Intelligence Platform',
      tag: 'Artificial Intelligence',
      overview: 'Full-stack AI-driven finance platform providing stock recommendations.',
      problem: 'Retail investors face data overload and struggle to extract explainable, actionable insights from raw financial metrics and market trends.',
      solution: 'Built a unified dashboard providing AI chatbot insights, algorithmic portfolio suggestions, and deep technical analyses.',
      features: [
        "AI Chat for market Q&A",
        "Unified stock metrics dashboard",
        "Algorithm-driven portfolio suggestions",
        "Explainable recommendations engine",
        "Dynamic technical indicators & charts"
      ],
      tags: ['React', 'FastAPI', 'TensorFlow', 'OpenRouter', 'Framer Motion'],
      mockup: <TraderAIMockup />,
      github: 'https://github.com/sharan7860',
      demo: '#',
    },
    {
      id: 'stock-ml',
      num: '03',
      title: 'Stock Price Prediction ML',
      tag: 'Machine Learning',
      overview: 'LSTM-based forecasting engine with interactive Streamlit visualization.',
      problem: 'Predicting stock trends requires analyzing multi-dimensional historical sequences and visualizing forecast variance interactively.',
      solution: 'Trained sequential neural networks (LSTM) to evaluate stock trends, served via an interactive Streamlit UI dashboard.',
      features: [
        "LSTM-based time-series forecasting",
        "Interactive Streamlit control panel",
        "Multi-variable technical inputs",
        "Variance & loss value tracking",
        "Historical data processing pipelines"
      ],
      tags: ['Python', 'TensorFlow', 'LSTM', 'Pandas', 'Streamlit'],
      mockup: <StockMLMockup />,
      github: 'https://github.com/sharan7860',
      demo: '#',
    },
    {
      id: 'netflix-clone',
      num: '04',
      title: 'Netflix Clone',
      tag: 'Frontend',
      overview: 'High-fidelity React implementation replicating Netflix UI elements.',
      problem: 'Building premium streaming UI wrappers requires implementing complex sliders, dynamic routing, and high-performance video mockups.',
      solution: 'Constructed a highly responsive React layout featuring modular component mapping and clean CSS overlays.',
      features: [
        "Interactive video billboard header",
        "Multi-row trending catalog sliders",
        "Modular React visual components",
        "High-performance media layout",
        "Responsive design & touch navigation"
      ],
      tags: ['React', 'HTML5', 'CSS3', 'Tailwind CSS'],
      mockup: <NetflixCloneMockup />,
      github: 'https://github.com/sharan7860',
      demo: '#',
    }
  ];

  useEffect(() => {
    const cards = gsap.utils.toArray('.project-stack-card');
    
    // Pin and stack cards cleanly
    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        pin: true,
        pinSpacing: false,
        end: "bottom top",
        id: `card-pin-${index}`,
      });
    });

    // Parallax on mockups
    cards.forEach((card) => {
      const visual = card.querySelector('.project-visual-wrapper');
      
      gsap.fromTo(visual, 
        { y: 35 },
        { 
          y: -35, 
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    // Section outline typography parallax
    gsap.fromTo(bgTextRef.current,
      { y: -80, opacity: 0.02, scale: 0.95 },
      {
        y: 80,
        opacity: 0.08,
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
      id="projects" 
      ref={containerRef} 
      style={{ 
        padding: 0, 
        position: 'relative', 
        backgroundColor: '#050505',
        overflow: 'hidden'
      }}
    >
      {/* Massive sticky background outline typography */}
      <div 
        ref={bgTextRef}
        className="text-outline"
        style={{
          position: 'absolute',
          top: '8%',
          right: '5%',
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
        02 // WORK
      </div>

      {/* Cards stack layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {projectsData.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={project.id} 
              className="project-stack-card"
              style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: index === 0 ? '#050505' : `rgba(5, 5, ${8 + index * 4}, 0.98)`,
                borderTop: '1px solid rgba(255, 255, 255, 0.02)',
                willChange: 'transform',
                boxShadow: '0 -20px 40px rgba(0, 0, 0, 0.5)',
                padding: '0 40px',
              }}
            >
              <div 
                className="content-container project-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '50px',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {/* Visual Mockup Column */}
                <div 
                  className="project-visual-wrapper glass-panel"
                  style={{
                    order: isEven ? 1 : 2,
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(10, 10, 20, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                    overflow: 'hidden',
                    borderRadius: '16px',
                    willChange: 'transform'
                  }}
                >
                  {project.mockup}
                </div>

                {/* Case Study Details Column */}
                <div 
                  className="project-info-wrapper"
                  style={{
                    order: isEven ? 2 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                  }}
                >
                  {/* Project Tag */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.82rem', 
                      color: 'var(--accent-purple)', 
                      fontWeight: 'bold',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}>
                      [{project.num}] {project.tag}
                    </span>
                    <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                  </div>

                  {/* Project Title */}
                  <h3 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', 
                    fontWeight: 800, 
                    color: '#ffffff',
                    lineHeight: 1.2
                  }}>
                    {project.title}
                  </h3>

                  {/* Narrative details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <p style={{ fontSize: '0.94rem', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
                      <strong>Overview:</strong> {project.overview}
                    </p>
                    <p style={{ fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent-cyan)' }}><strong>Problem:</strong></span> {project.problem}
                    </p>
                    <p style={{ fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent-purple)' }}><strong>Solution:</strong></span> {project.solution}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      Key Features
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {project.features.map((feature, fIdx) => (
                        <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent-cyan)', flexShrink: 0 }} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>


                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .project-stack-card {
          position: relative;
        }

        @media (min-width: 992px) {
          .project-row {
            grid-template-columns: 1.05fr 0.95fr !important;
            gap: 70px !important;
          }
          
          .project-visual-wrapper {
            order: unset !important;
          }
          .project-info-wrapper {
            order: unset !important;
          }
        }

        .project-btn-primary:hover {
          transform: translateY(-2px);
          background: var(--accent-cyan) !important;
          box-shadow: 0 5px 15px rgba(0, 242, 254, 0.3);
        }

        .project-btn-secondary:hover {
          transform: translateY(-2px);
          border-color: var(--accent-cyan) !important;
          background: rgba(0, 242, 254, 0.05) !important;
          box-shadow: 0 5px 15px rgba(0, 242, 254, 0.15) !important;
        }
      `}</style>
    </section>
  );
}
