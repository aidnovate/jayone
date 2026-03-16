"use client"

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Pencil, Trash2, Eye, Plus } from 'lucide-react';
import styles from './EventTable.module.css';
import Modal from './Modal';
import Button from '@/app/components/Button';
import eventApi from './api';

const EventEditor = dynamic(() => import('./EventEditor'), { ssr: false });




export default function EventTable() {
  const [events, setEvents] = useState<any[]>([]);
  const [modal, setModal] = useState<'upload'|'view'|'edit'|'delete'|null>(null);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function SkeletonRow() {
    return (
      <tr>
        {Array.from({ length: 5 }).map((_, i) => (
          <td key={i}>
            <div style={{
              height: 14,
              borderRadius: 6,
              background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)",
              backgroundSize: "200% 100%",
              animation: "adm-shimmer 1.4s infinite",
              width: i === 0 ? "40%" : "70%",
            }} />
          </td>
        ))}
      </tr>
    );
  }

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await eventApi.get('/api/events/');
        setEvents(res.data);
      } catch (err: any) {
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const openModal = (type: 'upload'|'view'|'edit'|'delete', event?: any) => {
    setSelected(event || null);
    setModal(type);
  };
  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  // Create event
  const handleSave = async (data: { title: string; date: string; image: File | null; content: string }) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('date', data.date);
      formData.append('content', data.content);
      if (data.image) {
        formData.append('image', data.image);
      }


      const res = await eventApi.post('/api/events/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setEvents(prev => [res.data, ...prev]);
      closeModal();
    } catch (err: any) {
      setError('Failed to create event');
    }
  };

  // Delete event
  const handleDelete = async (id: string | number) => {
    try {
      await eventApi.delete(`/API/events/${id}`);
      setEvents(prev => prev.filter(event => event._id !== id && event.id !== id));
      closeModal();
    } catch (err: any) {
      setError('Failed to delete event');
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Events</h2>
        <Button variant='primary' size='md' onClick={() => openModal('upload')}>
          <Plus size={18} style={{marginRight:'0.05rem'}} /> Upload Event
        </Button>
      </div>
      {loading && (
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
            {Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
          </tbody>
        </table>
      )}
      {error && <div style={{color:'red'}}>{error}</div>}
      {!loading && events.length === 0 && !error && (
        <div style={{margin:'2rem 0', textAlign:'center', color:'#888'}}>No events found.</div>
      )}
      {!loading && events.length > 0 && (
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
            {events.map(event => {
              let imageUrl = event.image;
              if (imageUrl && !/^https?:\/\//.test(imageUrl)) {
                if (imageUrl.startsWith('/uploads') || imageUrl.startsWith('/static')) {
                  imageUrl = `https://jayone-87f0a69e6159.herokuapp.com${imageUrl}`;
                } else {
                  imageUrl = `https://jayone-87f0a69e6159.herokuapp.com${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
                }
              }
              return (
                <tr key={event._id || event.id}>
                  <td>{event.title}</td>
                  <td>{event.date}</td>
                  <td>
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={event.title}
                        className={styles.image}
                        onError={e => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/placeholder.png';
                        }}
                      />
                    ) : (
                      <span style={{color:'#aaa'}}>No image</span>
                    )}
                  </td>
                  <td>
                    <div style={{maxWidth:'320px',overflow:'auto'}} dangerouslySetInnerHTML={{ __html: event.content }} />
                  </td>
                  <td>
                    <button className={styles.actionBtn} title="View" onClick={() => openModal('view', event)}><Eye size={18} /></button>
                    <button className={styles.actionBtn} title="Edit" onClick={() => openModal('edit', event)}><Pencil size={18} /></button>
                    <button className={styles.actionBtn} title="Delete" onClick={() => openModal('delete', event)}><Trash2 size={18} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <Modal open={modal==='upload'} onClose={closeModal} title="Upload Event">
        <EventEditor initialContent="" onSave={handleSave} />
      </Modal>
      <Modal open={modal==='view'} onClose={closeModal} title="Event Details">
        {selected && (
          <div>
            <h3>{selected.title}</h3>
            <div><strong>Date:</strong> {selected.date}</div>
            {selected.image && (
              <img
                src={
                  /^https?:\/\//.test(selected.image)
                    ? selected.image
                    : selected.image.startsWith('/uploads') || selected.image.startsWith('/static')
                      ? `https://jayone-87f0a69e6159.herokuapp.com${selected.image}`
                      : `https://jayone-87f0a69e6159.herokuapp.com${selected.image.startsWith('/') ? selected.image : '/' + selected.image}`
                }
                alt={selected.title}
                style={{width:'100%',maxWidth:'320px',borderRadius:'8px',margin:'1rem 0'}}
                onError={e => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/placeholder.png';
                }}
              />
            )}
            <div><strong>Content:</strong></div>
            <div style={{marginTop:'0.5rem'}} dangerouslySetInnerHTML={{ __html: selected.content }} />
          </div>
        )}
      </Modal>
      <Modal open={modal==='edit'} onClose={closeModal} title="Edit Event">
        <EventEditor initialContent={selected?.content} onSave={handleSave} />
      </Modal>
      <Modal open={modal==='delete'} onClose={closeModal} title="Delete Event">
        <div>Are you sure you want to delete <strong>{selected?.title}</strong>?</div>
        <div style={{marginTop:'1.5rem',display:'flex',gap:'1rem', justifyContent:"center"}}>
          <Button variant='primary' onClick={() => handleDelete(selected?._id || selected?.id)}>Delete</Button>
          <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        </div>
      </Modal>
    </>
  );
}
