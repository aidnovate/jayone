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
  const [emailSent, setEmailSent] = useState(false);
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

            setSaved(true);

            if (resp.success === false && resp.message === 'This payment reference has already been processed') {
              setAlreadyProcessed(true);
              setDetails(resp.data);
              return;
            }

            // ✅ only rely on the explicit flag, not the message string
            const emailFailed = resp.data?.emailSent === false;
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

      {/* ✅ Success — email was sent */}
      {saved && emailSent && !alreadyProcessed && (
        <div style={{ marginTop: 24, padding: 16, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8 }}>
          <h3 style={{ margin: '0 0 8px', color: '#15803d' }}>✓ Email Sent</h3>
          <p style={{ color: '#166534', margin: 0 }}>
            A confirmation email has been sent to <strong>{email}</strong>.<br />
            Please check your inbox for your <strong>Serial Number</strong> and <strong>PIN (Token)</strong>,
            which you will need to complete your application form.
          </p>
          {details?.serialNumber && (
            <div style={{ marginTop: 12, padding: 12, background: '#dcfce7', borderRadius: 6 }}>
              <p style={{ margin: '0 0 4px', color: '#15803d' }}>
                <strong>Serial Number:</strong> {details.serialNumber}
              </p>
              <p style={{ margin: 0, color: '#15803d' }}>
                <strong>PIN:</strong> {details.pin}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Already processed */}
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

      {/* Email failed */}
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