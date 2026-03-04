import React from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';

export default function FormsPage() {
  return (
    <DashboardLayout active="Forms">
      <h1>Forms</h1>
      <p style={{marginTop: '1.5rem', color: '#b3b3b3'}}>Manage and view all forms here.</p>
    </DashboardLayout>
  );
}
