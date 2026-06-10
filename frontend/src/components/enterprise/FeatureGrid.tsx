import React from 'react';
import { motion } from 'framer-motion';

export interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
}

export function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  const gridClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-800/50">
      <div className={`grid gap-8 ${gridClass}`}>
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * idx }}
            className="glass-card p-8 hover:border-primary-500/30 transition-colors group"
          >
            {feature.icon && (
              <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
            )}
            <h3 className="text-xl font-bold text-white mb-3 font-heading">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
