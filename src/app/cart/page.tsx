'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { Trash2, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = getTotalPrice();
  const deliveryFee = total > 0 ? 60 : 0; // Mock delivery fee

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-text-main mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="bg-surface p-12 text-center rounded-lg border border-border shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-text-light mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/shop">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="flex-1 space-y-4">
                {items.map((item) => (
                  <div key={item._id} className="bg-surface p-4 rounded-lg border border-border shadow-sm flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item._id}`} className="font-medium text-text-main hover:text-primary truncate block">
                        {item.name}
                      </Link>
                      <div className="text-primary font-bold mt-1">
                        ৳{item.discountPrice || item.price}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-border rounded-md">
                        <button 
                          className="px-3 py-1 hover:bg-gray-50 text-text-light"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          className="px-3 py-1 hover:bg-gray-50 text-text-light"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button 
                        className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                        onClick={() => removeItem(item._id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-96 flex-shrink-0">
                <div className="bg-surface p-6 rounded-lg border border-border shadow-sm sticky top-24">
                  <h2 className="text-lg font-bold text-text-main mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 text-sm text-text-main mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>৳{total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>৳{deliveryFee}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">৳{total + deliveryFee}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-6 text-lg" 
                    onClick={() => router.push('/checkout')}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
