'use client'

import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import Button from '../Button'
import Navbar from '../Navbar'

type Slide = {
  id: number
  title: string
  subtitle: string
  cta: string
  image: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Where Fashion Begins',
    subtitle: 'Learn couture, tailoring, and modern fashion design from professionals.',
    cta: 'Apply Now',
    image: '/images/hero1.jpg',
  },
  {
    id: 2,
    title: 'Design. Create. Inspire.',
    subtitle: 'Turn creativity into a career with hands-on fashion education.',
    cta: 'View Programs',
    image: '/images/hero2.jpg',
  },
  {
    id: 3,
    title: 'Your Style, Your Future',
    subtitle: 'Join a fashion school that builds confidence and craftsmanship.',
    cta: 'Join the School',
    image: '/images/hero3.jpg',
  },
]

const HomeHero2 = () => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.hero}>
        <Navbar />
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${
            index === active ? styles.active : ''
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className={styles.overlay} />

          <div className={styles.content}>
            <span className={`${styles.label} editorial-label`}>JAYONE PRESTIGE</span>
            <h1 className='display-split'>{slide.title}</h1>
            <p>{slide.subtitle}</p>

            <div className={styles.actions}>
              <Button variant="primary" href="/apply-now">
                {slide.cta}
              </Button>
              <Button variant="outline" href="/our-programs">
                Explore Programs
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className={styles.dots}>
        {slides.map((_, index) => (
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

export default HomeHero2
