'use client'

import { useState } from 'react'
import styles from './style.module.css'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Ama Mensah',
    role: 'Fashion Designer',
    image: '/images/hero1.jpg',
    quote:
      'This school transformed my creativity into confidence. I now run my own fashion brand.',
  },
  {
    id: 2,
    name: 'David Owusu',
    role: 'Tailor & Entrepreneur',
    image: '/images/hero2.jpg',
    quote:
      'The hands-on training and mentorship prepared me for real-world fashion production.',
  },
]

const Testimonials = () => {
  const [active, setActive] = useState(0)

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.quote}>
          <h2>“{testimonials[active].quote}”</h2>

          <div className={styles.meta}>
            <span className={styles.name}>
              {testimonials[active].name}
            </span>
            <span className={styles.role}>
              {testimonials[active].role}
            </span>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src={testimonials[active].image}
            alt={testimonials[active].name}
            fill
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.controls}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === active ? styles.activeDot : ''
            }`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default Testimonials
