import React from 'react';
import { ArrowLeft, Share2, Twitter, Linkedin, Facebook, Calendar, Clock, User } from 'lucide-react';
import { PublicLayout } from '../components/layout';

export function BlogPostPage() {
  return (
    <PublicLayout>
      <main className="pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6">
          {/* Back to Blog */}
          <a href="/blog" className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors mb-8 group font-mono text-sm">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            BACK TO BLOG
          </a>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 text-gray-400 text-sm font-mono mb-6">
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> Oct 15, 2024</span>
              <span>•</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> 5 min read</span>
              <span>•</span>
              <span className="text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20">AI Research</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Next-Generation Object Tracking: How SafeCity AI Achieves 99.9% Accuracy in Urban Environments
            </h1>

            <div className="flex items-center justify-between py-6 border-y border-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-700">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Author" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-white font-medium">Dr. Alan Chen</div>
                  <div className="text-gray-400 text-sm">Head of Computer Vision</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="rounded-2xl overflow-hidden mb-12 border border-gray-800 relative aspect-video">
            <img 
              src="https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=1200" 
              alt="City traffic with AI overlay" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-headings:text-white prose-a:text-primary-400 hover:prose-a:text-primary-300">
            <p className="lead text-xl text-gray-300 mb-8">
              Urban environments present one of the most challenging terrains for computer vision systems. With variable lighting, dense crowding, and unpredictable movements, traditional tracking algorithms often fail. Here's how SafeCity AI solved the urban tracking problem.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">The Challenge of Occlusion</h2>
            <p className="mb-6 text-gray-300 leading-relaxed">
              In a busy intersection, a single pedestrian might be partially obscured by passing vehicles, street signs, and other pedestrians a dozen times within a single camera feed. Traditional bounding box tracking loses the subject the moment their physical profile is disrupted. 
            </p>
            <p className="mb-8 text-gray-300 leading-relaxed">
              To combat this, our engineering team developed a proprietary <strong>Temporal Continuity Model (TCM)</strong>. Instead of just looking at individual frames, the TCM analyzes motion vectors across time, predicting where a subject will emerge based on their velocity, trajectory, and behavioral patterns.
            </p>

            <blockquote className="border-l-4 border-primary-500 pl-6 my-10 italic text-xl text-gray-200">
              "By treating tracking not as a frame-by-frame identification task, but as a continuous temporal flow, we reduced identity switching by over 94% in dense crowds."
            </blockquote>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Edge-Optimized Inference</h2>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Accuracy means nothing if the system cannot process data in real-time. Sending high-definition video feeds to a centralized cloud server introduces unacceptable latency for emergency response scenarios.
            </p>
            
            <div className="bg-surface border border-gray-800 rounded-xl p-8 my-10">
              <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
              <ul className="space-y-4 text-gray-300 font-mono text-sm">
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span>Inference Latency</span>
                  <span className="text-primary-400">&lt; 12ms</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span>Simultaneous Objects</span>
                  <span className="text-primary-400">Up to 2,048</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span>Edge Memory Footprint</span>
                  <span className="text-primary-400">48MB (Quantized)</span>
                </li>
              </ul>
            </div>

            <p className="mb-6 text-gray-300 leading-relaxed">
              Our models are heavily quantized and optimized using TensorRT, allowing them to run directly on the camera hardware or local edge nodes. This ensures that threat detection and anomaly flagging happen instantaneously, directly at the source.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Looking Ahead</h2>
            <p className="mb-6 text-gray-300 leading-relaxed">
              As we continue to train our foundational models on larger and more diverse datasets, the accuracy of SafeCity AI will only improve. Our next milestone is implementing zero-shot anomaly detection, allowing the system to flag dangerous situations it has never explicitly been trained on.
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-16 p-8 bg-gradient-to-br from-primary-900/20 to-surface border border-primary-500/20 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Experience the Technology</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Ready to see our next-generation object tracking in action? Request a personalized demo of the SafeCity AI platform for your organization.
            </p>
            <a href="/login" className="inline-block px-8 py-4 bg-primary-500 hover:bg-primary-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:shadow-[0_0_30px_rgba(0,242,255,0.5)]">
              Schedule a Live Demo
            </a>
          </div>
        </article>
      </main>
    </PublicLayout>
  );
}
