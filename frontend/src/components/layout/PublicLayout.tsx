import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ChevronDown, Activity, Camera, AlertTriangle, Zap, Server, BarChart, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const productLinks = [
    { name: 'Product Overview', href: '/product/overview', icon: <Shield className="w-4 h-4" /> },
    { name: 'Platform Architecture', href: '/product/architecture', icon: <Server className="w-4 h-4" /> },
    { name: 'AI Detection Engine', href: '/product/ai-engine', icon: <Activity className="w-4 h-4" /> },
    { name: 'Real-Time Monitoring', href: '/product/real-time-monitoring', icon: <Camera className="w-4 h-4" /> },
    { name: 'Incident Response System', href: '/product/incident-response', icon: <AlertTriangle className="w-4 h-4" /> },
    { name: 'Smart City Intelligence', href: '/product/smart-city', icon: <BarChart className="w-4 h-4" /> },
    { name: 'Multi-Camera Analytics', href: '/product/multi-camera', icon: <Camera className="w-4 h-4" /> },
  ];

  const featureLinks = [
    { name: 'Accident Detection', href: '/features/accident-detection' },
    { name: 'Violence Detection', href: '/features/violence-detection' },
    { name: 'Crowd Monitoring', href: '/features/crowd-monitoring' },
    { name: 'Vehicle Analytics', href: '/features/vehicle-analytics' },
    { name: 'Emergency Response', href: '/features/emergency-response' },
    { name: 'AI Alerting System', href: '/features/alerting' },
    { name: 'Analytics Dashboard', href: '/features/dashboard' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Sales', href: '/contact' },
    { name: 'Security Center', href: '/security' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary-500/30 selection:text-primary-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20 group-hover:border-primary-500/50 transition-colors shadow-glow-primary">
                <Shield className="w-6 h-6 text-primary-500" />
              </div>
              <span className="text-2xl font-heading font-bold text-white tracking-tight">SafeCity AI</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Product Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('product')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors py-8">
                  Product <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'product' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'product' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-secondary-900 border border-gray-800 rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-4"
                    >
                      {productLinks.map(link => (
                        <Link key={link.href} to={link.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors group">
                          <div className="text-primary-500 group-hover:text-primary-400">{link.icon}</div>
                          <span className="text-sm font-medium text-gray-200 group-hover:text-white">{link.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Features Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('features')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors py-8">
                  Features <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'features' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'features' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[400px] bg-secondary-900 border border-gray-800 rounded-xl shadow-2xl p-6 grid gap-2"
                    >
                      {featureLinks.map(link => (
                        <Link key={link.href} to={link.href} className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</NavLink>
              <NavLink to="/api-docs" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">API Docs</NavLink>
              
              {/* Company Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('company')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors py-8">
                  Company <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'company' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[250px] bg-secondary-900 border border-gray-800 rounded-xl shadow-2xl p-4 grid gap-1"
                    >
                      {companyLinks.map(link => (
                        <Link key={link.href} to={link.href} className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/intelligence" className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-md hover:bg-cyan-500/20 transition-colors uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" /> Intelligence Center
              </Link>
              <Link to="/login" className="text-sm font-medium text-white hover:text-primary-400 transition-colors">
                Login
              </Link>
              <Link to="/contact" className="px-5 py-2.5 text-sm font-bold bg-primary-500 text-black rounded-lg hover:bg-primary-400 transition-colors shadow-glow-primary">
                Contact Sales
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-800 bg-secondary-900"
            >
              <div className="px-4 py-6 space-y-6">
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Product</div>
                  <div className="grid gap-2">
                    {productLinks.map(l => <Link key={l.href} to={l.href} className="text-gray-300 text-sm block">{l.name}</Link>)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Features</div>
                  <div className="grid gap-2">
                    {featureLinks.map(l => <Link key={l.href} to={l.href} className="text-gray-300 text-sm block">{l.name}</Link>)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Company & Resources</div>
                  <div className="grid gap-2">
                    <Link to="/pricing" className="text-gray-300 text-sm block">Pricing</Link>
                    <Link to="/api-docs" className="text-gray-300 text-sm block">API Docs</Link>
                    {companyLinks.map(l => <Link key={l.href} to={l.href} className="text-gray-300 text-sm block">{l.name}</Link>)}
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-800 grid gap-4">
                  <Link to="/login" className="text-center text-sm font-medium text-white block">Login</Link>
                  <Link to="/contact" className="text-center px-5 py-3 text-sm font-bold bg-primary-500 text-black rounded-lg block">Contact Sales</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content with Transition */}
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Enterprise Footer */}
      <footer className="bg-secondary-900 border-t border-gray-800 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <Shield className="w-6 h-6 text-primary-500" />
                <span className="text-xl font-heading font-bold text-white tracking-tight">SafeCity AI</span>
              </Link>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Enterprise-grade real-time surveillance and anomaly detection platform powered by ethical computer vision.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/product/overview" className="text-gray-500 hover:text-primary-400 transition-colors">Overview</Link></li>
                <li><Link to="/product/architecture" className="text-gray-500 hover:text-primary-400 transition-colors">Architecture</Link></li>
                <li><Link to="/product/smart-city" className="text-gray-500 hover:text-primary-400 transition-colors">Smart City Intel</Link></li>
                <li><Link to="/pricing" className="text-gray-500 hover:text-primary-400 transition-colors">Pricing</Link></li>
                <li><Link to="/api-docs" className="text-gray-500 hover:text-primary-400 transition-colors">API & Docs</Link></li>
                <li><Link to="/changelog" className="text-gray-500 hover:text-primary-400 transition-colors">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Features</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/features/accident-detection" className="text-gray-500 hover:text-primary-400 transition-colors">Accident Detection</Link></li>
                <li><Link to="/features/violence-detection" className="text-gray-500 hover:text-primary-400 transition-colors">Violence Detection</Link></li>
                <li><Link to="/features/crowd-monitoring" className="text-gray-500 hover:text-primary-400 transition-colors">Crowd Monitoring</Link></li>
                <li><Link to="/features/vehicle-analytics" className="text-gray-500 hover:text-primary-400 transition-colors">Vehicle Analytics</Link></li>
                <li><Link to="/features/dashboard" className="text-gray-500 hover:text-primary-400 transition-colors">Analytics Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="text-gray-500 hover:text-primary-400 transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-500 hover:text-primary-400 transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-500 hover:text-primary-400 transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="text-gray-500 hover:text-primary-400 transition-colors">Contact Sales</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal & Trust</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/security" className="text-gray-500 hover:text-primary-400 transition-colors">Security Center</Link></li>
                <li><Link to="/privacy" className="text-gray-500 hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-500 hover:text-primary-400 transition-colors">Terms of Service</Link></li>
                <li><Link to="/compliance" className="text-gray-500 hover:text-primary-400 transition-colors">Compliance</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} SafeCity AI Inc. All rights reserved. Built for enterprise.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-gray-500">
                <span className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_rgba(0,255,136,0.5)]"></span>
                All Systems Operational
              </span>
              <span className="text-gray-600">v2.1.0-Enterprise</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
