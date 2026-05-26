import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Play, Activity } from 'lucide-react';

// --- INTERACTIVE DIGITAL MOCKUPS (PURE SVG + FRAMER MOTION) ---

// 1. Trader AI Mockup
function TraderAIMockup() {
  const lineVariants = {
    animate: {
      strokeDashoffset: [1000, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 242, 254, 0.05), transparent 70%)',
        overflow: 'hidden',
        borderRadius: '12px',
      }}
    >
      {/* Cyber Grid Base */}
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

      {/* Interactive elements */}
      <svg width="85%" height="80%" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 1 }}>
        {/* Border Frame */}
        <rect x="10" y="10" width="380" height="220" rx="8" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="rgba(6,6,12,0.6)" />
        <line x1="10" y1="45" x2="390" y2="45" stroke="rgba(255,255,255,0.06)" />
        
        {/* Window controls */}
        <circle cx="28" cy="28" r="4" fill="#ff5f56" />
        <circle cx="40" cy="28" r="4" fill="#ffbd2e" />
        <circle cx="52" cy="28" r="4" fill="#27c93f" />
        <text x="75" y="32" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="var(--font-mono)">TRADER_AI_v1.0.4</text>
        
        {/* Chart Lines */}
        <motion.path
          d="M 25 200 Q 80 180 120 150 T 220 160 T 320 80 T 375 70"
          stroke="url(#cyanGlow)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1000"
          variants={lineVariants}
          animate="animate"
        />

        <motion.path
          d="M 25 180 Q 90 190 140 130 T 240 140 T 300 90 T 375 85"
          stroke="rgba(157, 78, 221, 0.4)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="1000"
          variants={lineVariants}
          animate="animate"
          transition={{ duration: 12 }}
        />

        {/* Floating pulse point */}
        <motion.circle
          cx="375"
          cy="70"
          r="6"
          fill="var(--accent-cyan)"
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <circle cx="375" cy="70" r="3" fill="#ffffff" />

        {/* Candlesticks & bars */}
        <rect x="60" y="100" width="4" height="40" fill="rgba(0,242,254,0.15)" />
        <rect x="61" y="80" width="2" height="80" fill="rgba(0,242,254,0.3)" />
        <rect x="180" y="110" width="4" height="60" fill="rgba(157, 78, 221, 0.15)" />
        
        {/* Text Stats */}
        <text x="30" y="75" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)">INDEX: AI_ALPHA</text>
        <text x="30" y="95" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="var(--font-sans)">$94,821.50</text>
        
        {/* Glow Gradients */}
        <defs>
          <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-purple)" />
            <stop offset="100%" stopColor="var(--accent-cyan)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Custom float badge */}
      <motion.div 
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '8px',
          background: 'rgba(39, 201, 63, 0.15)',
          border: '1px solid rgba(39, 201, 63, 0.3)',
          color: '#27c93f',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          fontWeight: 'bold',
          backdropFilter: 'blur(8px)',
        }}
      >
        <TrendingUp size={12} />
        <span>+14.2% APY</span>
      </motion.div>
    </div>
  );
}

