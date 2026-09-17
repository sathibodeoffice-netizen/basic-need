import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Basic Need',
  description: 'Terms and Conditions for using Basic Need.',
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text-main mb-8 text-center">Terms & Conditions</h1>
          
          <div className="bg-surface p-8 rounded-xl border border-border shadow-sm space-y-6 text-text-light leading-relaxed">
            <p>By accessing or using the Basic Need website, you agree to be bound by these terms and conditions.</p>
            <h3 className="font-semibold text-lg text-text-main mt-4">General Terms</h3>
            <p>You must provide accurate information when registering an account. You are responsible for maintaining the confidentiality of your account password.</p>
            <h3 className="font-semibold text-lg text-text-main mt-4">Pricing and Availability</h3>
            <p>All prices are subject to change without notice. We reserve the right to modify or discontinue products at any time.</p>
            <h3 className="font-semibold text-lg text-text-main mt-4">Prohibited Uses</h3>
            <p>You may not use our site for any unlawful or unauthorized purpose.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
