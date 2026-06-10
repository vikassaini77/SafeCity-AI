import React from 'react';
import { motion } from 'framer-motion';
import { PublicLayout } from '../components/layout';
import { Briefcase, MapPin, DollarSign, Clock, Users, ArrowRight } from 'lucide-react';

const jobs = [
  { title: 'Senior Machine Learning Engineer (Computer Vision)', department: 'Engineering', location: 'San Francisco, CA / Remote', type: 'Full-time', salary: '$180k - $240k + Equity' },
  { title: 'Staff Software Engineer, Edge Systems', department: 'Engineering', location: 'Seattle, WA / Remote', type: 'Full-time', salary: '$190k - $250k + Equity' },
  { title: 'Enterprise Account Executive (State & Local Gov)', department: 'Sales', location: 'Washington, D.C.', type: 'Full-time', salary: '$120k Base / $240k OTE' },
  { title: 'Product Manager, Privacy & Compliance', department: 'Product', location: 'New York, NY / Remote', type: 'Full-time', salary: '$160k - $210k + Equity' },
  { title: 'Developer Advocate', department: 'Developer Relations', location: 'Remote (US)', type: 'Full-time', salary: '$140k - $180k + Equity' },
  { title: 'Security Analyst (SOC)', department: 'Security', location: 'Austin, TX', type: 'Full-time', salary: '$110k - $150k + Equity' }
];

export default function CareersPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 mb-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight"
          >
            Build the infrastructure of <span className="text-primary-500">public safety</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            We're looking for mission-driven engineers, designers, and operators who want to solve some of the hardest problems in computer vision and edge computing.
          </motion.p>
        </div>

        {/* Benefits */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Why work here?</h2>
            <p className="text-gray-400">We treat our team like adults and compensate them like owners.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <DollarSign />, title: 'Top Percentile Pay', desc: 'We benchmark against top tier tech companies, not average startups.' },
              { icon: <Users />, title: 'Fully Distributed', desc: 'Work from anywhere in North America. We pay for your co-working space.' },
              { icon: <Clock />, title: 'Flexible Time Off', desc: 'Take the time you need. We mandate a minimum of 3 weeks per year.' },
              { icon: <Briefcase />, title: 'Health & Wellness', desc: '100% covered premium health, dental, and vision insurance for you and dependents.' }
            ].map((benefit, idx) => (
              <div key={idx} className="glass-card p-6 border-t-2 border-t-primary-500/50">
                <div className="w-10 h-10 rounded bg-primary-500/10 text-primary-500 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-white mb-8">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <a 
                key={idx}
                href="/job-application"
                className="block glass-card p-6 md:p-8 hover:border-primary-500/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5 bg-secondary-900 px-3 py-1 rounded-full border border-gray-800">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="hidden md:flex items-center gap-1.5 text-primary-500/80">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-medium text-gray-500">{job.type}</span>
                    <div className="w-10 h-10 rounded-full bg-secondary-900 border border-gray-800 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-black group-hover:border-primary-500 transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-12 p-8 border border-dashed border-gray-800 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-white mb-2">Don't see a fit?</h3>
            <p className="text-gray-400 mb-6">We're always looking for exceptional talent. Send your resume and a brief note about what you want to build.</p>
            <a href="mailto:talent@safecity.ai" className="btn-secondary">Email Talent Team</a>
          </div>
        </div>

      </div>
    </PublicLayout>
  );
}
