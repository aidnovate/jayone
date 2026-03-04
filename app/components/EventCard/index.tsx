import React from 'react';
import styles from './style.module.css';
import Link from 'next/link';

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  image: string;
  id?: number;
}



const EventCard: React.FC<EventCardProps> = ({ title, date, description, image, id }) => (
  <div className={styles.card} tabIndex={0} aria-label={title}>
    <div style={{position:'relative', height:'50%'}}>
      <img src={image} alt={title} className={styles.image} />
      <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0.18) 100%)',pointerEvents:'none'}}></div>
    </div>
    <div className={styles.content}>
      <h4 className={styles.title}>{truncate(title, 20)}</h4>
      <div className={styles.date}>{date}</div>
        <div className={styles.desc}>{truncate(description, 100)}</div>
      <Link className={styles.readMore} href={id ? `/events/${id}` : '#'} aria-label={`Read more about ${title}`}>Read More &rarr;</Link>
    </div>
  </div>
);

  const truncate = (text: string, max: number) =>
    text.length > max ? text.slice(0, max) + '...' : text;

export default EventCard;