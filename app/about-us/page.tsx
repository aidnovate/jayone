import { NextPage } from "next";
import styles from "./style.module.css";
import Footer from "../components/Footer";
import OtherPagesHero from "../components/OtherPagesHero";

const About: NextPage = () => {
  return (
    <>
      <OtherPagesHero 
        title="About The Institution"
        subtitle="Where Excellence Is Designed."
      />

      <main className={styles.about}>

        {/* Story Section */}
        <section className={styles.story}>
          <div className={styles.storyText}>
            <span className={styles.label}>Our Legacy</span>
            <h2>
              A Tradition of <span>Excellence</span> Since 1995
            </h2>
            <p>
              What began as a bold vision has evolved into a globally respected
              institution shaping the next generation of leaders. For decades,
              we have combined discipline, creativity, and innovation to
              redefine what education means.
            </p>
          </div>

          <div className={styles.storyImage}>
            <img src="/images/hero1.jpg" alt="School Campus" />
          </div>
        </section>

        {/* Founder Section */}
        <section className={styles.founder}>
          <div className={styles.founderImageWrap}>
            <img src="/images/ceo.jpg" alt="Founder" />
          </div>

          <div className={styles.founderText}>
            <span className={styles.label}>Founder</span>
            <h2>
              Vision Begins With <span>One Bold Idea</span>
            </h2>
            <p>
              Founded by Jane Doe, this institution was built on the belief
              that education must inspire transformation. Her philosophy —
              discipline meets imagination — continues to guide every program.
            </p>
          </div>
        </section>

        {/* Mission / Vision */}
        <section className={styles.philosophy}>
          <div className={styles.philosophyGrid}>
            <div>
              <h3>Mission</h3>
              <p>
                To cultivate intellect, creativity, and leadership within a
                transformative environment.
              </p>
            </div>

            <div>
              <h3>Vision</h3>
              <p>
                To become a global symbol of excellence in modern education.
              </p>
            </div>
          </div>
        </section>

        {/* Prestige Stats */}
        <section className={styles.stats}>
          <div>
            <h2>30+</h2>
            <span>Years of Excellence</span>
          </div>
          <div>
            <h2>90%</h2>
            <span>University Placement</span>
          </div>
          <div>
            <h2>5x</h2>
            <span>National STEM Champions</span>
          </div>
        </section>

        {/* Immersive Gallery */}
        <section className={styles.gallerySection}>
          <h2>Our Learning Spaces</h2>

          <div className={styles.gallery}>
            <img src="/images/hero1.jpg" alt="" />
            <img src="/images/hero2.jpg" alt="" />
            <img src="/images/hero3.jpg" alt="" />
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default About;