import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Basic Need',
  description: 'Learn more about Basic Need, your trusted online super shop for daily essentials.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text-main mb-8 text-center">About Basic Need</h1>
          
          <div className="bg-surface p-8 rounded-xl border border-border shadow-sm space-y-6 text-text-light leading-relaxed">
            <p>
              Welcome to <strong className="text-primary">Basic Need (বেসিক নিড)</strong>, your number one source for all daily essentials. We're dedicated to providing you the very best of groceries, personal care, and household items, with an emphasis on trust, convenience, and quality.
            </p>
            <p>
              Founded with the vision to simplify the daily shopping experience for everyone in Bangladesh, Basic Need has come a long way from its beginnings. When we first started out, our passion for "Your Everyday Essentials, Anytime" drove us to start our own online super shop.
            </p>
            <h2 className="text-2xl font-semibold text-text-main mt-8 mb-4">Our Core Values</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Trust:</strong> We ensure 100% authentic products.</li>
              <li><strong>Convenience:</strong> Order 24/7 from the comfort of your home.</li>
              <li><strong>Quality:</strong> Handpicked fresh food and top-tier brands.</li>
              <li><strong>Affordability:</strong> Competitive pricing on all everyday items.</li>
            </ul>
            <p className="mt-8">
              We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
            </p>
            <p className="font-semibold text-text-main mt-4">
              Sincerely,<br />
              The Basic Need Team
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
