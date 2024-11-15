'use client';

import { useTheme } from 'next-themes';
import { Toaster as ToasterPrimitive } from '@/components/ui/toaster';

export interface ToasterProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  duration?: number;
  className?: string;
}

export function Toaster({
  position = 'bottom-right',
  duration = 3000,
  className,
}: ToasterProps) {
  const { theme } = useTheme();

  return (
    <ToasterPrimitive
      theme={theme as 'light' | 'dark'}
      className={className}
      position={position}
      duration={duration}
    />
  );
}