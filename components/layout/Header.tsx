'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Menu, X, Globe } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { key: 'about', href: '#about' },
    { key: 'education', href: '#education' },
    { key: 'experience', href: '#experience' },
    { key: 'skills', href: '#skills' },
    { key: 'contact', href: '#contact' },
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  ];

  // Color palettes matching the space background - Dark theme
  const darkColorPalettes = [
    ['#7f00ff', '#6600cc', '#4d0099'], // Deep purple
    ['#0044ff', '#0033cc', '#002299'], // Deep blue
    ['#ff00ff', '#cc00cc', '#990099'], // Magenta
    ['#00ffff', '#00cccc', '#009999'], // Cyan
    ['#ffff00', '#cccc00', '#999900'], // Yellow
  ];

  // Color palettes matching the space background - Light theme
  const lightColorPalettes = [
    ['#b366ff', '#bf80ff', '#cc99ff'], // Light purple
    ['#00aaff', '#33b8ff', '#66c7ff'], // Light blue
    ['#ff00bf', '#ff33cc', '#ff66d9'], // Light pink
    ['#00cccc', '#33d9d9', '#66e6e6'], // Light cyan
    ['#ffcc00', '#ffd933', '#ffe666'], // Light yellow
  ];

  // Get current color palettes based on theme
  const colorPalettes = theme === 'light' ? lightColorPalettes : darkColorPalettes;

  // Transform scroll to palette index
  const currentPaletteIndex = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1, 2, 3, 4]
  );

  // Get current accent color
  const getCurrentAccentColor = () => {
    if (!mounted) return theme === 'light' ? '#b366ff' : '#7f00ff';
    const index = Math.floor(currentPaletteIndex.get()) || 0;
    return colorPalettes[index]?.[0] || colorPalettes[0][0];
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLang = () => setIsLangOpen(!isLangOpen);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold">
                Gabriel Ivan
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: theme === 'light'
          ? 'linear-gradient(135deg, rgba(240, 245, 255, 0.1) 0%, rgba(220, 230, 250, 0.15) 100%)'
          : 'linear-gradient(135deg, rgba(10, 5, 25, 0.3) 0%, rgba(5, 0, 15, 0.4) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: theme === 'light'
          ? `1px solid rgba(147, 51, 234, 0.1)`
          : `1px solid rgba(127, 0, 255, 0.2)`,
        boxShadow: theme === 'light'
          ? '0 8px 32px rgba(147, 51, 234, 0.05)'
          : '0 8px 32px rgba(127, 0, 255, 0.1)',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(90deg, ${getCurrentAccentColor()}15 0%, transparent 50%, ${getCurrentAccentColor()}10 100%)`,
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/">
              <Image
                src={theme === 'dark' ? '/logo/dark.png' : '/logo/light.png'}
                alt="Gabriel Ivan Logo"
                width={120}
                height={48}
                className="object-contain"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group"
                  style={{
                    color: theme === 'light' ? '#374151' : '#d1d5db',
                  }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: `0 0 10px ${getCurrentAccentColor()}60`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  {t(item.key)}

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${getCurrentAccentColor()}10 0%, transparent 100%)`,
                      border: `1px solid ${getCurrentAccentColor()}30`,
                      boxShadow: `0 0 15px ${getCurrentAccentColor()}20`,
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Theme Toggle, Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle with space styling */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ThemeToggle />
            </motion.div>

            {/* Language Switcher with space styling */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLang}
                  className="flex items-center space-x-1 border-opacity-30 hover:border-opacity-60 transition-all duration-300"
                  style={{
                    borderColor: getCurrentAccentColor(),
                    backgroundColor: `${getCurrentAccentColor()}10`,
                    color: theme === 'light' ? '#374151' : '#d1d5db',
                  }}
                >
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {languages.find(lang => lang.code === locale)?.flag}
                  </span>
                </Button>
              </motion.div>

              {isLangOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 overflow-hidden"
                  style={{
                    background: theme === 'light'
                      ? 'rgba(255, 255, 255, 0.95)'
                      : 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${getCurrentAccentColor()}30`,
                    boxShadow: `0 8px 32px ${getCurrentAccentColor()}20`,
                  }}
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={pathname}
                      locale={lang.code}
                      className="flex items-center space-x-2 px-4 py-2 text-sm transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: locale === lang.code
                          ? `${getCurrentAccentColor()}20`
                          : 'transparent',
                        color: theme === 'light' ? '#374151' : '#d1d5db',
                      }}
                      onClick={() => setIsLangOpen(false)}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Mobile menu button with space styling */}
            <div className="md:hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                  className="border-opacity-30 hover:border-opacity-60 transition-all duration-300"
                  style={{
                    borderColor: getCurrentAccentColor(),
                    backgroundColor: `${getCurrentAccentColor()}10`,
                    color: theme === 'light' ? '#374151' : '#d1d5db',
                  }}
                >
                  <motion.div
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Menu className="h-4 w-4" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
              style={{
                borderTop: `1px solid ${getCurrentAccentColor()}30`,
                background: theme === 'light'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.2)',
              }}
            >
              {navigation.map((item, index) => (
                <motion.button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 relative group"
                  style={{
                    color: theme === 'light' ? '#374151' : '#d1d5db',
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    x: 5,
                    textShadow: `0 0 10px ${getCurrentAccentColor()}60`,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t(item.key)}

                  {/* Mobile hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${getCurrentAccentColor()}15 0%, transparent 100%)`,
                      border: `1px solid ${getCurrentAccentColor()}20`,
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;