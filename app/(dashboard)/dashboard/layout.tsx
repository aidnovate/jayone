import '@/app/globals.css';
import './styles/Auth.module.css';
import React from 'react';

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
