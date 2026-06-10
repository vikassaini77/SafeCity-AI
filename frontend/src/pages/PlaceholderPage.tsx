import React from 'react';
import { PublicLayout } from '../components/layout';
import { Construction } from 'lucide-react';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <PublicLayout>
      <div className="min-h-[70vh] bg-background pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-6">
          <Construction className="w-8 h-8 text-primary-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
          {title}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-8">
          We're currently building this page. Check back soon for updates!
        </p>
        <a href="/" className="btn-primary">
          Return Home
        </a>
      </div>
    </PublicLayout>
  );
}
