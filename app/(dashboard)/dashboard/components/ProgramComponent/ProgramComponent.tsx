"use client"

import React, { useState } from 'react';
import { Pencil, Trash2, Eye, Plus } from 'lucide-react';
import styles from './ProgramComponent.module.css';
import Modal from './Modal';
import ProgramEditor from './ProgramEditor';
import Button from '@/app/components/Button';

const initialPrograms = [
  {
    id: 1,
    title: 'Fashion Design',
    description: 'Learn the art and business of fashion design.',
    overview: '<p>Comprehensive overview of the program.</p>',
    learn: ['Pattern making', 'Textile selection', 'Fashion illustration'],
    features: [
      { heading: 'Expert Instructors', text: 'Learn from industry leaders.' },
      { heading: 'Hands-on Projects', text: 'Build your portfolio.' }
    ],
    career: '<p>Designer, Stylist, Consultant</p>',
    structure: '<p>12 weeks, 3 modules</p>',
  }
];

export default function ProgramComponent() {
  const [programs, setPrograms] = useState(initialPrograms);
  const [modal, setModal] = useState<'upload'|'view'|'edit'|'delete'|null>(null);
  const [selected, setSelected] = useState<any>(null);

  const openModal = (type: 'upload'|'view'|'edit'|'delete', program?: any) => {
    setSelected(program || null);
    setModal(type);
  };
  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  const handleSave = (data: any) => {
    // For demo, just close modal. You can add logic to update programs.
    closeModal();
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Programs</h2>
        <Button className={styles.actionBtn} style={{background:'var(--color-primary-500)',color:'#fff',fontWeight:600,padding:'0.7rem 1.5rem',borderRadius:'8px',fontSize:'1rem'}} onClick={() => openModal('upload')}>
          <Plus size={18} style={{marginRight:'0.5rem'}} /> Upload Program
        </Button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Overview</th>
            <th>Learn</th>
            <th>Features</th>
            <th>Career</th>
            <th>Structure</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {programs.map(program => (
            <tr key={program.id}>
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
              <td dangerouslySetInnerHTML={{__html: program.career}} />
              <td dangerouslySetInnerHTML={{__html: program.structure}} />
              <td>
                <button className={styles.actionBtn} title="View" onClick={() => openModal('view', program)}><Eye size={18} /></button>
                <button className={styles.actionBtn} title="Edit" onClick={() => openModal('edit', program)}><Pencil size={18} /></button>
                <button className={styles.actionBtn} title="Delete" onClick={() => openModal('delete', program)}><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
            <div><strong>Career Opportunities:</strong> <div dangerouslySetInnerHTML={{__html: selected.career}} /></div>
            <div><strong>Program Structure:</strong> <div dangerouslySetInnerHTML={{__html: selected.structure}} /></div>
          </div>
        )}
      </Modal>
      <Modal open={modal==='edit'} onClose={closeModal} title="Edit Program">
        <ProgramEditor initialData={selected} onSave={handleSave} />
      </Modal>
      <Modal open={modal==='delete'} onClose={closeModal} title="Delete Program">
        <div>Are you sure you want to delete <strong>{selected?.title}</strong>?</div>
        <div style={{marginTop:'1.5rem',display:'flex',gap:'1rem', justifyContent:"center"}}>
          <Button variant='primary' size='md' onClick={closeModal}>Delete</Button>
          <Button variant='secondary' size='md' onClick={closeModal}>Cancel</Button>
        </div>
      </Modal>
    </>
  );
}
