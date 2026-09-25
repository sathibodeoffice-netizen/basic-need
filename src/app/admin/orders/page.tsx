'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [vendorSales, setVendorSales] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVendorLoading, setIsVendorLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  useEffect(() => {
    fetchOrders();
    fetchVendorSales();
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

  const fetchVendorSales = async () => {
    try {
      const res = await fetch('/api/admin/vendor-sales');
      if (res.ok) {
        const data = await res.json();
        setVendorSales(data);
      }
    } catch (error) {
      console.error('Error fetching vendor sales:', error);
    } finally {
      setIsVendorLoading(false);
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

  const updateItemVendor = async (orderId: string, itemId: string, vendor: string) => {
    try {
      const res = await fetch('/api/admin/orders/item-vendor', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, itemId, vendor }),
      });
      if (res.ok) {
        fetchOrders(); 
        fetchVendorSales();
      } else {
        alert('Failed to update vendor');
      }
    } catch (error) {
      console.error('Error updating vendor:', error);
    }
  };

  const toggleOrder = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const getVendorColor = (vendorName: string) => {
    if (vendorName === 'Meena Bazar') return 'bg-orange-100 text-orange-800 border-orange-200';
    if (vendorName === 'RFL Best Buy') return 'bg-red-100 text-red-800 border-red-200';
    if (vendorName === 'Pending') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-main mb-6">Order Management</h1>

      {/* Vendor Sales Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-text-main mb-4">Vendor Sales Summary</h2>
        {isVendorLoading ? (
          <div className="flex justify-center p-8 bg-surface rounded-lg border border-border shadow-sm">
            <Loader2 className="animate-spin text-primary w-8 h-8" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {vendorSales.map((vs) => (
              <div key={vs.vendor} className={`p-6 rounded-lg border shadow-sm ${getVendorColor(vs.vendor)}`}>
                <p className="text-sm font-semibold mb-1 uppercase tracking-wider">{vs.vendor || 'Unknown Vendor'}</p>
                <div className="mt-2 flex justify-between items-end">
                  <div>
                    <p className="text-3xl font-bold">৳{vs.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm mt-1 font-medium">{vs.totalQuantity} Pieces Sold</p>
                  </div>
                </div>
              </div>
            ))}
            {vendorSales.length === 0 && (
              <div className="col-span-4 p-6 text-center text-text-light bg-surface rounded-lg border border-border shadow-sm">
                No vendor sales data available.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-surface p-6 rounded-lg border border-border shadow-sm">
        <h2 className="text-lg font-semibold text-text-main mb-4">All Orders</h2>
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
                  <th className="py-3 px-4 font-semibold text-text-light text-center">Items (Vendor)</th>
                  <th className="py-3 px-4 font-semibold text-text-light text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(orders) ? orders : []).map((order) => (
                  <Fragment key={order._id}>
                    <tr className="border-b border-border hover:bg-black/5 dark:hover:bg-white/5">
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
                      <td className="py-3 px-4 text-center">
                        <Button variant="outline" size="sm" onClick={() => toggleOrder(order._id)}>
                          {expandedOrders.includes(order._id) ? 'Hide' : `View (${order.orderItems?.length || 0})`}
                        </Button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <select 
                          className="text-sm border border-border rounded p-1 bg-surface text-text-main focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                    {expandedOrders.includes(order._id) && (
                      <tr className="bg-black/5 dark:bg-white/5">
                        <td colSpan={8} className="p-4 border-b border-border">
                          <h4 className="font-semibold mb-3 text-text-main text-sm uppercase tracking-wide">Order Items & Vendor Assignment</h4>
                          <div className="space-y-3">
                            {order.orderItems?.map((item: any) => (
                              <div key={item._id} className="flex justify-between items-center bg-surface p-3 rounded-md border border-border shadow-sm max-w-3xl">
                                <div className="flex items-center gap-4">
                                  {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md border border-border" />
                                  ) : (
                                    <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-md"></div>
                                  )}
                                  <div>
                                    <p className="font-medium text-text-main">{item.name}</p>
                                    <p className="text-sm text-text-light">{item.qty} piece(s) x ৳{item.price}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <label className="text-sm font-medium text-text-light">Vendor:</label>
                                  <select 
                                    className={`text-sm border rounded-md p-2 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                                      ${item.vendor === 'Pending' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' : 
                                      item.vendor === 'Meena Bazar' ? 'border-orange-300 text-orange-700 bg-orange-50' : 
                                      item.vendor === 'RFL Best Buy' ? 'border-red-300 text-red-700 bg-red-50' : 
                                      'border-border bg-surface text-text-main'}`}
                                    value={item.vendor || 'Pending'}
                                    onChange={(e) => updateItemVendor(order._id, item._id, e.target.value)}
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Meena Bazar">Meena Bazar</option>
                                    <option value="RFL Best Buy">RFL Best Buy</option>
                                    <option value="Other">Other</option>
                                  </select>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-text-light">
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
