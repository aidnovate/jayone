import React from 'react'
import style from './page.module.css'
import OtherPagesHero from '../components/OtherPagesHero'
import Button from '../components/Button'
import Footer from '../components/Footer'
import Link from 'next/link'

const page = () => {
  return (
    <>
      <OtherPagesHero 
        title="Apply Now"
        subtitle="Begin Your Fashion Journey with Jayone Prestige."
      />
      
      <div className={style.container}>
        <div className={style.content}>
          <h1>Your Next Step Awaits</h1>
          <p>Ready to transform your creative vision into reality? Join our community of aspiring designers and industry professionals. Choose your path below:</p>
          
          <div className={style.buttonGroup}>
            <div className={style.buttonWrapper}>
              <h3>Already Have Your Form?</h3>
              <p>If you've already purchased the admission form, proceed to complete your application.</p>
              <Button href="/admission/apply" variant="primary" size="lg">
                Continue to Application
              </Button>
            </div>
            
            <div className={style.buttonWrapper}>
              <h3>Purchase Admission Form</h3>
              <p>New applicants start here. Purchase your admission form and unlock your application journey.</p>
              <Button href="/our-programs" variant="secondary" size="lg">
                Purchase Admission Form
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}

export default page