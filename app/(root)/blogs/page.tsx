'use client'
import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard';
import styles from './style.module.css';
import OtherPagesHero from '../../components/OtherPagesHero';
import Footer from '../../components/Footer';
import axios from 'axios';
import Skeleton from '../../components/Skeleton';

const BLOG_API = 'https://jayone-87f0a69e6159.herokuapp.com/api/blogs/';


export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get(BLOG_API)
      .then(res => {
        setBlogs(res.data.blogs || []);
        setError(null);
      })
      .catch(err => {
        setError('Failed to load blogs.');
        setBlogs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <OtherPagesHero title="Our Blog" subtitle="Insights, tips, and stories from the world of fashion education." backgroundImage="/images/hero5.png" />
      <section className={styles.blogs} aria-label="Blog Posts">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height={250} />)
        ) : error ? (
          <div style={{ color: 'red', textAlign: 'center', width: '100%' }}>{error}</div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', width: '100%' }}>No blogs found.</div>
        ) : (
          blogs.map((post: any) => (
            <BlogCard key={post._id} _id={post._id} title={post.title} summary={post.summary} image={post.imageUrl} />
          ))
        )}
      </section>
      <Footer />
    </>
  );
}
