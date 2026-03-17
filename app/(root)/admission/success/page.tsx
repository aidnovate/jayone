"use client"

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

type PaymentDetails = {
  serialNumber?: string;
  pin?: string;
  [key: string]: any;
};

function AdmissionSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const course = searchParams.get('course');
  const fullName = searchParams.get('fullName');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');

  const [status, setStatus] = useState('Verifying payment...');
  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [saved, setSaved] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // ✅ Fix 1: start false
  const [alreadyProcessed, setAlreadyProcessed] = useState(false);

  useEffect(() => {
    if (!reference) {
      setStatus('No payment reference found.');
      return;
    }

    axios.post('https://jayone-87f0a69e6159.herokuapp.com/api/paystack/verify', { reference })
      .then(res => res.data)
      .then(data => {
        if (!data.success) {
          setStatus('Payment verification failed.');
          return;
        }

        setStatus('Payment verified successfully!');
        setDetails(data.data);

        const amount = data.data.amount / 100;
        const currency = data.data.currency;

        const sendData = async () => {
          try {
            const res = await axios.post(
              'https://jayone-87f0a69e6159.herokuapp.com/api/payments/create',
              { email, fullName, course, phone, reference, amount, currency }
            );
            const resp = res.data;

            setSaved(true); // ✅ always mark attempted

            if (resp.success === false && resp.message === 'This payment reference has already been processed') {
              setAlreadyProcessed(true);
              setDetails(resp.data);
              return;
            }

            // ✅ Fix 2: set emailSent true on clean success
            // ✅ Fix 3: check emailSent flag OR message — covers all backend shapes
            const emailFailed =
              resp.emailSent === false ||
              (resp.message && resp.message.toLowerCase().includes('email'));

            setEmailSent(!emailFailed);

          } catch (error) {
            console.error("Failed to save payment details", error);
            setSaved(false);
          }
        };

        sendData();
      })
      .catch(() => {
        setStatus('Error verifying payment.');
      });
  }, [reference, course, fullName, email, phone]);

  return (
    <div style={{ maxWidth: 500, margin: '60px auto', background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h1>Payment Status</h1>
      <p>{status}</p>

      {alreadyProcessed && details && (
        <div style={{ marginTop: 24 }}>
          <h3>Notice</h3>
          <p style={{ color: 'orange' }}>
            This payment reference has already been processed.<br />
            If you did not receive your email, please contact the admission office.<br />
            <strong>Serial Number:</strong> {details?.serialNumber}<br />
            <strong>PIN:</strong> {details?.pin}
          </p>
        </div>
      )}

      {/* ✅ Fix 4: only show after a save attempt */}
      {saved && !emailSent && !alreadyProcessed && (
        <div style={{ marginTop: 24 }}>
          <h3>Email Issue</h3>
          <p style={{ color: 'red' }}>
            Your data was saved, but the email could not be sent.<br />
            Please contact the admission office for assistance.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <AdmissionSuccessPage />
    </Suspense>
  );
}