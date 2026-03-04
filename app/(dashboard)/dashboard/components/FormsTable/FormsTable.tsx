"use client";

import React, { useState } from 'react';
import styles from './FormsTable.module.css';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

const forms = [
  { fullname: 'Jane Doe', email: 'jane@example.com', phone: '1234567890', serial: 'SN123', pin: 'PIN001', year: 2026, used: true },
  { fullname: 'John Smith', email: 'john@example.com', phone: '0987654321', serial: 'SN124', pin: 'PIN002', year: 2026, used: false },
  { fullname: 'Alice Lee', email: 'alice@example.com', phone: '5555555555', serial: 'SN125', pin: 'PIN003', year: 2025, used: true },
];

function Table({ data, title }: { data: typeof forms, title: string }) {
  return (
    <div style={{marginBottom:'2.5rem'}}>
      <h3 style={{marginBottom:'1rem'}}>{title}</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Serial Number</th>
            <th>Pin</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={5} style={{textAlign:'center'}}>No forms found.</td></tr>
          ) : (
            data.map((form, idx) => (
              <tr key={idx}>
                <td>{form.fullname}</td>
                <td>{form.email}</td>
                <td>{form.phone}</td>
                <td>{form.serial}</td>
                <td>{form.pin}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function FormsTable() {
  const [year, setYear] = useState(currentYear);
  const purchased = forms.filter(f => f.year === year);
  const used = forms.filter(f => f.year === year && f.used);

  return (
    <div>
      <div className={styles.filterRow}>
        <span className={styles.filterLabel}>Filter by year:</span>
        <select className={styles.filterSelect} value={year} onChange={e => setYear(Number(e.target.value))}>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
      <Table data={purchased} title="Purchased Forms" />
      <Table data={used} title="Used Forms" />
    </div>
  );
}
