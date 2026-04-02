import React, { useState } from 'react';
import styles from './admin-auth.module.css';

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Password reset instructions sent to your email.');
      } else {
        setError(data.message || 'Failed to send reset instructions.');
      }
    } catch (err) {
      setError('Failed to send reset instructions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <form className={styles.authForm} onSubmit={handleForgot}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your admin email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
        {success && <div style={{ color: '#10b981', textAlign: 'center' }}>{success}</div>}
        {error && <div className={styles.errorMsg}>{error}</div>}
        <a href="/dashboard/admin-login" className={styles.forgotLink}>Back to login</a>
      </form>
    </div>
  );
}
