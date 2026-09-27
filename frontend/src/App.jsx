import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Console from './components/Console';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import ScrollRail from './components/ScrollRail';
import ScrollScene from './components/ScrollScene';

function App() {
  return (
    <>
      {/* Scroll Progress Bar Indicator */}
      <ScrollProgress />
      <ScrollRail />

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
        <ScrollScene><About /></ScrollScene>
        <ScrollScene><Experience /></ScrollScene>
        <ScrollScene><Console /></ScrollScene>
        <Projects />
        <ScrollScene><Contact /></ScrollScene>
      </main>
    </>
  );
}

export default App;
