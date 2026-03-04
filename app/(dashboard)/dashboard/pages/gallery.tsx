import React from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';

export default function GalleryPage() {
  return (
    <DashboardLayout active="Gallery">
      <h1>Gallery</h1>
      <p style={{marginTop: '1.5rem', color: '#b3b3b3'}}>Manage and view all gallery images here.</p>
    </DashboardLayout>
  );
}
