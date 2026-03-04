import React from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';

export default function BlogsPage() {
  return (
    <DashboardLayout active="Blogs">
      <h1>Blogs</h1>
      <p style={{marginTop: '1.5rem', color: '#b3b3b3'}}>Manage and view all blog posts here.</p>
    </DashboardLayout>
  );
}
