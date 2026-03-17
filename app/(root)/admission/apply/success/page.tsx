"use client";

import { Suspense, useEffect, useState } from "react";
import Button from "@/app/components/Button";
import { jsPDF } from "jspdf";

function handleDownloadApplication(formData: any, photoPreview: string | null) {
  const doc = new jsPDF();
  doc.setFillColor(44, 62, 80);
  doc.rect(0, 0, 210, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("Jayone Prestige School of Fashion", 105, 13, { align: 'center' });
  doc.setFontSize(12);
  doc.text("Student Application Form", 105, 20, { align: 'center' });
  let y = 32;
  if (photoPreview) {
    try {
      doc.setDrawColor(44, 62, 80);
      doc.rect(160, y, 35, 42);
      doc.addImage(photoPreview, 'JPEG', 161, y + 1, 33, 40);
    } catch {}
  }
  doc.setTextColor(44, 62, 80);
  doc.setFontSize(14);
  doc.text('Personal Details', 10, y);
  doc.setFontSize(11);
  y += 7;
  const addLine = (label: string, value: string) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, 12, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${value || ''}`, 55, y);
    y += 7;
  };
  addLine('Surname', formData.surname);
  addLine('First Name', formData.firstName);
  addLine('Other Name', formData.otherName);
  addLine('Gender', formData.gender);
  addLine('Date of Birth', `${formData.dateOfBirthD}/${formData.dateOfBirthM}/${formData.dateOfBirthY}`);
  addLine('Place of Birth', formData.placeOfBirth);
  addLine('Nationality', formData.nationality);
  addLine('Marital Status', formData.maritalStatus);
  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.text('Contact Information', 10, y);
  doc.setFont('helvetica', 'normal');
  y += 7;
  addLine('ID Card Number', formData.idCardNumber);
  addLine('Permanent Address', formData.permanentAddress);
  addLine('Telephone', formData.telephone);
  addLine('Email', formData.email);
  addLine('Is Foreigner In Ghana', formData.isForeignerInGhana);
  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.text('Program Details', 10, y);
  doc.setFont('helvetica', 'normal');
  y += 7;
  addLine('Program', formData.program);
  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.text('Education', 10, y);
  doc.setFont('helvetica', 'normal');
  y += 7;
  addLine('Previous College', formData.previousCollege);
  addLine('Year Of Completion', formData.yearOfCompletion);
  addLine('Certificate Type', formData.certificateType);
  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.text('Sponsor / Guardian', 10, y);
  doc.setFont('helvetica', 'normal');
  y += 7;
  addLine('Sponsor Name', formData.sponsorFullName);
  addLine('Sponsor Relationship', formData.sponsorRelationship);
  addLine('Sponsor Occupation', formData.sponsorOccupation);
  addLine('Sponsor Mobile', formData.sponsorMobile);
  addLine('Sponsor Email', formData.sponsorEmail);
  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.text('Other Information', 10, y);
  doc.setFont('helvetica', 'normal');
  y += 7;
  addLine('Fashion Experience', formData.fashionExperience);
  addLine('Heard From', formData.heardFrom);
  addLine('Serial Number', formData.serialNumber);
  addLine('Token', formData.token);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Declaration', 10, y);
  doc.setFont('helvetica', 'normal');
  y += 7;
  doc.text('I hereby declare that the information provided above is true and correct.', 12, y);
  y += 15;
  doc.text('Signature: ____________________________', 12, y);
  doc.text('Date: ___________________', 120, y);
  doc.save(`Jayone_Application_${formData.firstName}_${formData.surname}.pdf`);
}

function handleDownloadAdmissionLetter(status: any, formData: any) {
  const doc = new jsPDF();
  doc.setFillColor(44, 62, 80);
  doc.rect(0, 0, 210, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("Jayone Prestige School of Fashion", 105, 13, { align: 'center' });
  doc.setFontSize(12);
  doc.text("Official Admission Letter", 105, 20, { align: 'center' });
  let y = 35;
  doc.setTextColor(44, 62, 80);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Congratulations!', 10, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(`Dear Applicant,`, 10, y);
  y += 8;
  doc.text(
    'We are pleased to inform you that you have been granted admission to Jayone Prestige School of Fashion.',
    10, y, { maxWidth: 190 }
  );
  y += 12;
  doc.setFont('helvetica', 'bold');
  doc.text('Admission Details:', 10, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  const course = status?.program || formData.program;
  const PROGRAMS = [
    { id: "2years", label: "2 Years Beginners" },
    { id: "1year", label: "1 Year Top Up" },
    { id: "6months", label: "6 Months Advanced" },
    { id: "3months", label: "3 Months Master Class" },
  ];
  const courseLabel = PROGRAMS.find(p => p.id === course)?.label || course;
  const years =
    status?.years ||
    (course === '2years' ? '2 Years' :
     course === '1year' ? '1 Year' :
     course === '6months' ? '6 Months' :
     course === '3months' ? '3 Months' : '');
  const fees = status?.fees || 'See school for details';
  doc.text(`Course: ${courseLabel}`, 12, y);
  y += 7;
  doc.text(`Duration: ${years}`, 12, y);
  y += 7;
  doc.text(`Fees: ${fees}`, 12, y);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('About Jayone Prestige:', 10, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Jayone Prestige School of Fashion is dedicated to nurturing creative talent and providing hands-on training in fashion and design. Our programs are tailored to equip you with the skills needed for a successful career in the fashion industry.',
    10, y, { maxWidth: 190 }
  );
  y += 18;
  doc.setFont('helvetica', 'bold');
  doc.text('Next Steps:', 10, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Please contact the school administration to receive your full prospectus and for any further information regarding your admission and enrollment process.',
    10, y, { maxWidth: 190 }
  );
  y += 18;
  doc.text('We look forward to welcoming you to Jayone Prestige!', 10, y);
  y += 12;
  doc.text('Sincerely,', 10, y);
  y += 7;
  doc.text('Admissions Office', 10, y);
  y += 7;
  doc.text('Jayone Prestige School of Fashion', 10, y);
  doc.save('Jayone_Admission_Letter.pdf');
}

function SuccessContent() {
  const [formData, setFormData] = useState<any>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [applicationStatus, setApplicationStatus] = useState<any>(null);
  const [admissionGranted, setAdmissionGranted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("applicationFormData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setFormData(parsed);
      setPhotoPreview(parsed.photoPreview || null);
    }

    const token = localStorage.getItem("token");
    if (token) {
      fetch(`https://jayone-87f0a69e6159.herokuapp.com/api/status/${token}`)
        .then(res => res.json())
        .then(data => {
          setApplicationStatus(data);
          if (data?.admissionGranted) setAdmissionGranted(true);
        })
        .catch(err => {
          console.error("Failed to fetch application status", err);
        });
    }
  }, []);

  if (!formData) {
    return (
      <div style={{ textAlign: 'center', marginTop: 60, color: '#444' }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 500,
      margin: '60px auto',
      background: '#fff',
      padding: 32,
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, color: '#27ae60' }}>✓</div>
        <h2 style={{ margin: '16px 0 8px' }}>Application Submitted</h2>
        <p style={{ color: '#444', marginBottom: 24 }}>
          Thank you, <strong>{formData.firstName}</strong>. Your application has been received.<br />
          We will review it and get in touch at <strong>{formData.email}</strong> shortly.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', margin: '24px 0' }}>
          <Button onClick={() => handleDownloadApplication(formData, photoPreview)}>
            Download Application
          </Button>
          {admissionGranted && (
            <Button onClick={() => handleDownloadAdmissionLetter(applicationStatus, formData)}>
              Download Admission Letter
            </Button>
          )}
        </div>

        <div style={{ margin: '24px 0', borderTop: '1px solid #eee' }} />
        <p style={{ color: '#888' }}>Jayone Prestige School of Fashion</p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: 60 }}>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}