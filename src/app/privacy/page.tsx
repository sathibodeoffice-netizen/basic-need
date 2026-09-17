import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Basic Need',
  description: 'Privacy Policy for Basic Need.',
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text-main mb-8 text-center">Privacy Policy</h1>
          
          <div className="bg-surface p-8 rounded-xl border border-border shadow-sm space-y-6 text-text-light leading-relaxed">
            <p>At Basic Need, your privacy is our priority. This policy outlines how we collect, use, and protect your information.</p>
            <h3 className="font-semibold text-lg text-text-main mt-4">Information We Collect</h3>
            <p>We collect personal information such as your name, email, phone number, and delivery address when you create an account or place an order.</p>
            <h3 className="font-semibold text-lg text-text-main mt-4">How We Use Your Information</h3>
            <p>Your data is used to process orders, improve our website, and provide customer support. We do not sell your personal data to third parties.</p>
            <h3 className="font-semibold text-lg text-text-main mt-4">Security</h3>
            <p>We implement industry-standard security measures to keep your data safe and secure.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
