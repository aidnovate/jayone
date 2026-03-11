'use client'

import React from "react";
import styles from "./style.module.css";
import Button from "../Button";

type FormData = {
  surname: string;
  firstName: string;
  otherName: string;
  gender: string;
  dateOfBirthD: string;
  dateOfBirthM: string;
  dateOfBirthY: string;
  placeOfBirth: string;
  nationality: string;
  maritalStatus: string;
  passportPhoto: File | null;
  idCardNumber: string;
  permanentAddress: string;
  telephone: string;
  email: string;
  isForeignerInGhana: string;
  program: string;
  previousCollege: string;
  yearOfCompletion: string;
  certificateType: string;
  sponsorFullName: string;
  sponsorRelationship: string;
  sponsorOccupation: string;
  sponsorMobile: string;
  sponsorEmail: string;
  fashionExperience: string;
  heardFrom: string;
  token: string,
  serialNumber: string;
};

const PROGRAMS = [
  {
    id: "2years",
    label: "2 Years Beginners",
    courses: "Basic to master class: Tailoring, Dressmaking, Beadmaking, Dummy Making, Makeup Artistry, Modeling",
  },
  {
    id: "1year",
    label: "1 Year Top Up",
    courses: "Corsetry to Master Class: Dressmaking, Tailoring, Bead making, Dummy making, Modeling",
  },
  {
    id: "6months",
    label: "6 Months Advanced",
    courses: "Advanced Corsetry to master class: Tailoring, Dressmaking, Beadmaking, Dummy making, Modeling",
  },
  {
    id: "3months",
    label: "3 Months Master Class",
    courses: "Tailoring, Dressmaking, Beadmaking, Dummy Making",
  },
];

const HEARD_FROM = [
  "Social Media",
  "Friend / Family",
  "Google Search",
  "Billboard / Poster",
  "Radio / TV",
  "Walk-in",
  "Other",
];

const STEPS = [
  { number: 1, title: "Personal" },
  { number: 2, title: "Contact" },
  { number: 3, title: "Program" },
  { number: 4, title: "Education" },
  { number: 5, title: "Sponsor" },
  { number: 6, title: "Final" },
];

const CERT_TYPES = ["Degree", "Diploma", "WASSCE", "Others"];
const MARITAL_STATUSES = ["Single", "Married", "Divorced", "Widowed"];

