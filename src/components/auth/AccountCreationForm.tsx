"use client";

import { useRouter } from "next/navigation";
import styles from "./AccountCreationForm.module.css";
import Image from "next/image";
import localFont from "next/font/local";
import { useState } from "react";
import Link from "next/link";

const inter = localFont({
  src: '../../assets/fonts/Inter_18pt-Bold.ttf'
});

export default function AccountCreationForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  // 🌟 اصلاح اول: اضافه کردن رویداد متناسب با تایپ‌اسکریپت و preventDefault
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // جلو رفرش شدن ناگهانی صفحه را می‌گیرد

    if (email) {
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
                src="/icons/sheildIcon.svg" // اصلاح غلط املایی نام فایل آیکون
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

      {/* بخش سمت راست - کانتینر فرم فشرده و عریض */}
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
          <h2 className={styles.title}>Create your Account</h2>
          <p className={styles.subtitle}>
            Create your account to access your personal dealership dashboard
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Email Address <span className={styles.required}>*</span>
              </label>
              {/* 🌟 اصلاح دوم: متصل کردن استیت ری‌اکت به المان input */}
              <input
                className={styles.input}
                type="email"
                placeholder="ava.wright@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button className={styles.button} type="submit">
              Send Verification Code
            </button>

            <p className={styles.register}>
              Already have an account?                                 <Link href="/auth/login" className={styles.registerLink}>
                Login
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