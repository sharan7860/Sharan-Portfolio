import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollPosition = window.scrollY + 160;
      for (const link of navLinks) {
        const element = document.querySelector(link.href);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href.slice(1));
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href.slice(1));
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.75)' : 'rgba(5, 5, 5, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'background-color 0.3s, border-color 0.3s',
        }}
      >
        <div 
          style={{
            maxWidth: '1350px',
            margin: '0 auto',
            padding: '0 40px',
            height: '75px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            style={{
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '28px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-1px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ color: 'var(--accent-cyan)' }} className="terminal-prefix">&gt;_</span>
            <img 
              src="/profile.jpg" 
              alt="Sharan Kumar" 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--accent-cyan)',
                boxShadow: '0 0 12px rgba(0, 242, 254, 0.4)',
              }}
            />
            <span>SHARAN</span>
            <span className="blinking-cursor" style={{ color: 'var(--accent-cyan)' }}>|</span>
          </a>

          {/* Center Links */}
          <nav className="desktop-nav-menu" style={{ display: 'none' }}>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '36px', margin: 0, padding: 0 }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      style={{
                        position: 'relative',
                        textDecoration: 'none',
                        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                        fontSize: '0.88rem',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 500,
                        letterSpacing: '0.8px',
                        transition: 'color 0.3s ease',
                        padding: '6px 0',
                        textTransform: 'uppercase',
                      }}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          style={{
                            position: 'absolute',
                            bottom: '-4px',
                            left: '25%',
                            width: '50%',
                            height: '1.5px',
                            background: 'var(--accent-cyan)',
                            borderRadius: '2px',
                            boxShadow: '0 0 6px var(--accent-cyan)',
                          }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Button */}
          <div className="desktop-nav-cta" style={{ display: 'none' }}>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              style={{
                textDecoration: 'none',
                padding: '10px 24px',
                borderRadius: '30px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#ffffff',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.3s ease',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
              className="navbar-cta-btn"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              display: 'block',
              padding: '6px',
            }}
            className="mobile-nav-toggle"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '75px',
              left: 0,
              width: '100%',
              height: 'calc(100vh - 75px)',
              backgroundColor: 'rgba(5, 5, 5, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: '60px',
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.li key={link.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      style={{
                        textDecoration: 'none',
                        color: isActive ? 'var(--accent-cyan)' : '#ffffff',
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-display)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                );
              })}
              <li style={{ marginTop: '20px' }}>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  style={{
                    textDecoration: 'none',
                    padding: '12px 32px',
                    borderRadius: '30px',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: 'var(--bg-color)',
                    background: 'var(--accent-cyan)',
                    boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)',
                    border: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Get In Touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) {
          .desktop-nav-menu { display: block !important; }
          .desktop-nav-cta { display: block !important; }
          .mobile-nav-toggle { display: none !important; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .blinking-cursor {
          animation: blink 1.0s infinite;
        }

        .navbar-cta-btn:hover {
          border-color: var(--accent-cyan) !important;
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.2);
          transform: translateY(-1px);
        }
      `}</style>
    </>
  );
}
