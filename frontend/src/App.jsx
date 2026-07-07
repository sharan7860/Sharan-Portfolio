import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Console from './components/Console';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <>
      {/* Scroll Progress Bar Indicator */}
      <ScrollProgress />

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
        <Console />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;
