import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PageHeroProps {
  category?: string;
  title: React.ReactNode;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  align?: 'left' | 'center';
}

export function PageHero({ 
  category, 
  title, 
  description, 
  primaryCta, 
  secondaryCta,
  align = 'center'
}: PageHeroProps) {
  return (
    <div className={`max-w-7xl mx-auto px-6 pt-32 pb-20 ${align === 'center' ? 'text-center flex flex-col items-center' : 'text-left'}`}>
      {category && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 mb-6 text-sm font-bold uppercase tracking-wider"
        >
          {category}
        </motion.div>
      )}
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight max-w-5xl"
      >
        {title}
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`text-xl text-gray-400 leading-relaxed mb-10 max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}
      >
        {description}
      </motion.p>

      {(primaryCta || secondaryCta) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          {primaryCta && (
            <Link to={primaryCta.href} className="btn-primary text-lg px-8 py-3">
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta && (
            <Link to={secondaryCta.href} className="px-8 py-3 rounded-lg text-lg font-bold bg-secondary-800 text-white hover:bg-secondary-700 transition-colors">
              {secondaryCta.label}
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}
