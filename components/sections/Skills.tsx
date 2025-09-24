'use client';

import { useTranslations } from 'next-intl';
import { GlowCard } from '@/components/ui/glow-card';
import { ParallaxElement } from '@/components/ui/parallax-background';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Code, Globe, Database, Smartphone, Server, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Skills = () => {
  const t = useTranslations('skills');
  const languagesT = useTranslations('languages');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const skillCategories = [
    {
      icon: Smartphone,
      key: 'mobile',
      skills: ['flutter', 'dart']
    },
    {
      icon: Globe,
      key: 'web',
      skills: ['react', 'javascript', 'typescript', 'webEngineering']
    },
    {
      icon: Server,
      key: 'backend',
      skills: ['php', 'laravel', 'nodejs', 'express']
    },
    {
      icon: Database,
      key: 'database',
      skills: ['mongodb']
    }
  ];

  const languageSkills = ['english', 'indonesian'];

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
            {t('title')}
          </h2>
        </motion.div>

        {/* Technical Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <GlowCard
            glowColor="from-violet-400 via-purple-400 to-fuchsia-400"
            intensity="medium"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <span className="text-lg font-semibold">Technical Skills</span>
              </div>
              
              <div className="space-y-6">
                {skillCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.key} className="space-y-3">
                      {index > 0 && <Separator />}
                      <div className="flex items-center space-x-3 mb-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-foreground">
                          {t(`categories.${category.key}`)}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="hover:bg-primary/20 transition-colors cursor-default"
                          >
                            {t(`items.${skill}`)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Language Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlowCard
            glowColor="from-pink-400 via-rose-400 to-red-400"
            intensity="medium"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Languages className="h-5 w-5" />
                <span className="text-lg font-semibold">{languagesT('title')}</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {languageSkills.map((language) => (
                  <Badge
                    key={language}
                    variant="outline"
                    className="hover:bg-primary/20 transition-colors cursor-default"
                  >
                    {languagesT(`items.${language}`)}
                  </Badge>
                ))}
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;