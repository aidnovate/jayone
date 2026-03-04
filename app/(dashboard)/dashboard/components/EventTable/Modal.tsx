import React from 'react';
import styles from './Modal.module.css';

export default function Modal({ open, onClose, children, title }: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          {title && <h3>{title}</h3>}
          <button className={styles.close} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
