'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../blogs/style.module.css';
import OtherPagesHero from '@/app/components/OtherPagesHero/index';
import Footer from '@/app/components/Footer/index';
import axios from 'axios';
import Skeleton from '@/app/components/Skeleton/index';

const BLOG_API = 'https://jayone-87f0a69e6159.herokuapp.com/api/blogs/';

export default function SingleBlogPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get(BLOG_API + id)
      .then(res => {
        setBlog(res.data.blog);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load blog.');
        setBlog(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <OtherPagesHero title={blog?.title || 'Blog'} subtitle={blog?.summary || ''} backgroundImage={blog?.imageUrl || '/images/hero1.jpg'} />
      <section className={styles.blogs} style={{ minHeight: 400, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        {loading ? (
          <Skeleton height={350} width={600} />
        ) : error ? (
          <div style={{ color: 'red', textAlign: 'center', width: '100%' }}>{error}</div>
        ) : !blog ? (
          <div style={{ textAlign: 'center', width: '100%' }}>Blog not found.</div>
        ) : (
          <article style={{ maxWidth: 600, width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 24 }}>
            <img src={blog.imageUrl || '/images/hero1.jpg'} alt={blog.title} style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} />
            <h1 style={{ fontSize: 32, marginBottom: 12 }}>{blog.title}</h1>
            <p style={{ color: '#666', marginBottom: 24 }}>{blog.summary}</p>
            <div style={{ fontSize: 18, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: blog.content || '' }} />
          </article>
        )}
      </section>
      <Footer />
    </>
  );
}
