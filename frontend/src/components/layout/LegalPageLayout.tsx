import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, FileText } from 'lucide-react';
import { PublicLayout } from './PublicLayout';

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export function LegalPageLayout({ title, description, lastUpdated, sections }: LegalPageLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  // Filter sections based on search query
  const filteredSections = sections.filter((section) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    // A simple text extraction approach for React nodes isn't perfect, but we can search the title
    // and rely on the fact that the content is mostly text elements.
    const contentText = typeof section.content === 'string' ? section.content : '';
    return (
      section.title.toLowerCase().includes(query) || 
      // This is a naive check. For complex React nodes, we might not match content perfectly, 
      // but for legal text, it's often close enough if we pass simple strings or we can just filter by title.
      // Let's filter primarily by title for now.
      section.title.toLowerCase().includes(query)
    );
  });

  // Handle scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 150; // Offset for header

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // 100px offset for header
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-background pt-24 pb-20">
        {/* Header Hero */}
        <div className="bg-surface border-b border-gray-800 pt-16 pb-12 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex items-center gap-3 mb-4 text-primary-500">
              <FileText className="w-6 h-6" />
              <span className="font-mono text-sm tracking-wider uppercase">Legal Documentation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-6">
              {description}
            </p>
            <div className="text-sm text-gray-500 font-mono">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar (Sticky) */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search sections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 transition-colors"
                  />
                </div>

                {/* Table of Contents */}
                <div className="bg-surface border border-gray-800 rounded-xl p-5 hidden lg:block">
                  <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                    Table of Contents
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                          activeSection === section.id
                            ? 'bg-primary-500/10 text-primary-500 font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {activeSection === section.id && <ChevronRight className="w-3 h-3" />}
                        <span className="truncate">{section.title}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="glass-card p-8 md:p-12">
                <AnimatePresence mode="popLayout">
                  {filteredSections.length > 0 ? (
                    filteredSections.map((section) => (
                      <motion.section
                        key={section.id}
                        id={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-12 last:mb-0"
                      >
                        <h2 className="text-2xl font-heading font-bold text-white mb-6 border-b border-gray-800 pb-4">
                          {section.title}
                        </h2>
                        <div className="prose prose-invert max-w-none text-gray-300">
                          {section.content}
                        </div>
                      </motion.section>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <p className="text-gray-400">No sections found matching "{searchQuery}"</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
