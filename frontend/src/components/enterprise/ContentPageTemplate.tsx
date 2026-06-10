import React from 'react';
import { PublicLayout } from '../layout';
import { PageHero, FeatureGrid, FeatureItem } from './index';
import { motion } from 'framer-motion';

export interface ContentPageProps {
  category: string;
  title: React.ReactNode;
  description: string;
  features: FeatureItem[];
  stats?: { value: string; label: string }[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function ContentPageTemplate({
  category,
  title,
  description,
  features,
  stats,
  primaryCta = { label: 'Request Demo', href: '/contact' },
  secondaryCta = { label: 'View Pricing', href: '/pricing' }
}: ContentPageProps) {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-background">
        <PageHero
          category={category}
          title={title}
          description={description}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
        />

        {stats && stats.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-secondary-900/50 border border-gray-800 rounded-2xl p-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-heading font-bold text-primary-500 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <FeatureGrid features={features} columns={3} />
        
        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 bg-gradient-to-b from-primary-500/10 to-transparent"
          >
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Ready to transform your operations?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Deploy SafeCity AI across your entire camera network in less than 48 hours.</p>
            <a href="/contact" className="btn-primary text-lg px-8 py-3">Speak to an Engineer</a>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
