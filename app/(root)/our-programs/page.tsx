import Link from "next/link";
import styles from "./style.module.css";
import OtherPagesHero from "../../components/OtherPagesHero";
import Footer from "../../components/Footer";

const programs = [
  {
    id: "fashion-design",
    name: "Fashion Design",
    description: "Advanced creative design and garment construction."
  },
  {
    id: "tailoring-garment-technology",
    name: "Tailoring & Garment Technology",
    description: "Precision tailoring and production mastery."
  },
  {
    id: "pattern-making",
    name: "Pattern Making",
    description: "Professional pattern drafting and garment architecture."
  },
  {
    id: "fashion-business-branding",
    name: "Fashion Business & Branding",
    description: "Build and scale your own fashion brand."
  }
];

export default function Programs() {
  return (
    <>
      <head>
        {/* FAQPage Schema for Programs */}
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
                  "name": "What programs are available at Jayone?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Fashion Design, Tailoring & Garment Technology, Pattern Making, Fashion Business & Branding."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I apply for a program?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Visit our Apply Now page and complete the application form."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <OtherPagesHero
        title="Our Programs"
        subtitle="Choose Your Path. Begin Your Legacy."
        backgroundImage="images/programs.jpeg"
      />

      <section className={styles.programs}>
        {programs.map((program, index) => (
          <div key={index} className={styles.card}>
            <h2>{program.name}</h2>
            <p>{program.description}</p>
            <Link href={`/our-programs/${program.id}`}>
              <button>Read More</button>
            </Link>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}