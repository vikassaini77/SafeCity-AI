import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PublicLayout } from '../components/layout';
import { Search, ChevronRight } from 'lucide-react';

const sections = [
  { id: '1', title: '1. Acceptance of Terms', content: 'By accessing or using the SafeCity AI platform (the "Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Platform. These Terms apply to all users, customers, and administrators.' },
  { id: '2', title: '2. Provision of Service', content: 'SafeCity AI grants you a non-exclusive, non-transferable, revocable license to access and use the Platform strictly in accordance with these Terms and your specific enterprise agreement or subscription plan. We reserve the right to modify, suspend, or discontinue the Platform (or any part thereof) at any time with or without notice.' },
  { id: '3', title: '3. Acceptable Use Policy', content: 'You agree not to use the Platform to:\n\n• Violate any local, state, national, or international law, including privacy laws.\n• Attempt to reverse engineer, decompile, or bypass the anonymization or security features of our AI models.\n• Process video footage for which you do not have the legal right or authorization to capture and analyze.\n• Use the system to engage in discriminatory profiling based on race, gender, religion, or national origin.' },
  { id: '4', title: '4. Customer Data and Video Feeds', content: 'You retain all ownership rights to the video feeds and camera infrastructure you connect to the Platform. By connecting your feeds, you grant SafeCity AI a limited, secure license to process the video in real-time solely for the purpose of providing the anomaly detection services described in your contract. SafeCity AI does not claim ownership over your surveillance footage.' },
  { id: '5', title: '5. Service Level Agreement (SLA)', content: 'For Enterprise and Government tier customers, SafeCity AI guarantees 99.99% uptime. If we fail to meet this SLA in any given month, you may be eligible for service credits as detailed in your specific Master Services Agreement (MSA).' },
  { id: '6', title: '6. Limitation of Liability', content: 'SafeCity AI is an augmenting tool for security professionals; it does not replace human judgment. To the maximum extent permitted by law, SafeCity AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or physical property, resulting from the use or inability to use the Platform, even if we have been advised of the possibility of such damages.' },
  { id: '7', title: '7. Indemnification', content: 'You agree to indemnify and hold SafeCity AI and its officers, directors, employees, and agents harmless from any claims, disputes, demands, liabilities, damages, losses, and costs and expenses, including, without limitation, reasonable legal and accounting fees arising out of or in any way connected with your violation of these Terms.' },
  { id: '8', title: '8. Dispute Resolution', content: 'Any dispute arising out of or relating to these Terms will be governed by the laws of the State of California. All disputes will be resolved through binding arbitration in San Francisco, California, except that either party may bring claims in small claims court if they qualify.' }
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = sections.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(`section-${s.id}`));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: 'smooth'
      });
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Header */}
        <div className="bg-secondary-900 border-b border-gray-800 pt-16 pb-12 mb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                Terms of <span className="text-primary-500">Service</span>
              </h1>
              <p className="text-gray-400 text-lg mb-6">
                Please read these terms carefully. They govern your use of the SafeCity AI platform and services.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                <span>Last Updated: June 1, 2026</span>
                <span>Effective Date: June 15, 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sticky TOC Sidebar */}
            <div className="lg:w-1/3 xl:w-1/4">
              <div className="sticky top-28 bg-secondary-900 border border-gray-800 rounded-xl p-6">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search terms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/50 border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
                
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Table of Contents</h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                        activeSection === section.id
                          ? 'bg-primary-500/10 text-primary-500 font-bold'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="truncate pr-4">{section.title}</span>
                      {activeSection === section.id && <ChevronRight className="w-4 h-4 shrink-0" />}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:w-2/3 xl:w-3/4">
              <div className="glass-card p-8 md:p-12">
                {filteredSections.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400">
                    {filteredSections.map((section) => (
                      <div key={section.id} id={`section-${section.id}`} className="mb-12 last:mb-0 scroll-mt-32">
                        <h2 className="text-2xl font-bold text-white mb-6 font-heading">{section.title}</h2>
                        <div className="whitespace-pre-wrap">{section.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </PublicLayout>
  );
}
