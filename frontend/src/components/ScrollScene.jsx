import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollScene({ children }) {
  const sceneRef = useRef(null);
  const sweepRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      gsap.fromTo(sceneRef.current,
        { opacity: 0.42, y: 72, scale: 0.972 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sceneRef.current,
            start: 'top 88%',
            end: 'top 38%',
            scrub: 0.8,
          },
        },
      );

      gsap.fromTo(sweepRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: sceneRef.current,
            start: 'top 85%',
            end: 'top 35%',
            scrub: true,
          },
        },
      );
    }, sceneRef);

    return () => context.revert();
  }, []);

  return (
    <div className="scroll-scene" ref={sceneRef}>
      <span className="scroll-scene-sweep" ref={sweepRef} aria-hidden="true" />
      {children}
    </div>
  );
}
