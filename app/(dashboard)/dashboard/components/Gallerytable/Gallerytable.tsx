"use client"

import React, { useState, useEffect } from 'react';
import { Trash2, Eye, Plus, Images, X, ChevronLeft, ChevronRight } from 'lucide-react';

import styles from './Gallerytable.module.css';
import Modal from './Modal';
import Button from '@/app/components/Button';
import api from './api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface GalleryImage {
  _id: string;
  url: string;
  publicId?: string;
}

interface GalleryGroup {
  _id: string;
  heading: string;
  images: GalleryImage[];
  createdAt?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveImageUrl(url: string): string {
  if (!url) return '';
  if (/^https?:\/\//.test(url)) return url;
  const base = process.env.NEXT_PUBLIC_API_URL || 'https://jayone-87f0a69e6159.herokuapp.com';
  return `${base}${url.startsWith('/') ? url : `/${url}`}`;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr>
      {[40, 70, 60, 30].map((w, i) => (
        <td key={i}>
          <div style={{
            height: 14,
            borderRadius: 6,
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'adm-shimmer 1.4s infinite',
            width: `${w}%`,
          }} />
        </td>
      ))}
    </tr>
  );
}

// ─── Image Lightbox ───────────────────────────────────────────────────────────

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className={styles.lightboxBackdrop} onClick={onClose}>
      <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
        <button className={styles.lightboxClose} onClick={onClose}><X size={20} /></button>
        <img
          src={resolveImageUrl(images[current].url)}
          alt={`Image ${current + 1}`}
          className={styles.lightboxImg}
        />
        <div className={styles.lightboxNav}>
          <button className={styles.lightboxNavBtn} onClick={prev}><ChevronLeft size={20} /></button>
          <span className={styles.lightboxCounter}>{current + 1} / {images.length}</span>
          <button className={styles.lightboxNavBtn} onClick={next}><ChevronRight size={20} /></button>
        </div>
      </div>
    </div>
  );
}

// ─── Upload Form ──────────────────────────────────────────────────────────────

