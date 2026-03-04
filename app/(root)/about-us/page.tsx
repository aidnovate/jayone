import { NextPage } from "next";
import styles from "./style.module.css";
import Footer from "../components/Footer";
import OtherPagesHero from "../components/OtherPagesHero";

const About: NextPage = () => {
  return (
    <>
      <head>
        {/* FAQPage Schema for About Us */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "When was Jayone founded?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Jayone Prestige School of Fashion was established in January 2020."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How many students has Jayone graduated?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Over 350 learners have graduated from Jayone since its inception."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <OtherPagesHero
        title="About The Institution"
        subtitle="Where Excellence Is Designed."
        backgroundImage="/images/hero1.png"
      />

      <main className={styles.about}>

        {/* Story Section */}
        <section className={styles.story}>
          <div className={styles.storyText}>
            <span className={styles.label}>Our Legacy</span>
            <h2>
              A Tradition of <span>Excellence</span> Since 2020
            </h2>
            <p>
              6 YEARS IN EXISTENCE
              THE SCHOOL SPUNS ITS EXPERIENCE OVER THE PAST 6 YEARS WITH TRACK RECORDS OF GRADUATING OVER 350 LEARNERS OVER THE PAST YEARS. THE SCHOOL HAS SEVERAL STUDENTS WORKING AND OPERATING AT THEIR OWN SHOPS ACROSS THE COUNTRY
            </p>
          </div>

          <div className={styles.storyImage}>
            <img src="/images/legacy.jpeg" alt="School Campus" />
          </div>
        </section>

        {/* Founder Section */}
        <section className={styles.founder}>
          <div className={styles.founderImageWrap}>
            <img src="/images/founder.jpg" alt="Founder" />
          </div>

          <div className={styles.founderText}>
            <span className={styles.label}>Founder</span>
            <h2>
              Vision Begins With <span>One Bold Idea</span>
            </h2>
            <p>
              Jayone Prestige School of fashion was established in
January 2020 with a total population of about six (6)
students, five (5) been female and one (1) male student.
The initial location was Kwadaso Siloam junction
where we occupied only one classroom. the school had
only two (2) facilitators then and no sewing machines
since students were made to come along with their own
domestic machines.
the first batch of students graduated in 2022 February
with most of the students doing well in the field.
Based on the increase in population the school had to
relocate to its current location Kwadaso estate where
we occupied about eight (8) classrooms block.
Jayone Prestige School of fashion currently runs courses
in garment and cosmetology in duration of
</p>

<ul>
  <li>2 years beginners program</li>
  <li>1 year advanced program</li>
  <li>6 months intermediate program</li>
  <li>3 months beginner program</li>
</ul>

<p>
with several students being graduated from the school,
Jayone Prestige School of fashion seeks to equip the
youth with requisite training to fit into the society with
our well trained and professional facilitators in charge.
The school currently awards students with
</p>

<ul>
  <li>National Proficiency Certificate I</li>
  <li>National Proficiency Certificate II</li>
  <li>Certificate I</li>
  <li>Certificate II</li>
</ul>


           
          </div>
        </section>

        {/* Mission / Vision */}
        <section className={styles.philosophy}>
          <div className={styles.philosophyGrid}>
            <div>
              <h3>Mission</h3>
              <p>
                To empower individuals with practical skills and knowledge in fashion and cosmetology, fostering creativity, innovation, and entrepreneurship for a brighter future.
              </p>
            </div>

            <div>
              <h3>Vision</h3>
              <p>
                To be a leading institution in fashion and cosmetology education, recognized for excellence in training, innovation, and contribution to the industry, shaping the future of fashion and beauty.
              </p>
            </div>
          </div>
        </section>

        {/* Prestige Stats */}
        <section className={styles.stats}>
          <div>
            <h2>6+</h2>
            <span>Years of Excellence</span>
          </div>
          <div>
            <h2>350+</h2>
            <span>Graduated Students</span>
          </div>
          <div>
            <h2>357+</h2>
            <span>Jobs created</span>
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