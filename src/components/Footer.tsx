import React from 'react';
import Link from 'next/link';
import connectToDatabase from '@/lib/db';
import Settings from '@/models/Setting';

export default async function Footer() {
  let settings = null;
  try {
    await connectToDatabase();
    settings = await Settings.findOne();
  } catch (error) {
    console.error('Failed to fetch settings for footer:', error);
  }

  const contactEmail = settings?.contactEmail || 'support@basicneed.com';
  const contactPhone = settings?.contactPhone || '+880 1234 567890';
  const contactAddress = settings?.contactAddress || 'Dhaka, Bangladesh';
  const aboutText = settings?.aboutText || 'Your Everyday Essentials, Anytime. \nআপনার প্রতিদিনের প্রয়োজন, এখন এক জায়গায়।';

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-primary mb-4">Basic Need</h3>
            <p className="text-text-light text-sm mb-4 whitespace-pre-line">
              {aboutText}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-text-main mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-text-light">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/shop" className="hover:text-primary">Shop All</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-text-main mb-4">Customer Policies</h4>
            <ul className="space-y-2 text-sm text-text-light">
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
              <li><Link href="/delivery" className="hover:text-primary">Delivery Information</Link></li>
              <li><Link href="/returns" className="hover:text-primary">Return & Refund</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-text-main mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-text-light">
              <li>{contactEmail}</li>
              <li>{contactPhone}</li>
              <li>{contactAddress}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-text-light">
          <p>&copy; {new Date().getFullYear()} Basic Need. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
