import React from 'react';
import { motion } from 'framer-motion';
import { PublicLayout } from '../components/layout';
import { Shield, Lock, CheckCircle, FileText, Server, AlertTriangle } from 'lucide-react';

export default function SecurityPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 mb-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent-green/10 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,255,136,0.2)]">
            <Shield className="w-8 h-8 text-accent-green" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight"
          >
            Trust & <span className="text-accent-green">Security</span> Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            We build software for law enforcement and critical infrastructure. Security isn't a feature—it's the foundation of everything we do.
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Compliance & Certifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'SOC 2 Type II', desc: 'Audited annually by independent third-party firms for security, availability, and confidentiality.' },
              { title: 'CJIS Compliant', desc: 'Our Government Cloud environment meets the strict requirements of the FBI CJIS Security Policy.' },
              { title: 'FedRAMP High', desc: 'In Process. Building toward the highest level of authorization for federal deployments.' },
              { title: 'ISO 27001', desc: 'Our information security management system is certified to international standards.' }
            ].map((cert, idx) => (
              <div key={idx} className="glass-card p-6 border-t-2 border-t-accent-green/50">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-accent-green" />
                  <h3 className="text-lg font-bold text-white">{cert.title}</h3>
                </div>
                <p className="text-sm text-gray-400">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Architecture */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-white mb-6">Zero-Trust Architecture</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-lg bg-secondary-900 border border-gray-800 flex items-center justify-center text-accent-green">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">End-to-End Encryption</h3>
                    <p className="text-gray-400 leading-relaxed">
                      All video streams are encrypted in transit using TLS 1.3 and WebRTC DTLS/SRTP. Data at rest is encrypted using AES-256 with customer-managed keys (CMK) via AWS KMS.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-lg bg-secondary-900 border border-gray-800 flex items-center justify-center text-accent-green">
                    <Server className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Secure Edge Nodes</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Our edge inference boxes use Trusted Platform Modules (TPM 2.0) to ensure boot integrity. Physical tampering immediately wipes all cryptographic keys and renders the device inert.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-lg bg-secondary-900 border border-gray-800 flex items-center justify-center text-accent-green">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Continuous Penetration Testing</h3>
                    <p className="text-gray-400 leading-relaxed">
                      We conduct continuous automated vulnerability scanning and employ elite red teams for bi-annual manual penetration testing of our cloud infrastructure and edge devices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-accent-green/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="glass-card p-8 relative z-10 border-accent-green/30">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-4">Vulnerability Disclosure</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  We believe that working with skilled security researchers across the globe is crucial in identifying weaknesses in any technology. If you believe you've found a security vulnerability in SafeCity AI, please let us know immediately.
                </p>
                <div className="bg-black/50 p-4 rounded-lg border border-gray-800 mb-6">
                  <div className="text-sm text-gray-500 mb-1">PGP Fingerprint</div>
                  <div className="font-mono text-xs text-accent-green break-all">
                    4B1D 9C2E 5A8F 3B7D 1E6C  8A2F 9D4B 7E1C 5A3F 8B2D
                  </div>
                </div>
                <a href="mailto:security@safecity.ai" className="w-full btn-secondary text-center block">
                  Report a Vulnerability
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 pt-20">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Security Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="/compliance" className="glass-card p-6 flex items-center gap-4 hover:border-accent-green/50 transition-colors group">
              <div className="w-12 h-12 bg-black/50 border border-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-accent-green" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Security Whitepaper</h3>
                <p className="text-sm text-gray-400">Detailed technical architecture</p>
              </div>
            </a>

            <a href="/compliance" className="glass-card p-6 flex items-center gap-4 hover:border-accent-green/50 transition-colors group">
              <div className="w-12 h-12 bg-black/50 border border-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-accent-green" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">SOC2 Type II Report</h3>
                <p className="text-sm text-gray-400">Independent security audit</p>
              </div>
            </a>

            <a href="/compliance" className="glass-card p-6 flex items-center gap-4 hover:border-accent-green/50 transition-colors group">
              <div className="w-12 h-12 bg-black/50 border border-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-accent-green" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Privacy Policy</h3>
                <p className="text-sm text-gray-400">Data handling procedures</p>
              </div>
            </a>
          </div>
        </div>

      </div>
    </PublicLayout>
  );
}
