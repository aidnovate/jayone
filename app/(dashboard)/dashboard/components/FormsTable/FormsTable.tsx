"use client";

import React, { useState } from 'react';
import styles from './FormsTable.module.css';
import axios from 'axios';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

const API_URL = 'https://jayone-87f0a69e6159.herokuapp.com/api/payments/';

interface Form {
  fullName: string;
  email: string;
  phone: string;
  serialNumber: string;
  token: string;
  year: number;
  tokenUsed: boolean;
  createdAt: string; // e.g. "2025-03-10T12:00:00Z",
  emailSend: string; // e.g. "2025-03-10T12:00:00Z",
}

function Table({ data, title }: { data: Form[], title: string }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Serial Number</th>
            <th>Pin</th>
            <th>Email Sent</th>
            <th>Pin Used</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={5} style={{ textAlign: 'center' }}>No forms found.</td></tr>
          ) : (
            data.map((form: Form, idx: number) => (
              <tr key={idx}>
                <td>{form.fullName}</td>
                <td>{form.email}</td>
                <td>{form.phone}</td>
                <td>{form.serialNumber}</td>
                <td>{form.token}</td>
                <td>{form.emailSend ? "Yes" : "No"}</td>
                <td>{form.tokenUsed ? "Yes" : "No"}</td>
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
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(API_URL)
      .then(res => {
        const data = res.data;
        console.log('Fetched forms:', data.data);
        setForms(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error loading forms');
        setLoading(false);
      });
  }, []);

  // Fix: extract the year from the createdAt date string and compare to selected year
  const filtered = Array.isArray(forms)
    ? forms.filter(f => {
        if (!f.createdAt) return false;
        return new Date(f.createdAt).getFullYear() === year;
      })
    : [];

  const purchased = filtered.filter(f => !f.tokenUsed);
  const used = filtered.filter(f => f.tokenUsed);

  console.log('Filtered forms:', filtered);

  return (
    <div>
      <div className={styles.filterRow}>
        <span className={styles.filterLabel}>Filter by year:</span>
        <select
          className={styles.filterSelect}
          value={year}
          onChange={e => setYear(Number(e.target.value))}
        >
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
      {loading ? (
        <div>Loading forms...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <>
          <Table data={purchased} title="Purchased Forms" />
          <Table data={used} title="Used Forms" />
        </>
      )}
    </div>
  );
}