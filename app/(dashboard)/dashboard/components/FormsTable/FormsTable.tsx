"use client";

import React, { useState } from 'react';
import styles from './FormsTable.module.css';
import axios from 'axios';
import { Trash } from 'lucide-react';
import Modal from '../EventTable/Modal';
import Button from '@/app/components/Button';

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

function Table({ data, title, onDelete }: { data: Form[], title: string, onDelete: (form: Form) => void }) {
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={8} style={{ textAlign: 'center' }}>No forms found.</td></tr>
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
                <td><button className={styles.actionBtn} title="Delete" onClick={() => onDelete(form)}> <Trash size={18} /> </button></td>
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

    const [selected, setSelected] = useState<Form | null>(null);
    const [modal, setModal] = useState<'upload'|'view'|'edit'|'delete'|null>(null);

    const openModal = (type: 'upload'|'view'|'edit'|'delete', event?: any) => {
    setSelected(event || null);
    setModal(type);
  };
  
  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

    // Delete event
  const handleDelete = async (id: string | number) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      setForms(prev => prev.filter(form => form._id !== id && form.id !== id));
      closeModal();
    } catch (err: any) {
      setError('Failed to delete form');
    }
  };

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(API_URL)
      .then(res => {
        const data = res.data;

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
          <Table data={purchased} title="Purchased Forms" onDelete={form => openModal('delete', form)} />
          <Table data={used} title="Used Forms" onDelete={form => openModal('delete', form)} />
        </>
      )}

            <Modal open={modal==='delete'} onClose={closeModal} title="Delete Event">
              <div>Are you sure you want to delete <strong>{selected?.token}</strong>?</div>
              <div style={{marginTop:'1.5rem',display:'flex',gap:'1rem', justifyContent:"center"}}>
                <Button variant='primary' onClick={() => handleDelete(selected?._id || selected?.id)}>Delete</Button>
                <Button variant='secondary' onClick={closeModal}>Cancel</Button>
              </div>
            </Modal>
    </div>
  );
}