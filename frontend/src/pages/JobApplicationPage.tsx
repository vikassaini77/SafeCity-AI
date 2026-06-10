import React, { useState } from 'react';
import { ArrowLeft, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';
import { PublicLayout } from '../components/layout';
import { Button } from '../components/ui/Button';

export function JobApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <PublicLayout>
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <a href="/careers" className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors mb-8 group font-mono text-sm">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            BACK TO CAREERS
          </a>

          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Apply for Position</h1>
            <p className="text-xl text-gray-400">Join the team building the future of urban safety infrastructure.</p>
          </div>

          {isSubmitted ? (
            <div className="bg-surface border border-primary-500/30 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Application Received!</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Thank you for your interest in SafeCity AI. Our talent acquisition team will review your application and get back to you within 3-5 business days.
              </p>
              <a href="/careers">
                <Button variant="secondary" className="border-gray-700 hover:border-primary-500">
                  Return to Openings
                </Button>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 rounded bg-primary-500/10 text-primary-400 flex items-center justify-center mr-3 font-mono text-sm border border-primary-500/20">01</span>
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">First Name <span className="text-red-500">*</span></label>
                    <input required type="text" className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Last Name <span className="text-red-500">*</span></label>
                    <input required type="text" className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="Doe" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-400">Email Address <span className="text-red-500">*</span></label>
                    <input required type="email" className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="jane.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Phone Number <span className="text-red-500">*</span></label>
                    <input required type="tel" className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Location</label>
                    <input type="text" className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="City, Country" />
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 rounded bg-primary-500/10 text-primary-400 flex items-center justify-center mr-3 font-mono text-sm border border-primary-500/20">02</span>
                  Professional Profiles
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">LinkedIn Profile <span className="text-red-500">*</span></label>
                    <input required type="url" className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">GitHub / Portfolio Website</label>
                    <input type="url" className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="https://github.com/..." />
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 rounded bg-primary-500/10 text-primary-400 flex items-center justify-center mr-3 font-mono text-sm border border-primary-500/20">03</span>
                  Resume & Cover Letter
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Upload Resume / CV <span className="text-red-500">*</span></label>
                    <div className="relative border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-primary-500/50 transition-colors group">
                      <input 
                        type="file" 
                        required 
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      />
                      <div className="flex flex-col items-center pointer-events-none">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-500/10 transition-colors">
                          <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-primary-400 transition-colors" />
                        </div>
                        {file ? (
                          <>
                            <p className="text-primary-400 font-medium mb-1">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </>
                        ) : (
                          <>
                            <p className="text-white font-medium mb-1">Drag and drop your file here</p>
                            <p className="text-sm text-gray-500 mb-4">or click to browse from your computer</p>
                            <p className="text-xs text-gray-600">Supported formats: PDF, DOCX (Max 10MB)</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Cover Letter (Optional)</label>
                    <textarea 
                      rows={5} 
                      className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors resize-none" 
                      placeholder="Tell us why you're a great fit for SafeCity AI..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center text-gray-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  All fields marked with * are required
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary-500 hover:bg-primary-400 text-black font-bold px-10 py-4 text-lg rounded-xl shadow-[0_0_20px_rgba(0,242,255,0.2)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
    </PublicLayout>
  );
}
