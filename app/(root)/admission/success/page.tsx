"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
  import axios from 'axios';
import Button from '@/app/components/Button';

type PaymentDetails = {
  serialNumber?: string;
  pin?: string;
  [key: string]: any;
};

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const course = searchParams.get('course');
  const fullName = searchParams.get('fullName');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const [status, setStatus] = useState('Verifying payment...');
  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [saved, setSaved] = useState(false);
  const [emailSent, setEmailSent] = useState(true);
  const [alreadyProcessed, setAlreadyProcessed] = useState(false);
  
  console.log(useSearchParams().toString());


  useEffect(() => {
    if (reference) {
      axios.post('https://jayone-87f0a69e6159.herokuapp.com/api/paystack/verify', { reference })
        .then(res => res.data)
        .then(data => {
          if (data.success) {
            setStatus('Payment verified successfully!');
            setDetails(data.data);
            // Send user/payment details to backend
            const amount = data.data.amount / 100; // Convert to GHS
            const currency = data.data.currency;

            const sendData = async () => {
              await axios.post('https://jayone-87f0a69e6159.herokuapp.com/api/payments/create', {
                email,
                fullName,
                course,
                phone,
                reference,
                amount,
                currency
              })
                .then((res) => {
                  const resp = res.data;
                  console.log("Backend Response:", resp);
                  setSaved(true);
                  if (resp.success === false && resp.message === 'This payment reference has already been processed') {
                    setAlreadyProcessed(true);
                    setDetails(resp.data);
                  }
                  if (resp.success === false && resp.message && resp.message.includes('email')) {
                    setEmailSent(false);
                  }
                })
                .catch((error) => {
                  console.error("Failed to save payment details", error);
                  setSaved(false);
                });
            };
            sendData();
          } else {
            setStatus('Payment verification failed.');
          }
        })
        .catch(() => {
          setStatus('Error verifying payment.');
        });
    } else {
      setStatus('No payment reference found.');
    }
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
      {!emailSent && (
        <div style={{ marginTop: 24 }}>
          <h3>Email Issue</h3>
          <p style={{ color: 'red' }}>
            Your data was saved, but the email could not be sent.<br />
            Please contact the admission office for assistance.
          </p>
        </div>
      )}
      {details && !alreadyProcessed && saved && emailSent && (
        <div style={{ marginTop: 24 }}>
          <h3>Transaction Details</h3>
          <pre style={{ background: '#f4f6fa', padding: 16, borderRadius: 4 }}>{JSON.stringify(details, null, 2)}</pre>
          <p style={{ color: 'green', marginTop: 12 }}>
            Your details have been saved.<br />
            <Button style={{ marginTop: 16 }} onClick={() => window.location.href = '/admission/apply'}>
              Proceed to Application Form
            </Button>
          </p>
        </div>
      )}
    </div>
  );
}