import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default');
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for cursor delay follower
  const springConfig = { damping: 35, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isHoverable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('hover-trigger') ||
        target.closest('.hover-trigger') ||
        target.getAttribute('role') === 'button';
        
      if (isHoverable) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Responsive cursor check
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mediaQuery.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* Outer Follower Circle */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 10000,
          borderRadius: '50%',
          borderStyle: 'solid',
          mixBlendMode: 'difference'
        }}
        animate={{
          width: cursorType === 'pointer' ? 56 : 22,
          height: cursorType === 'pointer' ? 56 : 22,
          backgroundColor: cursorType === 'pointer' ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0)',
          borderColor: cursorType === 'pointer' ? '#00f2fe' : 'rgba(255, 255, 255, 0.4)',
          borderWidth: cursorType === 'pointer' ? 2 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      />
      {/* Core Center Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 10001,
          borderRadius: '50%',
          width: '6px',
          height: '6px',
          backgroundColor: '#ffffff'
        }}
        animate={{
          scale: cursorType === 'pointer' ? 3.5 : 1,
          backgroundColor: cursorType === 'pointer' ? '#00f2fe' : '#ffffff',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      />
    </>
  );
}
