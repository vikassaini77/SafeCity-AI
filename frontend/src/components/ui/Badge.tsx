import React from 'react';
import { cn } from '../../lib/utils';

type BadgeVariant = 'default' | 'low' | 'medium' | 'high' | 'critical' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
  pulse?: boolean;
}

export function Badge({ children, variant = 'default', size = 'sm', className, pulse }: BadgeProps) {
  const variants = {
    default: 'bg-gray-700/50 text-gray-300 border-gray-600/30',
    low: 'bg-severity-low/20 text-severity-low border-severity-low/40',
    medium: 'bg-severity-medium/20 text-severity-medium border-severity-medium/40',
    high: 'bg-severity-high/20 text-severity-high border-severity-high/40',
    critical: 'bg-severity-critical/20 text-severity-critical border-severity-critical/40',
    success: 'bg-accent-green/20 text-accent-green border-accent-green/30',
    warning: 'bg-accent-yellow/20 text-accent-yellow border-accent-yellow/30',
    error: 'bg-accent-red/20 text-accent-red border-accent-red/30',
    info: 'bg-primary-500/20 text-primary-500 border-primary-500/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full border font-mono',
        variants[variant],
        sizes[size],
        pulse && 'animate-pulse',
        className
      )}
    >
      {children}
    </span>
  );
}

export function LiveBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono font-bold text-accent-red',
        'bg-accent-red/20 rounded animate-pulse',
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
      LIVE
    </span>
  );
}

export function StatusBadge({ status, className }: { status: 'online' | 'offline' | 'maintenance'; className?: string }) {
  const config = {
    online: { label: 'Online', variant: 'success' as const, dot: 'bg-accent-green' },
    offline: { label: 'Offline', variant: 'error' as const, dot: 'bg-accent-red' },
    maintenance: { label: 'Maintenance', variant: 'warning' as const, dot: 'bg-accent-yellow' },
  };

  const { label, dot } = config[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-mono',
        status === 'online' && 'text-accent-green',
        status === 'offline' && 'text-accent-red',
        status === 'maintenance' && 'text-accent-yellow',
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', dot)} />
      {label}
    </span>
  );
}
