import DashboardLayout from '../components/Layout/DashboardLayout';
import React from 'react';

import BlogTable from '../components/BlogTable/BlogTable';
export default function BlogsPage() { 
  return (
    <DashboardLayout active="Blogs">
      <BlogTable />
    </DashboardLayout>
  );
}
