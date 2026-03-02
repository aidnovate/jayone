import React from 'react';
import styles from './style.module.css';
import OtherPagesHero from '../../components/OtherPagesHero';
import Button from '../../components/Button';
import Footer from '../../components/Footer';

export default function TailoringGarmentTechnology() {
  return (
    <>
      <OtherPagesHero 
        title="Tailoring & Garment Technology"
        subtitle="Master Precision Craftsmanship and Modern Production Techniques"
      />

      <main className={styles.container}>
        <section className={styles.overview}>
          <h1>Tailoring & Garment Technology Program</h1>
          <p className={styles.lead}>
            Achieve excellence in precision tailoring and advanced garment production. Our comprehensive program combines traditional craftsmanship with modern technology to create industry-ready professionals.
          </p>
        </section>

        <section className={styles.content}>
          <div className={styles.section}>
            <h2>Program Overview</h2>
            <p>
              This award-winning program focuses on perfecting the art and science of tailoring. Learn from master tailors how to create perfectly fitted garments while mastering cutting-edge production technologies used by international fashion houses.
            </p>
          </div>

          <div className={styles.section}>
            <h2>What You'll Learn</h2>
            <ul className={styles.list}>
              <li>Hand-stitching and finishing techniques</li>
              <li>Machine operation and industrial sewing</li>
              <li>Alterations and bespoke tailoring</li>
              <li>Quality control and garment testing</li>
              <li>Production planning and optimization</li>
              <li>Fabric handling and preparation</li>
              <li>Seam allowance and hem techniques</li>
              <li>Custom fitting and measurements</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>Program Features</h2>
            <div className={styles.features}>
              <div className={styles.feature}>
                <h3>Industrial Equipment</h3>
                <p>Train on professional-grade sewing machines and equipment used in fashion manufacturing worldwide.</p>
              </div>
              <div className={styles.feature}>
                <h3>Master Tailors</h3>
                <p>Learn from experienced tailors who have worked with luxury brands and international designers.</p>
              </div>
              <div className={styles.feature}>
                <h3>Production Management</h3>
                <p>Understand production workflows, efficiency, and quality standards in modern garment factories.</p>
              </div>
              <div className={styles.feature}>
                <h3>Certification</h3>
                <p>Earn recognized certifications that open doors to employment in fashion manufacturing globally.</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>Career Opportunities</h2>
            <p>
              Graduates find careers as master tailors, production supervisors, quality controllers, alterations specialists, and custom garment makers in fashion companies, boutiques, and independent businesses worldwide.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Program Structure</h2>
            <p>
              Our program combines classroom theory with extensive hands-on practice. You'll work on real projects, manage production challenges, and build a professional portfolio showcasing your tailoring expertise.
            </p>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Ready to Master Precision Tailoring?</h2>
          <p>Join our elite tailoring program and launch a successful career in garment manufacturing and bespoke tailoring.</p>
          <Button href="/apply-now" variant="primary" size="lg">
            Apply Now
          </Button>
        </section>
      </main>

      <Footer />
    </>
  );
}
