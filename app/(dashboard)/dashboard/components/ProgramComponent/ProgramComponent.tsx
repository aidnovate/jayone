"use client"

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Pencil, Trash2, Eye, Plus } from 'lucide-react';
import styles from './ProgramComponent.module.css';
import Modal from './Modal';
import api from './api';
import Button from '@/app/components/Button';

const ProgramEditor = dynamic(() => import('./ProgramEditor'), { ssr: false });


export default function ProgramComponent() {

  const [programs, setPrograms] = useState<any[]>([]);
  const [modal, setModal] = useState<'upload'|'view'|'edit'|'delete'|null>(null);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch programs
  React.useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/programs');
        setPrograms(res.data);
      } catch {
        setError('Failed to fetch programs');
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const openModal = (type: 'upload'|'view'|'edit'|'delete', program?: any) => {
    setSelected(program || null);
    setModal(type);
  };
  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  // Create program
  const handleSave = async (data: any) => {
    try {
      const res = await api.post('/programs/', data);
      setPrograms(prev => [res.data, ...prev]);
      closeModal();
    } catch {
      setError('Failed to create program');
    }
  };

  // Edit program
  const handleEdit = async (data: any) => {
    try {
      const res = await api.patch(`/programs/${selected._id || selected.id}`, data);
      setPrograms(prev => prev.map(p => (p._id === res.data._id || p.id === res.data.id) ? res.data : p));
      closeModal();
    } catch {
      setError('Failed to edit program');
    }
  };

  // Delete program
  const handleDelete = async (id: string | number) => {
    try {
      await api.delete(`/programs/${id}`);
      setPrograms(prev => prev.filter(p => p._id !== id && p.id !== id));
      closeModal();
    } catch {
      setError('Failed to delete program');
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Programs</h2>
        <Button className={styles.actionBtn} style={{background:'var(--color-primary-500)',color:'#fff',fontWeight:600,padding:'0.7rem 1.5rem',borderRadius:'8px',fontSize:'1rem'}} onClick={() => openModal('upload')}>
          <Plus size={18} style={{marginRight:'0.5rem'}} /> Upload Program
        </Button>
      </div>
      {error && <div style={{color:'red',marginBottom:'1rem'}}>{error}</div>}
      {loading && (
        <div style={{margin:'2rem 0',textAlign:'center',color:'#888'}}>Loading programs...</div>
      )}
      {!loading && programs.length === 0 && !error && (
        <div style={{margin:'2rem 0',textAlign:'center',color:'#888'}}>No programs found.</div>
      )}
      {!loading && programs.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Overview</th>
              <th>Learn</th>
              <th>Features</th>
              {/* <th>Career</th> */}
              {/* <th>Structure</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map(program => (
              <tr key={program._id || program.id}>
                <td>{program.title}</td>
                <td>{program.description}</td>
                <td dangerouslySetInnerHTML={{__html: program.overview}} />
                <td>
                  <ul style={{margin:0,paddingLeft:'1.2rem'}}>
                    {program.learn.map((item:string, idx:number) => <li key={idx}>{item}</li>)}
                  </ul>
                </td>
                <td>
                  <ul style={{margin:0,paddingLeft:'1.2rem'}}>
                    {program.features.map((f:any, idx:number) => <li key={idx}><strong>{f.heading}:</strong> {f.text}</li>)}
                  </ul>
                </td>
                {/* <td>
                  <ul style={{margin:0,paddingLeft:'1.2rem'}}>
                    {Array.isArray(program.career)
                      ? program.career.map((item: string, idx: number) => <li key={idx}>{item}</li>)
                      : null}
                  </ul>
                </td> */}
                {/* <td dangerouslySetInnerHTML={{__html: program.structure}} /> */}
                <td>
                  <button className={styles.actionBtn} title="View" onClick={() => openModal('view', program)}><Eye size={18} /></button>
                  <button className={styles.actionBtn} title="Edit" onClick={() => openModal('edit', program)}><Pencil size={18} /></button>
                  <button className={styles.actionBtn} title="Delete" onClick={() => openModal('delete', program)}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal open={modal==='upload'} onClose={closeModal} title="Upload Program">
        <ProgramEditor onSave={handleSave} />
      </Modal>
      <Modal open={modal==='view'} onClose={closeModal} title="Program Details">
        {selected && (
          <div>
            <h3>{selected.title}</h3>
            <div><strong>Description:</strong> {selected.description}</div>
            <div><strong>Overview:</strong> <div dangerouslySetInnerHTML={{__html: selected.overview}} /></div>
            <div><strong>What You'll Learn:</strong>
              <ul>{selected.learn.map((item:string, idx:number) => <li key={idx}>{item}</li>)}</ul>
            </div>
            <div><strong>Features:</strong>
              <ul>{selected.features.map((f:any, idx:number) => <li key={idx}><strong>{f.heading}:</strong> {f.text}</li>)}</ul>
            </div>
            <div><strong>Career Opportunities:</strong>
              <ul>{Array.isArray(selected.career) ? selected.career.map((item: string, idx: number) => <li key={idx}>{item}</li>) : null}</ul>
            </div>
            <div><strong>Program Structure:</strong> <div dangerouslySetInnerHTML={{__html: selected.structure}} /></div>
          </div>
        )}
      </Modal>
      <Modal open={modal==='edit'} onClose={closeModal} title="Edit Program">
        <ProgramEditor initialData={selected} onSave={handleEdit} />
      </Modal>
      <Modal open={modal==='delete'} onClose={closeModal} title="Delete Program">
        <div>Are you sure you want to delete <strong>{selected?.title}</strong>?</div>
        <div style={{marginTop:'1.5rem',display:'flex',gap:'1rem', justifyContent:"center"}}>
          <Button variant='primary' size='md' onClick={() => handleDelete(selected?._id || selected?.id)}>Delete</Button>
          <Button variant='secondary' size='md' onClick={closeModal}>Cancel</Button>
        </div>
      </Modal>
    </>
  );
}