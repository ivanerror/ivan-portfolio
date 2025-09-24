'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function SmoothBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Create smooth color transitions based on scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      // Hero - Blue to Purple
      "linear-gradient(135deg, rgb(239 246 255) 0%, rgb(238 242 255) 50%, rgb(245 243 255) 100%)",
      // About - Purple to Indigo  
      "linear-gradient(135deg, rgb(245 243 255) 0%, rgb(238 242 255) 50%, rgb(240 249 255) 100%)",
      // Education - Indigo to Emerald
      "linear-gradient(135deg, rgb(240 249 255) 0%, rgb(240 253 250) 50%, rgb(236 253 245) 100%)",
      // Experience - Emerald to Orange
      "linear-gradient(135deg, rgb(236 253 245) 0%, rgb(255 251 235) 50%, rgb(255 247 237) 100%)",
      // Skills - Orange to Violet
      "linear-gradient(135deg, rgb(255 247 237) 0%, rgb(253 244 255) 50%, rgb(250 245 255) 100%)",
      // Contact - Violet to Cyan
      "linear-gradient(135deg, rgb(250 245 255) 0%, rgb(236 254 255) 50%, rgb(240 249 255) 100%)"
    ]
  );

  const backgroundColorDark = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      // Hero - Dark Blue to Purple
      "linear-gradient(135deg, rgb(15 23 42) 0%, rgb(30 27 75) 50%, rgb(59 7 100) 100%)",
      // About - Purple to Indigo
      "linear-gradient(135deg, rgb(59 7 100) 0%, rgb(30 27 75) 50%, rgb(12 74 110) 100%)",
      // Education - Indigo to Emerald
      "linear-gradient(135deg, rgb(12 74 110) 0%, rgb(6 78 59) 50%, rgb(20 83 45) 100%)",
      // Experience - Emerald to Orange
      "linear-gradient(135deg, rgb(20 83 45) 0%, rgb(120 53 15) 50%, rgb(154 52 18) 100%)",
      // Skills - Orange to Violet
      "linear-gradient(135deg, rgb(154 52 18) 0%, rgb(88 28 135) 50%, rgb(109 40 217) 100%)",
      // Contact - Violet to Cyan
      "linear-gradient(135deg, rgb(109 40 217) 0%, rgb(22 78 99) 50%, rgb(12 74 110) 100%)"
    ]
  );

  // Floating orbs that move with scroll
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const orb1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.6, 0.4, 0.2]);
  const orb2Opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 0.5, 0.6, 0.3]);
  const orb3Opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.1, 0.4, 0.5, 0.2]);

  return (
    <div ref={ref} className="fixed inset-0 -z-10">
      {/* Main Background Gradient */}
      <motion.div
        className="absolute inset-0 light-bg"
        style={{ background: backgroundColor }}
      />
      
      <motion.div
        className="absolute inset-0 dark-bg dark:opacity-100 opacity-0 transition-opacity duration-300"
        style={{ background: backgroundColorDark }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          y: orb1Y,
          opacity: orb1Opacity,
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)"
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{
          y: orb2Y,
          opacity: orb2Opacity,
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 100%)"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full blur-3xl"
        style={{
          y: orb3Y,
          opacity: orb3Opacity,
          background: "radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)"
        }}
      />
    </div>
  );
}