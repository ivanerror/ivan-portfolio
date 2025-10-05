'use client';

import { useTranslations } from 'next-intl';
import { GlowCard } from '@/components/ui/glow-card';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Education = () => {
  const t = useTranslations('education');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            {t('title')}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <GlowCard
            intensity="medium"
          >
            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('university')}
                  </h3>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="font-semibold text-xl text-gray-900 dark:text-white">
                    {t('degree')}
                  </h4>
                </div>
                <div className="ml-8">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300">
                    {t('gpa')}
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-medium">{t('location')}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-medium">{t('year')}</span>
                </div>
              </motion.div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
