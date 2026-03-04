import DashboardLayout from '../components/Layout/DashboardLayout';
import React from 'react';

export default function ProgramsPage() {
  return (
    <>
      <DashboardLayout active="Programs">
        <ProgramComponent />
      </DashboardLayout>
    </>
  );
}
import ProgramComponent from '../components/ProgramComponent/ProgramComponent';
