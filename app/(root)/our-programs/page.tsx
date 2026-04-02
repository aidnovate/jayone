'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './style.module.css';
import OtherPagesHero from '../../components/OtherPagesHero';
import Footer from '../../components/Footer';
import axios from 'axios';
import Skeleton from '../../components/Skeleton';

const PROGRAMS_API = 'https://jayone-87f0a69e6159.herokuapp.com/api/programs/';


export default function Programs() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get(PROGRAMS_API)
      .then(res => {
        setPrograms(res.data.programs || []);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load programs.');
        setPrograms([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <OtherPagesHero
        title="Our Programs"
        subtitle="Choose Your Path. Begin Your Legacy."
        backgroundImage="images/programs.jpeg"
      />
      <section className={styles.programs}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height={180} />)
        ) : error ? (
          <div style={{ color: 'red', textAlign: 'center', width: '100%' }}>{error}</div>
        ) : programs.length === 0 ? (
          <div style={{ textAlign: 'center', width: '100%' }}>No programs found.</div>
        ) : (
          programs.map((program: any) => (
            <div key={program._id} className={styles.card}>
              <h2>{program.name}</h2>
              <p>{program.description}</p>
              <Link href={`/our-programs/${program._id}`}>
                <button>Read More</button>
              </Link>
            </div>
          ))
        )}
      </section>
      <Footer />
    </>
  );
}