import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-text-main mb-6">
              Everything You Need, <span className="text-primary">Anytime.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-light mb-8 max-w-2xl mx-auto">
              Discover everyday essentials, groceries, personal care products, and household items in one convenient online shop.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/shop">
                <Button size="lg" className="px-8">Shop Now</Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="px-8">Explore Categories</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="font-semibold text-text-main">24/7 Ordering</h3>
              </div>
              <div>
                <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                </div>
                <h3 className="font-semibold text-text-main">Quality Products</h3>
              </div>
              <div>
                <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="font-semibold text-text-main">Secure Checkout</h3>
              </div>
              <div>
                <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
                <h3 className="font-semibold text-text-main">Fast Delivery</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories (Mock) */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-main">Shop by Category</h2>
              <p className="text-text-light mt-2">Find what you need from our top categories.</p>
            </div>
            <Link href="/categories" className="hidden sm:block text-primary font-medium hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {['Grocery', 'Fresh Food', 'Personal Care', 'Home & Cleaning', 'Baby Care', 'Emergency'].map((cat, i) => (
              <div key={i} className="bg-surface border border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary hover:shadow-md transition-all">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full mb-3 flex items-center justify-center text-gray-400">
                  img
                </div>
                <h3 className="font-medium text-sm text-text-main">{cat}</h3>
              </div>
            ))}
          </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}
