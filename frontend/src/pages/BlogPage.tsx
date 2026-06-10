import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicLayout } from '../components/layout';
import { Calendar, Clock, User, ArrowRight, BookOpen, Shield, Target } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'The End of Mass Surveillance: How Edge AI Protects Privacy',
    excerpt: 'Traditional CCTV systems record everything and stream it to centralized servers. Edge AI flips this paradigm by analyzing frames locally and only transmitting metadata, fundamentally altering the privacy landscape of smart cities.',
    category: 'Privacy',
    date: 'June 5, 2026',
    readTime: '8 min read',
    author: 'David Kim',
    featured: true
  },
  {
    id: 2,
    title: 'Benchmarking YOLOv10 for Real-Time Anomaly Detection',
    excerpt: 'An in-depth look at our migration to the latest state-of-the-art object detection models and how we achieved sub-50ms latency across 10,000 concurrent video streams.',
    category: 'Engineering',
    date: 'May 28, 2026',
    readTime: '12 min read',
    author: 'Marcus Reynolds'
  },
  {
    id: 3,
    title: 'Case Study: Reducing Police Response Times by 40% in Austin',
    excerpt: 'How the integration of SafeCity AI with Austin PD\'s CAD system allowed first responders to arrive at the scene of traffic accidents faster than ever before.',
    category: 'Case Study',
    date: 'May 15, 2026',
    readTime: '5 min read',
    author: 'Sarah Chen'
  },
  {
    id: 4,
    title: 'Understanding Temporal Action Localization',
    excerpt: 'A technical deep-dive into how our models differentiate between a hostile altercation and an exuberant hug by analyzing skeletal sequences over time.',
    category: 'AI Research',
    date: 'May 2, 2026',
    readTime: '15 min read',
    author: 'Dr. Emily Sato'
  },
  {
    id: 5,
    title: 'Securing the Edge: Zero-Trust Architecture for IoT Cameras',
    excerpt: 'When your compute is deployed on light poles across a city, physical security is impossible. Here is how we guarantee software integrity using TPMs and mTLS.',
    category: 'Security',
    date: 'April 18, 2026',
    readTime: '10 min read',
    author: 'James Wilson'
  },
  {
    id: 6,
    title: 'The Role of Synthetic Data in Removing Model Bias',
    excerpt: 'If you train solely on real-world CCTV data, your models will inherit human biases. We detail our methodology for using Unreal Engine 5 to generate perfectly balanced synthetic training sets.',
    category: 'AI Research',
    date: 'April 5, 2026',
    readTime: '9 min read',
    author: 'Elena Rodriguez'
  },
  {
    id: 7,
    title: 'SafeCity AI Achieves FedRAMP High Authorization',
    excerpt: 'We are proud to announce that our platform has met the rigorous security requirements necessary to serve federal law enforcement and defense agencies.',
    category: 'Company News',
    date: 'March 22, 2026',
    readTime: '3 min read',
    author: 'David Kim'
  },
  {
    id: 8,
    title: 'Building a Real-Time Video Streaming Protocol with WebRTC',
    excerpt: 'Why we abandoned HLS and completely rewrote our video delivery pipeline using WebRTC to achieve sub-200ms glass-to-glass latency for our dashboard users.',
    category: 'Engineering',
    date: 'March 10, 2026',
    readTime: '14 min read',
    author: 'Marcus Reynolds'
  },
  {
    id: 9,
    title: 'Case Study: Crowd Management at the Super Bowl',
    excerpt: 'How stadium security used our density estimation models to proactively prevent crush conditions and optimize ingress routes during the biggest sporting event of the year.',
    category: 'Case Study',
    date: 'February 28, 2026',
    readTime: '6 min read',
    author: 'Sarah Chen'
  },
  {
    id: 10,
    title: 'Introducing the SafeCity Developer API',
    excerpt: 'Today we are opening up our platform. Developers can now build custom applications, webhooks, and integrations directly on top of our AI engine.',
    category: 'Product',
    date: 'February 15, 2026',
    readTime: '4 min read',
    author: 'Elena Rodriguez'
  }
];

const categories = ['All', 'Privacy', 'Engineering', 'AI Research', 'Case Study', 'Security', 'Company News', 'Product'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = posts.filter(post => activeCategory === 'All' || post.category === activeCategory);
  
  // Separate featured post if 'All' is selected
  const featuredPost = activeCategory === 'All' ? filteredPosts.find(p => p.featured) : null;
  const regularPosts = activeCategory === 'All' ? filteredPosts.filter(p => !p.featured) : filteredPosts;

  return (
    <PublicLayout>
      <div className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              The <span className="text-primary-500">Intelligence</span> Desk
            </h1>
            <p className="text-xl text-gray-400">
              Research, engineering deep-dives, and updates from the team building the future of public safety.
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-16"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-primary-500 text-black shadow-glow-primary' 
                    : 'bg-secondary-900 text-gray-400 hover:text-white border border-gray-800 hover:border-primary-500/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Featured Post */}
          {featuredPost && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 group"
            >
              <a href="/blog/post" className="block relative rounded-2xl overflow-hidden border border-gray-800 hover:border-primary-500/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 via-secondary-900/90 to-transparent z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
                
                <div className="relative z-20 p-8 md:p-16 max-w-3xl">
                  <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 font-bold text-xs uppercase tracking-wider rounded border border-primary-500/20 mb-6">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight group-hover:text-primary-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-white">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          )}

          {/* Post Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {regularPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="glass-card flex flex-col h-full group cursor-pointer hover:border-primary-500/50 transition-colors"
                >
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">
                        {post.category}
                      </span>
                      <BookOpen className="w-4 h-4 text-gray-600 group-hover:text-primary-500 transition-colors" />
                    </div>
                    
                    <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-8 flex-1 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="pt-6 border-t border-gray-800/50 flex items-center justify-between text-xs text-gray-500 mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-300">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredPosts.length === 0 && (
              <div className="col-span-full text-center py-24 text-gray-500">
                <Shield className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                <p>No posts found in this category.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </PublicLayout>
  );
}
