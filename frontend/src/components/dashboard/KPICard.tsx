import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Card } from '../ui';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  delta?: number;
  icon: LucideIcon;
  iconColor?: string;
  prefix?: string;
  suffix?: string;
  loading?: boolean;
}

export function KPICard({
  title,
  value,
  subtitle,
  delta,
  icon: Icon,
  iconColor = 'text-primary-500',
  prefix,
  suffix,
  loading,
}: KPICardProps) {
  const deltaPositive = delta !== undefined && delta > 0;
  const deltaNegative = delta !== undefined && delta < 0;
  const deltaNeutral = delta === 0;

  return (
    <Card className="relative overflow-hidden" padding="md">
      {/* Background glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 font-medium">{title}</p>

          {loading ? (
            <div className="mt-2 h-9 w-24 bg-gray-700/50 rounded animate-pulse" />
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-3xl font-heading font-bold text-white"
            >
              {prefix}
              {typeof value === 'number' ? value.toLocaleString() : value}
              {suffix}
            </motion.p>
          )}

          {subtitle && (
            <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
          )}

          {delta !== undefined && (
            <div className={cn(
              'flex items-center gap-1 mt-2 text-xs font-mono',
              deltaPositive && 'text-accent-green',
              deltaNegative && 'text-accent-red',
              deltaNeutral && 'text-gray-500'
            )}>
              {deltaPositive && <TrendingUp className="w-3 h-3" />}
              {deltaNegative && <TrendingDown className="w-3 h-3" />}
              {deltaNeutral && <Minus className="w-3 h-3" />}
              <span>
                {deltaPositive && '+'}
                {delta}%
              </span>
              <span className="text-gray-600">vs yesterday</span>
            </div>
          )}
        </div>

        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center',
          'bg-gradient-to-br',
          iconColor === 'text-primary-500' && 'from-primary-500/20 to-primary-500/5',
          iconColor === 'text-accent-green' && 'from-accent-green/20 to-accent-green/5',
          iconColor === 'text-accent-red' && 'from-accent-red/20 to-accent-red/5',
          iconColor === 'text-accent-yellow' && 'from-accent-yellow/20 to-accent-yellow/5'
        )}>
          <Icon className={cn('w-6 h-6', iconColor)} />
        </div>
      </div>
    </Card>
  );
}
