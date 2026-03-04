import React from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';

export default function DashboardHome() {
  return (
    <DashboardLayout active="Dashboard">
      <h1>Welcome to Jayone Admin Dashboard</h1>
      <p style={{marginTop: '1.5rem', color: '#b3b3b3'}}>Select a section from the sidebar to get started.</p>
    </DashboardLayout>
  );
}
