'use client'

import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import Button from '../Button'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Shape Your Fashion Future',
    subtitle: 'Learn design, tailoring, and couture from industry professionals.',
    cta: 'Apply Now',
    image: '/images/hero1.jpg'
  },
  {
    id: 2,
    title: 'Where Creativity Meets Craft',
    subtitle: 'Transform ideas into runway-ready designs.',
    cta: 'View Programs',
    image: '/images/hero2.jpg'
  },
  {
    id: 3,
    title: 'Build a Career in Fashion',
    subtitle: 'From beginners to professionals — we train excellence.',
    cta: 'Join Our School',
    image: '/images/hero3.jpg'
  }
]

const HeroSlider1 = () => {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Auto slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.hero}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${
            index === current ? styles.active : ''
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className={styles.overlay} />

          <div className={styles.content}>
            <div className={styles.text}>
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <Button variant="primary" href="/apply-now">
                {slide.cta}
              </Button>
            </div>

            <div className={styles.nav}>
              <button onClick={prevSlide} aria-label="Previous slide">
                <ChevronLeft />
              </button>
              <button onClick={nextSlide} aria-label="Next slide">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default HeroSlider1
