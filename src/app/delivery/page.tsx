import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import EditablePageContent from '@/components/EditablePageContent';

export const metadata: Metadata = {
  title: 'Delivery Information | Basic Need',
  description: 'Delivery Information and Shipping Policies.',
};

const defaultContent = `
            <p>We strive to deliver your everyday essentials as quickly and safely as possible.</p>
            <h3 class="font-semibold text-lg text-text-main mt-4">Inside Dhaka</h3>
            <p>Orders placed before 2 PM are eligible for same-day delivery. Standard delivery takes 24 hours.</p>
            <h3 class="font-semibold text-lg text-text-main mt-4">Outside Dhaka</h3>
            <p>Deliveries outside Dhaka are handled by third-party logistics and typically take 2-4 business days.</p>
            <h3 class="font-semibold text-lg text-text-main mt-4">Delivery Charges</h3>
            <p>Inside Dhaka: ৳60. Outside Dhaka: ৳120. Free delivery on orders over ৳2000!</p>
`;

export default function DeliveryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text-main mb-8 text-center">Delivery Information</h1>
          
          <EditablePageContent slug="delivery" defaultHtmlContent={defaultContent} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
