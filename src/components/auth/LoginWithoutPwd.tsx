"use client";

import { useRouter } from "next/navigation";
import styles from "./AccountCreationForm.module.css";
import Image from "next/image";
import localFont from "next/font/local";
import React, { useState } from "react";
import Link from "next/link";

const inter = localFont({
  src: '../../assets/fonts/Inter_18pt-Bold.ttf'
});

export default function PasswordlessLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email) {
      // ذخیره ایمیل وارد شده برای نمایش داینامیک در صفحه OTP
      localStorage.setItem('user_email', email);
      router.push('/auth/otp');
    }
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

      {/* بخش سمت راست - کانتینر فرم ورود بدون رمز */}
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
          {/* عنوان‌ها مطابق با عکس جدید شما تنظیم شده است */}
          <h2 className={styles.title}>Login Without Password</h2>
          <p className={styles.subtitle}>
            Welcome back! Please enter your details.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Email Address <span className={styles.required}>*</span>
              </label>
              <input
                className={styles.input}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button className={styles.button} type="submit">
              Send Verification Code
            </button>

            {/* لینک ارجاع به ساخت اکانت جدید مطابق عکس */}
            <p className={styles.register}>
              Don't have an account?                             <Link href="/auth/signUp" className={styles.registerLink}>
                Create an account
              </Link>
            </p>

            <div className={styles.divider}>
              <span>Or continue with</span>
            </div>

            <button className={styles.socialButton} type="button">
              <span className={styles.googleIcon}>G</span> Continue with Google
            </button>

            <button className={styles.socialButton} type="button">
              <span className={styles.facebookIcon}>f</span> Continue with Facebook
            </button>

            <p className={styles.terms}>
              By continuing, you agree to our <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}