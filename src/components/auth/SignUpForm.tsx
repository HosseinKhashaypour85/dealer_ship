"use client";

import React, { useState , useRef , useEffect } from "react";
import styles from "../auth/SignUpForm.module.css";
import Image from "next/image";

import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import Link from "next/link";


const inter = localFont({
    src: '../../assets/fonts/Inter_18pt-Bold.ttf'
})

export default function SignupForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reTypePassword, setReTypePassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({
            firstName,
            lastName,
            email,
            password,
            reTypePassword,
            phoneNumber,
        });
    };

    const handleBack = () => {
        window.history.back();
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
                                alt="Car Icon"
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
                                alt="check Icon"
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

            {/* بخش سمت راست - کانتینر فرم ثبت نام (Sign up) */}
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
                    {/* دکمه بازگشت بالای فرم */}
                    <button type="button" className={styles.backButton} onClick={handleBack}>
                        <span className={styles.backArrow}>←</span> Back
                    </button>

                    <h2 className={styles.title}>Sign up</h2>
                    <p className={styles.subtitle}>Get started with DMS Pro</p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {/* ردیف افقی نام و نام خانوادگی */}
                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>First Name</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Sina"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Last Name</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Tavaokli"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* فیلد ایمیل */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>
                                Email Address <span className={styles.required}>*</span>
                            </label>
                            <input
                                className={styles.input}
                                type="email"
                                placeholder="ava.wright@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* فیلد پسورد */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>
                                Password <span className={styles.required}>*</span>
                            </label>
                            <span className={styles.inputHint}>Must be at least 6 characters</span>
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* فیلد تکرار پسورد */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>
                                ReType Password <span className={styles.required}>*</span>
                            </label>
                            <span className={styles.inputHint}>Must be at least 6 characters</span>
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Enter your password"
                                value={reTypePassword}
                                onChange={(e) => setReTypePassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* فیلد شماره تلفن */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Phone Number</label>
                            <input
                                className={styles.input}
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        {/* دکمه اصلی ایجاد اکانت */}
                        <button className={styles.button} type="submit">
                            Create Account
                        </button>

                        <p className={styles.register}>
                           Already have an Account?{" "}
                            <Link href="/auth/login" className={styles.registerLink}>
                                login
                            </Link>
                        </p>

                        <p className={styles.terms}>
                            By creating an account, you agree to our <a href="#">Terms of Service</a> and{" "}
                            <a href="#">Privacy Policy</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}