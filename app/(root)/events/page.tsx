'use client'

import React, { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard';
import styles from './style.module.css';
import OtherPagesHero from '../../components/OtherPagesHero';
import Footer from '../../components/Footer';
import axios from 'axios';
import Skeleton from '../../components/Skeleton';

const EVENTS_API = 'https://jayone-87f0a69e6159.herokuapp.com/api/events/';


export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get(EVENTS_API)
      .then(res => {
        setEvents(res.data.events || []);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load events.');
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <OtherPagesHero title="Events & Workshops" subtitle="Join our upcoming events and workshops to enhance your fashion skills and network with industry professionals." backgroundImage="/images/events.jpeg" />
      <section className={styles.events} aria-label="Events">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height={250} />)
        ) : error ? (
          <div style={{ color: 'red', textAlign: 'center', width: '100%' }}>{error}</div>
        ) : events.length === 0 ? (
          <div style={{ textAlign: 'center', width: '100%' }}>No events found.</div>
        ) : (
          events.map((event: any) => (
            <EventCard key={event._id} id={event._id} title={event.title} date={event.date} description={event.description} image={event.imageUrl || '/images/hero1.jpg'} />
          ))
        )}
      </section>
      <Footer />
    </>
  );
}
