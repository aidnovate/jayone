'use client'

import React from 'react';
import Link from 'next/link';
import styles from './style.module.css';
import OtherPagesHero from '../../components/OtherPagesHero';
import Footer from '../../components/Footer';
import { STATIC_PROGRAMS } from '../../data/courses';

export default function Programs() {
  const programs = STATIC_PROGRAMS;

  return (
    <>
      <OtherPagesHero
        title="Our Programs"
        subtitle="Choose Your Path. Begin Your Legacy."
        backgroundImage="images/programs.jpeg"
      />
      <section className={styles.programs}>
        {programs.length === 0 ? (
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