"use client"

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Pencil, Trash2, Eye, Plus } from 'lucide-react';
import styles from './EventTable.module.css';
import Modal from './Modal';
import Button from '@/app/components/Button';

const EventEditor = dynamic(() => import('./EventEditor'), { ssr: false });

const initialEvents = [
  {
    id: 1,
    title: 'Fashion Business Workshop',
    date: '2026-03-10',
    image: '/images/hero1.jpg',
    content: 'A hands-on workshop for aspiring fashion entrepreneurs.'
  },
  {
    id: 2,
    title: 'Tailoring Masterclass',
    date: '2026-04-15',
    image: '/images/hero2.jpg',
    content: 'Learn advanced tailoring techniques from industry experts.'
  }
];

export default function EventTable() {
  const [events, setEvents] = useState(initialEvents);
  const [modal, setModal] = useState<'upload'|'view'|'edit'|'delete'|null>(null);
  const [selected, setSelected] = useState<any>(null);

  const openModal = (type: 'upload'|'view'|'edit'|'delete', event?: any) => {
    setSelected(event || null);
    setModal(type);
  };
  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  const handleSave = (data: { title: string; date: string; image: string; content: string }) => {
    // For demo, just close modal. You can add logic to update events.
    closeModal();
  };

  return (
    <>


        <div className={styles.header}>
          <h2>Events</h2>
          <Button variant='primary' size='md' onClick={() => openModal('upload')}>
          <Plus size={18} style={{marginRight:'0.05rem'}} /> Upload Event
        </Button>
        </div>
   
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Image</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.date}</td>
              <td><img src={event.image} alt={event.title} className={styles.image} /></td>
              <td>{event.content}</td>
              <td>
                <button className={styles.actionBtn} title="View" onClick={() => openModal('view', event)}><Eye size={18} /></button>
                <button className={styles.actionBtn} title="Edit" onClick={() => openModal('edit', event)}><Pencil size={18} /></button>
                <button className={styles.actionBtn} title="Delete" onClick={() => openModal('delete', event)}><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={modal==='upload'} onClose={closeModal} title="Upload Event">
        <EventEditor initialContent="" onSave={handleSave} />
      </Modal>
      <Modal open={modal==='view'} onClose={closeModal} title="Event Details">
        {selected && (
          <div>
            <h3>{selected.title}</h3>
            <div><strong>Date:</strong> {selected.date}</div>
            <img src={selected.image} alt={selected.title} style={{width:'100%',maxWidth:'320px',borderRadius:'8px',margin:'1rem 0'}} />
            <div><strong>Content:</strong></div>
            <div style={{marginTop:'0.5rem'}}>{selected.content}</div>
          </div>
        )}
      </Modal>
      <Modal open={modal==='edit'} onClose={closeModal} title="Edit Event">
        <EventEditor initialContent={selected?.content} onSave={handleSave} />
      </Modal>
      <Modal open={modal==='delete'} onClose={closeModal} title="Delete Event">
        <div>Are you sure you want to delete <strong>{selected?.title}</strong>?</div>
        <div style={{marginTop:'1.5rem',display:'flex',gap:'1rem', justifyContent:"center"}}>
          <Button variant='primary' onClick={closeModal}>Delete</Button>
          <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        </div>
      </Modal>
    </>
  );
}
