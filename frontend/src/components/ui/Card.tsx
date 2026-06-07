import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className, hover, padding = 'md' }: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <div
      className={cn(
        'bg-surface/80 backdrop-blur-xl border border-primary-500/20 rounded-xl shadow-card',
        hover && 'hover:border-primary-500/40 hover:shadow-card-hover transition-all duration-300 cursor-pointer',
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

export function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl',
        'bg-gradient-to-br from-white/10 to-white/5',
        'backdrop-blur-xl border border-white/10',
        className
      )}
    >
      {children}
    </div>
  );
}
