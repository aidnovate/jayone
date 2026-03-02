'use client'

import React from "react";
import styles from "./style.module.css";

export default function ApplicationForm() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    telephoneNumber: '',
    dateOfBirth: '',
    highestQualification: '',
    fashionExperience: '',
    emergencyContactName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.formContainer}>
      {step === 1 && (
        <div className={styles.step}>
          <h2>Personal Information</h2>
          <p className={styles.stepDescription}>Let's start with your basic information</p>
          
          <div className={styles.inputGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input 
              id="fullName"
              name="fullName"
              placeholder="Enter your full name" 
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address" 
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="telephoneNumber">Telephone Number</label>
            <input 
              id="telephoneNumber"
              name="telephoneNumber"
              type="tel"
              placeholder="Enter your telephone number" 
              value={formData.telephoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input 
              id="dateOfBirth"
              name="dateOfBirth"
              placeholder="Select your date of birth" 
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>

          <button className={styles.nextBtn} onClick={() => setStep(2)} disabled={!formData.fullName || !formData.email || !formData.telephoneNumber}>
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.step}>
          <h2>Academic Background</h2>
          <p className={styles.stepDescription}>Tell us about your educational experience</p>
          
          <div className={styles.inputGroup}>
            <label htmlFor="qualification">Highest Qualification</label>
            <input 
              id="qualification"
              name="highestQualification"
              placeholder="e.g., High School Diploma, Bachelor's Degree" 
              value={formData.highestQualification}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.backBtn} onClick={() => setStep(1)}>Back</button>
            <button className={styles.nextBtn} onClick={() => setStep(3)} disabled={!formData.highestQualification}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.step}>
          <h2>Fashion Experience</h2>
          <p className={styles.stepDescription}>Share your passion and experience with fashion</p>
          
          <div className={styles.inputGroup}>
            <label htmlFor="experience">Why Jayone Prestige?</label>
            <textarea 
              id="experience"
              name="fashionExperience"
              placeholder="Tell us about your fashion journey and why you want to join our school..."
              value={formData.fashionExperience}
              onChange={handleInputChange}
              required
              rows={5}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.backBtn} onClick={() => setStep(2)}>Back</button>
            <button className={styles.nextBtn} onClick={() => setStep(4)} disabled={!formData.fashionExperience}>Next</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className={styles.step}>
          <h2>Emergency Contact</h2>
          <p className={styles.stepDescription}>We need an emergency contact for your safety</p>
          
          <div className={styles.inputGroup}>
            <label htmlFor="emergencyContact">Emergency Contact Name</label>
            <input 
              id="emergencyContact"
              name="emergencyContactName"
              placeholder="Enter emergency contact name" 
              value={formData.emergencyContactName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.summary}>
            <h3>Application Summary</h3>
            <p><strong>Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.telephoneNumber}</p>
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.backBtn} onClick={() => setStep(3)}>Back</button>
            <button className={styles.submitBtn} type="submit" disabled={!formData.emergencyContactName}>
              Submit Application
            </button>
          </div>
        </div>
      )}

      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${(step / 4) * 100}%` }}></div>
      </div>
      <p className={styles.stepIndicator}>Step {step} of 4</p>
    </div>
  );
}
