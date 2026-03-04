
import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface BlogEditorProps {
  initialContent?: string;
  onSave: (data: { title: string; image: string; content: string }) => void;
}

export default function BlogEditor({ initialContent, onSave }: BlogEditorProps) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your blog content here...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
          ],
        },
      });
      if (initialContent) {
        quillRef.current.root.innerHTML = initialContent;
      }
    }
  }, [initialContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = quillRef.current?.root.innerHTML || '';
    onSave({ title, image, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{marginBottom:'1rem',width:'100%',padding:'0.7rem',borderRadius:'8px',border:'1px solid #333'}}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={e => setImage(e.target.value)}
        style={{marginBottom:'1rem',width:'100%',padding:'0.7rem',borderRadius:'8px',border:'1px solid #333'}}
      />
      <div style={{marginBottom:'1rem'}}>
        <div ref={editorRef} style={{background:'#fff', color:'#222', minHeight:'120px', borderRadius:'8px'}} />
      </div>
      <button type="submit" style={{background:'var(--primary)',color:'#fff',border:'none',borderRadius:'8px',padding:'0.7rem 1.5rem',fontWeight:600,fontSize:'1rem',cursor:'pointer'}}>Save Blog</button>
    </form>
  );
}
