import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Tags, Users, Settings, Home } from 'lucide-react';
import AdminLogoutButton from '@/components/AdminLogoutButton';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', href: '/admin/categories', icon: Tags },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Users & Admins', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
    { name: 'Back to Website', href: '/', icon: Home },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-surface border-r border-border hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-text-main hover:bg-gray-100 rounded-md transition-colors"
            >
              <item.icon className="mr-3 h-5 w-5 text-text-light" />
              {item.name}
            </Link>
          ))}
        </nav>
        <AdminLogoutButton />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {children}
      </div>
    </div>
  );
}
