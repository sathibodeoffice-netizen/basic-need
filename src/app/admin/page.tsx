import React from 'react';

export default function AdminDashboardPage() {
  const stats = [
    { name: 'Total Sales', value: '৳0.00', change: '+0%' },
    { name: 'Total Orders', value: '0', change: '+0%' },
    { name: 'Total Products', value: '0', change: '0%' },
    { name: 'Total Customers', value: '0', change: '+0%' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-main mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-surface p-6 rounded-lg border border-border shadow-sm">
            <p className="text-sm font-medium text-text-light">{stat.name}</p>
            <div className="flex items-baseline mt-2">
              <p className="text-3xl font-semibold text-text-main">{stat.value}</p>
              <span className={`ml-2 text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-surface border border-border rounded-lg shadow-sm p-6 h-96 flex items-center justify-center">
        <p className="text-text-light">Chart will be displayed here (Demo Data)</p>
      </div>
    </div>
  );
}
