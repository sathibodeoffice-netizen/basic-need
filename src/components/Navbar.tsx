'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, User, Search, Menu, Moon, Sun } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Input from './ui/Input';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const { data: session } = useSession();
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const totalItems = useCartStore(state => (state.items || []).reduce((total, item) => total + item.quantity, 0));

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      {/* Top Notice */}
      <div className="bg-primary text-white text-center py-1 text-xs sm:text-sm font-medium">
        Shop Online 24/7 - Your Everyday Essentials
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <img 
                src="/logo_transparent.png" 
                alt="Basic Need Logo" 
                className="h-12 w-auto object-contain dark:hidden"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <img 
                src="/logo_transparent_dark.png" 
                alt="Basic Need Logo" 
                className="h-12 w-auto object-contain hidden dark:block"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <span className="hidden text-2xl font-bold text-primary">
                Basic <span className="text-text-main">Need</span>
              </span>
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <input
              type="text"
              placeholder="Search for groceries, essentials..."
              className="w-full h-10 pl-4 pr-10 rounded-full border border-border bg-background text-text-main focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-text-light"
            />
            <button className="absolute right-3 top-2.5 text-text-light hover:text-primary">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            
            {/* Theme Toggle */}
            {mounted && (
              <button 
                onClick={toggleTheme} 
                className="text-text-light hover:text-primary transition-colors focus:outline-none"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
            )}

            <Link href="/wishlist" className="text-text-light hover:text-primary hidden sm:block">
              <Heart className="w-6 h-6" />
            </Link>
            
            <Link href="/cart" className="text-text-light hover:text-primary relative">
              <ShoppingCart className="w-6 h-6" />
              {mounted && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="relative group">
              {session ? (
                <Link href={session.user.role === 'ADMIN' ? '/admin' : '/dashboard'} className="flex items-center gap-2 text-text-light hover:text-primary">
                  <User className="w-6 h-6" />
                  <span className="hidden md:block text-sm font-medium">Account</span>
                </Link>
              ) : (
                <Link href="/login" className="flex items-center gap-2 text-text-light hover:text-primary">
                  <User className="w-6 h-6" />
                  <span className="hidden md:block text-sm font-medium">Login</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-text-light hover:text-primary">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
