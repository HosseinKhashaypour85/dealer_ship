"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import Image from "next/image";
import { 
  Shield, 
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

export default function TermOfServices() {
  const router = useRouter();
  const [hasReadToBottom, setHasReadToBottom] = useState(false);
  const bottomMarkerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marker = bottomMarkerRef.current;
    if (!marker) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasReadToBottom(true);
          observer.disconnect();
        }
      },
      {
        root: marker.parentElement,
        threshold: 0.1,
      }
    );

    observer.observe(marker);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleUnderstand = () => {
    if (!hasReadToBottom) return;
    router.push('/soon');
  };

  return (
    <div className={`${'min-h-screen flex flex-col lg:flex-row bg-white font-sans'} ${inter.className}`}>
      
      <div className="hidden lg:flex flex-1 flex-col justify-center p-12 bg-white sticky top-0 h-screen border-r border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-lg bg-slate-950 flex items-center justify-center text-xl text-white">
            <Image src="/icons/carIcon.svg" alt="Car Icon" width={25} height={25} />
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

      <div className="flex-[1.4] flex flex-col items-center lg:items-start p-4 lg:p-10 lg:pl-16 w-full justify-center">
        
        <div className="flex lg:hidden flex-col items-center gap-2 mb-6 text-center w-full">
          <div className="w-11 h-11 rounded-lg bg-slate-950 flex items-center justify-center text-xl text-white">
            <Image src="/icons/carIcon.svg" alt="Car Icon" width={25} height={25} />
          </div>
          <h2 className="text-xl font-bold text-slate-950 m-0">DMS Pro</h2>
          <span className="text-xs text-slate-500">Dealer Management System</span>
        </div>

        <Card 
          className="w-full max-w-2xl p-6 lg:p-8 border border-slate-100 rounded-xl flex flex-col relative text-left bg-white"
          style={{
            boxShadow: "0 12.25px 15.313px -3.063px rgba(0, 0, 0, 0.10), 0 4.9px 6.125px -3.675px rgba(0, 0, 0, 0.10)"
          }}
        >
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
              <Shield size={20} />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-950">Terms of Service</CardTitle>
            <CardDescription className="text-[11px] text-slate-400 mt-1">Last updated: November 29, 2025</CardDescription>
          </CardHeader>

          <CardContent 
            className="p-0 mb-6 max-h-[340px] overflow-y-auto pr-2 space-y-5 text-xs text-slate-600 leading-relaxed scrollbar-thin select-none relative"
          >
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">1. Introduction</h4>
              <p>
                Welcome to DMS Pro. These Terms of Service govern your access to and use of our Dealer Management System. By using our Service, you agree to be bound by these Terms.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">2. Account Registration</h4>
              <div className="space-y-1">
                <span className="font-medium text-slate-800 block">You agree to:</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us of any unauthorized access</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">3. Acceptable Use</h4>
              <div className="space-y-1">
                <span className="font-medium text-slate-800 block">You agree not to:</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Use the Service for fraudulent purposes</li>
                  <li>Attempt unauthorized access to the Service</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Upload viruses or malicious code</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pb-2">
              <h4 className="font-bold text-slate-900 text-sm">4. Limitation of Liability</h4>
              <p>
                DMS Pro shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use or inability to use the platform.
              </p>
            </div>

            <div ref={bottomMarkerRef} className="h-1 w-full" />
          </CardContent>

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