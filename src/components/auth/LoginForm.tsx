"use client";

import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import Image from "next/image";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inter = localFont({
    src: '../../assets/fonts/Inter_18pt-Bold.ttf'
})
export default function LoginForm() {
    const router = useRouter();

    const handleCreateAccBtn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/auth/creation');
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ email, password, rememberMe });
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
                                width={30}
                                height={30}
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
                                alt="Car Icon"
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
                                alt="Car Icon"
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

            {/* بخش سمت راست - کانتینر فرم لاگین اصلی */}
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
                    <h2 className={styles.title}>Login</h2>
                    <p className={styles.subtitle}>
                        Welcome back! Please enter your details.
                    </p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {/* فیلد ایمیل یا نام کاربری */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>
                                Email Address or Username <span className={styles.required}>*</span>
                            </label>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Enter your email or username"
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
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* گزینه به خاطر سپردن اکانت */}
                        <div className={styles.remember}>
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>

                        {/* دکمه اصلی ورود */}
                        <button className={styles.button} type="submit">
                            Login
                        </button>

                        {/* گزینه‌های فرعی ورود و فراموشی رمز */}
                        <button className={styles.passwordlessButton} type="button">
                            Login without password
                        </button>

                        <a href="#" className={styles.link}>
                            Can't remember your password?
                        </a>

                        <p className={styles.register}>
                            Don't have an account?{" "}
                            <Link href="/auth/signUp" className={styles.registerLink}>
                                Sign up
                            </Link>
                        </p>

                        <div className={styles.divider}>
                            <span>Or continue with</span>
                        </div>

                        {/* دکمه‌های ورود اجتماعی */}
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