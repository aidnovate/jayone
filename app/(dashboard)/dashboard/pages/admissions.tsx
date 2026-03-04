import React from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';

export default function AdmissionsPage() {
  return (
    <DashboardLayout active="Admissions">
      <h1>Admissions</h1>
      <p style={{marginTop: '1.5rem', color: '#b3b3b3'}}>Manage and view all admissions here.</p>
    </DashboardLayout>
  );
}
