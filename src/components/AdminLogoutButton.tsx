'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminLogoutButton() {
  return (
    <div className="p-4 border-t border-border">
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="flex items-center w-full px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-md transition-colors"
      >
        <LogOut className="mr-3 h-5 w-5" />
        Logout
      </button>
    </div>
  );
}
