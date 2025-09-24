'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AuroraBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function AuroraBackground({ 
  className = '', 
  intensity = 'medium' 
}: AuroraBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const intensitySettings = {
    low: { opacity: '0.3', blur: '120px' },
    medium: { opacity: '0.5', blur: '100px' },
    high: { opacity: '0.7', blur: '80px' }
  };

  const settings = intensitySettings[intensity];

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`} style={{ zIndex: -1 }}>
      {/* Primary Aurora Layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, rgba(120, 200, 255, ${settings.opacity}) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 30%, rgba(255, 100, 200, ${settings.opacity}) 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 40% 80%, rgba(100, 255, 150, ${settings.opacity}) 0%, transparent 50%),
            radial-gradient(ellipse 70% 80% at 70% 70%, rgba(255, 200, 100, ${settings.opacity}) 0%, transparent 50%)
          `,
          filter: `blur(${settings.blur})`,
        }}
        animate={{
          background: [
            `
              radial-gradient(ellipse 80% 50% at 20% 20%, rgba(120, 200, 255, ${settings.opacity}) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 30%, rgba(255, 100, 200, ${settings.opacity}) 0%, transparent 50%),
              radial-gradient(ellipse 100% 60% at 40% 80%, rgba(100, 255, 150, ${settings.opacity}) 0%, transparent 50%),
              radial-gradient(ellipse 70% 80% at 70% 70%, rgba(255, 200, 100, ${settings.opacity}) 0%, transparent 50%)
            `,
            `
              radial-gradient(ellipse 90% 60% at 30% 10%, rgba(150, 100, 255, ${settings.opacity}) 0%, transparent 50%),
              radial-gradient(ellipse 50% 60% at 90% 40%, rgba(100, 255, 200, ${settings.opacity}) 0%, transparent 50%),
              radial-gradient(ellipse 80% 50% at 20% 90%, rgba(255, 150, 100, ${settings.opacity}) 0%, transparent 50%),
              radial-gradient(ellipse 60% 90% at 60% 60%, rgba(200, 255, 100, ${settings.opacity}) 0%, transparent 50%)
            `,
            `
              radial-gradient(ellipse 70% 70% at 10% 40%, rgba(255, 150, 255, ${settings.opacity}) 0%, transparent 50%),
              radial-gradient(ellipse 80% 30% at 70% 20%, rgba(100, 200, 255, ${settings.opacity}) 0%, transparent 50%),
              radial-gradient(ellipse 60% 80% at 50% 70%, rgba(150, 255, 100, ${settings.opacity}) 0%, transparent 50%),
              radial-gradient(ellipse 90% 50% at 80% 80%, rgba(255, 200, 150, ${settings.opacity}) 0%, transparent 50%)
            `,
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Secondary Aurora Layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(45deg, rgba(100, 150, 255, ${parseFloat(settings.opacity) * 0.6}) 0%, transparent 25%, transparent 75%, rgba(255, 100, 150, ${parseFloat(settings.opacity) * 0.6}) 100%),
            linear-gradient(-45deg, rgba(150, 255, 100, ${parseFloat(settings.opacity) * 0.6}) 0%, transparent 25%, transparent 75%, rgba(255, 200, 100, ${parseFloat(settings.opacity) * 0.6}) 100%)
          `,
          filter: `blur(${parseInt(settings.blur) * 1.5}px)`,
        }}
        animate={{
          background: [
            `
              linear-gradient(45deg, rgba(100, 150, 255, ${parseFloat(settings.opacity) * 0.6}) 0%, transparent 25%, transparent 75%, rgba(255, 100, 150, ${parseFloat(settings.opacity) * 0.6}) 100%),
              linear-gradient(-45deg, rgba(150, 255, 100, ${parseFloat(settings.opacity) * 0.6}) 0%, transparent 25%, transparent 75%, rgba(255, 200, 100, ${parseFloat(settings.opacity) * 0.6}) 100%)
            `,
            `
              linear-gradient(135deg, rgba(200, 100, 255, ${parseFloat(settings.opacity) * 0.6}) 0%, transparent 25%, transparent 75%, rgba(100, 255, 200, ${parseFloat(settings.opacity) * 0.6}) 100%),
              linear-gradient(-135deg, rgba(255, 150, 100, ${parseFloat(settings.opacity) * 0.6}) 0%, transparent 25%, transparent 75%, rgba(100, 200, 255, ${parseFloat(settings.opacity) * 0.6}) 100%)
            `,
            `
              linear-gradient(225deg, rgba(150, 200, 255, ${parseFloat(settings.opacity) * 0.6}) 0%, transparent 25%, transparent 75%, rgba(255, 150, 200, ${parseFloat(settings.opacity) * 0.6}) 100%),
              linear-gradient(-225deg, rgba(200, 255, 150, ${parseFloat(settings.opacity) * 0.6}) 0%, transparent 25%, transparent 75%, rgba(255, 100, 100, ${parseFloat(settings.opacity) * 0.6}) 100%)
            `,
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 0deg at 30% 30%, rgba(255, 255, 255, 0.1) 0deg, transparent 60deg, transparent 300deg, rgba(255, 255, 255, 0.1) 360deg),
            conic-gradient(from 180deg at 70% 70%, rgba(255, 255, 255, 0.05) 0deg, transparent 60deg, transparent 300deg, rgba(255, 255, 255, 0.05) 360deg)
          `,
          filter: 'blur(2px)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.6)`,
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
            duration: Math.random() * 30 + 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}