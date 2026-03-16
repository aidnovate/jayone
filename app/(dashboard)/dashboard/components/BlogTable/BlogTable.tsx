"use client"

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Pencil, Trash2, Eye, Plus } from 'lucide-react';

import styles from './BlogTable.module.css';
import Modal from './Modal';
import Button from '@/app/components/Button';
import api from './api';

const BlogEditor = dynamic(() => import('./BlogEditor'), { ssr: false });

function resolveImageUrl(image: string): string {
  if (!image) return '';
  if (/^https?:\/\//.test(image)) return image;
  const base = process.env.NEXT_PUBLIC_API_URL || 'https://jayone-87f0a69e6159.herokuapp.com';
  const path = image.startsWith('/') ? image : `/${image}`;
  return `${base}${path}`;
}

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 4 }).map((_, i) => (
        <td key={i}>
          <div style={{
            height: 14,
            borderRadius: 6,
            background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "adm-shimmer 1.4s infinite",
            width: i === 0 ? "40%" : "70%",
          }} />
        </td>
      ))}
    </tr>
  );
}

export default function BlogTable() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [modal, setModal] = useState<'upload' | 'view' | 'edit' | 'delete' | null>(null);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/blogs');
        setBlogs(res.data);
      } catch (err: any) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);



  const openModal = (type: 'upload' | 'view' | 'edit' | 'delete', blog?: any) => {
    setSelected(blog || null);
    setModal(type);
  };

  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  const handleSave = async (data: { title: string; image: File | null; content: string }) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      if (data.image) {
        formData.append('image', data.image);
      }
      const res = await api.post('/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBlogs(prev => [res.data, ...prev]);
      closeModal();
    } catch (err: any) {
      setError('Failed to create blog');
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(prev => prev.filter(blog => blog._id !== id));
      closeModal();
    } catch (err: any) {
      setError('Failed to delete blog');
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Blogs</h2>
        <Button variant='primary' size='md' onClick={() => openModal('upload')}>
          <Plus size={18} style={{ marginRight: '0.5rem' }} /> Upload Blog
        </Button>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {loading && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
          </tbody>
        </table>
      )}

      {!loading && blogs.length === 0 && !error && (
        <div style={{ margin: '2rem 0', textAlign: 'center', color: '#888' }}>No blogs found.</div>
      )}

      {!loading && blogs.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog._id || blog.id}>
                <td>{blog.title}</td>
                <td>
                  {blog.image ? (
                    <img
                      src={resolveImageUrl(blog.image)}
                      alt={blog.title}
                      className={styles.image}
                      onError={e => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/logo.png';
                      }}
                    />
                  ) : (
                    <span style={{ color: '#aaa' }}>No image</span>
                  )}
                </td>
                <td>
                  <div
                    style={{ maxWidth: '320px', overflow: 'auto' }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </td>
                <td>
                  <button className={styles.actionBtn} title="View" onClick={() => openModal('view', blog)}>
                    <Eye size={18} />
                  </button>
                  <button className={styles.actionBtn} title="Edit" onClick={() => openModal('edit', blog)}>
                    <Pencil size={18} />
                  </button>
                  <button className={styles.actionBtn} title="Delete" onClick={() => openModal('delete', blog)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Upload Modal */}
      <Modal open={modal === 'upload'} onClose={closeModal} title="Upload Blog">
        <BlogEditor onSave={handleSave} />
      </Modal>

      {/* View Modal */}
      <Modal open={modal === 'view'} onClose={closeModal} title="Blog Details">
        {selected && (
          <div>
            <h3>{selected.title}</h3>
            {selected.image && (
              <img
                src={resolveImageUrl(selected.image)}
                alt={selected.title}
                style={{ width: '100%', maxWidth: '320px', borderRadius: '8px', margin: '1rem 0' }}
                onError={e => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/placeholder.png';
                }}
              />
            )}
            <div><strong>Content:</strong></div>
            <div style={{ marginTop: '0.5rem' }} dangerouslySetInnerHTML={{ __html: selected.content }} />
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal open={modal === 'edit'} onClose={closeModal} title="Edit Blog">
        <BlogEditor initialContent={selected?.content} onSave={handleSave} />
      </Modal>

      {/* Delete Modal */}
      <Modal open={modal === 'delete'} onClose={closeModal} title="Delete Blog">
        <div>Are you sure you want to delete <strong>{selected?.title}</strong>?</div>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button variant='primary' size='md' onClick={() => handleDelete(selected?._id)}>Delete</Button>
          <Button variant='secondary' size='md' onClick={closeModal}>Cancel</Button>
        </div>
      </Modal>
    </>
  );
}