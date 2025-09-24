'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';

interface Star {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

export function TravelInSpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [stars, setStars] = useState<Star[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

  // Color palettes for different sections - Dark theme
  const darkColorPalettes = [
    ['#1a0033', '#330066', '#4d0099', '#6600cc', '#7f00ff'], // Deep purple
    ['#000033', '#001166', '#002299', '#0033cc', '#0044ff'], // Deep blue
    ['#330033', '#660066', '#990099', '#cc00cc', '#ff00ff'], // Magenta
    ['#003333', '#006666', '#009999', '#00cccc', '#00ffff'], // Cyan
    ['#333300', '#666600', '#999900', '#cccc00', '#ffff00'], // Yellow
  ];

  // Color palettes for different sections - Light theme
  const lightColorPalettes = [
    ['#e6ccff', '#d9b3ff', '#cc99ff', '#bf80ff', '#b366ff'], // Light purple
    ['#cce6ff', '#99d6ff', '#66c7ff', '#33b8ff', '#00aaff'], // Light blue
    ['#ffccf2', '#ff99e6', '#ff66d9', '#ff33cc', '#ff00bf'], // Light pink
    ['#ccffff', '#99f2f2', '#66e6e6', '#33d9d9', '#00cccc'], // Light cyan
    ['#ffffcc', '#fff299', '#ffe666', '#ffd933', '#ffcc00'], // Light yellow
  ];

  // Get current color palettes based on theme
  const colorPalettes = theme === 'light' ? lightColorPalettes : darkColorPalettes;

  const currentPalette = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1, 2, 3, 4]
  );

  // Initialize stars
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 800; i++) {
        newStars.push({
          id: i,
          x: (Math.random() - 0.5) * 2000,
          y: (Math.random() - 0.5) * 2000,
          z: Math.random() * 1000,
          size: Math.random() * 5 + 1, // Increased from 3 + 0.3 to 5 + 1
          speed: Math.random() * 3 + 0.3,
          opacity: Math.random() * 0.8 + 0.4, // Increased from 0.9 + 0.1 to 0.8 + 0.4
          color: colorPalettes[0][Math.floor(Math.random() * colorPalettes[0].length)]
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Initialize particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: (Math.random() - 0.5) * 1000,
          y: (Math.random() - 0.5) * 1000,
          z: Math.random() * 500,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          vz: Math.random() * 3 + 1,
          size: Math.random() * 3 + 1,
          life: Math.random() * 100,
          maxLife: Math.random() * 100 + 50,
          color: colorPalettes[0][Math.floor(Math.random() * colorPalettes[0].length)]
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with space background - theme aware
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      
      // Theme-aware background gradient
      if (theme === 'light') {
        gradient.addColorStop(0, 'rgba(240, 245, 255, 0.95)');
        gradient.addColorStop(1, 'rgba(220, 230, 250, 1)');
      } else {
        gradient.addColorStop(0, 'rgba(10, 5, 25, 0.9)');
        gradient.addColorStop(1, 'rgba(5, 0, 15, 1)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Get current palette index
      const paletteIndex = Math.floor(currentPalette.get()) || 0;
      const currentColors = colorPalettes[paletteIndex] || colorPalettes[0];

      // Draw stars
      stars.forEach((star) => {
        // Update star position
        star.z -= star.speed;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.color = currentColors[Math.floor(Math.random() * currentColors.length)];
        }

        // Project 3D to 2D
        const x = (star.x / star.z) * canvas.width + canvas.width / 2;
        const y = (star.y / star.z) * canvas.height + canvas.height / 2;
        const size = (1 - star.z / 1000) * star.size;

        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height && size > 0) {
          // Add glow effect for stars
          ctx.save();
          ctx.shadowColor = star.color;
          ctx.shadowBlur = size * 3;
          ctx.globalAlpha = star.opacity * (1 - star.z / 1000) * 0.8;
          
          // Draw main star
          ctx.beginPath();
          ctx.fillStyle = star.color;
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw brighter inner core
          ctx.globalAlpha = star.opacity * (1 - star.z / 1000);
          ctx.beginPath();
          ctx.fillStyle = '#ffffff';
          ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();

          // Add enhanced star trail effect
          ctx.beginPath();
          const trailX = (star.x / (star.z + 50)) * canvas.width + canvas.width / 2;
          const trailY = (star.y / (star.z + 50)) * canvas.height + canvas.height / 2;
          
          // Create gradient for trail
          const trailGradient = ctx.createLinearGradient(x, y, trailX, trailY);
          trailGradient.addColorStop(0, star.color);
          trailGradient.addColorStop(1, 'transparent');
          
          ctx.strokeStyle = trailGradient;
          ctx.globalAlpha = 0.6 * (1 - star.z / 1000); // Increased from 0.3
          ctx.lineWidth = size * 0.8; // Increased from size / 2
          ctx.moveTo(x, y);
          ctx.lineTo(trailX, trailY);
          ctx.stroke();
        }
      });

      // Draw particles
      particles.forEach((particle) => {
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;
        particle.life++;

        if (particle.life > particle.maxLife) {
          particle.x = (Math.random() - 0.5) * 1000;
          particle.y = (Math.random() - 0.5) * 1000;
          particle.z = 500;
          particle.life = 0;
          particle.color = currentColors[Math.floor(Math.random() * currentColors.length)];
        }

        // Project 3D to 2D
        const x = (particle.x / particle.z) * canvas.width + canvas.width / 2;
        const y = (particle.y / particle.z) * canvas.height + canvas.height / 2;
        const size = (1 - particle.z / 500) * particle.size;
        const opacity = 1 - particle.life / particle.maxLife;

        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height && size > 0) {
          ctx.beginPath();
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = opacity * 0.8;
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [stars, particles, currentPalette, theme]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Canvas for space animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ background: 'transparent' }}
      />
      
      {/* Additional floating elements with random movement */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background: theme === 'light'
            ? "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)"
            : "radial-gradient(circle, rgba(127, 0, 255, 0.3) 0%, rgba(68, 0, 204, 0.2) 50%, transparent 100%)",
        }}
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          opacity: [0.1, 0.3, 0.15, 0.25, 0.1],
          rotate: [0, 360],
          x: [0, 100, -80, 120, -50, 0],
          y: [0, -60, 90, -40, 70, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full opacity-8"
        style={{
          background: theme === 'light'
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 50%, transparent 100%)"
            : "radial-gradient(circle, rgba(0, 68, 255, 0.3) 0%, rgba(0, 34, 204, 0.2) 50%, transparent 100%)",
        }}
        animate={{
          scale: [1.2, 1, 1.4, 0.8, 1.2],
          opacity: [0.08, 0.25, 0.12, 0.3, 0.08],
          rotate: [360, 0],
          x: [0, -90, 110, -70, 80, 0],
          y: [0, 80, -50, 100, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-12"
        style={{
          background: theme === 'light'
            ? "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(219, 39, 119, 0.1) 50%, transparent 100%)"
            : "radial-gradient(circle, rgba(255, 0, 255, 0.3) 0%, rgba(204, 0, 204, 0.2) 50%, transparent 100%)",
        }}
        animate={{
          scale: [1, 1.3, 0.7, 1.5, 1],
          opacity: [0.12, 0.4, 0.18, 0.35, 0.12],
          rotate: [0, -360],
          x: [0, -120, 90, -60, 130, 0],
          y: [0, -70, -110, 80, -40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Nebula effects */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: theme === 'light'
            ? `
              radial-gradient(ellipse at 20% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
              radial-gradient(ellipse at 40% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)
            `
            : `
              radial-gradient(ellipse at 20% 50%, rgba(127, 0, 255, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(0, 68, 255, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 40% 80%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)
            `
        }}
      />
    </div>
  );
}