"use client";

import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Button from "@/app/components/Button";

export interface EventEditorProps {
  initialContent?: string;
  onSave: (data: { title: string; date: string; image: File | null; content: string }) => void;
}

export default function EventEditor({ initialContent, onSave }: EventEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your event content here...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
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

    const content = quillRef.current?.root.innerHTML ?? "";

    onSave({
      title,
      date,
      image,
      content,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={inputStyle}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files ? e.target.files[0] : null)}
        style={inputStyle}
      />

      <div
        ref={editorRef}
        style={{ height: "300px", marginBottom: "2rem" }}
      />

      <Button variant="primary" size="md" fullWidth={true} type="submit">
        Save Event
      </Button>
    </form>
  );
}

const inputStyle = {
  marginBottom: "1rem",
  width: "100%",
  padding: "0.7rem",
  borderRadius: "8px",
  border: "1px solid #333",
};

const buttonStyle = {
  background: "var(--primary)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "0.7rem 1.5rem",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer",
};