'use client'

import styles from './style.module.css'
import Image from 'next/image'
import Link from 'next/link'

const works = [
  { id: 1, image: '/images/hero1.jpg', title: 'Couture Evening Dress' },
  { id: 2, image: '/images/hero2.jpg', title: 'Bridal Collection' },
  { id: 3, image: '/images/hero3.jpg', title: 'Urban Streetwear' },
  { id: 4, image: '/images/hero1.jpg', title: 'Runway Concept' },
  { id: 5, image: '/images/hero2.jpg', title: 'Runway Concept' },
  { id: 6, image: '/images/hero3.jpg', title: 'Runway Concept' },
]

const index = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className="editorial-label">Student Works</span>
        <h2>Where Creativity Becomes Craft</h2>
      </div>

      <div className={styles.masonry}>
        {works.map((work) => (
          <div key={work.id} className={styles.item}>
            <Image
              src={work.image}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={styles.image}
            />
            <div className={styles.overlay}>
              <span>{work.title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/gallery">View Full Collection</Link>
      </div>
    </section>
  )
}

export default index