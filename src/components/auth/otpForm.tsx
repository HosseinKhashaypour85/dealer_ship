"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "../OtpForm.module.css";
import Image from "next/image";
import Link from "next/link";

export default function OtpForm() {

    // مشخص کردن تایپ استیت به عنوان آرایه‌ای از رشته‌ها
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));


    // رفرنس به المان‌های HTMLInputElement برای مدیریت فوکوس
    const [displayEmail, setDisplayEmail] = useState("your email");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const savedEmail = localStorage.getItem('user_email');
        if (savedEmail) {
            setDisplayEmail(savedEmail);
        }
    }, [])

    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        const savedEndTime = localStorage.getItem("otp_end_time");

        if (savedEndTime) {
            const remaining = Math.max(
                0,
                Math.floor((Number(savedEndTime) - Date.now()) / 1000)
            );
            setTimeLeft(remaining);
        } else {
            const endTime = Date.now() + 60 * 1000;
            localStorage.setItem("otp_end_time", endTime.toString());
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const savedEndTime = localStorage.getItem("otp_end_time");

            if (!savedEndTime) return;

            const remaining = Math.max(
                0,
                Math.floor((Number(savedEndTime) - Date.now()) / 1000)
            );

            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(timer);
                localStorage.removeItem("otp_end_time");
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    // هندلر تغییر مقدار اینپوت با تایپ‌های استاندارد ری‌اکت
    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value;
        if (isNaN(Number(value))) return false; // فقط اجازه ورود عدد داده شود

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1); // ذخیره آخرین کاراکتر وارد شده
        setOtp(newOtp);

        // انتقال فوکوس به باکس بعدی در صورت وارد کردن عدد
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // هندلر دکمه Backspace برای بازگشت به اینپوت قبلی
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            // اگر باکس فعلی خالی بود، فوکوس به باکس قبلی منتقل شود
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    // چک کردن پر بودن تمام فیلدها برای فعال‌سازی دکمه
    const isOtpComplete = otp.every((slot) => slot !== "");

    return (
        <div className={styles.page}>
            {/* بخش سمت چپ - دسکتاپ */}
            <div className={styles.leftSide}>
                <div className={styles.brand}>
                    <div className={styles.logo}>
                        <Image
                            src="/icons/carIcon.svg"
                            alt="Car Icon"
                            width={25}
                            height={25}
                        />
                    </div>
                    <div>
                        <h2 className={styles.brandTitle}>DMS Pro</h2>
                        <span className={styles.brandSubtitle}>Dealer Management System</span>
                    </div>
                </div>
                <p className={styles.description}>
                    Streamline your dealership operations with our comprehensive management platform
                </p>
                <div className={styles.features}>
                    <div className={styles.feature}><div className={styles.icon}>
                        <Image
                            src="/icons/sheildIcon.svg"
                            alt="Car Icon"
                            width={25}
                            height={25}
                        /></div><div><h4>Secure & Reliable</h4><p>Bank-level encryption for your data</p></div></div>
                    <div className={styles.feature}><div className={styles.icon}>
                        <Image
                            src="/icons/starIcon.svg"
                            alt="Car Icon"
                            width={25}
                            height={25}
                        /></div><div><h4>AI-Powered Insights</h4><p>Smart analytics and recommendations</p></div></div>
                    <div className={styles.feature}><div className={styles.icon}>
                        <Image
                            src="/icons/checkIcon.svg"
                            alt="Car Icon"
                            width={25}
                            height={25}
                        /></div><div><h4>All-In-One Solution</h4><p>Manage sales, inventory, and service</p></div></div>
                </div>
            </div>

            {/* بخش سمت راست - فرم OTP */}
            <div className={styles.rightSide}>
                <div className={styles.mobileBrand}>
                    <div className={styles.logo}>
                        <Image
                            src="/icons/carIcon.svg"
                            alt="Car Icon"
                            width={30}
                            height={30}
                        />
                    </div>
                    <h2 className={styles.brandTitle}>DMS Pro</h2>
                    <span className={styles.brandSubtitle}>Dealer Management System</span>
                </div>

                <div className={styles.card}>
                    <div className={styles.emailIconWrapper}>
                        <Image
                            src="/icons/mailIcon.svg"
                            alt="Car Icon"
                            width={25}
                            height={25} />
                    </div>
                    <h2 className={styles.title}>Check Your Email</h2>
                    <p className={styles.subtitle}>
                        We've sent a 6-digit code to <br />
                        <strong className={styles.emailHighlight}>{displayEmail}</strong>
                    </p>

                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <span className={styles.otpLabel}>Enter Verification Code</span>

                        {/* گرید باکس‌های ۶ رقمی OTP */}
                        <div className={styles.otpContainer}>
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className={styles.otpInput}
                                    value={data}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    pattern="\d*"
                                    inputMode="numeric"
                                />
                            ))}
                        </div>

                        <div className={styles.timerWrapper}>
                            Time:
                            <span className={styles.timerCountdown}>
                                {timeLeft > 0 ? `${timeLeft} seconds` : "Expired"}
                            </span>
                        </div>

                        {/* اعمال داینامیک استایل دکمه بر اساس کامل شدن کد */}
                        <Link
                            href={isOtpComplete ? "/auth/businessprofile" : "#"}
                            className={`${styles.button} ${isOtpComplete ? styles.buttonActive : styles.buttonDisabled
                                }`}
                            onClick={(e) => {
                                if (!isOtpComplete) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            Verify & Continue
                        </Link>

                        <div className={styles.linksContainer}>
                            <a href="#" className={styles.changeEmailLink}>Change email address</a>
                            <p className={styles.resendText}>
                                Didn't receive the code? <a href="#" className={styles.resendLink}>Resend</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}