export default function ApplicationForm() {
  const [step, setStep] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");
  const token = localStorage.getItem("token");
  const serialNumber = localStorage.getItem("serialNumber");

  const [formData, setFormData] = React.useState<FormData>({
    surname: "", firstName: "", otherName: "", gender: "",
    dateOfBirthD: "", dateOfBirthM: "", dateOfBirthY: "",
    placeOfBirth: "", nationality: "", maritalStatus: "",
    passportPhoto: null,
    idCardNumber: "", permanentAddress: "", telephone: "", email: "",
    isForeignerInGhana: "",
    program: "",
    previousCollege: "", yearOfCompletion: "", certificateType: "",
    sponsorFullName: "", sponsorRelationship: "", sponsorOccupation: "",
    sponsorMobile: "", sponsorEmail: "",
    fashionExperience: "", heardFrom: "",
    token: token || "",
    serialNumber: serialNumber || ""
  });

  const set = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, passportPhoto: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSuccessMsg("");
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "passportPhoto" && value) {
          form.append(key, value as File);
        } else {
          form.append(key, value as string);
        }
      });
      const res = await fetch("https://jayone-87f0a69e6159.herokuapp.com/api/applications/submit", {
        method: "POST",
        body: form
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg("Your application has been submitted. A copy has been sent to your email. We will review it and get in touch at " + formData.email + " shortly.");
        setSubmitted(true);
      } else {
        setSuccessMsg("Submission failed. Please try again or contact support.");
      }
    } catch (err) {
      setSuccessMsg("Submission failed. Please try again or contact support.");
    } finally {
      setSubmitting(false);
    }
  };

  const cx = (...classes: (string | false | undefined)[]) =>
    classes.filter(Boolean).join(" ");

  return (
    <div className={styles.wrapper}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.headerEyebrow}>Jayone Prestige School of Fashion</p>
          <h3 className={styles.headerTitle}>
            Student <em>Application</em> Form
          </h3>
        </div>
      </header>

      {/* ── Step navigation ── */}
      <nav className={styles.stepNav}>
        <div className={styles.stepNavInner}>
          <div className={styles.stepTrack}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s.number}>
                <div className={styles.stepItem}>
                  <div className={cx(
                    styles.stepDot,
                    step === s.number && styles.stepDotActive,
                    step > s.number && styles.stepDotDone
                  )}>
                    {step > s.number ? "✓" : s.number}
                  </div>
                  <span className={cx(styles.stepLabel, step === s.number && styles.stepLabelActive)}>
                    {s.title}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cx(styles.stepConnector, step > s.number && styles.stepConnectorDone)} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </nav>

      {/* ── Body ── */}
      <main className={styles.body}>
        {!submitted ? (
          <>
            {/* ═══ STEP 1 — Personal Details ═══ */}
            {step === 1 && (
              <div className={styles.step}>
                <h2 className={styles.stepHeading}>Personal Details</h2>
                <p className={styles.stepSubheading}>Begin with your basic personal information</p>

                <div className={cx(styles.gridPersonal, styles.mb6)}>
                  <div className={styles.personalFields}>
                    <div className={styles.field}>
                      <label className={styles.label}>Surname</label>
                      <input className={styles.input} placeholder="e.g. Mensah" value={formData.surname} onChange={(e) => set("surname", e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>First Name</label>
                      <input className={styles.input} placeholder="e.g. Abena" value={formData.firstName} onChange={(e) => set("firstName", e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Other Name</label>
                      <input className={styles.input} placeholder="Middle or other name" value={formData.otherName} onChange={(e) => set("otherName", e.target.value)} />
                    </div>
                  </div>

                  <div className={styles.photoUpload}>
                    <label className={styles.label}>Passport Photo</label>
                    <label className={styles.photoBox}>
                      {photoPreview ? (
                        <img src={photoPreview} alt="Passport preview" className={styles.photoPreview} />
                      ) : (
                        <>
                          <span className={styles.photoBoxIcon}>📷</span>
                          <span className={styles.photoBoxText}>Click to<br />upload</span>
                        </>
                      )}
                      <input type="file" accept="image/*" hidden onChange={handlePhoto} />
                    </label>
                  </div>
                </div>

                <div className={cx(styles.field, styles.mb4)}>
                  <label className={styles.label}>Gender</label>
                  <div className={styles.radioRow}>
                    {["Male", "Female"].map((g) => (
                      <label key={g} className={styles.radioLabel}>
                        <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={(e) => set("gender", e.target.value)} className={styles.radioInput} />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>

                <div className={cx(styles.field, styles.mb4)}>
                  <label className={styles.label}>Date of Birth</label>
                  <div className={styles.dobRow}>
                    <div className={styles.dobUnit}>
                      <span className={styles.dobUnitLabel}>D</span>
                      <input className={styles.input} placeholder="DD" maxLength={2} value={formData.dateOfBirthD} onChange={(e) => set("dateOfBirthD", e.target.value)} />
                    </div>
                    <div className={styles.dobUnit}>
                      <span className={styles.dobUnitLabel}>M</span>
                      <input className={styles.input} placeholder="MM" maxLength={2} value={formData.dateOfBirthM} onChange={(e) => set("dateOfBirthM", e.target.value)} />
                    </div>
                    <div className={styles.dobUnit}>
                      <span className={styles.dobUnitLabel}>Y</span>
                      <input className={styles.input} placeholder="YYYY" maxLength={4} value={formData.dateOfBirthY} onChange={(e) => set("dateOfBirthY", e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Place of Birth</label>
                      <input className={styles.input} placeholder="City, Country" value={formData.placeOfBirth} onChange={(e) => set("placeOfBirth", e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className={cx(styles.grid2, styles.mb6)}>
                  <div className={styles.field}>
                    <label className={styles.label}>Nationality</label>
                    <input className={styles.input} placeholder="e.g. Ghanaian" value={formData.nationality} onChange={(e) => set("nationality", e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Marital Status</label>
                    <select className={styles.select} value={formData.maritalStatus} onChange={(e) => set("maritalStatus", e.target.value)}>
                      <option value="">Select...</option>
                      {MARITAL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className={styles.buttonGroupEnd}>
                  <Button
                    variant="primary"
                    disabled={!formData.surname || !formData.firstName || !formData.gender || !formData.passportPhoto}
                    onClick={() => setStep(2)}
                  >
                    Continue →
                  </Button>
                </div>
              </div>
            )}

            {/* ═══ STEP 2 — Contact ═══ */}
            {step === 2 && (
              <div className={styles.step}>
                <h2 className={styles.stepHeading}>Contact Information</h2>
                <p className={styles.stepSubheading}>How we can reach you</p>

                <div className={cx(styles.grid2, styles.mb4)}>
                  <div className={styles.field}>
                    <label className={styles.label}>Identification Card No.</label>
                    <input className={styles.input} placeholder="e.g. GHA-XXXXXXXX-X" value={formData.idCardNumber} onChange={(e) => set("idCardNumber", e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Permanent Address</label>
                    <input className={styles.input} placeholder="Street, City" value={formData.permanentAddress} onChange={(e) => set("permanentAddress", e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Telephone</label>
                    <input className={styles.input} placeholder="+233 XX XXX XXXX" value={formData.telephone} onChange={(e) => set("telephone", e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email Address</label>
                    <input className={styles.input} type="email" placeholder="you@email.com" value={formData.email} onChange={(e) => set("email", e.target.value)} />
                  </div>
                </div>

                <div className={cx(styles.noticeBox, styles.mb6)}>
                  <p className={styles.noticeText}>
                    Foreigners Only: Are you permanently in Ghana? If yes, attach a copy of your resident permit.
                  </p>
                  <div className={styles.radioRow}>
                    {["Yes", "No", "N/A"].map((opt) => (
                      <label key={opt} className={styles.radioLabel}>
                        <input type="radio" name="foreignerInGhana" value={opt} checked={formData.isForeignerInGhana === opt} onChange={(e) => set("isForeignerInGhana", e.target.value)} className={styles.radioInput} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <Button variant="primary" onClick={() => setStep(1)}>← Back</Button>
                  <Button variant="primary" disabled={!formData.telephone || !formData.email} onClick={() => setStep(3)}>Continue →</Button>
                </div>
              </div>
            )}

            {/* ═══ STEP 3 — Program ═══ */}
            {step === 3 && (
              <div className={styles.step}>
                <h2 className={styles.stepHeading}>Program Offered</h2>
                <p className={styles.stepSubheading}>Select the program you wish to enroll in</p>

                <div className={styles.programGrid}>
                  {PROGRAMS.map((prog) => (
                    <label key={prog.id} className={cx(styles.programCard, formData.program === prog.id && styles.programCardActive)}>
                      <input type="radio" name="program" value={prog.id} checked={formData.program === prog.id} onChange={(e) => set("program", e.target.value)} className={styles.radioInput} />
                      <div>
                        <div className={styles.programCardTitle}>{prog.label}</div>
                        <div className={styles.programCardCourses}>{prog.courses}</div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className={styles.buttonGroup}>
                  <Button variant="primary"  onClick={() => setStep(2)}>← Back</Button>
                  <Button variant="primary"  disabled={!formData.program} onClick={() => setStep(4)}>Continue →</Button>
                </div>
              </div>
            )}

            {/* ═══ STEP 4 — Education ═══ */}
            {step === 4 && (
              <div className={styles.step}>
                <h2 className={styles.stepHeading}>Educational Qualification</h2>
                <p className={styles.stepSubheading}>Your academic background</p>

                <div className={cx(styles.field, styles.mb4)}>
                  <label className={styles.label}>Previous College / University</label>
                  <input className={styles.input} placeholder="Name of institution" value={formData.previousCollege} onChange={(e) => set("previousCollege", e.target.value)} />
                </div>

                <div className={cx(styles.grid2, styles.mb4)}>
                  <div className={styles.field}>
                    <label className={styles.label}>Year of Completion</label>
                    <input className={styles.input} placeholder="e.g. 2022" maxLength={4} value={formData.yearOfCompletion} onChange={(e) => set("yearOfCompletion", e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Certificate Acquired</label>
                    <div className={styles.certRow}>
                      {CERT_TYPES.map((cert) => (
                        <label key={cert} className={styles.radioLabel}>
                          <input type="radio" name="cert" value={cert} checked={formData.certificateType === cert} onChange={(e) => set("certificateType", e.target.value)} className={styles.radioInput} />
                          {cert}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <Button variant="primary" onClick={() => setStep(3)}>← Back</Button>
                  <Button variant="primary" onClick={() => setStep(5)}>Continue →</Button>
                </div>
              </div>
            )}

            {/* ═══ STEP 5 — Sponsor ═══ */}
            {step === 5 && (
              <div className={styles.step}>
                <h2 className={styles.stepHeading}>Details of Sponsor / Guardian</h2>
                <p className={styles.stepSubheading}>Your emergency or financial sponsor</p>

                <div className={cx(styles.field, styles.mb4)}>
                  <label className={styles.label}>Full Name</label>
                  <input className={styles.input} placeholder="Sponsor or guardian's full name" value={formData.sponsorFullName} onChange={(e) => set("sponsorFullName", e.target.value)} />
                </div>

                <div className={cx(styles.grid2, styles.mb6)}>
                  <div className={styles.field}>
                    <label className={styles.label}>Relationship to Applicant</label>
                    <input className={styles.input} placeholder="e.g. Parent, Sibling" value={formData.sponsorRelationship} onChange={(e) => set("sponsorRelationship", e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Occupation</label>
                    <input className={styles.input} placeholder="e.g. Teacher, Trader" value={formData.sponsorOccupation} onChange={(e) => set("sponsorOccupation", e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Mobile</label>
                    <input className={styles.input} placeholder="+233 XX XXX XXXX" value={formData.sponsorMobile} onChange={(e) => set("sponsorMobile", e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input className={styles.input} type="email" placeholder="sponsor@email.com" value={formData.sponsorEmail} onChange={(e) => set("sponsorEmail", e.target.value)} />
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <Button variant="primary" onClick={() => setStep(4)}>← Back</Button>
                  <Button variant="primary" disabled={!formData.sponsorFullName || !formData.sponsorMobile} onClick={() => setStep(6)}>Continue →</Button>
                </div>
              </div>
            )}

            {/* ═══ STEP 6 — Final ═══ */}
            {step === 6 && (
              <div className={styles.step}>
                <h2 className={styles.stepHeading}>Almost There</h2>
                <p className={styles.stepSubheading}>A few last questions before you submit</p>

                <div className={cx(styles.field, styles.mb4)}>
                  <label className={styles.label}>Why do you want to join Jayone Prestige?</label>
                  <textarea className={styles.textarea} rows={4} placeholder="Share your passion for fashion and what you hope to achieve..." value={formData.fashionExperience} onChange={(e) => set("fashionExperience", e.target.value)} />
                </div>

                <div className={cx(styles.field, styles.mb6)}>
                  <label className={styles.label}>How did you hear about us?</label>
                  <div className={styles.heardGrid}>
                    {HEARD_FROM.map((opt) => (
                      <label key={opt} className={cx(styles.heardOption, formData.heardFrom === opt && styles.heardOptionActive)}>
                        <input type="radio" name="heardFrom" value={opt} checked={formData.heardFrom === opt} onChange={(e) => set("heardFrom", e.target.value)} className={styles.radioInput} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {/* <div className={styles.summaryCard}>
                  <h3 className={styles.summaryTitle}>Application Summary</h3>
                  <div className={styles.summaryGrid}>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryItemLabel}>Name</span>
                      <span className={styles.summaryItemValue}>{formData.firstName} {formData.surname}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryItemLabel}>Email</span>
                      <span className={styles.summaryItemValue}>{formData.email}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryItemLabel}>Phone</span>
                      <span className={styles.summaryItemValue}>{formData.telephone}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryItemLabel}>Program</span>
                      <span className={styles.summaryItemValue}>{PROGRAMS.find((p) => p.id === formData.program)?.label || "—"}</span>
                    </div>
                  </div>
                </div> */}

                <div className={styles.buttonGroup}>
                  <Button variant="primary" onClick={() => setStep(5)}>← Back</Button>
                  <Button
                    variant="primary"
                    disabled={!formData.fashionExperience || !formData.heardFrom || !formData.passportPhoto || submitting}
                    onClick={handleSubmit}
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={styles.successScreen}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.successTitle}>Application Submitted</h2>
            <p className={styles.successText}>
              {successMsg || (
                <>
                  Thank you, <strong>{formData.firstName}</strong>. Your application has been received.
                  We will review it and get in touch at <strong>{formData.email}</strong> shortly.
                </>
              )}
            </p>
            <div className={styles.successDivider} />
            <p className={styles.successBrand}>Jayone Prestige School of Fashion</p>
          </div>
        )}
      </main>
    </div>
  );
}