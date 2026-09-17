import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import EditablePageContent from '@/components/EditablePageContent';

export const metadata: Metadata = {
  title: 'FAQ | Basic Need',
  description: 'Frequently Asked Questions about Basic Need.',
};

const defaultContent = `
            <div>
              <h3 class="font-semibold text-lg text-text-main">How do I place an order?</h3>
              <p class="mt-2">You can browse our categories, add items to your cart, and proceed to checkout securely.</p>
            </div>
            <div>
              <h3 class="font-semibold text-lg text-text-main">What payment methods do you accept?</h3>
              <p class="mt-2">We accept Cash on Delivery (COD), bKash, Nagad, and all major credit/debit cards.</p>
            </div>
            <div>
              <h3 class="font-semibold text-lg text-text-main">How long does delivery take?</h3>
              <p class="mt-2">Standard delivery within Dhaka takes 24 hours. Outside Dhaka, it may take 2-3 business days.</p>
            </div>
`;

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text-main mb-8 text-center">Frequently Asked Questions</h1>
          
          <EditablePageContent slug="faq" defaultHtmlContent={defaultContent} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
