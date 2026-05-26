import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "sharansharry678@gmail.com"; 

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactLinks = [
    {
      name: 'Github',
      url: 'https://github.com/sharan7860',
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      label: 'github.com/sharan7860',
      color: '#ffffff'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/sharansharry2',
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      label: 'linkedin.com/in/sharansharry2',
      color: '#0a66c2'
    }
  ];

  return (
    <section id="contact" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', padding: '120px 0 60px' }}>
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
              03 // Connection
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, marginTop: '8px', textTransform: 'uppercase' }}>
              Let's Collaborate
            </h2>
          </div>

          {/* Contact details layout */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '60px',
              alignItems: 'center',
            }}
            className="contact-layout-grid"
          >
            {/* Text panel & email copier */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-display)', fontWeight: 600, color: '#ffffff', lineHeight: 1.25 }}>
                Have an idea or need an AI developer for your project?
              </h3>
              <p style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '550px' }}>
                I am open to engineering roles, machine learning research projects, and full-stack web builds. Get in touch via any of the links or email directly.
              </p>

              {/* Email Copy Card */}
              <div 
                className="glass-panel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  marginTop: '10px',
                  maxWidth: '450px',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <a href={`mailto:${emailAddress}`} style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={20} />
                  </a>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      color: 'var(--text-muted)', 
                      fontFamily: 'var(--font-mono)', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.5px' 
                    }}>
                      Direct Email
                    </span>
                    <a href={`mailto:${emailAddress}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                        {emailAddress}
                      </span>
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  className="email-copy-btn"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={18} style={{ color: '#27c93f' }} /> : <Copy size={18} />}
                </button>

                {/* Copy Status Notification */}
                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      style={{
                        position: 'absolute',
                        bottom: '-32px',
                        left: '24px',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#27c93f',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>✓ Email copied successfully!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Social Links List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {contactLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '24px 30px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.04)',
                    background: 'rgba(10, 10, 20, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'none',
                  }}
                  className="giant-contact-link glass-panel"
                  whileHover={{ x: 10 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div className="contact-icon-box" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}>
                      {link.icon}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: '#ffffff' }}>
                        {link.name}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {link.label}
                      </span>
                    </div>
                  </div>
                  <div className="arrow-box" style={{ color: 'var(--text-muted)', transition: 'transform 0.3s, color 0.3s' }}>
                    <ArrowRight size={22} />
                  </div>
                </motion.a>
              ))}
            </div>

          </div>

          {/* Minimal Footer (Removed all design inspiration/credits text) */}
          <div 
            style={{
              marginTop: '100px',
              paddingTop: '30px',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>© 2026 SHARAN KUMAR. ALL RIGHTS RESERVED.</span>
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-layout-grid {
            grid-template-columns: 1.05fr 0.95fr !important;
            gap: 80px !important;
          }
        }

        .email-copy-btn:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: var(--accent-cyan) !important;
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
        }

        .giant-contact-link:hover {
          border-color: var(--accent-cyan) !important;
          background: rgba(0, 242, 254, 0.02) !important;
          box-shadow: 0 10px 30px rgba(0, 242, 254, 0.05) !important;
        }

        .giant-contact-link:hover .contact-icon-box {
          color: var(--accent-cyan) !important;
        }

        .giant-contact-link:hover .arrow-box {
          color: var(--accent-cyan) !important;
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}
