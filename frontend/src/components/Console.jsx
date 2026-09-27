import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity } from 'lucide-react';

export default function Console() {
  const [logs, setLogs] = useState([
    "Initializing Sharan Kumar Portfolio CLI...",
    "System check: HEALTHY",
    "Loading runtime dependencies...",
  ]);

  const [activeTech, setActiveTech] = useState({
    React: { status: "ACTIVE", value: 100 },
    TypeScript: { status: "ACTIVE", value: 100 },
    FastAPI: { status: "LISTENING", value: 100 },
    Python: { status: "ACTIVE", value: 100 },
    TensorFlow: { status: "PROCESSING", value: 92 },
    Playwright: { status: "TESTING", value: 85 },
    Docker: { status: "DEPLOYED", value: 94 },
    Firebase: { status: "SECURED", value: 91 }
  });
  const [selectedTech, setSelectedTech] = useState('Python');

  const techDetails = {
    React: 'Interface systems, responsive layouts, and interaction design.',
    TypeScript: 'Type-safe application logic and maintainable frontend architecture.',
    FastAPI: 'Fast, documented service layers and REST API design.',
    Python: 'Automation, machine-learning workflows, data pipelines, and backend systems.',
    TensorFlow: 'Forecasting experiments and model-backed product features.',
    Playwright: 'Browser automation, end-to-end testing, and resilient workflows.',
    Docker: 'Repeatable local and production environments for dependable delivery.',
    Firebase: 'Authentication and managed application services.',
  };

  const logContainerRef = useRef(null);

  // Auto-scrolling logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulate console logs & values
  useEffect(() => {
    const mockLogs = [
      "[SUCCESS] React Virtual DOM initialized in 12ms",
      "[INFO] FastAPI gateway router listening on port 8000",
      "[MODEL] TensorFlow loaded LSTM model weights (98.6% accuracy)",
      "[RUNNING] Playwright executing browser automation workers",
      "[SUCCESS] AI code evaluation suite passed edge-case review",
      "[SUCCESS] TypeScript assets compiled successfully in 280ms",
      "[ALERT] New user application parsed on Sonit Brilliance",
      "[SUCCESS] Firebase authentication initialized",
      "[INFO] Vercel & Render production deployments: ACTIVE",
      "[INFO] Docker service health and Firebase authentication verified",
      "[INFO] Fetching real-time market data indexes...",
      "[SUCCESS] Clean Architecture checklist verified"
    ];

    const interval = setInterval(() => {
      // Add random log
      const randomLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev.slice(-30), `[${timestamp}] ${randomLog}`]);

      // Randomly fluctuate TensorFlow and Playwright values
      setActiveTech((prev) => {
        const tfVal = Math.min(100, Math.max(80, prev.TensorFlow.value + (Math.random() * 8 - 4)));
        const pwVal = Math.min(100, Math.max(70, prev.Playwright.value + (Math.random() * 10 - 5)));
        
        return {
          ...prev,
          TensorFlow: { 
            status: tfVal === 100 ? "ACTIVE" : "PROCESSING", 
            value: Math.round(tfVal) 
          },
          Playwright: { 
            status: pwVal === 100 ? "IDLE" : "RUNNING_TESTS", 
            value: Math.round(pwVal) 
          }
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="console" style={{ padding: '100px 0', backgroundColor: 'rgba(5, 5, 8, 0.3)' }}>
      <div className="content-container">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.82rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
            03 // Runtime
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, marginTop: '8px', textTransform: 'uppercase' }}>
            Engineering Console
          </h2>
        </div>

        {/* Console Box */}
        <div 
          className="glass-panel"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'rgba(6, 6, 12, 0.85)',
            border: '1px solid rgba(0, 242, 254, 0.1)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 242, 254, 0.05)',
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
          }}
        >
          {/* Console Header */}
          <div 
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(255, 255, 255, 0.01)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-cyan)' }}>
              <Terminal size={16} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                system_runtime_logs
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                width: '6px', 
                height: '6px', 
                borderRadius: '50%', 
                backgroundColor: '#27c93f',
                boxShadow: '0 0 8px #27c93f',
                animation: 'pulseGlow 2s infinite'
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#27c93f' }}>
                ONLINE
              </span>
            </div>
          </div>

          {/* Console Layout Grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
            }}
            className="console-body-grid"
          >
            {/* System Status Metrics */}
            <div 
              style={{
                padding: '30px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '24px',
              }}
            >
              {Object.entries(activeTech).map(([name, data]) => (
                <button
                  key={name} 
                  type="button"
                  onClick={() => setSelectedTech(name)}
                  aria-pressed={selectedTech === name}
                  className={`console-tech-card ${selectedTech === name ? 'is-selected' : ''}`}
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '10px',
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.03)',
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'left',
                    cursor: 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                      {name}
                    </span>
                    <span style={{ 
                      fontSize: '0.68rem', 
                      fontFamily: 'var(--font-mono)', 
                      color: data.status === 'ACTIVE' || data.status === 'LISTENING' ? '#27c93f' : 'var(--accent-purple)',
                      fontWeight: 'bold'
                    }}>
                      {data.status}
                    </span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div style={{ position: 'relative', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div 
                      style={{ 
                        height: '100%', 
                        background: name === 'TensorFlow' || name === 'Playwright' 
                          ? 'var(--accent-purple)' 
                          : 'var(--accent-cyan)',
                        borderRadius: '3px'
                      }}
                      animate={{ width: `${data.value}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    <span>LOAD_CAP</span>
                    <span>{data.value}%</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="console-focus-panel">
              <Activity size={18} />
              <div>
                <span>Selected module</span>
                <strong>{selectedTech}</strong>
                <p>{techDetails[selectedTech]}</p>
              </div>
              <span className="console-focus-hint">Click a module to inspect</span>
            </div>

            {/* Logs Area */}
            <div 
              ref={logContainerRef}
              style={{
                height: '240px',
                padding: '24px 30px',
                overflowY: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.7)',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                scrollBehavior: 'smooth',
              }}
            >
              {logs.map((log, idx) => (
                <div key={idx} style={{ 
                  marginBottom: '6px',
                  color: log.includes('[SUCCESS]') 
                    ? '#27c93f' 
                    : log.includes('[MODEL]') || log.includes('[RUNNING]')
                    ? 'var(--accent-purple)'
                    : 'rgba(255, 255, 255, 0.7)'
                }}>
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
