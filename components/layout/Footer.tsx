'use client';

import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              {t('copyright').replace('2024', currentYear.toString())}
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              {t('builtWith')}
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-6">
              <a
                href="mailto:gabrielivansetyaputra@gmail.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                Email
              </a>
              <a
                href="tel:+6281234567890"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                aria-label="Phone"
              >
                Phone
              </a>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Tulungagung, Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;