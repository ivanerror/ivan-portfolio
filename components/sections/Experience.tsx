'use client';

import { useTranslations } from 'next-intl';
import { GlowCard } from '@/components/ui/glow-card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

type ExperienceRole = {
  title: string;
  achievements: string[];
};

type ExperienceItem = {
  position: string;
  company: string;
  type: string;
  location: string;
  period: string;
  roles: ExperienceRole[];
};

const Experience = () => {
  const t = useTranslations('experience');
  const experiences = t.raw('experiences') as ExperienceItem[];
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id='experience' className='py-16 px-4 sm:px-6 lg:px-8 relative'>
      <div className='container mx-auto max-w-4xl' ref={ref}>
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4'>
            {t('title')}
          </h2>
        </motion.div>

        <div className='space-y-8'>
          {experiences.map((experience, index) => (
            <motion.div
              // Using index for stable animation delay as data comes from static translations
              key={`${experience.company}-${experience.position}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <GlowCard intensity='medium'>
                <div className='space-y-6'>
                  <div className='flex items-start space-x-3'>
                    <div className='p-2 bg-primary/10 rounded-lg'>
                      <Briefcase className='h-6 w-6 text-primary' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-xl font-semibold mb-2'>
                        {experience.position}
                      </h3>
                      <div className='space-y-2'>
                        <h4 className='font-semibold text-lg text-foreground'>
                          {experience.company}
                        </h4>
                        <div className='flex flex-wrap gap-2'>
                          <Badge variant='secondary'>{experience.type}</Badge>
                        </div>
                        <div className='flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-muted-foreground'>
                          <div className='flex items-center space-x-1'>
                            <MapPin className='h-4 w-4' />
                            <span>{experience.location}</span>
                          </div>
                          <div className='flex items-center space-x-1'>
                            <Calendar className='h-4 w-4' />
                            <span>{experience.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-6'>
                    {experience.roles.map((role, roleIndex) => (
                      <div key={`${experience.company}-${role.title}-${roleIndex}`} className='space-y-3'>
                        {roleIndex > 0 && <Separator className='my-4' />}

                        <div>
                          <h5 className='font-semibold text-primary mb-3'>
                            {role.title}
                          </h5>
                          <ul className='space-y-2'>
                            {role.achievements.map((achievement, achievementIndex) => (
                              <li key={`${role.title}-${achievementIndex}`} className='flex items-start space-x-2'>
                                <span className='text-muted-foreground text-sm leading-relaxed'>
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
