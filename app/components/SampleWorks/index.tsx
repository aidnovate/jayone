"use client";

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import Link from "next/link";

interface GalleryImage {
  url: string;
  public_id: string;
  heading?: string;
}

const SampleWorks = () => {
  const [works, setWorks] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetch("https://jayone-87f0a69e6159.herokuapp.com/api/galleries/random/pictures")
      .then((res) => res.json())
      .then((data) => setWorks(data));
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className="editorial-label">Student Works</span>
        <h2>Where Creativity Becomes Craft</h2>
      </div>

      <div className={styles.masonry}>
        {works.length === 0 ? (
          <div style={{ textAlign: "center", width: "100%" }}>No works found.</div>
        ) : (
          works.map((work, idx) => (
            <div key={work.public_id || idx} className={styles.item}>
              <Image
                src={work.url}
                alt={work.heading || `Sample Work ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
              <div className={styles.overlay}>
                <span>{work.heading || `Sample Work ${idx + 1}`}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.footer}>
        <Link href="/gallery">View Full Collection</Link>
      </div>
    </section>
  );
};

export default SampleWorks;