// 2. Stock Prediction ML Mockup
function StockMLMockup() {
  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '280px',
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
        
        {/* Window controls */}
        <circle cx="28" cy="28" r="4" fill="#ff5f56" />
        <circle cx="40" cy="28" r="4" fill="#ffbd2e" />
        <circle cx="52" cy="28" r="4" fill="#27c93f" />
        <text x="75" y="32" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="var(--font-mono)">MODEL_LSTM_PREDICT</text>

        {/* Neural Network Nodes */}
        {/* Layer 1 */}
        <circle cx="60" cy="90" r="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" />
        <circle cx="60" cy="130" r="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" />
        <circle cx="60" cy="170" r="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" />
        
        {/* Layer 2 (Hidden) */}
        <motion.circle cx="140" cy="70" r="6" fill="rgba(0, 242, 254, 0.2)" stroke="var(--accent-cyan)" animate={{ fillOpacity: [0.2, 0.8, 0.2] }} transition={{ repeat: Infinity, duration: 3 }} />
        <motion.circle cx="140" cy="110" r="6" fill="rgba(0, 242, 254, 0.2)" stroke="var(--accent-cyan)" animate={{ fillOpacity: [0.8, 0.2, 0.8] }} transition={{ repeat: Infinity, duration: 2.5 }} />
        <motion.circle cx="140" cy="150" r="6" fill="rgba(0, 242, 254, 0.2)" stroke="var(--accent-cyan)" animate={{ fillOpacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 4 }} />
        <motion.circle cx="140" cy="190" r="6" fill="rgba(0, 242, 254, 0.2)" stroke="var(--accent-cyan)" animate={{ fillOpacity: [0.1, 0.9, 0.1] }} transition={{ repeat: Infinity, duration: 3.5 }} />
        
        {/* Layer 3 (Hidden) */}
        <motion.circle cx="220" cy="90" r="6" fill="rgba(157, 78, 221, 0.2)" stroke="var(--accent-purple)" animate={{ fillOpacity: [0.6, 0.2, 0.6] }} transition={{ repeat: Infinity, duration: 2.2 }} />
        <motion.circle cx="220" cy="130" r="6" fill="rgba(157, 78, 221, 0.2)" stroke="var(--accent-purple)" animate={{ fillOpacity: [0.2, 0.9, 0.2] }} transition={{ repeat: Infinity, duration: 3.2 }} />
        <motion.circle cx="220" cy="170" r="6" fill="rgba(157, 78, 221, 0.2)" stroke="var(--accent-purple)" animate={{ fillOpacity: [0.7, 0.3, 0.7] }} transition={{ repeat: Infinity, duration: 2.8 }} />

        {/* Output Node */}
        <motion.circle 
          cx="300" 
          cy="130" 
          r="8" 
          fill="rgba(255, 255, 255, 0.3)" 
          stroke="#ffffff" 
          animate={{ scale: [1, 1.15, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }} 
        />

        {/* Connections Layer 1 to 2 */}
        <line x1="66" y1="90" x2="134" y2="70" stroke="rgba(255,255,255,0.08)" />
        <line x1="66" y1="90" x2="134" y2="110" stroke="rgba(255,255,255,0.08)" />
        <line x1="66" y1="130" x2="134" y2="110" stroke="rgba(255,255,255,0.08)" />
        <line x1="66" y1="130" x2="134" y2="150" stroke="rgba(255,255,255,0.08)" />
        <line x1="66" y1="170" x2="134" y2="150" stroke="rgba(255,255,255,0.08)" />
        <line x1="66" y1="170" x2="134" y2="190" stroke="rgba(255,255,255,0.08)" />

        {/* Connections Layer 2 to 3 */}
        <line x1="146" y1="70" x2="214" y2="90" stroke="rgba(0, 242, 254, 0.15)" />
        <line x1="146" y1="110" x2="214" y2="90" stroke="rgba(0, 242, 254, 0.15)" />
        <line x1="146" y1="110" x2="214" y2="130" stroke="rgba(0, 242, 254, 0.15)" />
        <line x1="146" y1="150" x2="214" y2="130" stroke="rgba(0, 242, 254, 0.15)" />
        <line x1="146" y1="150" x2="214" y2="170" stroke="rgba(0, 242, 254, 0.15)" />
        <line x1="146" y1="190" x2="214" y2="170" stroke="rgba(0, 242, 254, 0.15)" />

        {/* Connections Layer 3 to Output */}
        <line x1="226" y1="90" x2="292" y2="130" stroke="rgba(157, 78, 221, 0.2)" />
        <line x1="226" y1="130" x2="292" y2="130" stroke="rgba(157, 78, 221, 0.2)" strokeWidth="1.5" />
        <line x1="226" y1="170" x2="292" y2="130" stroke="rgba(157, 78, 221, 0.2)" />

        <text x="30" y="210" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)">EPOCH: 450 // LOSS: 0.0021</text>
        <text x="320" y="134" fill="#ffffff" fontSize="11" fontFamily="var(--font-mono)">OUT</text>
      </svg>

      <motion.div 
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '64px',
          right: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '8px',
          background: 'rgba(157, 78, 221, 0.15)',
          border: '1px solid rgba(157, 78, 221, 0.3)',
          color: 'var(--accent-purple)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          fontWeight: 'bold',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Activity size={12} />
        <span>98.6% ACC</span>
      </motion.div>
    </div>
  );
}

// 3. Netflix Clone Mockup
function NetflixCloneMockup() {
  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(229, 9, 20, 0.06), transparent 70%)',
        overflow: 'hidden',
        borderRadius: '12px',
      }}
    >
      <svg width="85%" height="80%" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 1 }}>
        {/* Browser container */}
        <rect x="10" y="10" width="380" height="220" rx="8" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="#000000" />
        <line x1="10" y1="45" x2="390" y2="45" stroke="rgba(255,255,255,0.06)" />
        
        {/* Window controls */}
        <circle cx="28" cy="28" r="4" fill="#ff5f56" />
        <circle cx="40" cy="28" r="4" fill="#ffbd2e" />
        <circle cx="52" cy="28" r="4" fill="#27c93f" />
        <text x="75" y="32" fill="#E50914" fontSize="11" fontWeight="bold" letterSpacing="0.5px" fontFamily="var(--font-display)">NETFLIX</text>

        {/* Hero Video Billboard */}
        <rect x="25" y="58" width="350" height="90" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
        <rect x="40" y="75" width="120" height="15" fill="rgba(255,255,255,0.08)" rx="2" />
        <rect x="40" y="98" width="160" height="8" fill="rgba(255,255,255,0.04)" rx="2" />
        <rect x="40" y="112" width="110" height="8" fill="rgba(255,255,255,0.04)" rx="2" />

        {/* Play button */}
        <rect x="40" y="128" width="45" height="14" fill="#ffffff" rx="2" />
        <path d="M 48 132 L 48 138 L 54 135 Z" fill="#000000" />
        <text x="59" y="139" fill="#000000" fontSize="8" fontWeight="bold" fontFamily="var(--font-sans)">PLAY</text>

        {/* Small thumbnail sliders */}
        <text x="25" y="165" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-sans)" fontWeight="600">TRENDING NOW</text>
        <rect x="25" y="174" width="75" height="42" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.05)" />
        <rect x="110" y="174" width="75" height="42" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.05)" />
        <rect x="195" y="174" width="75" height="42" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.05)" />
        <rect x="280" y="174" width="75" height="42" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.05)" />
      </svg>

      {/* Floating interactive overlay icon */}
      <motion.div 
        animate={{ scale: [0.95, 1.1, 0.95] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'rgba(229, 9, 20, 0.25)',
          border: '2px solid #E50914',
          color: '#ffffff',
          boxShadow: '0 0 20px rgba(229, 9, 20, 0.4)',
        }}
      >
        <Play size={20} fill="#ffffff" />
      </motion.div>
    </div>
  );
}

