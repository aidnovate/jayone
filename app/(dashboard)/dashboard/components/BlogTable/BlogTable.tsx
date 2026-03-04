"use client"

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Pencil, Trash2, Eye, Plus } from 'lucide-react';
import styles from './BlogTable.module.css';
import Modal from './Modal';
import Button from '@/app/components/Button';

const BlogEditor = dynamic(() => import('./BlogEditor'), { ssr: false });

const initialBlogs = [
  {
    id: 1,
    title: 'How to Start a Fashion Brand',
    image: '/images/hero1.jpg',
    content: 'Learn the essentials of launching your own fashion brand from scratch.'
  },
  {
    id: 2,
    title: 'Top Tailoring Techniques',
    image: '/images/hero2.jpg',
    content: 'Discover the best tailoring techniques used by professionals.'
  }
];

export default function BlogTable() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [modal, setModal] = useState<'upload'|'view'|'edit'|'delete'|null>(null);
  const [selected, setSelected] = useState<any>(null);

  const openModal = (type: 'upload'|'view'|'edit'|'delete', blog?: any) => {
    setSelected(blog || null);
    setModal(type);
  };
  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  const handleSave = (data: { title: string; image: string; content: string }) => {
    // For demo, just close modal. You can add logic to update blogs.
    closeModal();
  };

  return (
    <>
        <div className={styles.header}>
            <h2>Blogs</h2>
            <Button variant='primary' size='md' onClick={() => openModal('upload')}>
          <Plus size={18} style={{marginRight:'0.5rem'}} /> Upload Blog
        </Button>
        </div>
        
    
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
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td><img src={blog.image} alt={blog.title} className={styles.image} /></td>
              <td>{blog.content}</td>
              <td>
                <button className={styles.actionBtn} title="View" onClick={() => openModal('view', blog)}><Eye size={18} /></button>
                <button className={styles.actionBtn} title="Edit" onClick={() => openModal('edit', blog)}><Pencil size={18} /></button>
                <button className={styles.actionBtn} title="Delete" onClick={() => openModal('delete', blog)}><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={modal==='upload'} onClose={closeModal} title="Upload Blog">
        <BlogEditor onSave={handleSave} />
      </Modal>
      <Modal open={modal==='view'} onClose={closeModal} title="Blog Details">
        {selected && (
          <div>
            <h3>{selected.title}</h3>
            <img src={selected.image} alt={selected.title} style={{width:'100%',maxWidth:'320px',borderRadius:'8px',margin:'1rem 0'}} />
            <div><strong>Content:</strong></div>
            <div style={{marginTop:'0.5rem'}}>{selected.content}</div>
          </div>
        )}
      </Modal>
      <Modal open={modal==='edit'} onClose={closeModal} title="Edit Blog">
        <BlogEditor initialContent={selected?.content} onSave={handleSave} />
      </Modal>
      <Modal open={modal==='delete'} onClose={closeModal} title="Delete Blog">
        <div>Are you sure you want to delete <strong>{selected?.title}</strong>?</div>
        <div style={{marginTop:'1.5rem',display:'flex',gap:'1rem', justifyContent:"center"}}>
          <Button variant='primary' size='md'  onClick={closeModal}>Delete</Button>
          <Button variant='secondary' size='md' onClick={closeModal}>Cancel</Button>
        </div>
      </Modal>
    </>
  );
}
