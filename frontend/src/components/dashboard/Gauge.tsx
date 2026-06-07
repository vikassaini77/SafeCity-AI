import React from 'react';
import { motion } from 'framer-motion';

interface GaugeProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  label: string;
  unit?: string;
  color?: 'primary' | 'green' | 'red' | 'yellow';
}

export function Gauge({ value, max = 100, size = 'md', label, unit = '%', color = 'primary' }: GaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = size === 'sm' ? 40 : size === 'md' ? 50 : 60;
  const strokeWidth = size === 'sm' ? 6 : size === 'md' ? 8 : 10;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colors = {
    primary: { stroke: '#00F2FF', bg: 'rgba(0, 242, 255, 0.1)' },
    green: { stroke: '#00FF88', bg: 'rgba(0, 255, 136, 0.1)' },
    red: { stroke: '#FF3B3B', bg: 'rgba(255, 59, 59, 0.1)' },
    yellow: { stroke: '#FFB800', bg: 'rgba(255, 184, 0, 0.1)' },
  };

  const colorConfig = colors[color];
  const fontSize = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-3xl';

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: center * 2, height: center * 2 }}>
        <svg
          width={center * 2}
          height={center * 2}
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colorConfig.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              filter: `drop-shadow(0 0 8px ${colorConfig.stroke})`,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`font-heading font-bold text-white ${fontSize}`}
          >
            {value.toFixed(1)}
          </motion.span>
          <span className="text-xs text-gray-500 font-mono">{unit}</span>
        </div>
      </div>

      <p className="mt-2 text-sm text-gray-400 font-medium">{label}</p>
    </div>
  );
}

interface MetricGaugeProps {
  title: string;
  value: number;
  unit?: string;
  max?: number;
  thresholds?: { warning: number; critical: number };
  icon?: React.ReactNode;
}

export function MetricGauge({ title, value, unit = '%', max = 100, thresholds, icon }: MetricGaugeProps) {
  const getColor = () => {
    if (!thresholds) return 'primary';
    if (value >= thresholds.critical) return 'red';
    if (value >= thresholds.warning) return 'yellow';
    return 'green';
  };

  return (
    <div className="glass-card p-4 flex flex-col items-center">
      {icon && <div className="mb-3 text-gray-500">{icon}</div>}
      <Gauge value={value} max={max} label={title} unit={unit} color={getColor()} size="sm" />
    </div>
  );
}
