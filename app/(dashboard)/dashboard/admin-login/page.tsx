"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./style.module.css";
import axios from "axios";
import Button from "@/app/components/Button";


function ForgotPasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const res = await axios.post("/login/forgot-password", {
        email
      });
      const data = await res.data;
      if (data.success) {
        setStatus("A reset link has been sent to your email.");
      } else if (data.error === "not_found") {
        setStatus("User does not exist. Please contact the admin.");
      } else {
        setStatus("Something went wrong. Try again.");
      }
    } catch {
      setStatus("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
  <div className={styles.modalOverlay} onClick={onClose}>
      {/* stopPropagation prevents closing when clicking inside the white box */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeModal} onClick={onClose}>&times;</button>
        
        <h3>Forgot Password</h3>
        <p style={{ fontSize: '14px', color: '#718096', marginBottom: '20px' }}>
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className={styles.authForm} style={{ padding: 0, boxShadow: 'none', background: 'transparent' }}>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input} // Ensure your input has a class if needed
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Send Reset Link"}
          </Button>
        </form>

        {status && <div className={styles.statusMsg}>{status}</div>}
      </div>
    </div>
  );
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const router = useRouter();

  const API_URL = "https://jayone-87f0a69e6159.herokuapp.com/api/admin/";
// const API_URL = "http://localhost:5000/api/admin/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}login`, {
        email,
        password
      });

      console.log("Login response:", res.data.data); // Debug log
      const data = await res.data;
      if (data.success && data.data.token) {
        localStorage.setItem("adminToken", data.data.token);
        router.push("/dashboard");
        setTimeout(() => { window.location.href = "/dashboard"; }, 200);
      } else {
        console.log("Login error:", data.message); // Debug log
        setError(data.message || "Invalid credentials");
      }
    } catch (err: any) {
      console.error("Login error:", err); // Debug log
      if (err?.response?.status === 429) {
        setError("Too many login attempts. Please try again later.");
      } else {
        setError("Login failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
<div className={styles.authContainer}>
  <form className={styles.authForm} onSubmit={handleSubmit}>
    <h2>Admin Portal</h2>
    
    {error && <div className={styles.error}>{error}</div>}
    
    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568', marginBottom: '4px' }}>
      Email Address
    </label>
    <input
      type="email"
      placeholder="admin@example.com"
      value={email}
      onChange={e => setEmail(e.target.value)}
      required
    />

    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568', marginBottom: '4px' }}>
      Password
    </label>
    <input
      type="password"
      placeholder="••••••••"
      value={password}
      onChange={e => setPassword(e.target.value)}
      required
    />

    <Button type="submit" disabled={loading}>
      {loading ? "Verifying..." : "Sign In"}
    </Button>
            <span
          className={styles.forgotLink}
          style={{ cursor: "pointer", marginTop: 12, display: "inline-block" }}
          onClick={() => setShowForgot(true)}
        >
          Forgot password?
        </span>
  </form>
      <ForgotPasswordModal open={showForgot} onClose={() => setShowForgot(false)} />

</div>
  );
}
