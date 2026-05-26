import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Terminal, FileCode, CheckCircle, Orbit, Layers, Award } from 'lucide-react';

export default function About() {
  const skillCategories = [
    {
      title: "Programming",
      skills: ["Python", "C", "C++", "TypeScript", "SQL"],
      color: "var(--accent-cyan)"
    },
    {
      title: "Frontend",
      skills: ["React", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
      color: "#38bdf8"
    },
    {
      title: "Backend & APIs",
      skills: ["Node.js", "FastAPI", "REST APIs"],
      color: "#68a063"
    },
    {
      title: "AI / Machine Learning",
      skills: ["TensorFlow", "LSTM", "Pandas", "NumPy", "Streamlit", "Matplotlib"],
      color: "#ff6f00"
    },
    {
      title: "Tools & Platforms",
      skills: ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Render"],
      color: "#ffffff"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about">
      <div className="content-container">
        {/* Scroll Reveal Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '60px',
            }}
            className="about-grid"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.82rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
                01 // Profile
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, marginTop: '8px', textTransform: 'uppercase' }}>
                About Me
              </h2>
            </motion.div>

            {/* Details Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="about-details-layout">
              
              {/* Bio Column */}
              <motion.div 
                variants={itemVariants} 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '20px',
                }}
              >


                <h3 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontFamily: 'var(--font-display)', fontWeight: 600, color: '#ffffff', lineHeight: 1.35 }}>
                  Engineering intelligent systems, training advanced models, and building fast web products.
                </h3>
                
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                  Computer Science Engineering graduate focused on software development, AI and machine learning. Passionate about building modern applications, intelligent systems and scalable digital experiences. Strong foundation in React, Python, data structures and problem solving with hands-on project experience in full-stack and AI development.
                </p>

                {/* Education Box */}
                <div 
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    marginTop: '10px',
                  }}
                >
                  <div style={{ 
                    padding: '10px', 
                    borderRadius: '12px', 
                    background: 'rgba(0, 242, 254, 0.08)', 
                    color: 'var(--accent-cyan)',
                    boxShadow: '0 0 10px rgba(0, 242, 254, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.02rem', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>B.Tech in Computer Science Engineering</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      DAV Institute of Engineering and Technology, Jalandhar
                    </p>
                  </div>
                </div>

                {/* Certifications Box */}
                <div 
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}
                >
                  <div style={{ 
                    padding: '10px', 
                    borderRadius: '12px', 
                    background: 'rgba(157, 78, 221, 0.08)', 
                    color: 'var(--accent-purple)',
                    boxShadow: '0 0 10px rgba(157, 78, 221, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Award size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.02rem', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>Certifications</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--accent-cyan)', fontSize: '0.6rem' }}>●</span> Front-End Development (2024)
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--accent-cyan)', fontSize: '0.6rem' }}>●</span> Python for Data Science — YBI (2023)
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Skills Column */}
              <motion.div 
                variants={itemVariants}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>
                    Technical Stack
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    My core toolbox grouped by engineering domains.
                  </p>
                </div>

                {/* Categorized Skills Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {skillCategories.map((category) => (
                    <div key={category.title} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: category.color, letterSpacing: '1px', textTransform: 'uppercase' }}>
                        {category.title}
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {category.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            whileHover={{ 
                              borderColor: category.color,
                              boxShadow: `0 0 10px ${category.color}15`,
                              y: -2
                            }}
                            className="glass-panel"
                            style={{
                              fontSize: '0.82rem',
                              padding: '6px 14px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.05)',
                              color: 'rgba(255, 255, 255, 0.85)',
                              cursor: 'none',
                              transition: 'border-color 0.3s, box-shadow 0.3s',
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-details-layout {
            grid-template-columns: 1.1fr 0.9fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </section>
  );
}
