'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

interface RandomOrbGlowProps {
  orbCount?: number;
  className?: string;
}

const colors = [
  'rgba(139, 69, 19, 0.15)',   // Brown
  'rgba(255, 165, 0, 0.15)',   // Orange
  'rgba(255, 215, 0, 0.15)',   // Gold
  'rgba(255, 192, 203, 0.15)', // Pink
  'rgba(138, 43, 226, 0.15)',  // Blue Violet
  'rgba(0, 191, 255, 0.15)',   // Deep Sky Blue
  'rgba(50, 205, 50, 0.15)',   // Lime Green
  'rgba(255, 20, 147, 0.15)',  // Deep Pink
];

export function RandomOrbGlow({ orbCount = 12, className = '' }: RandomOrbGlowProps) {
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const generateOrbs = () => {
      const newOrbs: Orb[] = [];
      for (let i = 0; i < orbCount; i++) {
        newOrbs.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 300 + 100, // 100-400px
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 20 + 15, // 15-35s
          delay: Math.random() * 5, // 0-5s delay
        });
      }
      setOrbs(newOrbs);
    };

    generateOrbs();
    
    // Regenerate orbs periodically for variety
    const interval = setInterval(generateOrbs, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, [orbCount]);

  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`} style={{ zIndex: -1 }}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(1px)',
          }}
          initial={{
            x: `${orb.x}vw`,
            y: `${orb.y}vh`,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: [
              `${orb.x}vw`,
              `${(orb.x + Math.random() * 40 - 20) % 100}vw`,
              `${(orb.x + Math.random() * 60 - 30) % 100}vw`,
              `${orb.x}vw`,
            ],
            y: [
              `${orb.y}vh`,
              `${(orb.y + Math.random() * 40 - 20) % 100}vh`,
              `${(orb.y + Math.random() * 60 - 30) % 100}vh`,
              `${orb.y}vh`,
            ],
            scale: [0, 1, 0.8, 1, 0],
            opacity: [0, 0.6, 0.8, 0.4, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Additional floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-white/10"
          style={{
            filter: 'blur(0.5px)',
          }}
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
          }}
          animate={{
            x: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
            ],
            y: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
            ],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}