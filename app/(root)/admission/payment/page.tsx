"use client";

import Footer from "@/app/components/Footer";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from './style.module.css'
import Button from "@/app/components/Button";
import OtherPagesHero from "@/app/components/OtherPagesHero";
import axios from 'axios'


import { Suspense } from "react";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseParam = searchParams.get("course");
  const [selectedCourse, setSelectedCourse] = React.useState("");
  const course = courseParam || selectedCourse || "";
  const courses = [
    "Fashion Design",
    "Pattern Making",
    "Tailoring & Garment Technology",
    "Fashion Business & Branding"
  ];

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isPaying, setIsPaying] = React.useState(false);

  const payWithPaystack = async () => {
    if (!fullName || !email || !phone) {
      alert("Please fill in all fields.");
      return;
    }
    setIsPaying(true);
    try {
      // 1. Initialize Paystack transaction via backend
      const res = await axios.post("https://jayone-87f0a69e6159.herokuapp.com/api/paystack/initialize", {
        email,
        amount: 130 * 100, // GHS to pesewas
        callback_url: window.location.origin + `/admission/success?course=${encodeURIComponent(course)}&fullName=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`
      });

      const data = await res.data;
      if (!data.success) throw new Error(data.message || "Failed to initialize payment");
      // 2. Redirect to Paystack checkout

      console.log("Reference:", data);
      window.location.href = data.data.authorization_url;
    } catch (err: any) {
      alert(err.message || "Payment initialization failed");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <>
      <OtherPagesHero 
        title="Purchase Admission Form"
        subtitle="Complete Your Payment to Begin Your Application"
      />
      <div className={style.container}>
        <div className={style.paymentCard}>
          <div className={style.header}>
            <h1>Jayone Prestige School</h1>
            <h2>Admission Form Purchase</h2>
          </div>
          <div className={style.details}>
            <div className={style.section}>
              <label>Selected Program</label>
              {course ? (
                <p className={style.value}>{decodeURIComponent(course)}</p>
              ) : (
                <select
                  className={style.value}
                  value={selectedCourse}
                  onChange={e => setSelectedCourse(e.target.value)}
                  disabled={isPaying}
                >
                  <option value="">Select a course</option>
                  {courses.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}
            </div>
            <div className={style.divider}></div>
            <div className={style.section}>
              <label>Full Name</label>
              <input
                className={style.value}
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Enter your full name"
                disabled={isPaying}
              />
            </div>
            <div className={style.section}>
              <label>Email</label>
              <input
                className={style.value}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isPaying}
              />
            </div>
            <div className={style.section}>
              <label>Phone Number</label>
              <input
                className={style.value}
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                disabled={isPaying}
              />
            </div>
            <div className={style.divider}></div>
            <div className={style.section}>
              <label>Description</label>
              <p className={style.description}>
                This admission form unlocks your application journey at Jayone Prestige School. After payment, you'll receive access credentials to complete your full application via email.
              </p>
            </div>
            <div className={style.divider}></div>
            <div className={style.section}>
              <div className={style.priceBreakdown}>
                <div className={style.lineItem}>
                  <span>Admission Form Fee</span>
                  <span className={style.price}>130 GHS</span>
                </div>
                {/* <div className={style.lineItem}>
                  <span>Admin Fee</span>
                  <span className={style.price}>Included</span>
                </div> */}
              </div>
            </div>
            <div className={style.total}>
              <span>Total Amount</span>
              <span className={style.totalPrice}>130 GHS</span>
            </div>
          </div>
          <div className={style.actions}>
            <Button
              onClick={payWithPaystack}
              variant="primary"
              size="lg"
              fullWidth
              disabled={isPaying}
            >
              {isPaying ? "Processing..." : "Pay 130 GHS & Continue"}
            </Button>
            <Button
              href="/our-programs"
              variant="secondary"
              size="lg"
              fullWidth
              disabled={isPaying}
            >
              Cancel
            </Button>
          </div>
          <div className={style.secure}>
            <p>✓ Secure Payment Powered by Paystack</p>
            <p>All transactions are encrypted and secure</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function Payment() {
  return (
    <Suspense>
      <PaymentContent />
    </Suspense>
  );
}
