import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Terminal, Cpu, Sparkles, Code } from 'lucide-react';

// Canvas-based particles system (13 particles)
function CanvasParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 13;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2 + 0.3;
        this.speedX = Math.random() * 0.1 - 0.05;
        this.speedY = Math.random() * 0.1 - 0.05;
        this.opacity = Math.random() * 0.35 + 0.05;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = `rgba(0, 242, 254, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}

// Subtle floating status widget with mouse parallax
function TechWidget({ name, icon, positionStyle, delay, glow, isFar, mouseXSpring, mouseYSpring }) {
  const factor = isFar ? -15 : 20;
  const posX = useTransform(mouseXSpring, (v) => v * factor);
  const posY = useTransform(mouseYSpring, (v) => v * factor);

  const scale = isFar ? 0.8 : 1.0;
  const blurValue = isFar ? '1.5px' : '0px';

  return (
    <motion.div
      style={{
        position: 'absolute',
        ...positionStyle,
        x: posX,
        y: posY,
        pointerEvents: 'auto',
        filter: `blur(${blurValue})`,
        scale: scale,
        opacity: 0.7, // Target base opacity of 0.7
        zIndex: isFar ? 10 : 25,
      }}
      initial={{ opacity: 0, scale: scale * 0.8 }}
      animate={{ opacity: 0.7, scale: scale }}
      transition={{ duration: 1, delay: delay }}
    >
      <motion.div
        animate={{
          x: [0, 6, -6, 0],
          y: [0, -4, 4, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
        whileHover={{
          scale: 1.05,
          filter: "blur(0px)",
          opacity: 1.0,
          borderColor: 'rgba(0, 242, 254, 0.4)',
          boxShadow: `0 0 20px ${glow}`,
          y: -3
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 22px', // Upgraded padding
          borderRadius: '9999px', // Rounded pill shape
          backgroundColor: 'rgba(5, 5, 5, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)', // Upgraded border
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: '#ffffff',
          fontSize: '14px', // Upgraded font size
          fontWeight: 600,
          fontFamily: 'var(--font-mono)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          whiteSpace: 'nowrap',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        <span style={{ 
          color: name.includes('React') || name.includes('FastAPI') || name.includes('Python') 
            ? 'var(--accent-cyan)' 
            : 'var(--accent-purple)',
          display: 'flex',
          alignItems: 'center'
        }}>
          {icon}
        </span>
        <span>{name}</span>
        <span style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: name.includes('Active') || name.includes('Running') || name.includes('+') ? '#00f2fe' : 'rgba(255,255,255,0.4)',
        }} />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacityText = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 45, stiffness: 180 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const particlesX = useTransform(mouseXSpring, (v) => v * 12);
  const particlesY = useTransform(mouseXSpring, (v) => v * 12);
  const glowX = useTransform(mouseXSpring, (v) => v * 22);
  const glowY = useTransform(mouseYSpring, (v) => v * 22);

  // Limited to exactly 4 widgets with safe spacing: 80px from screen edge and 140px away from text
  const widgets = [
    { 
      name: 'Python +92%', 
      icon: <Terminal size={14} />, 
      positionStyle: { left: '6vw', top: '16%' }, 
      delay: 0.1, 
      glow: 'rgba(0, 242, 254, 0.15)', 
      isFar: true 
    },
    { 
      name: 'React +88%', 
      icon: <Code size={14} />, 
      positionStyle: { right: '6vw', top: '20%' }, 
      delay: 0.2, 
      glow: 'rgba(157, 78, 221, 0.15)', 
      isFar: false 
    },
    { 
      name: 'AI Active', 
      icon: <Sparkles size={14} />, 
      positionStyle: { left: '6vw', top: '48%' }, 
      delay: 0.3, 
      glow: 'rgba(0, 242, 254, 0.2)', 
      isFar: false 
    },
    { 
      name: 'FastAPI Core', 
      icon: <Cpu size={14} />, 
      positionStyle: { right: '8vw', bottom: '18%' }, 
      delay: 0.4, 
      glow: 'rgba(0, 242, 254, 0.15)', 
      isFar: true 
    },
  ];

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
      {/* Background slow breathing zoom wrapper */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        {/* Subtle Cyber Grid Overlay */}
        <div 
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
          }}
        />
      </motion.div>

      {/* Particles layer */}
      <motion.div style={{ x: particlesX, y: particlesY, position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
        <CanvasParticles />
      </motion.div>

      {/* SINGLE centerpiece glow behind title */}
      <motion.div 
        style={{
          x: glowX,
          y: glowY,
          position: 'absolute',
          top: '15%',
          left: '20%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.2) 0%, rgba(0, 242, 254, 0) 70%)',
          filter: 'blur(95px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Floating Status Orbiting Widgets */}
      <div className="widgets-layout-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }}>
        {widgets.map((widget) => (
          <TechWidget
            key={widget.name}
            name={widget.name}
            icon={widget.icon}
            positionStyle={widget.positionStyle}
            delay={widget.delay}
            glow={widget.glow}
            isFar={widget.isFar}
            mouseXSpring={mouseXSpring}
            mouseYSpring={mouseYSpring}
          />
        ))}
      </div>

      {/* Core Layout Container (Shifted 10-15% more towards center: padding-left: 16vw) */}
      <div 
        className="content-container" 
        style={{ 
          position: 'relative', 
          zIndex: 4, 
          width: '100%', 
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center', // Centered vertically for a cleaner, balanced whitespace layout
          justifyContent: 'flex-start',
          height: '100%',
          paddingLeft: '16vw' // Shifts text group towards screen center for cleaner balance
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ y: textY, opacity: opacityText }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', maxWidth: '700px' }}>
            
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
                marginBottom: '40px', // Badge → Title = 40px
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
              <span>AI & Full Stack Engineer</span>
            </div>

            {/* Redesigned 2-line Solid Typography Title (clamp(6rem, 9vw, 9rem), line-height .82, letter-spacing -7px) */}
            <h1
              style={{
                fontSize: 'clamp(4.2rem, 9vw, 9rem)', 
                fontWeight: 900,
                fontFamily: 'var(--font-display)',
                lineHeight: 0.82, 
                letterSpacing: 'clamp(-7px, -0.65vw, -3px)', 
                marginBottom: '40px', // Title → Role = 40px
                textTransform: 'uppercase',
                display: 'flex',
                flexDirection: 'column',
                color: '#ffffff',
              }}
            >
              <span>SHARAN</span>
              <span>KUMAR</span>
            </h1>

            {/* Separators Subtitle */}
            <h2
              style={{
                fontSize: 'clamp(0.82rem, 2.2vw, 1.15rem)',
                fontWeight: 400,
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)',
                letterSpacing: '0.5px',
                marginBottom: '30px', // Role → Description = 30px
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '10px 14px',
              }}
            >
              <span>Software Engineer</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>|</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>AI Developer</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>|</span>
              <span>Full Stack Builder</span>
            </h2>

            {/* Description */}
            <p
              style={{
                maxWidth: '520px',
                fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                marginBottom: '50px', // Description → Buttons = 50px
              }}
            >
              Building AI systems, interactive products and scalable experiences.
            </p>

            {/* Upgraded action buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  textDecoration: 'none',
                  padding: '16px 36px',
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
                View Work
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  textDecoration: 'none',
                  padding: '16px 36px',
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

          </div>
        </motion.div>
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

        @media (max-width: 991px) {
          .widgets-layout-overlay {
            display: none !important;
          }
          #home {
            padding: 0 24px 8vh 24px !important;
            justify-content: center !important;
          }
          #home .content-container {
            padding-left: 0 !important;
            justify-content: center !important;
          }
          #home h1 {
            font-size: clamp(3.2rem, 9vw, 5.5rem) !important;
            letter-spacing: -2px !important;
          }
        }
      `}</style>
    </section>
  );
}
