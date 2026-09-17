'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchMyOrders();
    }
  }, [status, router]);

  const fetchMyOrders = async () => {
    try {
      const res = await fetch('/api/orders/myorders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-text-main">My Dashboard</h1>
            <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <div className="bg-surface rounded-lg shadow-sm border border-border p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Profile Info</h2>
                <div className="space-y-4">
                  <div>
                    <span className="text-text-light text-sm">Name</span>
                    <p className="font-medium">{session?.user?.name}</p>
                  </div>
                  <div>
                    <span className="text-text-light text-sm">Email</span>
                    <p className="font-medium">{session?.user?.email}</p>
                  </div>
                  <div>
                    <span className="text-text-light text-sm">Role</span>
                    <p className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-semibold mt-1">
                      {session?.user?.role || 'CUSTOMER'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="lg:col-span-3">
              <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
                <h2 className="text-xl font-semibold mb-4">Order History</h2>
                
                {isLoading ? (
                  <div className="flex justify-center p-8">
                    <Loader2 className="animate-spin text-primary w-8 h-8" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-text-light mb-4">You have not placed any orders yet.</p>
                    <Button onClick={() => router.push('/shop')}>Start Shopping</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 pb-4 border-b border-border">
                          <div>
                            <span className="text-sm text-text-light">Order ID: {order._id}</span>
                            <p className="font-medium">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-lg">৳{order.totalPrice}</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-text-light">
                          <p><span className="font-medium text-text-main">Items:</span> {order.orderItems.map((i:any) => `${i.qty}x ${i.name}`).join(', ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
