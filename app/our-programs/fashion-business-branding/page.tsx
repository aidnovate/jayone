import React from 'react';
import styles from './style.module.css';
import OtherPagesHero from '../../components/OtherPagesHero';
import Button from '../../components/Button';
import Footer from '../../components/Footer';

export default function FashionBusinessBranding() {
  return (
    <>
      <OtherPagesHero 
        title="Fashion Business & Branding"
        subtitle="Build, Scale, and Dominate Your Own Fashion Empire"
      />

      <main className={styles.container}>
        <section className={styles.overview}>
          <h1>Fashion Business & Branding Program</h1>
          <p className={styles.lead}>
            Turn your fashion passion into a profitable business. Learn entrepreneurship, brand development, marketing, and business strategy from industry experts who have successfully built and scaled premium fashion brands.
          </p>
        </section>

        <section className={styles.content}>
          <div className={styles.section}>
            <h2>Program Overview</h2>
            <p>
              This unique program bridges the gap between creative design and business acumen. Whether you dream of launching an independent brand or managing a fashion business, we equip you with the strategic knowledge and practical skills needed for success.
            </p>
          </div>

          <div className={styles.section}>
            <h2>What You'll Learn</h2>
            <ul className={styles.list}>
              <li>Brand strategy and positioning</li>
              <li>Business plan development and execution</li>
              <li>Financial management and budgeting</li>
              <li>Marketing and social media strategies</li>
              <li>E-commerce and retail operations</li>
              <li>Supply chain and inventory management</li>
              <li>Visual merchandising and store design</li>
              <li>Customer psychology and brand loyalty</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>Program Features</h2>
            <div className={styles.features}>
              <div className={styles.feature}>
                <h3>Real-World Projects</h3>
                <p>Develop your own brand concept and business plan with mentorship from successful entrepreneurs.</p>
              </div>
              <div className={styles.feature}>
                <h3>Industry Mentors</h3>
                <p>Learn directly from fashion business leaders, brand founders, and marketing strategists.</p>
              </div>
              <div className={styles.feature}>
                <h3>Business Tools</h3>
                <p>Master digital marketing, analytics, e-commerce platforms, and business management software.</p>
              </div>
              <div className={styles.feature}>
                <h3>Networking Opportunities</h3>
                <p>Connect with investors, partners, and other entrepreneurs in the fashion ecosystem.</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>Career Paths</h2>
            <p>
              Graduates launch successful fashion brands, work as marketing directors, brand managers, fashion entrepreneurs, e-commerce managers, or fashion consultants. Many build multi-million dollar businesses after completing the program.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Launch Your Brand</h2>
            <p>
              By graduation, you'll have a complete business plan, brand identity, and launch strategy ready to execute. Our alumni have launched brands featured in international publications and sold in premium boutiques worldwide.
            </p>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Ready to Build Your Fashion Empire?</h2>
          <p>Learn from the best and launch your fashion business with professional guidance and strategic support.</p>
          <Button href="/apply-now" variant="primary" size="lg">
            Apply Now
          </Button>
        </section>
      </main>

      <Footer />
    </>
  );
}
