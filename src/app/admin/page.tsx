'use client';

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const [vendorSales, setVendorSales] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVendorSales();
  }, []);

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
      setIsLoading(false);
    }
  };

  const getVendorColor = (vendorName: string) => {
    if (vendorName === 'Meena Bazar') return 'bg-orange-100 text-orange-800 border-orange-200';
    if (vendorName === 'RFL Best Buy') return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const stats = [
    { name: 'Total Sales', value: '৳0.00', change: '+0%' },
    { name: 'Total Orders', value: '0', change: '+0%' },
    { name: 'Total Products', value: '0', change: '0%' },
    { name: 'Total Customers', value: '0', change: '+0%' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-main mb-6">Dashboard Overview</h1>
      
      {/* Existing Dummy Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-surface p-6 rounded-lg border border-border shadow-sm opacity-60">
            <p className="text-sm font-medium text-text-light">{stat.name}</p>
            <div className="flex items-baseline mt-2">
              <p className="text-3xl font-semibold text-text-main">{stat.value}</p>
              <span className={`ml-2 text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} (Demo)
              </span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-text-main mb-4">Vendor Sales Summary</h2>
      
      {isLoading ? (
        <div className="flex justify-center p-8 bg-surface rounded-lg border border-border">
          <Loader2 className="animate-spin text-primary w-8 h-8" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Vendor Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vendorSales.map((vs) => (
              <div key={vs.vendor} className={`p-6 rounded-lg border shadow-sm ${getVendorColor(vs.vendor)}`}>
                <p className="text-sm font-semibold mb-1 uppercase tracking-wider">{vs.vendor || 'Unknown Vendor'}</p>
                <div className="mt-2">
                  <p className="text-3xl font-bold">৳{vs.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm mt-1">Products Sold: {vs.totalQuantity}</p>
                </div>
              </div>
            ))}
            {vendorSales.length === 0 && (
              <div className="col-span-3 text-center py-8 text-text-light bg-surface rounded-lg border border-border">
                No vendor sales data available yet.
              </div>
            )}
          </div>

          {/* Vendor Product Details */}
          {vendorSales.length > 0 && (
            <div className="bg-surface border border-border rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-black/5 dark:bg-white/5">
                <h3 className="font-semibold text-text-main">Products Sold by Vendor</h3>
              </div>
              <div className="p-6">
                <div className="space-y-8">
                  {vendorSales.map((vs) => (
                    <div key={vs.vendor} className="space-y-3">
                      <h4 className="font-bold text-lg border-b pb-2 flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-2 ${vs.vendor === 'Meena Bazar' ? 'bg-orange-500' : vs.vendor === 'RFL Best Buy' ? 'bg-red-500' : 'bg-gray-500'}`}></span>
                        {vs.vendor || 'Unknown Vendor'}
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="text-text-light border-b">
                              <th className="pb-2 font-medium">Product Name</th>
                              <th className="pb-2 font-medium text-right">Qty Sold</th>
                              <th className="pb-2 font-medium text-right">Revenue</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vs.products.map((p: any, idx: number) => (
                              <tr key={idx} className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/5 dark:hover:bg-white/5">
                                <td className="py-2">{p.name}</td>
                                <td className="py-2 text-right">{p.quantity}</td>
                                <td className="py-2 text-right font-medium">৳{p.revenue.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