// --- MAIN PROJECTS COMPONENT ---

export default function Projects() {
  const projectsData = [
    {
      id: 'trader-ai',
      num: '01',
      title: 'TRADER AI',
      desc: 'AI-powered financial intelligence platform with portfolio analytics, market insights and explainable stock recommendations.',
      tags: ['React', 'FastAPI', 'TensorFlow', 'OpenRouter', 'Framer Motion'],
      mockup: <TraderAIMockup />,
      link: '#',
    },
    {
      id: 'stock-ml',
      num: '02',
      title: 'Stock Price Prediction ML',
      desc: 'LSTM-based stock prediction system using historical data analysis and interactive visualization dashboards.',
      tags: ['Python', 'TensorFlow', 'LSTM', 'Pandas', 'Streamlit'],
      mockup: <StockMLMockup />,
      link: '#',
    },
    {
      id: 'netflix-clone',
      num: '03',
      title: 'Netflix Clone',
      desc: 'Responsive Netflix-inspired interface built with reusable components and dynamic movie browsing experience.',
      tags: ['React', 'HTML', 'CSS'],
      mockup: <NetflixCloneMockup />,
      link: '#',
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="projects" style={{ padding: '100px 0' }}>
      <div className="content-container">
        
        {/* Scroll Reveal Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.82rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
              02 // Portfolio
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, marginTop: '8px', textTransform: 'uppercase' }}>
              Selected Work
            </h2>
          </div>

          {/* Projects List */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '80px',
            }}
          >
            {projectsData.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  className="project-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '40px',
                    alignItems: 'center',
                  }}
                >
                  {/* Visual Mockup column */}
                  <div 
                    style={{
                      order: isEven ? 1 : 2,
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(10, 10, 20, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                      overflow: 'hidden',
                    }}
                    className="project-visual-wrapper glass-panel"
                  >
                    {project.mockup}
                  </div>

                  {/* Info Text details column */}
                  <div 
                    style={{
                      order: isEven ? 2 : 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '20px',
                    }}
                    className="project-info-wrapper"
                  >
                    {/* Project Tag / Number */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '0.9rem', 
                        color: 'var(--accent-purple)', 
                        fontWeight: 600 
                      }}>
                        [{project.num}]
                      </span>
                      <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                    </div>

                    {/* Project Title */}
                    <h3 style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', 
                      fontWeight: 700, 
                      color: '#ffffff',
                      lineHeight: 1.1 
                    }}>
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p style={{ 
                      fontSize: '1.02rem', 
                      lineHeight: 1.65, 
                      color: 'var(--text-secondary)' 
                    }}>
                      {project.desc}
                    </p>

                    {/* Skills tags list */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '5px' }}>
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          style={{
                            fontSize: '0.78rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '4px 12px',
                            borderRadius: '4px',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Project CTA Link */}
                    <div style={{ marginTop: '15px' }}>
                      <a
                        href={project.link}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          textDecoration: 'none',
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          borderBottom: '1px solid rgba(255,255,255,0.3)',
                          paddingBottom: '4px',
                          transition: 'all 0.3s ease',
                        }}
                        className="project-link-btn"
                      >
                        <span>Explore Project</span>
                        <ArrowUpRight size={14} className="proj-arrow-icon" style={{ transition: 'transform 0.3s ease' }} />
                      </a>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .project-row {
            grid-template-columns: 1.05fr 0.95fr !important;
            gap: 80px !important;
          }
          
          .project-visual-wrapper {
            order: unset !important;
          }
          .project-info-wrapper {
            order: unset !important;
          }
        }

        .project-link-btn:hover {
          color: var(--accent-cyan) !important;
          border-color: var(--accent-cyan) !important;
        }

        .project-link-btn:hover .proj-arrow-icon {
          transform: translate(2px, -2px);
        }
      `}</style>
    </section>
  );
}
