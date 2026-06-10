import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PublicLayout } from '../components/layout';
import { Mail, Phone, MapPin, Send, MessageSquare, Building, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Get in touch with <span className="text-primary-500">Sales</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Ready to secure your facilities with state-of-the-art computer vision? Our experts are here to help you design the perfect deployment.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-3/5"
            >
              <div className="glass-card p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none" />
                
                {formStatus === 'success' ? (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-accent-green/20 flex items-center justify-center mb-6">
                      <Send className="w-8 h-8 text-accent-green" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully</h3>
                    <p className="text-gray-400 mb-8 max-w-md">Thank you for reaching out. A security architect from our team will be in touch within 24 hours.</p>
                    <button onClick={() => setFormStatus('idle')} className="btn-secondary">Send another message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                        <input type="text" required className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="John" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                        <input type="text" required className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="Doe" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Work Email</label>
                      <input type="email" required className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="john@company.com" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Company / Organization</label>
                      <input type="text" required className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="Acme Corp" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Number of Cameras</label>
                        <select className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none">
                          <option>10 - 50</option>
                          <option>51 - 250</option>
                          <option>251 - 1,000</option>
                          <option>1,000+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Primary Interest</label>
                        <select className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none">
                          <option>Violence & Weapon Detection</option>
                          <option>Traffic & Vehicle Analytics</option>
                          <option>Crowd & Density Monitoring</option>
                          <option>General Platform Demo</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">How can we help?</label>
                      <textarea required rows={4} className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors resize-none" placeholder="Tell us about your security challenges..."></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
                    >
                      {formStatus === 'submitting' ? (
                        <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>Contact Sales <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Side Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:w-2/5 space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Global Offices</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-secondary-900 border border-gray-800 flex items-center justify-center text-primary-500">
                      <Building className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Headquarters (San Francisco)</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        100 Market Street, Suite 400<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-secondary-900 border border-gray-800 flex items-center justify-center text-primary-500">
                      <Building className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">EMEA Hub (London)</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Level 39, One Canada Square<br />
                        Canary Wharf, London E14 5AB<br />
                        United Kingdom
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Direct Contact</h3>
                <div className="space-y-4">
                  <a href="mailto:sales@safecity.ai" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded bg-secondary-900 border border-gray-800 flex items-center justify-center text-gray-400 group-hover:text-primary-500 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">sales@safecity.ai</span>
                  </a>
                  <a href="tel:+18005550199" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded bg-secondary-900 border border-gray-800 flex items-center justify-center text-gray-400 group-hover:text-primary-500 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">+1 (800) 555-0199</span>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-secondary-900 border border-gray-800 flex items-center justify-center text-gray-400">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-gray-300 block">Support: <a href="mailto:support@safecity.ai" className="text-primary-500 hover:underline">support@safecity.ai</a></span>
                      <span className="text-xs text-gray-500">Available 24/7 for Enterprise customers</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </PublicLayout>
  );
}
