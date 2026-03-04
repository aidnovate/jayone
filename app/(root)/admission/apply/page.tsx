'use client'

import ApplicationForm from "@/app/components/ApplicationForm";
import OtherPagesHero from "@/app/components/OtherPagesHero";
// import Footer from "@/app/components/Footer";
import { useState } from "react";
import styles from "./style.module.css";

export default function Apply() {
  const [verified, setVerified] = useState(false);
  const [formData, setFormData] = useState({
    serial: '',
    token: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVerify = () => {
    if (formData.serial && formData.token) {
      setVerified(true);
    }
  };

  return (
    <>
      {!verified && (
        <OtherPagesHero 
          title="Application Verification"
          subtitle="Enter Your Purchase Details to Begin Your Application"
        />
      )}
      
      {!verified ? (
        <div className={styles.verificationContainer}>
          <div className={styles.verificationCard}>
            <h2>Verify Your Purchase</h2>
            <p className={styles.subtitle}>Please enter your serial number and access token from your purchase confirmation email.</p>
            
            <div className={styles.inputGroup}>
              <label htmlFor="serial">Serial Number</label>
              <input 
                id="serial"
                name="serial"
                placeholder="Enter your serial number" 
                value={formData.serial}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="token">Access Token</label>
              <input 
                id="token"
                name="token"
                placeholder="Enter your access token" 
                value={formData.token}
                onChange={handleInputChange}
              />
            </div>

            <button 
              className={styles.verifyBtn} 
              onClick={handleVerify}
              disabled={!formData.serial || !formData.token}
            >
              Verify & Continue
            </button>
            
            <p className={styles.helpText}>
              Don't have your details? <a href="/our-programs">Purchase an admission form</a>
            </p>
          </div>
        </div>
      ) : (
        <>
          <ApplicationForm />
          {/* <Footer /> */}
        </>
      )}
    </>
  );
}