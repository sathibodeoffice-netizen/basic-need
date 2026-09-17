import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function WishlistPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-text-main mb-8">My Wishlist</h1>

          <div className="bg-surface p-12 text-center rounded-lg border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-text-main">Your wishlist is empty</h2>
            <p className="text-text-light mb-6">Looks like you haven't added anything to your wishlist yet.</p>
            <Link href="/shop">
              <Button>Explore Products</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
