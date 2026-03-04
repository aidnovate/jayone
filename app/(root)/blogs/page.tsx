import React from 'react';
import BlogCard from '../../components/BlogCard';
import styles from './style.module.css';
import OtherPagesHero from '../../components/OtherPagesHero';
import Footer from '../../components/Footer';

const blogPosts = [
  {
    id: 1,
    title: 'How to Start a Fashion Brand',
    summary: 'Learn the essentials of launching your own fashion brand from scratch.',
    image: '/images/hero1.jpg',
  },
  {
    id: 2,
    title: 'Top Tailoring Techniques',
    summary: 'Discover the best tailoring techniques used by professionals.',
    image: '/images/hero2.jpg',
  },
  {
    id: 3,
    title: 'Student Success Stories',
    summary: 'Read inspiring stories from our successful graduates.',
    image: '/images/hero3.jpg',
  },
  {
    id: 4,
    title: 'Upcoming Fashion Trends',
    summary: 'Stay ahead with the latest trends in the fashion industry.',
    image: '/images/hero4.png',
  },
];

export default function BlogPage() {
  return (
    <>
      <head>
        {/* BlogPosting Schema for first blog post */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": blogPosts[0].title,
              "description": blogPosts[0].summary,
              "image": `https://jayone.com${blogPosts[0].image}`,
              "author": {
                "@type": "Organization",
                "name": "Jayone Prestige School of Fashion"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Jayone Prestige School of Fashion",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://jayone.com/images/hero1.jpg"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://jayone.com/blogs"
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
                  "name": "What programs does Jayone offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Fashion Design, Tailoring & Garment Technology, Pattern Making, Fashion Business & Branding."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Where is Jayone located?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Kwadaso Estate, Kumasi, Ashanti Region, Ghana."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <OtherPagesHero title="Our Blog" subtitle="Insights, tips, and stories from the world of fashion education." backgroundImage="/images/hero5.png" />
      <section className={styles.blogs} aria-label="Blog Posts">
        {blogPosts.map(post => (
          <BlogCard key={post.id} {...post} />
        ))}
      </section>
      <Footer />
    </>
  );
}
