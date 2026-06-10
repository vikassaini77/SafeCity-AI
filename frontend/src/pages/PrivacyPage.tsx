import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PublicLayout } from '../components/layout';
import { Search, ChevronRight } from 'lucide-react';

const sections = [
  { id: '1', title: '1. Introduction', content: 'SafeCity AI ("we," "our," or "us") provides a real-time video analytics platform (the "Platform") to municipalities, enterprises, and other organizations ("Customers"). We take your privacy incredibly seriously. This Privacy Policy outlines how we collect, process, and protect data—specifically emphasizing that we do not engage in facial recognition or mass biometric surveillance.' },
  { id: '2', title: '2. Information We Do Not Collect', content: 'Our commitment to privacy begins with what we explicitly choose not to collect. We do NOT collect, process, or store: \n\n• Facial geometries or biometric identifiers\n• Personally Identifiable Information (PII) of pedestrians\n• Audio recordings of public spaces\n\nOur models are trained to detect physical anomalies (like car crashes or violence) without identifying the individuals involved.' },
  { id: '3', title: '3. Data Processed on Behalf of Customers', content: 'SafeCity AI acts as a Data Processor. We process video feeds provided by our Customers (the Data Controllers). \n\n• Metadata: We generate metadata (e.g., "vehicle detected," "crowd density high") from video streams.\n• Event Clips: When an anomaly is detected, we may save a short video clip (typically 10-30 seconds) to provide context for the alert.\n• Automated Blurring: Before any video is permanently stored or viewed by human operators outside of an emergency, our system automatically blurs all faces and license plates at the edge.' },
  { id: '4', title: '4. Data Security and Storage', content: 'All data in transit is encrypted using TLS 1.3. All data at rest is encrypted using AES-256. Customer data is strictly segregated. We utilize CJIS-compliant and FedRAMP High data centers for all government deployments. Video event clips are retained only for the duration specified by the Customer\'s retention policy (default is 30 days) and are cryptographically destroyed thereafter.' },
  { id: '5', title: '5. Information Sharing', content: 'We do not sell, rent, or trade your data. We only share information with third parties in the following circumstances:\n\n• With sub-processors required to operate our service (e.g., cloud hosting providers) under strict DPAs.\n• To comply with a valid legal subpoena or court order. We notify our Customers of any such requests unless legally prohibited from doing so.' },
  { id: '6', title: '6. Your Rights', content: 'Depending on your jurisdiction (e.g., GDPR, CCPA), you may have rights regarding your personal data. Because SafeCity AI does not tie video footage to individual identities, we generally cannot search our databases for "footage of John Doe." If a Customer provides us with specific timestamps and camera locations, we will assist the Customer in fulfilling data subject access requests.' },
  { id: '7', title: '7. Changes to This Policy', content: 'We may update this Privacy Policy from time to time. If we make material changes, we will notify our Customers via email and prominently post a notice on our Platform prior to the change becoming effective. Your continued use of the Platform signifies your acceptance of the updated Policy.' },
  { id: '8', title: '8. Contact Us', content: 'If you have any questions or concerns about this Privacy Policy or our data practices, please contact our Data Protection Officer at:\n\nEmail: privacy@safecity.ai\nAddress: SafeCity AI, Attn: Privacy Office, 100 Market St, San Francisco, CA 94105' }
];

export default function PrivacyPage() {
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
                Privacy <span className="text-primary-500">Policy</span>
              </h1>
              <p className="text-gray-400 text-lg mb-6">
                We believe that public safety shouldn't require the sacrifice of personal privacy. Learn exactly how we handle data.
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
                    placeholder="Search policy..."
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
