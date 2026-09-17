import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Basic Need',
  description: 'Get in touch with the Basic Need team.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text-main mb-8 text-center">Contact Us</h1>
          
          <div className="bg-surface p-8 rounded-xl border border-border shadow-sm space-y-6 text-text-light leading-relaxed">
            <p>If you have any questions, concerns, or feedback, please reach out to us through the following channels:</p>
            <ul className="space-y-4 mt-6">
              <li><strong className="text-text-main">Email:</strong> support@basicneed.com</li>
              <li><strong className="text-text-main">Phone:</strong> +880 1234 567890</li>
              <li><strong className="text-text-main">Address:</strong> Dhaka, Bangladesh</li>
            </ul>
            <p className="mt-6 text-sm italic">Our support team is available from 9 AM to 8 PM, every day.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
