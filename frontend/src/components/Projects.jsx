import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

// 2. Signal AI live project preview
function SignalAIMockup() {
  return (
    <div className="signal-ai-preview">
      <svg viewBox="0 0 640 360" role="img" aria-label="Signal AI stock research workspace preview">
        <defs>
          <radialGradient id="signalGlow" cx="75%" cy="58%" r="48%">
            <stop offset="0%" stopColor="#87fff1" stopOpacity=".95" />
            <stop offset="28%" stopColor="#20cdbd" stopOpacity=".48" />
            <stop offset="100%" stopColor="#021717" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="signalLine" x1="0" x2="1"><stop stopColor="#18cfc0" stopOpacity=".3" /><stop offset="1" stopColor="#52f3df" /></linearGradient>
        </defs>
        <rect width="640" height="360" fill="#021719" />
        <rect width="640" height="360" fill="url(#signalGlow)" />
        <path d="M0 250 L78 250 L119 218 L170 232 L232 188 L290 205 L350 173 L410 188 L484 120 L560 130 L640 88" fill="none" stroke="url(#signalLine)" strokeWidth="3" />
        <circle cx="468" cy="207" r="62" fill="none" stroke="#7bfff2" strokeOpacity=".22" /><circle cx="468" cy="207" r="36" fill="#58ebdc" fillOpacity=".72" />
        <rect x="19" y="20" width="92" height="26" rx="13" fill="#0a2d2f" stroke="#4de3d5" strokeOpacity=".3" /><circle cx="35" cy="33" r="4" fill="#6affdc" /><text x="46" y="37" fill="#ecfffd" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="700">Signal AI</text>
        <text x="23" y="154" fill="#f5fffe" fontSize="48" fontFamily="Arial, sans-serif" fontWeight="800">Predict</text><text x="23" y="205" fill="#7bfff0" fontSize="48" fontFamily="Arial, sans-serif" fontWeight="800">Smarter.</text><text x="23" y="256" fill="#dbe6e5" fontSize="47" fontFamily="Arial, sans-serif" fontWeight="800">Trade Better.</text>
        <rect x="430" y="142" width="101" height="43" rx="11" fill="#082326" stroke="#62e7db" strokeOpacity=".25" /><text x="442" y="158" fill="#b9d5d2" fontSize="8" fontFamily="Arial, sans-serif">Explore stocks</text><text x="442" y="174" fill="#63f0dc" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="700">Price history</text>
      </svg>
      <div className="signal-ai-preview-overlay">
        <span>Live project preview</span>
        <strong>Signal AI</strong>
      </div>
    </div>
  );
}

// 3. Trading Charts Generator output
function TradingChartsMockup() {
  return (
    <figure className="trading-chart-preview">
      <img src="/projects/trading-charts/bitx-trading-chart.png" alt="BITX trading chart generated by the project, showing price signals, MACD, and RSI." />
      <figcaption><span>OUTPUT // GRAPH_GENERATOR.PY</span><strong>BITX technical analysis</strong></figcaption>
    </figure>
  );
}

