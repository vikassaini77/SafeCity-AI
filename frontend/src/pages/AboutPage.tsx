import React from 'react';
import { motion } from 'framer-motion';
import { PublicLayout } from '../components/layout';
import { Shield, Eye, Lock, Globe, Server, Users } from 'lucide-react';

const leaders = [
  { name: 'Dr. Sarah Chen', role: 'Chief Executive Officer', bio: 'Former Director of AI at Palantir. PhD in Computer Vision from Stanford.' },
  { name: 'Marcus Reynolds', role: 'Chief Technology Officer', bio: 'Creator of the open-source DeepStreamX library. 15 years in edge computing.' },
  { name: 'Elena Rodriguez', role: 'Chief Product Officer', bio: 'Led product for Datadog\'s security division. Focuses on intuitive UX for complex data.' },
  { name: 'David Kim', role: 'Chief Privacy Officer', bio: 'Former federal prosecutor specializing in cyber law and constitutional rights.' }
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-6 mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 mb-6 text-sm font-bold uppercase tracking-wider"
          >
            Our Mission
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight"
          >
            To make the world safer through <span className="text-primary-500">ethical intelligence</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            We believe that communities shouldn't have to choose between safety and privacy. 
            SafeCity AI builds the software infrastructure required to protect public spaces without mass surveillance.
          </motion.p>
        </div>

        {/* Metrics Section */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-secondary-900/50 border border-gray-800 rounded-2xl p-8 md:p-12">
            {[
              { value: '45+', label: 'Cities Protected' },
              { value: '1.2M', label: 'Incidents Prevented' },
              { value: 'Zero', label: 'Biometrics Stored' },
              { value: '$120M', label: 'Series C Funding' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary-500 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Principles Section */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
          <h2 className="text-3xl font-heading font-bold text-white mb-12 text-center">Our Core Principles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Lock />, title: 'Privacy by Design', desc: 'We mathematically guarantee privacy by blurring faces at the edge before video ever reaches our servers.' },
              { icon: <Eye />, title: 'Actionable Truth', desc: 'We don\'t just record history; we provide the real-time context needed to change the outcome of dangerous events.' },
              { icon: <Shield />, title: 'Radical Transparency', desc: 'We publish our bias testing results and model accuracy metrics publicly. No black boxes.' }
            ].map((principle, idx) => (
              <div key={idx} className="glass-card p-8">
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 text-primary-500 flex items-center justify-center mb-6">
                  {principle.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{principle.title}</h3>
                <p className="text-gray-400">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Leadership Team</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Built by veterans of the intelligence community and pioneers in machine learning.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, idx) => (
              <div key={idx} className="group">
                <div className="w-full aspect-square rounded-2xl bg-secondary-900 border border-gray-800 mb-6 overflow-hidden flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <Users className="w-20 h-20 text-gray-700 group-hover:text-primary-500 transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{leader.name}</h3>
                <div className="text-primary-500 font-medium mb-3 text-sm uppercase tracking-wider">{leader.role}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investors */}
        <div className="max-w-7xl mx-auto px-6 text-center border-t border-gray-800 pt-20">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-8">Backed by the best</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {['Sequoia', 'Andreessen Horowitz', 'Founders Fund', 'Lightspeed', 'Y Combinator'].map((investor, idx) => (
              <span key={idx} className="text-xl font-heading font-bold text-white">{investor}</span>
            ))}
          </div>
        </div>

      </div>
    </PublicLayout>
  );
}
