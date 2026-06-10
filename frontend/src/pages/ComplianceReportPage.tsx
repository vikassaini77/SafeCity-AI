import React from 'react';
import { ArrowLeft, Shield, Lock, FileText, Download, CheckCircle2, Server, Eye } from 'lucide-react';
import { PublicLayout } from '../components/layout';
import { Button } from '../components/ui/Button';

export function ComplianceReportPage() {
  return (
    <PublicLayout>
      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <a href="/security" className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors mb-8 group font-mono text-sm">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            BACK TO SECURITY
          </a>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="flex-1">
              <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-primary-400" />
                <span className="text-primary-400 font-mono text-sm font-medium">TRUST CENTER</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Compliance & Certifications
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                SafeCity AI is built on a foundation of zero-trust architecture. We adhere to the strictest global standards for data privacy, encryption, and operational security to ensure your urban infrastructure remains impenetrable.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Download SOC2 Type II Report
                </Button>
                <Button variant="secondary" className="border-gray-700 hover:border-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Request Penetration Test Results
                </Button>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md relative">
              <div className="absolute inset-0 bg-primary-500/20 blur-[100px] rounded-full"></div>
              <div className="bg-surface border border-gray-800 rounded-2xl p-8 relative z-10">
                <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Security Posture</div>
                    <div className="text-2xl font-bold text-primary-400">EXCELLENT</div>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-primary-500 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">99%</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-primary-400 mr-3" />
                    <span>End-to-End Encryption (AES-256)</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-primary-400 mr-3" />
                    <span>Annual Third-Party Penetration Tests</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-primary-400 mr-3" />
                    <span>Role-Based Access Control (RBAC)</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-primary-400 mr-3" />
                    <span>24/7 Security Operations Center</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Grid */}
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Global Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            
            <div className="bg-surface border border-gray-800 rounded-xl p-6 hover:border-primary-500/50 transition-colors group">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-6 border border-gray-800 group-hover:border-primary-500/30">
                <FileText className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">SOC 2 Type II</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                SafeCity AI undergoes annual SOC 2 Type II audits by independent auditors to verify the security, availability, and confidentiality of our platform.
              </p>
              <div className="flex items-center text-xs font-mono text-gray-500 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Status: Current (Valid thru 2026)
              </div>
            </div>

            <div className="bg-surface border border-gray-800 rounded-xl p-6 hover:border-primary-500/50 transition-colors group">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-6 border border-gray-800 group-hover:border-primary-500/30">
                <Lock className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">ISO 27001</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Our Information Security Management System (ISMS) is certified against the ISO/IEC 27001 standard, demonstrating our commitment to rigorous security practices.
              </p>
              <div className="flex items-center text-xs font-mono text-gray-500 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Status: Current (Valid thru 2027)
              </div>
            </div>

            <div className="bg-surface border border-gray-800 rounded-xl p-6 hover:border-primary-500/50 transition-colors group">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-6 border border-gray-800 group-hover:border-primary-500/30">
                <Eye className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">GDPR Compliant</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Our video anonymization algorithms and data retention policies are strictly designed to comply with European Union GDPR privacy requirements.
              </p>
              <div className="flex items-center text-xs font-mono text-gray-500 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Status: Fully Compliant
              </div>
            </div>
            
          </div>

          {/* Architecture Section */}
          <div className="bg-gradient-to-b from-surface to-black border border-gray-800 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-white mb-8">Infrastructure Security</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Server className="w-5 h-5 mr-3 text-primary-400" />
                  Data at Rest & Transit
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  All video streams and metadata are encrypted in transit using TLS 1.3. Data at rest is secured using AES-256 encryption managed by AWS Key Management Service (KMS). We support Bring Your Own Key (BYOK) for enterprise deployments.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-3 text-primary-400" />
                  Vulnerability Management
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  We employ continuous automated vulnerability scanning across our containerized infrastructure. Critical patches are deployed automatically with zero-downtime rolling updates. Our bug bounty program incentivizes ethical hackers to responsibly disclose potential vulnerabilities.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </PublicLayout>
  );
}
