'use client';

import { useEffect, useState } from 'react';
import { FloatingCursor } from './floating-cursor';

export function ConditionalFloatingCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (navigator as any).msMaxTouchPoints > 0
      );
    };

    setIsTouchDevice(checkTouchDevice());
  }, []);

  // Only render on non-touch devices (PC)
  if (isTouchDevice) {
    return null;
  }

  return <FloatingCursor />;
}