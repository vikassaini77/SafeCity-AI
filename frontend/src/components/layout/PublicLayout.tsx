import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function PublicNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-sm border-b border-primary-500/10 z-50">
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center shadow-glow-primary/30">
            <Shield className="w-6 h-6 text-primary-500" />
          </div>
          <span className="text-xl font-heading font-bold">
            SafeCity <span className="text-primary-500">AI</span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a>
          <a href="#use-cases" className="text-gray-400 hover:text-white transition-colors">Use Cases</a>
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/login"
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="btn-primary"
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-surface border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-primary-500" />
              <span className="text-lg font-heading font-bold">SafeCity AI</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Enterprise-grade real-time surveillance and anomaly detection platform.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">API Docs</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            {new Date().getFullYear()} SafeCity AI. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs font-mono">
            v1.0.0
          </p>
        </div>
      </div>
    </footer>
  );
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
