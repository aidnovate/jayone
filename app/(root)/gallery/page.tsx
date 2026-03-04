import React from 'react';
import styles from './style.module.css';

const images = [
  '/images/gallery1.jpg',
  '/images/gallery2.jpg',
  '/images/gallery3.jpg',
  '/images/gallery4.jpg',
  '/images/gallery5.jpg',
  '/images/gallery6.jpg',
];

export default function GalleryPage() {
  return (
    <main>
      <div className={styles.title}>Gallery</div>
      <div className={styles.gallery}>
        {images.map((src, idx) => (
          <div key={idx} style={{position:'relative'}} tabIndex={0} aria-label={`Gallery image ${idx+1}`}>
            <img src={src} alt={`Gallery ${idx + 1}`} className={styles.image} />
            <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0.18) 100%)',pointerEvents:'none',borderRadius:'18px'}}></div>
          </div>
        ))}
      </div>
    </main>
  );
}
