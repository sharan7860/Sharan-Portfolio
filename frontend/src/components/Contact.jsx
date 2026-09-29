import { useState, useEffect, useRef } from 'react';
import { Mail, Copy, Check, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "sharansharry678@gmail.com"; 

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const context = gsap.context(() => {
      // Scroll reveals for contact sections
      gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1
        }
      }
    );

      gsap.fromTo(leftPanelRef.current,
      { opacity: 0, x: -50, filter: 'blur(5px)' },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 40%",
          scrub: 1
        }
      }
    );

      gsap.fromTo(rightPanelRef.current,
      { opacity: 0, x: 50, filter: 'blur(5px)' },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 40%",
          scrub: 1
        }
      }
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

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
    <section 
      id="contact" 
      ref={sectionRef} 
      style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '160px 0 60px' }}
    >
      <div className="content-container">
        
        {/* Section Header */}
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '60px', willChange: 'transform, opacity' }}>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.82rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
            05 // Connection
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
          {/* Left panel & email copier */}
          <div ref={leftPanelRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px', willChange: 'transform, opacity, filter' }}>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-display)', fontWeight: 600, color: '#ffffff', lineHeight: 1.25 }}>
              Have an idea or need an AI developer for your project?
            </h3>
            <p style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '550px' }}>
              I am open to engineering roles, machine learning research projects, and full-stack web builds. Get in touch via any of the links or email directly.
            </p>

            {/* Email Copy Card */}
            <div 
              className="glass-panel contact-email-card"
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
                    <span className="contact-email-address" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
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
              {copied && (
                <div
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
                </div>
              )}
            </div>
          </div>

          {/* Social Links List */}
          <div ref={rightPanelRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px', willChange: 'transform, opacity, filter' }}>
            {contactLinks.map((link) => (
              <a
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(10px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0px)';
                }}
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
              </a>
            ))}
          </div>

        </div>

        {/* Minimal Footer */}
        <div 
          style={{
            marginTop: '100px',
            paddingTop: '30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            textAlign: 'center',
          }}
        >
          <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '1px' }}>SHARAN KUMAR</div>
          <div style={{ letterSpacing: '1.5px', textTransform: 'uppercase' }}>Software Engineer · AI Trainer</div>
          <div>Built with React + Vite + Tailwind CSS</div>
          <div style={{ marginTop: '10px', fontSize: '0.78rem' }}>© 2026 ALL RIGHTS RESERVED</div>
        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-layout-grid {
            grid-template-columns: 1.05fr 0.95fr !important;
            gap: 80px !important;
          }
        }

        @media (max-width: 480px) {
          #contact { padding: 112px 0 48px !important; }
          .contact-email-card { align-items: flex-start !important; gap: 12px; padding: 16px !important; }
          .contact-email-card > div { min-width: 0; }
          .contact-email-address { display: block; max-width: 208px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: .78rem !important; }
          .giant-contact-link { padding: 18px !important; }
          .giant-contact-link > div:first-child { min-width: 0; gap: 13px !important; }
          .giant-contact-link span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
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
