'use client'

import DashboardLayout from './components/Layout/DashboardLayout';
import React, { useState } from 'react';
import StatCard from './components/DashboardWidgets/StatCard';
import TrendChart from './components/DashboardWidgets/TrendChart';
import useDashboardStats, { DashboardFilter } from './components/DashboardWidgets/useDashboardStats';

import type { DashboardStats } from './components/DashboardWidgets/useDashboardStats';

const statConfigs: { key: keyof DashboardStats; title: string }[] = [
  { key: 'events', title: 'Events Published' },
  { key: 'forms', title: 'Forms Purchased' },
  { key: 'admissions', title: 'Admissions' },
  { key: 'blogs', title: 'Blogs Posted' },
];

export default function DashboardHome() {
  const [filter, setFilter] = useState<DashboardFilter>('Today');
  const { stats, loading, error } = useDashboardStats(filter);

  return (
    <DashboardLayout active="Dashboard">
      <div style={{ padding: 12 , width: '100%' }}>
        <h4 style={{ marginBottom: 24 }}>Welcome to Jayone Admin Dashboard</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, width: '100%' }}>
          {statConfigs.map(cfg => (
            <StatCard
              key={cfg.key}
              title={cfg.title}
              value={typeof stats?.[cfg.key] === 'number' ? stats[cfg.key] as number : 0}
              filter={filter}
              onFilterChange={setFilter}
            />
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          {loading && <div>Loading dashboard data...</div>}
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {stats && (
            <TrendChart labels={stats.formsTrend.labels} data={stats.formsTrend.data} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
