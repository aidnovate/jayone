import DashboardLayout from '../components/Layout/DashboardLayout';
import FormsTable from '../components/FormsTable/FormsTable';
import React from 'react';

export default function FormsPage() {
  return (
    <DashboardLayout active="Forms">
      <FormsTable />
    </DashboardLayout>
  );
}
