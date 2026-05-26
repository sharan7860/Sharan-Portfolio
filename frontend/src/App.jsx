import React from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <>
      {/* Background Visual Enhancements */}
      <div className="grain-overlay" />
      <div className="cyber-grid" />
      <div className="glow-container">
        <div className="glow-spot glow-cyan" />
        <div className="glow-spot glow-purple" />
        <div className="glow-spot glow-center" />
      </div>

      {/* Award-style Interactive Custom Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar />

      {/* Content Layout Sections */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;
