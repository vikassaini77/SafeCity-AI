import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicLayout } from '../components/layout';
import { Filter, Zap, Shield, Rocket } from 'lucide-react';

type ReleaseType = 'Feature' | 'Security' | 'Improvement';

const releases: { version: string, date: string, title: string, type: ReleaseType, description: string, bullets: string[] }[] = [
  {
    version: 'v2.1.0',
    date: 'June 8, 2026',
    title: 'Enterprise Single Sign-On (SSO)',
    type: 'Security',
    description: 'We have added support for SAML 2.0 and OpenID Connect (OIDC). Enterprise customers can now integrate SafeCity AI with Okta, Azure AD, and Ping Identity for seamless access management.',
    bullets: [
      'Added SAML 2.0 Identity Provider configuration in Settings.',
      'Implemented Just-in-Time (JIT) user provisioning.',
      'Enforced strict session timeouts for inactive tabs.'
    ]
  },
  {
    version: 'v2.0.5',
    date: 'May 28, 2026',
    title: 'Advanced Altercation Detection Model',
    type: 'Feature',
    description: 'We have upgraded our core temporal action localization model. The new architecture significantly reduces false positives when detecting physical violence in crowded scenes.',
    bullets: [
      'Deployed new temporal fusion network for violence detection.',
      'Added support for custom bounding box colors in the dashboard.',
      'Improved WebSocket reconnection logic for poor network conditions.'
    ]
  },
  {
    version: 'v2.0.0',
    date: 'May 15, 2026',
    title: 'Dashboard Performance Overhaul',
    type: 'Improvement',
    description: 'Rewrote the camera grid rendering pipeline to utilize WebGL natively, allowing up to 16 simultaneous 1080p streams on a single standard workstation without frame drops.',
    bullets: [
      'Reduced memory footprint of the web dashboard by 40%.',
      'Fixed a bug causing incorrect FPS calculation in the camera feed overlay.',
      'Added the ability to export incident logs to CSV.'
    ]
  },
  {
    version: 'v1.5.0',
    date: 'April 10, 2026',
    title: 'DeepSORT Re-Identification (ReID)',
    type: 'Feature',
    description: 'Introduced multi-camera tracking capabilities. The system can now maintain object persistence (tracking the same vehicle or person) across multiple non-overlapping camera fields of view.',
    bullets: [
      'Implemented DeepSORT algorithms for object re-identification.',
      'Added trajectory mapping visualization in the Analytics tab.',
      'Optimized edge inference to support ReID without additional latency.'
    ]
  }
];

export default function ChangelogPage() {
  const [filter, setFilter] = useState<ReleaseType | 'All'>('All');

  const filteredReleases = releases.filter(r => filter === 'All' || r.type === filter);

  return (
    <PublicLayout>
      <div className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-6"
          >
            Product <span className="text-primary-500">Changelog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 mb-10"
          >
            New updates, features, and improvements to the SafeCity AI platform.
          </motion.p>
          
          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex flex-wrap items-center justify-center gap-2 bg-secondary-900 border border-gray-800 p-2 rounded-xl"
          >
            <div className="flex items-center gap-2 px-3 text-gray-500 border-r border-gray-800 mr-2">
              <Filter className="w-4 h-4" />
            </div>
            {(['All', 'Feature', 'Security', 'Improvement'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  filter === f 
                    ? 'bg-primary-500 text-black shadow-glow-primary' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative border-l border-gray-800 ml-4 md:ml-0">
            <AnimatePresence>
              {filteredReleases.map((release, idx) => (
                <motion.div
                  key={release.version}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-16 pl-8 relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary-500 shadow-glow-primary" />
                  
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                    <span className="font-mono text-primary-400 font-bold bg-primary-500/10 px-2 py-0.5 rounded border border-primary-500/20">{release.version}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400 font-medium">{release.date}</span>
                    <span className="text-gray-600">•</span>
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                      release.type === 'Feature' ? 'bg-primary-500/10 text-primary-400 border-primary-500/20' :
                      release.type === 'Security' ? 'bg-accent-green/10 text-accent-green border-accent-green/20' :
                      'bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20'
                    }`}>
                      {release.type === 'Feature' && <Rocket className="w-3 h-3" />}
                      {release.type === 'Security' && <Shield className="w-3 h-3" />}
                      {release.type === 'Improvement' && <Zap className="w-3 h-3" />}
                      {release.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="glass-card p-6 border-l-4 border-l-primary-500">
                    <h2 className="text-2xl font-bold text-white mb-3">{release.title}</h2>
                    <p className="text-gray-400 leading-relaxed mb-6">{release.description}</p>
                    <div className="bg-black/30 rounded-lg p-4 border border-gray-800/50">
                      <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
                        {release.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {filteredReleases.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pl-8 py-12 text-center text-gray-500"
                >
                  No releases found for this category.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </PublicLayout>
  );
}
