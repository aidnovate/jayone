'use client'

import ApplicationForm from "@/app/components/ApplicationForm";
import OtherPagesHero from "@/app/components/OtherPagesHero";
// import Footer from "@/app/components/Footer";
import { useState } from "react";
import axios from "axios";
import styles from "./style.module.css";
import Button from "@/app/components/Button";

export default function Apply() {
  const [verified, setVerified] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    serialNumber: '',
    pin: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVerify = async () => {
    if (formData.serialNumber && formData.pin) {
      setVerifyStatus(null);
      localStorage.setItem("token", formData.pin);
      localStorage.setItem("serialNumber", formData.serialNumber);
      try {
        const res = await axios.post("https://jayone-87f0a69e6159.herokuapp.com/api/payments/verify-token", {
          serialNumber: formData.serialNumber,
          pin: formData.pin
        });

        const data = res.data;
        if (data.success && !data.data.tokenUsed) {
          setVerified(true);
        } 
        else if (!data.success && data.data.tokenUsed) {
          setVerifyStatus("This token has already been used. Please contact the admission office.");
        } else if (!data.success) {
          setVerifyStatus("The token or serial number does not exist in our records.");
        } else {
          setVerifyStatus("Verification failed. Please try again or contact support.");
        }
      } catch (err) {
        console.log(err);
        setVerifyStatus("Network error. Please try again.");
      }
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
      {!verified && verifyStatus && (
        <div style={{color: 'red', textAlign: 'center', marginBottom: 16}}>{verifyStatus}</div>
      )}
      {!verified ? (
        <div className={styles.verificationContainer}>
          <div className={styles.verificationCard}>
            <h2>Verify Your Purchase</h2>
            <p className={styles.subtitle}>Please enter your serial number and access token from your purchase confirmation email.</p>
            
            <div className={styles.inputGroup}>
              <label htmlFor="serialNumber">Serial Number</label>
              <input 
                id="serialNumber"
                name="serialNumber"
                placeholder="Enter your serial number" 
                value={formData.serialNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="pin">Access Token</label>
              <input 
                id="pin"
                name="pin"
                placeholder="Enter your access token" 
                value={formData.pin}
                onChange={handleInputChange}
              />
            </div>

            <Button 
              // className={styles.verifyBtn} 
              variant="primary"
              fullWidth={true}
              size="md"
              onClick={handleVerify}
              disabled={!formData.serialNumber || !formData.pin}
            >
              Verify & Continue
            </Button>
            
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