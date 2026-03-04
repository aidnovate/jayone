import React from 'react';
import styles from './Sidebar.module.css';
import Link from 'next/link';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Events', href: '/dashboard/events' },
  { label: 'Blogs', href: '/dashboard/blogs' },
  { label: 'Programs', href: '/dashboard/programs' },
  { label: 'Forms', href: '/dashboard/forms' },
  { label: 'Gallery', href: '/dashboard/gallery' },
  { label: 'Admissions', href: '/dashboard/admissions' },
];

export default function Sidebar({ active }: { active?: string }) {
  return (
    <aside className={styles.sidebar}>
      <h4 className={styles.logo}>Jayone Admin</h4>
      <nav className={styles.nav}>
        <ul>
          {navItems.map(item => (
            <li key={item.href} className={active === item.label ? styles.active : ''}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
