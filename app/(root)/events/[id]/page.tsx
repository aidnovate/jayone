'use client'

import React, { useEffect, useState } from 'react';
import styles from './../style.module.css';
import OtherPagesHero from '../../../components/OtherPagesHero';
import Footer from '../../../components/Footer';
import axios from 'axios';
import Skeleton from '../../../components/Skeleton';

const EVENTS_API = 'https://jayone-87f0a69e6159.herokuapp.com/api/events/';

export default function SingleEventPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get(EVENTS_API + id)
      .then(res => {
        setEvent(res.data.event);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load event.');
        setEvent(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <OtherPagesHero title={event?.title || 'Event'} subtitle={event?.description || ''} backgroundImage={event?.imageUrl || '/images/events.jpeg'} />
      <section className={styles.events} style={{ minHeight: 400, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        {loading ? (
          <Skeleton height={350} width={600} />
        ) : error ? (
          <div style={{ color: 'red', textAlign: 'center', width: '100%' }}>{error}</div>
        ) : !event ? (
          <div style={{ textAlign: 'center', width: '100%' }}>Event not found.</div>
        ) : (
          <article style={{ maxWidth: 600, width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 24 }}>
            {event.imageUrl && <img src={event.imageUrl} alt={event.title} style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} />}
            <h1 style={{ fontSize: 32, marginBottom: 12 }}>{event.title}</h1>
            <div style={{ color: '#666', marginBottom: 24 }}>{event.date}</div>
            <p style={{ color: '#666', marginBottom: 24 }}>{event.description}</p>
            <div style={{ fontSize: 18, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: event.details || '' }} />
          </article>
        )}
      </section>
      <Footer />
    </>
  );
}
