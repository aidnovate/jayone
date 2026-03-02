"use client";

import Footer from "@/app/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import style from './style.module.css'
import Button from "@/app/components/Button";
import OtherPagesHero from "@/app/components/OtherPagesHero";

export default function Payment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const course = searchParams.get("course") || "Selected Program";

  const payWithPaystack = () => {
    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
      email: "aidoomusah18ab0614@gmail.com",
      amount: 100 * 100,
      currency: "GHS",
      callback: function (response: any) {
        router.push(`/admission/success?ref=${response.reference}&course=${course}`);
      },
      onClose: function () {
        alert("Transaction cancelled.");
      },
    });

    handler.openIframe();
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
              <p className={style.value}>{decodeURIComponent(course)}</p>
            </div>

            <div className={style.divider}></div>

            <div className={style.section}>
              <label>Description</label>
              <p className={style.description}>
                This admission form unlocks your application journey at Jayone Prestige School. After payment, you'll receive access credentials to complete your full application.
              </p>
            </div>

            <div className={style.divider}></div>

            <div className={style.section}>
              <div className={style.priceBreakdown}>
                <div className={style.lineItem}>
                  <span>Admission Form Fee</span>
                  <span className={style.price}>100 GHS</span>
                </div>
                <div className={style.lineItem}>
                  <span>Admin Fee</span>
                  <span className={style.price}>Included</span>
                </div>
              </div>
            </div>

            <div className={style.total}>
              <span>Total Amount</span>
              <span className={style.totalPrice}>100 GHS</span>
            </div>
          </div>

          <div className={style.actions}>
            <Button
              onClick={payWithPaystack}
              variant="primary"
              size="lg"
              fullWidth
            >
              Pay 100 GHS & Continue
            </Button>
            
            <Button
              href="/our-programs"
              variant="secondary"
              size="lg"
              fullWidth
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
