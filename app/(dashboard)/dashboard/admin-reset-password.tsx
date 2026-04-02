import React, { useState } from 'react';
import styles from './admin-auth.module.css';

export default function AdminResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Assume token is in URL as ?token=...
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const token = urlParams ? urlParams.get('token') : '';

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Password reset successful. You can now log in.');
      } else {
        setError(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError('Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <form className={styles.authForm} onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</button>
        {success && <div style={{ color: '#10b981', textAlign: 'center' }}>{success}</div>}
        {error && <div className={styles.errorMsg}>{error}</div>}
        <a href="/dashboard/admin-login" className={styles.forgotLink}>Back to login</a>
      </form>
    </div>
  );
}
