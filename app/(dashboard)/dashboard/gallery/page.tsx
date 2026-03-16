import DashboardLayout from '../components/Layout/DashboardLayout';
import GalleryTable from '../components/Gallerytable/Gallerytable';
import React from 'react';

export default function GalleryPage() {
  return (
    <DashboardLayout active="Gallery">
      <GalleryTable />
    </DashboardLayout>
  );
}