import React, { useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default function ProgramEditor({ initialData, onSave }: {
  initialData?: any;
  onSave: (data: any) => void;
}) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [overview, setOverview] = useState(initialData?.overview || '');
  const [learn, setLearn] = useState(initialData?.learn || ['']);
  const [features, setFeatures] = useState(initialData?.features || [{ heading: '', text: '' }]);
  const [career, setCareer] = useState(initialData?.career || '');
  const [structure, setStructure] = useState(initialData?.structure || '');
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const careerRef = useRef<HTMLDivElement | null>(null);
  const structureRef = useRef<HTMLDivElement | null>(null);
  const quillRefs = useRef<any>({});

  React.useEffect(() => {
    if (overviewRef.current && !quillRefs.current.overview) {
      quillRefs.current.overview = new Quill(overviewRef.current, { theme: 'snow' });
      if (overview) quillRefs.current.overview.root.innerHTML = overview;
    }
    if (careerRef.current && !quillRefs.current.career) {
      quillRefs.current.career = new Quill(careerRef.current, { theme: 'snow' });
      if (career) quillRefs.current.career.root.innerHTML = career;
    }
    if (structureRef.current && !quillRefs.current.structure) {
      quillRefs.current.structure = new Quill(structureRef.current, { theme: 'snow' });
      if (structure) quillRefs.current.structure.root.innerHTML = structure;
    }
  }, [overview, career, structure]);

  const handleLearnChange = (idx: number, value: string) => {
    const updated = [...learn];
    updated[idx] = value;
    setLearn(updated);
  };
  const addLearn = () => setLearn([...learn, '']);
  const removeLearn = (idx: number) => setLearn(learn.filter((_: string, i: number) => i !== idx));

  const handleFeatureChange = (idx: number, key: 'heading'|'text', value: string) => {
    const updated = [...features];
    updated[idx][key] = value;
    setFeatures(updated);
  };
  const addFeature = () => setFeatures([...features, { heading: '', text: '' }]);
  const removeFeature = (idx: number) => setFeatures(features.filter((_: { heading: string; text: string }, i: number) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      overview: quillRefs.current.overview?.root.innerHTML || '',
      learn,
      features,
      career: quillRefs.current.career?.root.innerHTML || '',
      structure: quillRefs.current.structure?.root.innerHTML || '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Program Title" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} required />
      <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={inputStyle} required />
      <div style={{marginBottom:'1rem'}}>
        <label>Program Overview</label>
        <div ref={overviewRef} style={quillStyle} />
      </div>
      <div style={{marginBottom:'1rem'}}>
        <label>What You'll Learn</label>
        {learn.map((item: string, idx: number) => (
          <div key={idx} style={{display:'flex',alignItems:'center',marginBottom:'0.5rem'}}>
            <input type="text" value={item} onChange={e => handleLearnChange(idx, e.target.value)} style={{flex:1,padding:'0.5rem',borderRadius:'6px',border:'1px solid #333'}} />
            <button type="button" onClick={() => removeLearn(idx)} style={removeBtnStyle}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addLearn} style={addBtnStyle}>Add</button>
      </div>
      <div style={{marginBottom:'1rem'}}>
        <label>Program Features</label>
        {features.map((feature: { heading: string; text: string }, idx: number) => (
          <div key={idx} style={{display:'flex',gap:'0.5rem',marginBottom:'0.5rem'}}>
            <input type="text" placeholder="Feature Heading" value={feature.heading} onChange={e => handleFeatureChange(idx, 'heading', e.target.value)} style={{flex:1,padding:'0.5rem',borderRadius:'6px',border:'1px solid #333'}} />
            <input type="text" placeholder="Feature Text" value={feature.text} onChange={e => handleFeatureChange(idx, 'text', e.target.value)} style={{flex:2,padding:'0.5rem',borderRadius:'6px',border:'1px solid #333'}} />
            <button type="button" onClick={() => removeFeature(idx)} style={removeBtnStyle}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addFeature} style={addBtnStyle}>Add</button>
      </div>
      <div style={{marginBottom:'1rem'}}>
        <label>Career Opportunities</label>
        <div ref={careerRef} style={quillStyle} />
      </div>
      <div style={{marginBottom:'1rem'}}>
        <label>Program Structure</label>
        <div ref={structureRef} style={quillStyle} />
      </div>
      <button type="submit" style={buttonStyle}>Save Program</button>
    </form>
  );
}

const inputStyle = {
  marginBottom: '1rem',
  width: '100%',
  padding: '0.7rem',
  borderRadius: '8px',
  border: '1px solid #333',
};

const quillStyle = {
  background: '#fff',
  color: '#222',
  minHeight: '120px',
  borderRadius: '8px',
};

const buttonStyle = {
  background: 'var(--primary)',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '0.7rem 1.5rem',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
};

const addBtnStyle = {
  background: 'var(--color-primary-500)',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '0.4rem 1rem',
  fontWeight: 500,
  fontSize: '0.95rem',
  cursor: 'pointer',
  marginBottom: '0.5rem',
};

const removeBtnStyle = {
  background: 'var(--danger)',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '0.4rem 0.8rem',
  fontWeight: 500,
  fontSize: '0.95rem',
  cursor: 'pointer',
  marginLeft: '0.5rem',
};
