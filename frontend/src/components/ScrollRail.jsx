import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const chapters = [
  { id: 'about', number: '01', label: 'Profile' },
  { id: 'experience', number: '02', label: 'Experience' },
  { id: 'console', number: '03', label: 'Stack' },
  { id: 'projects', number: '04', label: 'Work' },
  { id: 'contact', number: '05', label: 'Contact' },
];

export default function ScrollRail() {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] },
    );

    chapters.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="scroll-rail" aria-label="Portfolio sections">
      <span className="scroll-rail-label">Index</span>
      <div className="scroll-rail-track">
        {chapters.map((chapter) => {
          const active = activeId === chapter.id;
          return (
            <button
              className={`scroll-rail-item ${active ? 'is-active' : ''}`}
              key={chapter.id}
              onClick={() => document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' })}
              aria-label={`Go to ${chapter.label}`}
              aria-current={active ? 'step' : undefined}
            >
              <span className="scroll-rail-dot">{active && <motion.i layoutId="rail-dot" />}</span>
              <span className="scroll-rail-number">{chapter.number}</span>
              <span className="scroll-rail-name">{chapter.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