// 4. Stock Prediction ML Mockup
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
  const hudRef = useRef(null);
  const [activeProject, setActiveProject] = useState(1);

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
      portal: false,
      github: 'https://github.com/sharan7860',
      demo: '#',
    },
    {
      id: 'signal-ai',
      num: '02',
      title: 'Signal AI',
      tag: 'AI Market Research',
      overview: 'An AI-powered stock research workspace for prices, signals, projections, and portfolio tracking.',
      problem: 'Market information can be hard to interpret when price history, technical indicators, news, and investment context live in separate places.',
      solution: 'Built a focused research workspace that combines technical signals, illustrative projections, portfolio context, and an AI learning assistant.',
      features: [
        'Stock analysis and price history',
        'RSI, MACD, and moving averages',
        'Illustrative 30-weekday projections',
        'AI assistant for market learning',
        'Local portfolio tracking and signals'
      ],
      tags: ['React', 'AI Assistant', 'Technical Analysis', 'Market Research'],
      mockup: <SignalAIMockup />,
      github: 'https://github.com/sharan7860',
      demo: 'https://sharan7860.github.io/signal-ai/',
    },
    {
      id: 'trading-charts',
      num: '03',
      title: 'Trading Charts Generator',
      tag: 'Technical Analysis',
      overview: 'A Python graph generator that turns historical market data into readable trading-analysis charts.',
      problem: 'Price action, momentum, and overbought or oversold conditions are difficult to compare when they are separated across tools.',
      solution: 'Built a reusable charting workflow that downloads historical data and plots price signals, MACD, and RSI together in one view.',
      features: [
        'Historical market-data retrieval',
        'Buy and sell signal detection',
        'MACD, signal line, and histogram',
        'RSI overbought and oversold ranges',
        'High-resolution chart export'
      ],
      tags: ['Python', 'yfinance', 'Pandas', 'Matplotlib', 'MACD', 'RSI'],
      mockup: <TradingChartsMockup />,
      github: 'https://github.com/sharan7860/trading-charts-code',
      demo: '#',
    },
    {
      id: 'stock-ml',
      num: '04',
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
      portal: false,
      github: 'https://github.com/sharan7860',
      demo: '#',
    },
    {
      id: 'netflix-clone',
      num: '05',
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
      portal: false,
      github: 'https://github.com/sharan7860',
      demo: '#',
    }
  ];

  useEffect(() => {
    const cards = Array.from(containerRef.current.querySelectorAll('.project-stack-card'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      cards.forEach((card) => card.classList.add('is-visible'));
    }

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const card = entry.target;
        card.classList.add('is-visible');
        setActiveProject(Number(card.dataset.projectIndex));
        cardObserver.unobserve(card);
      });
    }, {
      threshold: 0.28,
      rootMargin: '0px 0px -8% 0px',
    });

    cards.forEach((card) => cardObserver.observe(card));

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 62%',
        end: 'bottom 35%',
        onEnter: () => gsap.to(hudRef.current, { autoAlpha: 1, x: 0, duration: 0.35 }),
        onEnterBack: () => gsap.to(hudRef.current, { autoAlpha: 1, x: 0, duration: 0.35 }),
        onLeave: () => gsap.to(hudRef.current, { autoAlpha: 0, x: 18, duration: 0.22 }),
        onLeaveBack: () => gsap.to(hudRef.current, { autoAlpha: 0, x: 18, duration: 0.22 }),
      });

      gsap.fromTo(bgTextRef.current,
        { y: -80, opacity: 0.02, scale: 0.95 },
        {
          y: 80,
          opacity: 0.08,
          scale: 1.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, containerRef);

    return () => {
      cardObserver.disconnect();
      context.revert();
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
        {String(projectsData.length).padStart(2, '0')} // WORK
      </div>

      <aside className="project-hud" ref={hudRef} aria-live="polite">
        <span className="project-hud-label">Case study</span>
        <strong>{String(activeProject).padStart(2, '0')} <i>/</i> {String(projectsData.length).padStart(2, '0')}</strong>
        <span className="project-hud-current">{projectsData[activeProject - 1]?.tag}</span>
        <div className="project-hud-bars" aria-hidden="true">
          {projectsData.map((project, index) => <span key={project.id} className={index + 1 <= activeProject ? 'is-active' : ''} />)}
        </div>
      </aside>

      {/* Cards stack layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {projectsData.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={project.id} 
              className="project-stack-card"
              data-project-index={index + 1}
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
              <div className="project-case-nav" aria-hidden="true">
                <span>CASE_{project.num}</span>
                <i />
                <span>{projectsData[index + 1] ? `NEXT_${projectsData[index + 1].num}` : 'END_OF_WORK'}</span>
              </div>
              <div 
                className="content-container project-row project-slide-content"
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
                  {project.portal !== false && <div className="project-reveal-portal" aria-hidden="true"><i /><i /><i /><b /></div>}
                  <div className="project-visual-content">{project.mockup}</div>
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
                  <span className="project-case-line" aria-hidden="true" />
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

                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-live-link"
                    >
                      Open Signal AI <span aria-hidden="true">↗</span>
                    </a>
                  )}


                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .project-stack-card {
          position: relative;
          perspective: 1200px;
          isolation: isolate;
        }

        .project-case-nav {
          position: absolute;
          top: 28px;
          left: clamp(22px, 4vw, 64px);
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(202, 255, 250, .52);
          font-family: var(--font-mono);
          font-size: .6rem;
          letter-spacing: .12em;
          opacity: 0;
          transform: translateY(-12px);
          transition: transform 600ms cubic-bezier(.16, 1, .3, 1) 100ms, opacity 420ms ease 100ms;
        }

        .project-case-nav i {
          display: block;
          width: clamp(42px, 7vw, 88px);
          height: 1px;
          background: linear-gradient(90deg, var(--accent-cyan), transparent);
          box-shadow: 0 0 10px rgba(0, 242, 254, .42);
          transform: scaleX(.2);
          transform-origin: left;
          transition: transform 700ms cubic-bezier(.16, 1, .3, 1) 180ms;
        }

        .project-slide-content {
          position: relative;
          z-index: 1;
          transform-style: preserve-3d;
          will-change: transform, opacity;
          opacity: 0.78;
          transform: translate3d(0, 42px, 0) scale(0.975);
          transition: transform 780ms cubic-bezier(.16, 1, .3, 1), opacity 620ms ease-out;
        }

        .project-visual-content,
        .project-info-wrapper {
          transition: transform 820ms cubic-bezier(.16, 1, .3, 1), opacity 650ms ease-out;
        }

        .project-visual-content {
          opacity: 0.56;
          transform: translate3d(38px, 30px, 0) rotateY(-7deg) scale(.94);
        }

        .project-info-wrapper {
          opacity: 0.52;
          transform: translate3d(-32px, 24px, 0);
        }

        .project-stack-card:nth-child(even) .project-visual-content {
          transform: translate3d(-38px, 30px, 0) rotateY(7deg) scale(.94);
        }

        .project-stack-card:nth-child(even) .project-info-wrapper {
          transform: translate3d(32px, 24px, 0);
        }

        .project-case-line {
          opacity: 0;
          transform: scaleX(.18);
          transition: transform 850ms cubic-bezier(.16, 1, .3, 1) 140ms, opacity 360ms ease 140ms;
        }

        .project-stack-card::after {
          position: absolute;
          top: 14%;
          left: 0;
          z-index: 0;
          width: 28%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-purple), transparent);
          box-shadow: 0 0 18px rgba(0, 242, 254, .7);
          content: '';
          opacity: 0;
          pointer-events: none;
        }

        .project-stack-card.is-visible .project-slide-content,
        .project-stack-card.is-visible .project-visual-content,
        .project-stack-card.is-visible .project-info-wrapper {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotateY(0) scale(1);
        }

        .project-stack-card.is-visible .project-case-line {
          opacity: 1;
          transform: scaleX(1);
        }

        .project-stack-card.is-visible .project-case-nav {
          opacity: 1;
          transform: translateY(0);
        }

        .project-stack-card.is-visible .project-case-nav i {
          transform: scaleX(1);
        }

        .project-stack-card.is-visible::after {
          animation: projectCaseSweep 900ms cubic-bezier(.16, 1, .3, 1) both;
        }

        @keyframes projectCaseSweep {
          0% { opacity: 0; transform: translateX(-120%) scaleX(.2); }
          32% { opacity: 1; }
          100% { opacity: 0; transform: translateX(440%) scaleX(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-slide-content,
          .project-visual-content,
          .project-info-wrapper,
          .project-case-line,
          .project-case-nav {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .project-stack-card::after { display: none; }
          .project-case-nav i { transform: none !important; transition: none !important; }
        }

        @media (max-width: 768px) {
          .project-case-nav { display: none; }
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
