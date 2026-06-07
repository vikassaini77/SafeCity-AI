import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`;
}

export function getSeverityColor(severity: string): string {
  const colors = {
    low: 'text-accent-green border-accent-green',
    medium: 'text-accent-yellow border-accent-yellow',
    high: 'text-accent-orange border-accent-orange',
    critical: 'text-accent-red border-accent-red',
  };
  return colors[severity as keyof typeof colors] || 'text-gray-400 border-gray-400';
}

export function getSeverityBgColor(severity: string): string {
  const colors = {
    low: 'bg-accent-green/20',
    medium: 'bg-accent-yellow/20',
    high: 'bg-accent-orange/20',
    critical: 'bg-accent-red/20',
  };
  return colors[severity as keyof typeof colors] || 'bg-gray-400/20';
}

export function getStatusColor(status: string): string {
  const colors = {
    online: 'text-accent-green',
    offline: 'text-accent-red',
    maintenance: 'text-accent-yellow',
    active: 'text-accent-red',
    acknowledged: 'text-accent-yellow',
    resolved: 'text-accent-green',
    escalated: 'text-accent-orange',
    false_positive: 'text-gray-400',
  };
  return colors[status as keyof typeof colors] || 'text-gray-400';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function formatDistanceToNow(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return then.toLocaleDateString();
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
