'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface FloatingCursorProps {
  className?: string;
}

export function FloatingCursor({ className = '' }: FloatingCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners to the document
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference ${className}`}
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      >
        <motion.div
          className="w-full h-full bg-white rounded-full"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-40"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      >
        <motion.div
          className="w-full h-full bg-white rounded-full opacity-60"
          animate={{
            scale: isClicking ? 0.5 : 1,
            x: 12,
            y: 12,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 25,
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-30 mix-blend-difference"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      >
        <motion.div
          className="w-full h-full border border-white rounded-full"
          animate={{
            scale: isClicking ? 0.6 : isHovering ? 2 : 1,
            opacity: isHovering ? 0.8 : 0.3,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{
            x: -8,
            y: -8,
          }}
        />
      </motion.div>

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}