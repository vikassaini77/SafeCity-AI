import React from 'react';
import { motion } from 'framer-motion';
import { PublicLayout } from '../components/layout';
import { Shield, Camera, Bell, Zap, Database, Lock, Eye, Activity } from 'lucide-react';

const features = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Computer Vision Analysis',
    description: 'State-of-the-art YOLOv8 models analyze video frames in real-time, accurately identifying persons, vehicles, and objects with bounding boxes and high confidence scores.'
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Violence & Altercation Detection',
    description: 'Advanced temporal models detect aggressive physical behaviors and fights, issuing immediate alerts to security personnel before situations escalate.'
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: 'Multi-Camera Synchronization',
    description: 'Ingest and process streams from thousands of IP cameras simultaneously. Track subjects seamlessly across different camera sectors with DeepSORT algorithms.'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Sub-Second Latency',
    description: 'Optimized inference pipelines using TRT-FP16 acceleration ensure that alerts are generated and delivered via WebSocket within milliseconds of an event.'
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Intelligent Alert Routing',
    description: 'Configure custom alert thresholds and routing rules to notify the right department via SMS, Email, or Webhooks when critical incidents occur.'
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: 'Long-term Evidence Storage',
    description: 'Secure, encrypted cloud storage automatically archives video clips surrounding detected incidents, maintaining a tamper-evident chain of custody.'
  }
];

export default function FeaturesPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 mb-6"
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Enterprise Features</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Comprehensive Security <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
              Powered by AI
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            SafeCity AI combines cutting-edge deep learning with enterprise infrastructure to deliver unparalleled public safety and monitoring capabilities.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="glass-card p-8 hover:border-primary-500/30 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-heading">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 mt-32 text-center"
        >
          <div className="glass-card p-12 bg-gradient-to-b from-primary-500/10 to-transparent">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Ready to upgrade your surveillance?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join hundreds of municipalities and enterprises already using SafeCity AI to protect their infrastructure.</p>
            <a href="/register" className="btn-primary text-lg px-8 py-3">Start Free Trial</a>
          </div>
        </motion.div>

      </div>
    </PublicLayout>
  );
}
