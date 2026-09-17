'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status }),
      });
      if (res.ok) {
        fetchOrders(); // Refresh
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-main mb-6">Order Management</h1>

      <div className="bg-surface p-6 rounded-lg border border-border shadow-sm">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="animate-spin text-primary w-8 h-8" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 font-semibold text-text-light">Order ID</th>
                  <th className="py-3 px-4 font-semibold text-text-light">Customer</th>
                  <th className="py-3 px-4 font-semibold text-text-light">Date</th>
                  <th className="py-3 px-4 font-semibold text-text-light">Total</th>
                  <th className="py-3 px-4 font-semibold text-text-light">Payment</th>
                  <th className="py-3 px-4 font-semibold text-text-light">Status</th>
                  <th className="py-3 px-4 font-semibold text-text-light text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-border hover:bg-gray-50">
                    <td className="py-3 px-4 text-xs">{order._id}</td>
                    <td className="py-3 px-4">{order.user?.name || order.shippingAddress?.fullName}</td>
                    <td className="py-3 px-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4">৳{order.totalPrice}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-semibold">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <select 
                        className="text-sm border border-border rounded p-1"
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Ready for Delivery">Ready for Delivery</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-text-light">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
