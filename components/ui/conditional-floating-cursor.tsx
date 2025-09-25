'use client';

import { useEffect, useState } from 'react';
import { FloatingCursor } from './floating-cursor';

export function ConditionalFloatingCursor() {
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => setShowCursor(true);
    const handleTouchStart = () => setShowCursor(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  if (!showCursor) {
    return null;
  }

  return <FloatingCursor />;
}