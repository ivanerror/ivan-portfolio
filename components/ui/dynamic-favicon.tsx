'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const DynamicFavicon = () => {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    // Use resolvedTheme to get the actual theme (dark/light) instead of 'system'
    const currentTheme = resolvedTheme || theme;

    // Find or create the favicon link
    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }

    // Set the favicon based on theme
    favicon.href = currentTheme === 'dark' ? '/dark_favicon_io/favicon.ico' : '/light_favicon_io/favicon.ico';
  }, [theme, resolvedTheme]);

  return null;
};

export default DynamicFavicon;