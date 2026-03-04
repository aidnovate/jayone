import React from 'react';
import styles from './style.module.css';
import OtherPagesHero from '../../../components/OtherPagesHero';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';

export default function PatternMaking() {
  return (
    <>
      <OtherPagesHero 
        title="Pattern Making"
        subtitle="Develop Expertise in Professional Pattern Drafting and Garment Architecture"
      />

      <main className={styles.container}>
        <section className={styles.overview}>
          <h1>Pattern Making Program</h1>
          <p className={styles.lead}>
            Master the technical art of pattern drafting and become an expert in garment architecture. Transform designs into perfect-fitting garments through professional pattern-making techniques.
          </p>
        </section>

        <section className={styles.content}>
          <div className={styles.section}>
            <h2>Program Overview</h2>
            <p>
              Pattern making is the essential foundation between design and construction. Our comprehensive program teaches you to create accurate patterns for all garment types, from basic basics to complex structured pieces.
            </p>
          </div>

          <div className={styles.section}>
            <h2>What You'll Learn</h2>
            <ul className={styles.list}>
              <li>Pattern drafting fundamentals and grading systems</li>
              <li>Measurement taking and fit analysis</li>
              <li>Draping techniques on body and dress forms</li>
              <li>Pattern manipulation and modifications</li>
              <li>Size grading and scaling</li>
              <li>Industrial pattern making standards</li>
              <li>CAD software for pattern design (Gerber, Lectra)</li>
              <li>Production patterns and technical specifications</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>Program Features</h2>
            <div className={styles.features}>
              <div className={styles.feature}>
                <h3>Hands-On Practice</h3>
                <p>Work extensively with pattern paper, grading tools, and professional equipment to perfect your skills.</p>
              </div>
              <div className={styles.feature}>
                <h3>Digital & Analog Skills</h3>
                <p>Master both traditional hand-drafting and modern CAD software used by international fashion brands.</p>
              </div>
              <div className={styles.feature}>
                <h3>Industry Standards</h3>
                <p>Learn the technical specifications and standards required for professional production.</p>
              </div>
              <div className={styles.feature}>
                <h3>Expert Instruction</h3>
                <p>Train under experienced pattern makers who work for premium fashion brands globally.</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>Career Opportunities</h2>
            <p>
              Pattern makers are highly sought after by fashion companies, garment manufacturers, and design studios worldwide. Graduates pursue careers as pattern makers, graders, technical designers, and pattern masters in international fashion brands.
            </p>
          </div>

          <div className={styles.section}>
            <h2>What Makes Us Unique</h2>
            <p>
              Our pattern-making curriculum balances traditional techniques with cutting-edge digital tools, ensuring you're prepared for both artisanal and industrial environments. You'll graduate with a professional portfolio of patterns ready for production.
            </p>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Start Your Pattern Making Journey Today</h2>
          <p>Become a skilled pattern maker and open doors to international career opportunities in fashion design and manufacturing.</p>
          <Button href="/apply-now" variant="primary" size="lg">
            Apply Now
          </Button>
        </section>
      </main>

      <Footer />
    </>
  );
}
