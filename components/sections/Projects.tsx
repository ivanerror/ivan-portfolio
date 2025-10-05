'use client';

import { useTranslations } from 'next-intl';
import { GlowCard } from '@/components/ui/glow-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Code, Smartphone, Globe, Database, Check } from 'lucide-react';

const Projects = () => {
  const t = useTranslations('projects');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 'grab-mex-app',
      title: t('projects.grabMexApp.title'),
      description: t('projects.grabMexApp.description'),
      image: '/projects/grab-mex.jpg',
      technologies: ['Flutter', 'Dart', 'WebView', 'JSON SDUI', 'AI Integration'],
      category: 'mobile',
      achievements: [
        t('projects.grabMexApp.achievements.0'),
        t('projects.grabMexApp.achievements.1'),
        t('projects.grabMexApp.achievements.2')
      ],
      links: {
        demo: 'https://play.google.com/store/apps/details?id=com.grab.merchant&hl=en',
      }
    },
    {
      id: 'grab-pos',
      title: t('projects.grabPos.title'),
      description: t('projects.grabPos.description'),
      image: '/projects/grab-pos.jpg',
      technologies: ['Flutter', 'React.js', 'TypeScript', 'QR Code', 'Design System'],
      category: 'fullstack',
      achievements: [
        t('projects.grabPos.achievements.0'),
        t('projects.grabPos.achievements.1'),
        t('projects.grabPos.achievements.2')
      ],
      links: {
        demo: 'https://hubbopos.com/my',
      }
    },
    {
      id: 'crm-system',
      title: t('projects.crmSystem.title'),
      description: t('projects.crmSystem.description'),
      image: '/projects/crm-system.jpg',
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT'],
      category: 'fullstack',
      achievements: [
        t('projects.crmSystem.achievements.0'),
        t('projects.crmSystem.achievements.1'),
        t('projects.crmSystem.achievements.2')
      ],
      links: {
        github: 'https://github.com/ivanerror',
      }
    },
    {
      id: 'portfolio-website',
      title: t('projects.portfolio.title'),
      description: t('projects.portfolio.description'),
      image: '/projects/portfolio.jpg',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'next-intl'],
      category: 'web',
      achievements: [
        t('projects.portfolio.achievements.0'),
        t('projects.portfolio.achievements.1'),
        t('projects.portfolio.achievements.2')
      ],
      links: {
        demo: 'https://ivanerror.is-a.dev/',
        github: 'https://github.com/ivanerror/ivan-portfolio',
      }
    },
    {
      id: 'streamq',
      title: t('projects.streamq.title'),
      description: t('projects.streamq.description'),
      image: '/projects/streamq.svg',
      technologies: ['Python', 'Tkinter', 'yt-dlp', 'FFmpeg', 'Threading', 'GUI Development'],
      category: 'fullstack',
      achievements: [
        t('projects.streamq.achievements.0'),
        t('projects.streamq.achievements.1'),
        t('projects.streamq.achievements.2')
      ],
      links: {
        github: 'https://github.com/ivanerror/StreamQ',
      }
    },
  ];

  const categories = [
    { id: 'all', name: t('categories.all'), icon: Code },
    { id: 'mobile', name: t('categories.mobile'), icon: Smartphone },
    { id: 'web', name: t('categories.web'), icon: Globe },
    { id: 'fullstack', name: t('categories.fullstack'), icon: Database }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mobile': return 'from-blue-500 to-cyan-500';
      case 'web': return 'from-green-500 to-emerald-500';
      case 'fullstack': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryItem = categories.find(cat => cat.id === category);
    return categoryItem ? categoryItem.icon : Code;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative min-h-screen">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {projects.map((project, index) => {
            const CategoryIcon = getCategoryIcon(project.category);
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <GlowCard
                  intensity="medium"
                  className="h-full"
                >
                  <div className="space-y-6">
                    {/* Project Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 bg-gradient-to-br ${getCategoryColor(project.category)} rounded-xl shadow-lg`}>
                          <CategoryIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {project.title}
                          </h3>
                          <Badge variant="secondary" className="mt-1">
                            {categories.find(cat => cat.id === project.category)?.name}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Project Description */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {t('technologies')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {t('keyAchievements')}
                      </h4>
                      <ul className="space-y-1">
                        {project.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      {project.links.demo && (
                        <Button
                          asChild
                          size="sm"
                          className={`bg-gradient-to-r ${getCategoryColor(project.category)} text-white hover:shadow-lg transition-all duration-300`}
                        >
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>{t('viewProject')}</span>
                          </a>
                        </Button>
                      )}
                      {project.links.github && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                        >
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2"
                          >
                            <Github className="h-4 w-4" />
                            <span>{t('viewCode')}</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            {t('interestedInWorking')}
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-300"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                // If we're on the projects page, redirect to home with contact hash
                window.location.href = '/#contact';
              }
            }}
          >
            {t('getInTouch')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
