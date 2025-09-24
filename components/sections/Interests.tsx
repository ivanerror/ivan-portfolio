'use client';

import { useTranslations } from 'next-intl';
import { GlowCard } from '@/components/ui/glow-card';
import { ParallaxElement } from '@/components/ui/parallax-background';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Interests = () => {
  const t = useTranslations('interests');
  const interests = t.raw('items') as string[];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="interests" className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <GlowCard
            glowColor="from-rose-400 via-pink-400 to-red-400"
            intensity="medium"
          >
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-3">
                <Heart className="h-8 w-8 text-red-500" />
                <span className="text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                  {t('title')}
                </span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Badge
                      variant="outline"
                      className="text-lg px-6 py-3 hover:bg-gradient-to-r hover:from-rose-100 hover:to-pink-100 dark:hover:from-rose-900/20 dark:hover:to-pink-900/20 transition-all duration-300 cursor-default border-rose-200 dark:border-rose-800 hover:border-rose-400 dark:hover:border-rose-600 hover:shadow-lg"
                    >
                      {interest}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Interests;