'use client'

import '@/app/globals.css';
import './styles/Auth.module.css';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    // Allow access to login page without token
    if (pathname === '/dashboard/admin-login') return;
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.replace('/dashboard/admin-login');
      }
    }
  }, [router, pathname]);
  return <>{children}</>;
}

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
