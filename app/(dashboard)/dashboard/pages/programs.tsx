import React from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';

export default function ProgramsPage() {
  return (
    <DashboardLayout active="Programs">
      <h1>Programs</h1>
      <p style={{marginTop: '1.5rem', color: '#b3b3b3'}}>Manage and view all programs here.</p>
    </DashboardLayout>
  );
}
