import React from 'react';
import EventCard from '../../components/EventCard/index';
import styles from './style.module.css';
import OtherPagesHero from '../../components/OtherPagesHero';
import Footer from '../../components/Footer';

const events = [
  {
    id: 1,
    title: 'Fashion Business Workshop',
    date: '2026-03-10',
    description: 'A hands-on workshop for aspiring fashion entrepreneurs.',
    image: '/images/hero1.jpg',
  },
  {
    id: 2,
    title: 'Tailoring Masterclass',
    date: '2026-04-15',
    description: 'Learn advanced tailoring techniques from industry experts.',
    image: '/images/hero2.jpg',
  },
  {
    id: 3,
    title: 'Student Showcase',
    date: '2026-05-20',
    description: 'See the best works from our talented students.',
    image: '/images/hero3.jpg',
  },
  {
    id: 4,
    title: 'Fashion Trends Seminar',
    date: '2026-06-05',
    description: 'Stay updated with the latest in fashion trends.',
    image: '/images/hero4.png',
  },
];

export default function EventsPage() {
  return (
    <>
      <head>
        {/* Event Schema for first event */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": events[0].title,
              "startDate": events[0].date,
              "description": events[0].description,
              "image": `https://jayone.com${events[0].image}`,
              "location": {
                "@type": "Place",
                "name": "Jayone Prestige School of Fashion",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Kwadaso Estate",
                  "addressLocality": "Kumasi",
                  "addressRegion": "Ashanti",
                  "postalCode": "00233",
                  "addressCountry": "GH"
                }
              },
              "organizer": {
                "@type": "Organization",
                "name": "Jayone Prestige School of Fashion",
                "url": "https://jayone.com"
              }
            })
          }}
        />
        {/* FAQPage Schema */}
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
                  "name": "How can I attend Jayone events?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Visit our website and register for upcoming events or workshops."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are Jayone events open to the public?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, most events are open to the public. Check event details for specifics."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <OtherPagesHero title="Events & Workshops" subtitle="Join our upcoming events and workshops to enhance your fashion skills and network with industry professionals." backgroundImage="/images/events.jpeg" />
      <section className={styles.events} aria-label="Events">
        {events.map(event => (
          <EventCard key={event.id} {...event} id={event.id} />
        ))}
      </section>
      <Footer />
    </>
  );
}
