import React from 'react';
import type { DashboardFilter } from './useDashboardStats';
import styles from './statCard.module.css';

interface StatCardProps {
  title: string;
  value: number | string;
  filter: DashboardFilter;
  onFilterChange: (filter: DashboardFilter) => void;
  filters?: DashboardFilter[];
}

const defaultFilters: DashboardFilter[] = ['Today', 'Month', 'Year'];

export default function StatCard({ 
  title, 
  value, 
  filter, 
  onFilterChange, 
  filters = defaultFilters 
}: StatCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.title}>{title}</span>
      <div className={styles.value}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      
      <div className={styles.filterGroup}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
            type="button"
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}