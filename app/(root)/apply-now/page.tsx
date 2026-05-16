import React from 'react'
import styles from './page.module.css'
import OtherPagesHero from '../../components/OtherPagesHero'
import Footer from '../../components/Footer'

export default function ApplyNow() {
  return (
    <>
      <OtherPagesHero
        title="Admission Information"
        subtitle="Your Journey to Excellence Begins Here"
      />

      <div className={styles.pageWrapper}>

        {/* Intro */}
        <section className={styles.introSection}>
          <div className={styles.sectionInner}>
            <h6 className={styles.sectionLabel}>Admission Process</h6>
            <h2 className={styles.sectionTitle}>How to Get Started</h2>
            <p className={styles.introText}>
              We appreciate your interest in our institution. We are excited to introduce you to the
              <strong> JayOne Prestige Fashion School</strong> community, and our website is a terrific location
              to learn more about everything we have to offer.
            </p>
          </div>
        </section>

        {/* How to Get Forms */}
        <section className={styles.stepsSection}>
          <div className={styles.sectionInner}>
            <h3 className={styles.subsectionTitle}>How to Get the Forms</h3>
            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>🏫</div>
                <div className={styles.stepContent}>
                  <h4>Visit the School</h4>
                  <p>Purchase your application form at the front desk of the school premises.</p>
                </div>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>💬</div>
                <div className={styles.stepContent}>
                  <h4>Via WhatsApp</h4>
                  <p>
                    Send a screenshot of your MoMo transaction to{' '}
                    <a
                      href="https://wa.me/233246759195"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      0246759195
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost & Payments */}
        <section className={styles.costSection}>
          <div className={styles.sectionInner}>
            <h3 className={styles.subsectionTitle}>Cost &amp; Payments</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.costTable}>
                <thead>
                  <tr>
                    <th>ITEMS</th>
                    <th>COST (GH¢)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Application Form</td>
                    <td className={styles.price}>130.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Note */}
        <section className={styles.noteSection}>
          <div className={styles.sectionInner}>
            <div className={styles.noteCard}>
              <h3 className={styles.noteTitle}>⚠️ Important Note</h3>
              <ul className={styles.noteList}>
                <li>Application forms should be purchased only at school premises.</li>
                <li>Filled forms should be submitted in person at school premises.</li>
                <li>Tuition fee shall be paid every year.</li>
                <li>Fees paid are not refundable.</li>
                <li>Tuition, miscellaneous &amp; maintenance fees must be paid at the office or through MoMo or at the bank.</li>
                <li>Miscellaneous covers school uniform and student ID card.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mode of Payment */}
        <section className={styles.paymentSection}>
          <div className={styles.sectionInner}>
            <h3 className={styles.subsectionTitle}>Mode of Payment</h3>
            <p className={styles.paymentIntro}>
              All fees should be paid through these payment modes below <strong>ONLY</strong>.
            </p>
            <div className={styles.warningBanner}>
              <span className={styles.warningIcon}>🚫</span>
              Paying in <strong>CASH</strong> at the school's office or campus is <strong>ALSO ACCEPTED</strong>
            </div>

            <div className={styles.paymentGrid}>
              {/* Mobile Money */}
              <div className={styles.paymentCard}>
                <div className={styles.paymentCardHeader}>
                  <span className={styles.paymentCardIcon}>📱</span>
                  <h4>Via Mobile Money</h4>
                </div>
                <div className={styles.paymentCardBody}>
                  <p className={styles.paymentLabel}>MoMo Number</p>
                  <p className={styles.paymentValue}>0246759195</p>
                </div>
              </div>

              {/* Bank */}
              <div className={styles.paymentCard}>
                <div className={styles.paymentCardHeader}>
                  <span className={styles.paymentCardIcon}>🏦</span>
                  <h4>Via Bank</h4>
                </div>
                <div className={styles.paymentCardBody}>
                  <p className={styles.paymentLabel}>Contact the school office for bank details.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accommodation */}
        <section className={styles.accommodationSection}>
          <div className={styles.sectionInner}>
            <h3 className={styles.subsectionTitle}>Accommodations <span className={styles.optionalBadge}>Optional</span></h3>
            <div className={styles.accommodationCard}>
              <div className={styles.accommodationIcon}>🏠</div>
              <div>
                <p>Hostels are available for students who need accommodation.</p>
                <a
                  href="https://wa.me/233246759195"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.enquiryBtn}
                >
                  Call for Enquiries
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Ready to Join Us?</h2>
            <p className={styles.ctaText}>
              Visit our school today and begin your fashion journey with JayOne Prestige Fashion School.
            </p>
            <a
              href="https://wa.me/233246759195"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              Chat on WhatsApp
            </a>
          </div>
        </section>

      </div>

      <Footer />
    </>
  )
}