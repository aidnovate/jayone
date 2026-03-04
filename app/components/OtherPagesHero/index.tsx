'use client'

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Navbar from "../Navbar";

interface Props {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

const OtherPagesHero: React.FC<Props> = ({
  title,
  subtitle,
  backgroundImage = "/images/hero2.jpg",
  ctaText,
  ctaLink,
}) => {
  const [loaded, setLoaded] = useState(false);
  

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  return (
    <div
      className={`${styles.hero} ${loaded ? styles.loaded : ""}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {ctaText && ctaLink && (
          <a href={ctaLink} className={styles.cta}>
            {ctaText}
          </a>
        )}
      </div>
    </div>
  );
};

export default OtherPagesHero;
