import React from 'react';
import Sidebar from '../SideBar/Sidebar';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({ children, active }: { children: React.ReactNode, active?: string }) {
  return (
    <div className={styles.container}>
      <Sidebar active={active} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
