'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type GlowIntensity = 'low' | 'medium' | 'high';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  intensity?: GlowIntensity;
}

const intensityConfig: Record<GlowIntensity, { borderOpacity: number; scale: number; glowRadius: number }> = {
  low: {
    borderOpacity: 0.4,
    scale: 1.005,
    glowRadius: 120
  },
  medium: {
    borderOpacity: 0.6,
    scale: 1.008,
    glowRadius: 150
  },
  high: {
    borderOpacity: 0.8,
    scale: 1.012,
    glowRadius: 180
  }
};

export function GlowCard({
  children,
  className,
  borderRadius = 'rounded-xl',
  intensity = 'medium'
}: GlowCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    setIsHovered(true);

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setMousePosition({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const config = intensityConfig[intensity];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('relative group cursor-pointer', borderRadius, className)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={cn('absolute -inset-px pointer-events-none', borderRadius)}
            initial={{ opacity: 0 }}
            animate={{ opacity: config.borderOpacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div
              className='absolute top-0 left-0 right-0 h-px'
              style={{
                background: `radial-gradient(${config.glowRadius}px ellipse at ${mousePosition.x}px 0px, rgba(59, 130, 246, 1), rgba(168, 85, 247, 0.8), transparent 70%)`
              }}
            />
            <div
              className='absolute top-0 right-0 bottom-0 w-px'
              style={{
                background: `radial-gradient(${config.glowRadius}px ellipse at 0px ${mousePosition.y}px, rgba(59, 130, 246, 1), rgba(168, 85, 247, 0.8), transparent 70%)`
              }}
            />
            <div
              className='absolute bottom-0 left-0 right-0 h-px'
              style={{
                background: `radial-gradient(${config.glowRadius}px ellipse at ${mousePosition.x}px 0px, rgba(59, 130, 246, 1), rgba(168, 85, 247, 0.8), transparent 70%)`
              }}
            />
            <div
              className='absolute top-0 left-0 bottom-0 w-px'
              style={{
                background: `radial-gradient(${config.glowRadius}px ellipse at 0px ${mousePosition.y}px, rgba(59, 130, 246, 1), rgba(168, 85, 247, 0.8), transparent 70%)`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={cn(
          'relative overflow-hidden',
          borderRadius,
          'bg-white/[0.08] dark:bg-black/[0.08]',
          'backdrop-blur-xl backdrop-saturate-150',
          'border border-white/[0.15] dark:border-white/[0.08]',
          'shadow-xl shadow-black/[0.03] dark:shadow-black/[0.3]',
          'before:absolute before:inset-0 before:rounded-[inherit]',
          'before:bg-gradient-to-br before:from-white/[0.12] before:via-transparent before:to-transparent',
          'before:pointer-events-none',
          'p-6'
        )}
        whileHover={{
          scale: config.scale,
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)'
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
          boxShadow: { duration: 0.5 }
        }}
      >
        <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent' />

        <div className='relative z-10'>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
