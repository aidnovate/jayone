'use client'

import { useState } from "react";
import style from './style.module.css'

export default function ContactExperience() {
  const [step, setStep] = useState(0);

  return (
    <section className={style.contactLuxury}>
      <div className={style.contactWrapper}>

        <div className={style.contactIntro}>
          <h2>
            Let’s Create <span>Something Iconic</span>
          </h2>
          <p>
            Every masterpiece begins with a conversation.
          </p>
        </div>

        <div className={style.contactProgressive}>

          {step === 0 && (
            <button
              className={style.revealBtn}
              onClick={() => setStep(1)}
            >
              Start the Conversation
            </button>
          )}

          {step === 1 && (
            <div className={`${style.contactOption} ${style.fadeIn}`}>
              <p>How would you like to reach us?</p>
              <div className={style.contactChoices}>
                <button className={style.revealBtn} onClick={() => setStep(2)}>Send a Message</button>
                <button className={style.revealBtn} onClick={() => setStep(3)}>Visit Us</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form className={`${style.contactForm} ${style.fadeIn}`}>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Email Address" />
              <textarea placeholder="Tell us about your vision..." />
              <button type="submit" className={style.submitBtn}>
                Send Message
              </button>
            </form>
          )}

          {step === 3 && (
            <div className={`${style.contactVisit} ${style.fadeIn}`}>
              <p>Find us at our atelier.</p>
              <h4>Kumasi, Ghana</h4>
              <span>Open Mon — Fri / 9am — 6pm</span>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
