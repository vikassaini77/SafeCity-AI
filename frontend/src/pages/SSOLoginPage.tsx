import React, { useState } from 'react';
import { ArrowLeft, Building2, Server, Shield } from 'lucide-react';
import { PublicLayout } from '../components/layout';
import { Button } from '../components/ui/Button';

export function SSOLoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate SSO redirect
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <PublicLayout>
      <main className="flex-1 flex flex-col justify-center items-center px-6 pt-32 pb-24">
        <a href="/login" className="absolute top-32 left-6 md:left-12 inline-flex items-center text-gray-500 hover:text-white transition-colors group font-mono text-sm">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          BACK TO STANDARD LOGIN
        </a>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-500/10 border border-primary-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,242,255,0.15)]">
              <Server className="w-8 h-8 text-primary-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Enterprise Login</h1>
            <p className="text-gray-400">Sign in using your organization's identity provider</p>
          </div>

          <div className="bg-surface border border-gray-800 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Work Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-500" />
                  </div>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" 
                    placeholder="name@company.com" 
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting || !email}
                className="w-full bg-white hover:bg-gray-200 text-black font-bold py-4 rounded-xl transition-all"
              >
                {isSubmitting ? 'Locating Identity Provider...' : 'Continue to Provider'}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                Supports Okta, Azure AD, and SAML 2.0
              </div>
            </div>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
