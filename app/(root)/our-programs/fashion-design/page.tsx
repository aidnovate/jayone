import React from 'react';
import styles from './style.module.css';
import OtherPagesHero from '../../../components/OtherPagesHero';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';

export default function FashionDesign() {
  return (
    <>
      <OtherPagesHero 
        title="Fashion Design"
        subtitle="Master the Art of Creative Expression and Design Innovation"
      />

      <main className={styles.container}>
        <section className={styles.overview}>
          <h1>Fashion Design Program</h1>
          <p className={styles.lead}>
            Transform your creative vision into stunning wearable art. Our Fashion Design program equips you with the skills, knowledge, and confidence to become a professional fashion designer.
          </p>
        </section>

        <section className={styles.content}>
          <div className={styles.section}>
            <h2>Program Overview</h2>
            <p>
              The Fashion Design program at Jayone Prestige School is designed for aspiring designers who want to learn the fundamentals of fashion creation. From concept to completion, you'll master the entire design process while developing your unique aesthetic and design philosophy.
            </p>
          </div>

          <div className={styles.section}>
            <h2>What You'll Learn</h2>
            <ul className={styles.list}>
              <li>Fashion design principles and theory</li>
              <li>Sketching and illustration techniques</li>
              <li>Color theory and fabric selection</li>
              <li>Garment construction and sewing mastery</li>
              <li>Designing for different body types and occasions</li>
              <li>Portfolio development and presentation</li>
              <li>Industry insights and professional practices</li>
              <li>Digital design tools and technology</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>Program Features</h2>
            <div className={styles.features}>
              <div className={styles.feature}>
                <h3>Hands-On Training</h3>
                <p>Work with premium fabrics and professional sewing equipment in our state-of-the-art studio.</p>
              </div>
              <div className={styles.feature}>
                <h3>Expert Mentorship</h3>
                <p>Learn from award-winning designers and industry professionals with decades of experience.</p>
              </div>
              <div className={styles.feature}>
                <h3>Fashion Shows</h3>
                <p>Showcase your designs in our prestigious fashion events attended by industry leaders.</p>
              </div>
              <div className={styles.feature}>
                <h3>Career Support</h3>
                <p>Get guidance on launching your fashion career, building your portfolio, and landing opportunities.</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>Program Duration & Format</h2>
            <p>
              Our comprehensive Fashion Design program is structured to accommodate your learning style. With flexible scheduling options and intensive modules, you can progress at a pace that suits your goals.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Who Should Apply?</h2>
            <p>
              This program is perfect for anyone with a passion for fashion and design. Whether you're a creative beginner or have some experience, our curriculum adapts to your level and helps you reach professional standards.
            </p>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Ready to Become a Fashion Designer?</h2>
          <p>Take the first step toward a rewarding career in fashion design. Enroll today and transform your passion into profession.</p>
          <Button href="/apply-now" variant="primary" size="lg">
            Apply Now
          </Button>
        </section>
      </main>

      <Footer />
    </>
  );
}