function GalleryUploadForm({ onSave }: { onSave: (heading: string, files: File[]) => Promise<void> }) {
  const [heading, setHeading] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles(selected);
    setPreviews(selected.map(f => URL.createObjectURL(f)));
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!heading.trim() || files.length === 0) return;
    setSaving(true);
    await onSave(heading, files);
    setSaving(false);
  };

  return (
    <div className={styles.uploadForm}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Gallery Heading</label>
        <input
          className={styles.formInput}
          type="text"
          placeholder="e.g. Graduation Ceremony 2024"
          value={heading}
          onChange={e => setHeading(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Select Images</label>
        <label className={styles.fileDropzone}>
          <Images size={28} style={{ marginBottom: '0.5rem', color: 'var(--color-primary-500, #7c3aed)' }} />
          <span>Click to select images</span>
          <span style={{ fontSize: '0.8rem', color: '#aaa' }}>JPG, PNG, WEBP</span>
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleFiles}
          />
        </label>
      </div>

      {previews.length > 0 && (
        <div className={styles.previewGrid}>
          {previews.map((src, i) => (
            <div key={i} className={styles.previewItem}>
              <img src={src} alt={`preview-${i}`} className={styles.previewImg} />
              <button className={styles.previewRemove} onClick={() => removeFile(i)}>
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Button
        variant="primary"
        size="md"
        onClick={handleSubmit}
        // @ts-ignore
        disabled={saving || !heading.trim() || files.length === 0}
        style={{ marginTop: '1rem', width: '100%' }}
      >
        {saving ? 'Uploading...' : `Upload ${files.length > 0 ? `(${files.length} image${files.length > 1 ? 's' : ''})` : ''}`}
      </Button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GalleryTable() {
  const [galleries, setGalleries] = useState<GalleryGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [modal, setModal] = useState<'upload' | 'view' | 'deleteGroup' | 'deleteImage' | null>(null);
  const [selected, setSelected] = useState<GalleryGroup | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const [lightbox, setLightbox] = useState<{ images: GalleryImage[]; index: number } | null>(null);

  // Fetch galleries
  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/galleries');
        setGalleries(res.data);
      } catch {
        setError('Failed to fetch galleries');
      } finally {
        setLoading(false);
      }
    };
    fetchGalleries();
  }, []);

  const openModal = (type: typeof modal, gallery?: GalleryGroup, image?: GalleryImage) => {
    setSelected(gallery || null);
    setSelectedImage(image || null);
    setModal(type);
  };

  const closeModal = () => {
    setModal(null);
    setSelected(null);
    setSelectedImage(null);
  };

  // Upload new gallery group
  const handleUpload = async (heading: string, files: File[]) => {
    try {
      const formData = new FormData();
      formData.append('heading', heading);
      files.forEach(f => formData.append('images', f));
      const res = await api.post('/galleries', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setGalleries(prev => [res.data, ...prev]);
      closeModal();
    } catch {
      setError('Failed to upload gallery');
    }
  };

  // Delete entire gallery group
  const handleDeleteGroup = async (id: string) => {
    try {
      await api.delete(`/galleries/${id}`);
      setGalleries(prev => prev.filter(g => g._id !== id));
      closeModal();
    } catch {
      setError('Failed to delete gallery');
    }
  };

  // Delete a single image from a group
  const handleDeleteImage = async (groupId: string, imageId: string) => {
    try {
      await api.delete(`/galleries/${groupId}/images/${imageId}`);
      setGalleries(prev =>
        prev.map(g =>
          g._id === groupId
            ? { ...g, images: g.images.filter(img => img._id !== imageId) }
            : g
        )
      );
      closeModal();
    } catch {
      setError('Failed to delete image');
    }
  };

  return (
    <>
      {/* Header */}
      <div className={styles.header}>
        <h2>Gallery</h2>
        <Button variant="primary" size="md" onClick={() => openModal('upload')}>
          <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Gallery
        </Button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {/* Skeleton */}
      {loading && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Heading</th>
              <th>Images</th>
              <th>Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
          </tbody>
        </table>
      )}

      {/* Empty state */}
      {!loading && galleries.length === 0 && !error && (
        <div style={{ margin: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#888' }}>
          <Images size={40} style={{ marginBottom: '0.75rem', opacity: 0.3 }} />
          <p>No galleries found.</p>
        </div>
      )}

      {/* Table */}
      {!loading && galleries.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Heading</th>
              <th>Preview</th>
              <th>Image Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {galleries.map(gallery => (
              <tr key={gallery._id}>
                <td><strong>{gallery.heading}</strong></td>
                <td>
                  <div className={styles.thumbRow}>
                    {gallery.images.slice(0, 4).map((img, i) => (
                      <img
                        key={img._id}
                        src={resolveImageUrl(img.url)}
                        alt={`${gallery.heading} ${i + 1}`}
                        className={styles.image}
                        onError={e => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/logo.png';
                        }}
                      />
                    ))}
                    {gallery.images.length > 4 && (
                      <span className={styles.moreTag}>+{gallery.images.length - 4}</span>
                    )}
                  </div>
                </td>
                <td>{gallery.images.length} image{gallery.images.length !== 1 ? 's' : ''}</td>
                <td>
                  <button
                    className={styles.actionBtn}
                    title="View"
                    onClick={() => openModal('view', gallery)}
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className={styles.actionBtn}
                    title="Delete Gallery"
                    onClick={() => openModal('deleteGroup', gallery)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Upload Modal */}
      <Modal open={modal === 'upload'} onClose={closeModal} title="Add Gallery">
        <GalleryUploadForm onSave={handleUpload} />
      </Modal>

      {/* View Modal */}
      <Modal open={modal === 'view'} onClose={closeModal} title={selected?.heading || 'Gallery'}>
        {selected && (
          <div>
            <p style={{ color: '#888', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {selected.images.length} image{selected.images.length !== 1 ? 's' : ''} — click an image to view fullscreen
            </p>
            <div className={styles.imageGrid}>
              {selected.images.map((img, index) => (
                <div key={img._id} className={styles.gridItem}>
                  <img
                    src={resolveImageUrl(img.url)}
                    alt={`${selected.heading} ${index + 1}`}
                    className={styles.gridImg}
                    onClick={() => setLightbox({ images: selected.images, index })}
                    onError={e => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/logo.png';
                    }}
                  />
                  <button
                    className={styles.gridDeleteBtn}
                    title="Delete image"
                    onClick={() => openModal('deleteImage', selected, img)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Gallery Modal */}
      <Modal open={modal === 'deleteGroup'} onClose={closeModal} title="Delete Gallery">
        <div>
          Are you sure you want to delete the gallery <strong>&ldquo;{selected?.heading}&rdquo;</strong> and all its images?
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button variant="primary" size="md" onClick={() => handleDeleteGroup(selected!._id)}>Delete</Button>
          <Button variant="secondary" size="md" onClick={closeModal}>Cancel</Button>
        </div>
      </Modal>

      {/* Delete Single Image Modal */}
      <Modal open={modal === 'deleteImage'} onClose={closeModal} title="Delete Image">
        <div>Are you sure you want to delete this image?</div>
        {selectedImage && (
          <img
            src={resolveImageUrl(selectedImage.url)}
            alt="to delete"
            style={{ width: '100%', maxWidth: 200, borderRadius: 8, margin: '1rem auto', display: 'block' }}
          />
        )}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button
            variant="primary"
            size="md"
            onClick={() => handleDeleteImage(selected!._id, selectedImage!._id)}
          >
            Delete
          </Button>
          <Button variant="secondary" size="md" onClick={closeModal}>Cancel</Button>
        </div>
      </Modal>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}