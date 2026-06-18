"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import localFont from "next/font/local";
import Image from "next/image";

const inter = localFont({
    src: '../../assets/fonts/Inter_18pt-Bold.ttf'
});

import {
    Building2,
    MapPin,
    ShieldAlert,
    Upload,
    Check,
    Sparkles,
    ShieldCheck,
    Info,
    X
} from "lucide-react";

// ایمپورت کامپوننت‌های رسمی و بومی Shadcn UI
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function BusinessProfile() {
    const [logoName, setLogoName] = useState<string | null>(null);
    const [showInfoBox, setShowInfoBox] = useState(true);

    // مدیریت بهینه و پیشرفته استیت‌های فرم با استفاده از React Hook Form
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            businessName: "",
            dba: "",
            businessType: "",
            taxId: "",
            yearsInBusiness: "",
            locationsCount: "",
            address: "",
            city: "",       // خالی به جهت لود داینامیک از سمت سرور
            state: "",
            country: "",    // خالی به جهت لود داینامیک از سمت سرور
            postalCode: "",
            businessEmail: "",
            primaryPhone: "",
            additionalPhones: "",
            website: "",
            secondaryPhone: "",
            insuranceProvider: "",
            policyNumber: "",
            policyExpiryDate: ""
        }
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setLogoName(e.target.files[0].name);
        }
    };

    const onSubmit = (data: any) => {
        console.log("Shadcn Form Data Submitted:", data);
    };

    return (
        <div className={`${'min-h-screen flex flex-col lg:flex-row bg-white font-sans'} ${inter.className}`}>

            {/* ==========================================
            بخش سمت چپ - ثابت دسکتاپ (در موبایل مخفی می‌شود)
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
            بخش سمت راست - کانتینر اصلی فرم (بدون پس‌زمینه خاکستری)
            ========================================== */}
            <div className="flex-[1.4] flex flex-col items-center bg-transparent p-4 lg:p-10 w-full">

                {/* هدر و لوگوی مخصوص موبایل */}
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

                {/* کارت اصلی با باکس شادوی سفارشی درخواستی شما */}
                <Card
                    className="w-full max-w-2xl p-6 lg:p-8 bg-white border border-slate-100 rounded-xl"
                    style={{
                        WebkitBoxShadow: "0px 0px 15px -2px #000000",
                        boxShadow: "0px 0px 15px -2px #000000"
                    }}
                >
                    <CardHeader className="text-center flex flex-col items-center p-0 mb-8">
                        <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-950 mb-3 border border-slate-100">
                            <Building2 size={24} />
                        </div>
                        <CardTitle className="text-2xl font-bold text-slate-950">Business Profile</CardTitle>
                        <CardDescription className="text-xs text-slate-500 mt-1">Let's set up your dealership profile to get started</CardDescription>
                    </CardHeader>

                    {/* 🌟 استپر اصلاح شده و کاملاً هوشمند ویژه دسکتاپ و موبایل */}
                    <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-4 mb-8 w-full pb-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-sm">✓</span>
                            <span className="text-[11px] sm:text-xs font-semibold text-slate-600">Account</span>
                        </div>
                        <div className="flex-1 h-px bg-slate-950 min-w-[15px] max-w-[60px]"></div>
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-sm">2</span>
                            <span className="text-[11px] sm:text-xs font-semibold text-slate-900">Dealership</span>
                        </div>
                        <div className="flex-1 h-px bg-slate-200 min-w-[15px] max-w-[60px]"></div>
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-slate-200 bg-white text-slate-400 flex items-center justify-center text-[10px] sm:text-xs font-bold">3</span>
                            <span className="text-[11px] sm:text-xs font-semibold text-slate-400">Complete</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* بخش اول: Business Identity */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Building2 size={16} className="text-slate-500" />
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Business Identity</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">Business Name <span className="text-red-500">*</span></label>
                                    <Input {...register("businessName")} placeholder="Legal Business Name" required className="h-10 text-xs w-full" />
                                </div>
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">DBA (Doing Business As) <span className="text-red-500">*</span></label>
                                    <Input {...register("dba")} placeholder="Trade Name (if different)" required className="h-10 text-xs w-full" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">Business Type <span className="text-red-500">*</span></label>
                                    <Select onValueChange={(value) => setValue("businessType", value)}>
                                        <SelectTrigger className="h-10 text-xs w-full"><SelectValue placeholder="Select entity type" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="corporation">Corporation</SelectItem>
                                            <SelectItem value="llc">LLC</SelectItem>
                                            <SelectItem value="partnership">Partnership</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">Tax ID / Reg Number <span className="text-red-500">*</span></label>
                                    <Input {...register("taxId")} placeholder="FEIN or Registration" required className="h-10 text-xs w-full" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">Years in Business</label>
                                    <Input {...register("yearsInBusiness")} placeholder="e.g., 5" className="h-10 text-xs w-full" />
                                </div>
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">Number of Locations</label>
                                    <Input {...register("locationsCount")} placeholder="e.g., 1" className="h-10 text-xs w-full" />
                                </div>
                            </div>

                            <div className="space-y-1.5 w-full">
                                <label className="text-xs font-semibold text-slate-900">Logo Upload</label>
                                <div className="border border-dashed border-slate-200 rounded-lg p-6 bg-slate-50 hover:bg-slate-100/70 transition-all text-center relative cursor-pointer w-full">
                                    <input type="file" id="logo-file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                    <label htmlFor="logo-file" className="flex flex-col items-center gap-1 cursor-pointer text-xs font-medium text-slate-700 w-full">
                                        <Upload size={20} className="text-slate-400 mb-1" />
                                        <span>{logoName ? logoName : "Click to upload or drag and drop"}</span>
                                        <span className="text-[10px] text-slate-400 font-normal">PNG, JPG or SVG (max. 2MB)</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* بخش دوم: Location & Contact */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                <MapPin size={16} className="text-slate-500" />
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Location & Contact</h3>
                            </div>

                            <div className="space-y-1.5 w-full">
                                <label className="text-xs font-semibold text-slate-900">Business Address <span className="text-red-500">*</span></label>
                                <Input {...register("address")} placeholder="Street Address" required className="h-10 text-xs w-full" />
                            </div>

                            {/* گرید بخش آدرس: در حالت موبایل تک‌ستونه و تمام عرض (grid-cols-1) و در دسکتاپ ۴ ستونه رندر می‌شود */}
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4 w-full">
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">City <span className="text-red-500">*</span></label>
                                    <Select onValueChange={(value) => setValue("city", value)}>
                                        <SelectTrigger className="h-10 text-xs w-full"><SelectValue placeholder="City" /></SelectTrigger>
                                        <SelectContent>{/* مقادیر سمت سرور در آینده اینجا قرار می‌گیرند */}</SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">State/Region <span className="text-red-500">*</span></label>
                                    <Input {...register("state")} placeholder="State" required className="h-10 text-xs w-full" />
                                </div>
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">Country <span className="text-red-500">*</span></label>
                                    <Select onValueChange={(value) => setValue("country", value)}>
                                        <SelectTrigger className="h-10 text-xs w-full"><SelectValue placeholder="Country" /></SelectTrigger>
                                        <SelectContent>{/* مقادیر سمت سرور در آینده اینجا قرار می‌گیرند */}</SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">Postal Code <span className="text-red-500">*</span></label>
                                    <Input {...register("postalCode")} placeholder="ZIP Code" required className="h-10 text-xs w-full" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">Business Email <span className="text-red-500">*</span></label>
                                    <Input {...register("businessEmail")} type="email" placeholder="contact@dealership.com" required className="h-10 text-xs w-full" />
                                </div>
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">Primary Phone <span className="text-red-500">*</span></label>
                                    <Input {...register("primaryPhone")} type="tel" placeholder="(555) 123-4567" required className="h-10 text-xs w-full" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">Additional Phones <span className="text-red-500">*</span></label>
                                    <Input {...register("additionalPhones")} placeholder="Comma separated numbers" required className="h-10 text-xs w-full" />
                                </div>
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">Website <span className="text-red-500">*</span></label>
                                    <Input {...register("website")} type="url" placeholder="www.example.com" required className="h-10 text-xs w-full" />
                                </div>
                            </div>

                            <div className="space-y-1.5 w-full">
                                <label className="text-xs font-semibold text-slate-900">Secondary Phone <span className="text-red-500">*</span></label>
                                <Input {...register("secondaryPhone")} type="tel" placeholder="(555) 987-6543" required className="h-10 text-xs w-full" />
                            </div>
                        </div>

                        {/* بخش سوم: Insurance Information */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                <ShieldAlert size={16} className="text-slate-500" />
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Insurance Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">Insurance Provider</label>
                                    <Input {...register("insuranceProvider")} placeholder="Provider Name" className="h-10 text-xs w-full" />
                                </div>
                                <div className="space-y-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-900">Policy Number <span className="text-red-500">*</span></label>
                                    <Input {...register("policyNumber")} placeholder="Policy #" required className="h-10 text-xs w-full" />
                                </div>
                            </div>

                            <div className="space-y-1.5 w-full">
                                <label className="text-xs font-semibold text-slate-900">Policy Expiry Date <span className="text-red-500">*</span></label>
                                <Input {...register("policyExpiryDate")} type="date" required className="h-10 text-xs w-full" />
                            </div>
                        </div>

                        {/* کادر اعلان راهنمای پایین فرم */}
                        {showInfoBox && (
                            <Alert className="bg-slate-50 border border-slate-200 relative p-4 rounded-lg flex gap-3 text-left w-full">
                                <Info size={18} className="text-slate-950 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <AlertTitle className="text-xs font-bold text-slate-950 mb-1">You're almost there!</AlertTitle>
                                    <AlertDescription className="text-xs text-slate-500 leading-relaxed font-normal">
                                        Once you complete this setup, you'll have access to the full DMS platform including inventory management, CRM, sales tracking, and more.
                                    </AlertDescription>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="h-auto p-1 absolute top-2 right-2 text-slate-400 hover:text-slate-600 hover:bg-transparent"
                                    onClick={() => setShowInfoBox(false)}
                                >
                                    <X size={14} />
                                </Button>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full h-11 bg-slate-950 text-white hover:bg-slate-900 text-xs font-semibold rounded-md shadow-sm transition-all">
                            Complete Setup
                        </Button>

                        <span className="block text-center text-[10px] text-slate-400 mt-2">
                            You can update these details later in Settings
                        </span>
                    </form>
                </Card>
            </div>
        </div>
    );
}