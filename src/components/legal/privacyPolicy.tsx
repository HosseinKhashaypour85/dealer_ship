"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

import { 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ChevronLeft 
} from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const inter = localFont({
    src: '../../assets/fonts/Inter_18pt-Bold.ttf'
});

export default function PrivacyPolicyComponent() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // 🌟 استیت برای فعال شدن دکمه پس از اسکرول کامل
  const [hasReadToBottom, setHasReadToBottom] = useState(false);

  // 🌟 تابع مانیتور کردن اسکرول متون حریم خصوصی
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // تلرانس ۲ پیکسلی برای اطمینان از محاسبات مرورگرها در لبه‌ی انتهایی
      if (scrollHeight - scrollTop <= clientHeight + 2) {
        setHasReadToBottom(true);
      }
    }
  };

  const handleUnderstand = () => {
    if (!hasReadToBottom) return;
    router.push('/legals/termOfService');
  };

  return (
    <div className={`${'min-h-screen flex flex-col lg:flex-row bg-white font-sans'} ${inter.className}`}>
      
      {/* ==========================================
         بخش سمت چپ - ثابت دسکتاپ
         ========================================== */}
      <div className="hidden lg:flex flex-1 flex-col justify-center p-12 bg-white sticky top-0 h-screen border-r border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-lg bg-slate-950 flex items-center justify-center text-xl text-white">
            <Image
              src="/icons/carIcon.svg"
              alt="Car Icon"
              width={25}
              height={25}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-950 m-0">DMS Pro</h2>
            <span className="text-xs text-slate-500">Dealer Management System</span>
          </div>
        </div>
        <p className="text-slate-600 text-sm max-w-sm mb-8 leading-relaxed">
          Streamline your dealership operations with our comprehensive management platform
        </p>
        <div className="space-y-5">
          <div className="flex gap-3 items-center">
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-950">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-950">Secure & Reliable</h4>
              <p className="text-xs text-slate-500">Bank-level encryption for your data</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-950">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-950">AI-Powered Insights</h4>
              <p className="text-xs text-slate-500">Smart analytics and recommendations</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-950">
              <Check size={18} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-950">All-In-One Solution</h4>
              <p className="text-xs text-slate-500">Manage sales, inventory, and service</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
         🌟 بخش سمت راست - حذف بک‌گراند خاکستری و ترنسپرنت شدن کامل
         ========================================== */}
      <div className="flex-[1.4] flex flex-col items-center bg-transparent p-4 lg:p-10 w-full justify-center">
        
        {/* هدر مخصوص موبایل */}
        <div className="flex lg:hidden flex-col items-center gap-2 mb-6 text-center">
          <div className="w-11 h-11 rounded-lg bg-slate-950 flex items-center justify-center text-xl text-white">
            <Image
              src="/icons/carIcon.svg"
              alt="Car Icon"
              width={25}
              height={25}
            />
          </div>
          <h2 className="text-xl font-bold text-slate-950 m-0">DMS Pro</h2>
          <span className="text-xs text-slate-500">Dealer Management System</span>
        </div>

        {/* 🌟 کارت اصلی همراه با استایل باکس شادوی جدید دریافتی شما */}
        <Card 
          className="w-full max-w-2xl p-6 lg:p-8 bg-white border border-slate-100 rounded-xl flex flex-col relative text-left"
          style={{
            // WebkitBoxShadow: "5px 5px 15px 5px #000000",
            boxShadow: "0 12.25px 15.313px -3.063px rgba(0, 0, 0, 0.10), 0 4.9px 6.125px -3.675px rgba(0, 0, 0, 0.10)"
          }}
        >
          {/* دکمه بازگشت */}
          <button 
            type="button" 
            onClick={() => router.back()}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-900 text-xs font-semibold mb-4 w-fit transition-colors"
          >
            <ChevronLeft size={14} />
            <span>Back</span>
          </button>

          <CardHeader className="text-center flex flex-col items-center p-0 mb-6">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-900 mb-3 border border-slate-100">
              <Lock size={20} />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-950">Privacy Policy</CardTitle>
            <CardDescription className="text-[11px] text-slate-400 mt-1">Last updated: November 29, 2025</CardDescription>
          </CardHeader>

          {/* 🌟 باکس متن مجهز به هوک رفرنس اسکرول و رویداد چک‌کننده لبه پایینی */}
          <CardContent 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="p-0 mb-6 max-h-[340px] overflow-y-auto pr-2 space-y-5 text-xs text-slate-600 leading-relaxed scrollbar-thin select-none"
          >
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">1. Introduction</h4>
              <p>
                At DMS Pro, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">2. Information We Collect</h4>
              
              <div className="space-y-1">
                <span className="font-bold text-slate-800 block">Information You Provide:</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Account information (name, email, phone, password)</li>
                  <li>Dealership information (business details, address)</li>
                  <li>Vehicle inventory data</li>
                  <li>Customer and employee information</li>
                  <li>Financial and transaction data</li>
                </ul>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800 block">Automatically Collected:</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Usage data and analytics</li>
                  <li>Device information and IP address</li>
                  <li>Cookies and tracking technologies</li>
                  <li>Log data and system events</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">3. How We Use Your Information</h4>
              <p>
                We use the collected data to provide, maintain, and improve our services, facilitate dealership management operations, process transactions, and ensure platform security.
              </p>
            </div>
            
            <div className="space-y-2 pb-2">
              <h4 className="font-bold text-slate-900 text-sm">4. Data Security</h4>
              <p>
                We implement bank-level encryption standards and advanced firewall technologies to maximize the protection of active dealer accounts and sensitive transaction records.
              </p>
            </div>
          </CardContent>

          {/* 🌟 دکمه تایید نهایی که تا زمان مطالعه کامل غیرفعال (disabled) خواهد بود */}
          <Button 
            onClick={handleUnderstand}
            disabled={!hasReadToBottom}
            className={`w-full h-11 text-xs font-semibold rounded-md shadow-sm transition-all ${
              hasReadToBottom 
                ? "bg-slate-950 text-white hover:bg-slate-900 cursor-pointer" 
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {hasReadToBottom ? "I Understand" : "Please scroll down to accept"}
          </Button>

        </Card>
      </div>
    </div>
  );
}