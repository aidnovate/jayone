'use client'

import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import OtherPagesHero from '@/app/components/OtherPagesHero';
import Footer from '@/app/components/Footer';

interface GalleryImage {
  url: string;
  public_id: string;
}

interface Gallery {
  heading: string;
  images: GalleryImage[];
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  useEffect(() => {
    fetch('https://jayone-87f0a69e6159.herokuapp.com/api/galleries')
      .then(res => res.json())
      .then(data => setGalleries(data));
  }, []);

  return (
    <>
      <OtherPagesHero
        title="Gallery"
        subtitle="Explore moments from our campus life, events, and student projects."
        backgroundImage="/images/hero5.png"
      />
      <main>
        {galleries.length === 0 ? (
          <div className={styles.title}>No galleries found.</div>
        ) : (
          galleries.map((gallery, idx) => (
            <section key={idx}>
              <div className={styles.title}>{gallery.heading}</div>
              <div className={styles.gallery}>
                {gallery.images.map((img, i) => (
                  <div key={img.public_id} style={{ position: 'relative' }} tabIndex={0} aria-label={`Gallery image ${i+1}`}>
                    <img src={img.url} alt={`Gallery ${idx + 1} Image ${i + 1}`} className={styles.image} />
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, width: '100%', height: '100%',
                      background: 'linear-gradient(180deg,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0.18) 100%)',
                      pointerEvents: 'none', borderRadius: '18px'
                    }}></div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}
