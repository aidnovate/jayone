'use client'

import DashboardLayout from './../components/Layout/DashboardLayout';
import EventTable from './../components/EventTable/EventTable';

export default function EventsPage() {
  return (
    <DashboardLayout active="Events">
      <EventTable />
    </DashboardLayout>
  );
}
