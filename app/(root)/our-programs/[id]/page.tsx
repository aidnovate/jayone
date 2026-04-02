'use client'

import React, { useEffect, useState } from 'react';
import styles from '../style.module.css';
import OtherPagesHero from '../../../components/OtherPagesHero';
import Footer from '../../../components/Footer';
import axios from 'axios';
import Skeleton from '../../../components/Skeleton';

const PROGRAMS_API = 'https://jayone-87f0a69e6159.herokuapp.com/api/programs/';

export default function SingleProgramPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get(PROGRAMS_API + id)
      .then(res => {
        setProgram(res.data.program);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load program.');
        setProgram(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <OtherPagesHero title={program?.name || 'Program'} subtitle={program?.description || ''} backgroundImage={program?.imageUrl || '/images/programs.jpeg'} />
      <section className={styles.programs} style={{ minHeight: 400, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        {loading ? (
          <Skeleton height={350} width={600} />
        ) : error ? (
          <div style={{ color: 'red', textAlign: 'center', width: '100%' }}>{error}</div>
        ) : !program ? (
          <div style={{ textAlign: 'center', width: '100%' }}>Program not found.</div>
        ) : (
          <article style={{ maxWidth: 600, width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 24 }}>
            {program.imageUrl && <img src={program.imageUrl} alt={program.name} style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} />}
            <h1 style={{ fontSize: 32, marginBottom: 12 }}>{program.name}</h1>
            <p style={{ color: '#666', marginBottom: 24 }}>{program.description}</p>
            <div style={{ fontSize: 18, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: program.details || '' }} />
          </article>
        )}
      </section>
      <Footer />
    </>
  );
}
