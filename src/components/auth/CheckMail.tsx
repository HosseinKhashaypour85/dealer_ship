"use client";

import { useRouter } from "next/navigation";
import styles from "./checkMail.module.css"; 
import Image from "next/image";
import localFont from "next/font/local";
import React, { useState, useEffect } from "react";

const inter = localFont({
  src: '../../assets/fonts/Inter_18pt-Bold.ttf'
});

export default function CheckMail() {
  const router = useRouter();
  const [displayEmail, setDisplayEmail] = useState("your email");

  // خواندن ایمیلی که در مرحله قبل ذخیره شده بود
  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email");
    if (savedEmail) {
      setDisplayEmail(savedEmail);
    }
  }, []);

  const handleBackToSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/auth/login'); // هدایت به صفحه لاگین اصلی
  };

  const handleTryAgain = () => {
    console.log("Try again clicked");
    // منطق ارسال مجدد ایمیل را اینجا بنویسید
  };

  return (
    <div className={`${styles.page} ${inter.className}`}>
      {/* بخش سمت چپ - مخصوص دسکتاپ */}
      <div className={styles.leftSide}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.carIcon}>
              <Image
                src="/icons/carIcon.svg"
                alt="Car Icon"
                width={25}
                height={25}
              />
            </span>
          </div>
          <div>
            <h2 className={styles.brandTitle}>DMS Pro</h2>
            <span className={styles.brandSubtitle}>Dealer Management System</span>
          </div>
        </div>

        <p className={styles.description}>
          Streamline your dealership operations with our comprehensive
          management platform
        </p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.icon}>
              <Image
                src="/icons/sheildIcon.svg"
                alt="Shield Icon"
                width={25}
                height={25}
              />
            </div>
            <div>
              <h4>Secure & Reliable</h4>
              <p>Bank-level encryption for your data</p>
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              <Image
                src="/icons/starIcon.svg"
                alt="Star Icon"
                width={25}
                height={25}
              />
            </div>
            <div>
              <h4>AI-Powered Insights</h4>
              <p>Smart analytics and recommendations</p>
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              <Image
                src="/icons/checkIcon.svg"
                alt="Check Icon"
                width={25}
                height={25}
              />
            </div>
            <div>
              <h4>All-In-One Solution</h4>
              <p>Manage sales, inventory, and service</p>
            </div>
          </div>
        </div>
      </div>

      {/* بخش سمت راست - کانتینر فرم تایید ایمیل */}
      <div className={styles.rightSide}>
        <div className={styles.mobileBrand}>
          <div className={styles.logo}>
            <Image
              src="/icons/carIcon.svg"
              alt="Car Icon"
              width={25}
              height={25}
            />
          </div>
          <h2 className={styles.brandTitle}>DMS Pro</h2>
          <span className={styles.brandSubtitle}>Dealer Management System</span>
        </div>

        <div className={styles.card}>
          {/* آیکون تیک تایید بالای عنوان مطابق دیزاین */}
          <div className={styles.checkIconWrapper}>
            <span className={styles.checkCircle}>✓</span>
          </div>

          <h2 className={styles.title}>Check Your Email</h2>
          <p className={styles.subtitle}>
            We've sent password reset instructions to <br />
            <strong className={styles.emailHighlight}>{displayEmail}</strong>
          </p>

          <form className={styles.form} onSubmit={handleBackToSignIn}>
            
            {/* باکس پیام راهنمای پوشه اسپم */}
            <div className={styles.infoBox}>
              <p className={styles.infoText}>
                Didn't receive the email? Check your spam folder or{" "}
                <button type="button" className={styles.tryAgainBtn} onClick={handleTryAgain}>
                  Try Again
                </button>
              </p>
            </div>

            <button className={styles.button} type="submit">
              Back to Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}