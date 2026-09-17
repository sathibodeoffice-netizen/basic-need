import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return & Refund Policy | Basic Need',
  description: 'Return and Refund Policy for Basic Need.',
};

export default function ReturnsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text-main mb-8 text-center">Return & Refund</h1>
          
          <div className="bg-surface p-8 rounded-xl border border-border shadow-sm space-y-6 text-text-light leading-relaxed">
            <p>Customer satisfaction is our highest priority. If you receive a defective or incorrect item, we are here to help.</p>
            <h3 className="font-semibold text-lg text-text-main mt-4">Return Policy</h3>
            <p>You can return items within 3 days of delivery if they are damaged, expired, or incorrect. Perishable goods cannot be returned after delivery acceptance.</p>
            <h3 className="font-semibold text-lg text-text-main mt-4">Refund Process</h3>
            <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds will be processed to your original payment method within 5-7 business days.</p>
            <h3 className="font-semibold text-lg text-text-main mt-4">How to Initiate a Return</h3>
            <p>Please contact our support team at support@basicneed.com or call our hotline with your order ID.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
