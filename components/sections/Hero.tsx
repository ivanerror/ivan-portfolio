'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/glow-card';
import { ParallaxElement } from '@/components/ui/parallax-background';
import { Download, Mail, MapPin, Phone } from 'lucide-react';

const Hero = () => {
  const t = useTranslations('hero');

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/CV-Ivan-Setyaputra.pdf';
    link.download = 'CV-Gabriel-Ivan-Setyaputra.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactMe = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Profile Image with Enhanced Design */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="w-40 h-40 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full p-1 shadow-2xl">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    GI
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300" />
            </div>
          </div>

          {/* Name and Title with Enhanced Typography */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                {t('name')}
              </span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('title')}
            </h2>
          </div>

          {/* Contact Info with Modern Design */}
          <div className="flex flex-wrap justify-center gap-6 my-8">
            {[
              { icon: MapPin, text: t('location') },
              { icon: Mail, text: 'ivangabriel68@gmail.com' },
              { icon: Phone, text: '+62 822-1347-1166' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <item.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Bio with Immersive Glow Effect */}
          <GlowCard
            className="max-w-4xl mx-auto"
            glowColor="from-blue-400 via-purple-400 to-pink-400"
            intensity="medium"
          >
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('bio')}
            </p>
          </GlowCard>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              onClick={handleDownloadCV}
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
              <Download className="h-5 w-5 mr-2" />
              <span className="font-semibold">{t('downloadCV')}</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleContactMe}
              className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 transform hover:scale-105 transition-all duration-300"
            >
              <Mail className="h-5 w-5 mr-2" />
              <span className="font-semibold">{t('contactMe')}</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full p-1">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;