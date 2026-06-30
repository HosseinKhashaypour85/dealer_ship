"use client";

import React, { useState, useEffect } from "react";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import {
    LayoutDashboard,
    Car,
    Users,
    UserCheck,
    TrendingUp,
    FileText,
    SlidersHorizontal,
    Wrench,
    Calendar as CalendarIcon,
    ShieldCheck,
    DollarSign,
    Ticket,
    LogOut,
    Plus,
    Search,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
    Sparkles,
    ArrowRight,
    LayoutGrid,
    List,
    Upload,
    LineChart,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit2,
    UserX,
    CheckCircle2,
    Send,
    Trash2
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const inter = localFont({
    src: '../../assets/fonts/Inter_18pt-Bold.ttf'
});

interface InvitedEmployee {
    name: string;
    email: string;
    role: string;
    status: string;
    invitedBy: string;
    invitedDate: string;
    expires: string;
}

export default function EmployeeComponent() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("employees");
    const [viewMode, setViewMode] = useState<"card" | "list">("card");
    const [currentPage, setCurrentPage] = useState(1);
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
    const [isEditRoleOpen, setIsEditOpen] = useState(false);
    const [inviteModalTab, setInviteModalTab] = useState("required");
    const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
    const [detailTab, setDetailTab] = useState("personal");
    const [leadTab, setLeadTab] = useState("recent-leads");

    const [formData, setFormData] = useState({
        email: "",
        role: "manager",
        firstName: "",
        lastName: "",
        phone: "",
        sex: "male"
    });

    const [invitedList, setInvitedList] = useState<InvitedEmployee[]>([]);
    const totalPages = 6;

    useEffect(() => {
        const defaultInvited = Array(4).fill({
            name: "Sarah Johnson",
            email: "sarah.johnson@dealership.com",
            role: "Sales Manager",
            status: "Pending",
            invitedBy: "Admin (You)",
            invitedDate: "12/23/2024",
            expires: "1/6/2025"
        });

        const stored = localStorage.getItem("temp_invited_employees");
        if (stored) {
            try {
                setInvitedList(JSON.parse(stored));
            } catch (e) {
                setInvitedList(defaultInvited);
            }
        } else {
            setInvitedList(defaultInvited);
            localStorage.setItem("temp_invited_employees", JSON.stringify(defaultInvited));
        }
    }, []);

    const menuItems = [
        { icon: <LayoutDashboard size={16} />, label: "Intelligent Dashboard", href: "/dashboard" },
        { icon: <Car size={16} />, label: "Vehicles", href: "/vehicles" },
        { icon: <Users size={16} />, label: "Customers", href: "/customers" },
        { icon: <UserCheck size={16} />, label: "Employees", href: "/employees", active: true },
        { icon: <TrendingUp size={16} />, label: "Leads", href: "/leads", section: "Sales" },
        { icon: <FileText size={16} />, label: "Deals", href: "/deals", section: "Sales" },
        { icon: <SlidersHorizontal size={16} />, label: "BOS Customization", href: "/bos-customization", section: "Sales" },
        { icon: <Wrench size={16} />, label: "Test Drive", href: "/test-drive", section: "Service" },
        { icon: <CalendarIcon size={16} />, label: "Calendar", href: "/calendar", section: "Service" },
        { icon: <ShieldCheck size={16} />, label: "Vendors", href: "/vendors", section: "Service" },
        { icon: <DollarSign size={16} />, label: "Finance", href: "/finance", section: "Business" },
        { icon: <Ticket size={16} />, label: "Tickets", href: "/tickets", section: "Business" },
    ];

    const employeesData = Array(6).fill({
        name: "David Thompson",
        email: "david.t@dealership.com",
        gender: "Male",
        status: "Online",
        role: "Sales Associate",
        focus: "Lead Management",
        profit: "$38.0k",
        deals: "15 deals",
        insight: "High-energy closer with excellent customer satisfaction scores. Specializes in first-time buyers.",
        leads: "52",
        avgResponse: "1.8 min",
        currentScreen: "CRM Dashboard"
    });

    const leadsData = Array(4).fill({
        customer: "John Smith",
        vehicle: "2024 Toyota Camry",
        value: "$32,000",
        status: "Hot",
        time: "2 hours ago"
    });

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSendInvitation = () => {
        const fullName = formData.firstName || formData.lastName
            ? `${formData.firstName} ${formData.lastName}`.trim()
            : "New Employee";

        const displayRole = formData.role === "manager" ? "Sales Manager" : "Sales Associate";

        const newInvite: InvitedEmployee = {
            name: fullName,
            email: formData.email || "ex@gmail.com",
            role: displayRole,
            status: "Pending",
            invitedBy: "Admin (You)",
            invitedDate: new Date().toLocaleDateString('en-US'),
            expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US')
        };

        const updatedList = [newInvite, ...invitedList];
        setInvitedList(updatedList);
        localStorage.setItem("temp_invited_employees", JSON.stringify(updatedList));

        setIsInviteOpen(false);
        setIsSuccessOpen(true);

        setFormData({
            email: "",
            role: "manager",
            firstName: "",
            lastName: "",
            phone: "",
            sex: "male"
        });
    };

    const handleDeleteInvite = (indexToDelete: number) => {
        const updated = invitedList.filter((_, idx) => idx !== indexToDelete);
        setInvitedList(updated);
        localStorage.setItem("temp_invited_employees", JSON.stringify(updated));
    };

    return (
        <div className={`min-h-screen flex bg-slate-50 font-sans text-left ${inter.className}`}>

            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 h-screen sticky top-0 p-5 justify-between select-none">
                <div className="space-y-6 overflow-y-auto no-scrollbar pr-1">
                    <div className="flex items-center gap-2.5 px-2">
                        <div className="w-9 h-9 rounded-lg bg-slate-950 flex items-center justify-center text-white text-lg">
                            <Image
                                src="/icons/carIcon.svg"
                                alt="Car Icon"
                                width={25}
                                height={25}
                            />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-slate-950 m-0 leading-none">AutoDealer DMS</h2>
                            <span className="text-[10px] text-slate-400">Dealer Management System</span>
                        </div>
                    </div>

                    <nav className="space-y-6">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">Main</span>
                            <div className="space-y-1">
                                {menuItems.filter(i => !i.section).map((item, idx) => (
                                    <Link key={idx} href={item.href} passHref legacyBehavior>
                                        <a className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${item.active ? "bg-slate-100 text-slate-950" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {["Sales", "Service", "Business"].map((sec) => (
                            <div key={sec}>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">{sec}</span>
                                <div className="space-y-1">
                                    {menuItems.filter(i => i.section === sec).map((item, idx) => (
                                        <Link key={idx} href={item.href} passHref legacyBehavior>
                                            <a className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </a>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center gap-2 px-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">JD</div>
                        <div>
                            <h4 className="text-xs font-bold text-slate-900 leading-none">John Dealer</h4>
                            <span className="text-[10px] text-slate-400">john.dealer@gmail.com</span>
                        </div>
                    </div>
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50/50 rounded-lg transition-colors">
                        <LogOut size={14} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-950/20 backdrop-blur-sm">
                    <aside className="w-64 bg-white h-full p-5 flex flex-col justify-between shadow-xl animate-in slide-in-from-left duration-200">
                        <div className="space-y-6 overflow-y-auto no-scrollbar">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-lg bg-slate-950 flex items-center justify-center text-white text-lg">
                                        <Image
                                            src="/icons/carIcon.svg"
                                            alt="Car Icon"
                                            width={25}
                                            height={25}
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-slate-950 m-0 leading-none">AutoDealer DMS</h2>
                                        <span className="text-[10px] text-slate-400">Dealer Management System</span>
                                    </div>
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500 hover:text-slate-900">
                                    <X size={18} />
                                </button>
                            </div>

                            <nav className="space-y-5">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Main</span>
                                    <div className="space-y-1">
                                        {menuItems.filter(i => !i.section).map((item, idx) => (
                                            <Link key={idx} href={item.href} passHref legacyBehavior>
                                                <a className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold ${item.active ? "bg-slate-100 text-slate-950" : "text-slate-500"}`}>
                                                    {item.icon}
                                                    <span>{item.label}</span>
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                {["Sales", "Service", "Business"].map((sec) => (
                                    <div key={sec}>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">{sec}</span>
                                        <div className="space-y-1">
                                            {menuItems.filter(i => i.section === sec).map((item, idx) => (
                                                <Link key={idx} href={item.href} passHref legacyBehavior>
                                                    <a className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-500">
                                                        {item.icon}
                                                        <span>{item.label}</span>
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </nav>
                        </div>

                        <div className="pt-4 border-t border-slate-100 space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">JD</div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-900 leading-none">John Dealer</h4>
                                    <span className="text-[10px] text-slate-400">john.dealer@gmail.com</span>
                                </div>
                            </div>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-500">
                                <LogOut size={14} />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            <main className="flex-1 min-w-0 flex flex-col">
                <header className="h-14 bg-white border-b border-slate-100 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40 select-none">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="flex lg:hidden text-slate-600 hover:text-slate-900">
                            <Menu size={20} />
                        </button>
                        <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-500">
                            <span>Dashboard</span>
                            <ChevronRight size={12} className="text-slate-300" />
                            <span className="text-slate-900 font-semibold">Employees</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-1.5 hover:bg-slate-50 rounded-full text-slate-500 relative">
                            <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
                            🔔
                        </button>
                        <Select defaultValue="dealership1">
                            <SelectTrigger className="h-8 text-xs font-semibold bg-white border-slate-200 gap-1 hidden sm:flex">
                                <SelectValue placeholder="Select Dealership" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="dealership1">My Dealerships</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">JD</div>
                            <span className="text-xs font-bold text-slate-950 hidden sm:inline">John Dealer</span>
                        </div>
                    </div>
                </header>

                {!selectedEmployee ? (
                    <div className="p-4 lg:p-8 space-y-6 max-w-7xl w-full mx-auto flex-1 flex flex-col">

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-xl lg:text-2xl font-bold text-slate-950 tracking-tight">Employee Management</h1>
                                <p className="text-xs text-slate-500 mt-0.5">Monitor team performance and manage employee access</p>
                            </div>
                            <Button
                                onClick={() => setIsInviteOpen(true)}
                                className="bg-slate-950 hover:bg-slate-900 text-white text-xs h-9 font-semibold gap-1.5 self-start md:self-auto shadow-sm"
                            >
                                <Plus size={14} />
                                <span>Invite Employee</span>
                            </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full items-center justify-between">
                            <div className="relative flex-1 w-full">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <Input placeholder="Search employees by name or email..." className="pl-9 h-9 text-xs bg-white border-slate-200 w-full" />
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200/60 shrink-0">
                                    <button
                                        onClick={() => setViewMode("card")}
                                        className={`p-1 rounded-md transition-all ${viewMode === "card" ? "bg-white text-slate-950 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                                    >
                                        <LayoutGrid size={16} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-1 rounded-md transition-all ${viewMode === "list" ? "bg-white text-slate-950 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                                    >
                                        <List size={16} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 sm:flex-initial justify-end">
                                    <Select defaultValue="all-roles">
                                        <SelectTrigger className="h-9 text-xs bg-white border-slate-200 min-w-[100px] flex-1 sm:flex-initial"><SelectValue placeholder="All Roles" /></SelectTrigger>
                                        <SelectContent><SelectItem value="all-roles">All Roles</SelectItem></SelectContent>
                                    </Select>
                                    <Select defaultValue="all-status">
                                        <SelectTrigger className="h-9 text-xs bg-white border-slate-200 min-w-[100px] flex-1 sm:flex-initial"><SelectValue placeholder="All Status" /></SelectTrigger>
                                        <SelectContent><SelectItem value="all-status">All Status</SelectItem></SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
                            <TabsList className="bg-slate-200/60 p-0.5 rounded-lg h-9 w-full max-w-[400px] mb-6">
                                <TabsTrigger value="employees" className="text-xs font-semibold h-8 flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-500 transition-all">Employees</TabsTrigger>
                                <TabsTrigger value="invited" className="text-xs font-semibold h-8 flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-500 transition-all">Invited</TabsTrigger>
                            </TabsList>

                            {activeTab === "employees" ? (
                                viewMode === "card" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                                        {employeesData.map((emp, idx) => (
                                            <Card key={idx} className="bg-white border border-slate-100 shadow-sm rounded-xl overflow-hidden flex flex-col justify-between">
                                                <CardHeader className="p-5 pb-3 flex flex-row items-start justify-between space-y-0">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-11 h-11 rounded-lg bg-slate-950/5 border border-slate-100 flex items-center justify-center font-bold text-sm text-slate-800">DT</div>
                                                        <div>
                                                            <h3 className="text-xs font-bold text-slate-950 leading-none">{emp.name}</h3>
                                                            <span className="text-[10px] text-slate-400 mt-1 block">{emp.gender}</span>
                                                        </div>
                                                    </div>
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                                                        {emp.status}
                                                    </span>
                                                </CardHeader>

                                                <CardContent className="p-5 pt-0 space-y-4 flex-1 flex flex-col justify-between">
                                                    <div className="space-y-3">
                                                        <div className="grid grid-cols-2 gap-2 text-[11px] border-b border-slate-50 pb-2.5">
                                                            <div>
                                                                <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Role</span>
                                                                <span className="text-slate-800 font-semibold mt-0.5 block">{emp.role}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Focus</span>
                                                                <span className="text-slate-800 font-semibold mt-0.5 block">{emp.focus}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between bg-slate-50/70 border border-slate-100 rounded-lg p-2.5">
                                                            <div>
                                                                <span className="text-slate-400 text-[9px] uppercase font-bold tracking-wider block">Profit / Month</span>
                                                                <span className="text-slate-950 font-bold text-sm mt-0.5 block">{emp.profit}</span>
                                                            </div>
                                                            <span className="text-[10px] font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                                                                📈 {emp.deals}
                                                            </span>
                                                        </div>

                                                        <div className="bg-blue-50/30 border border-blue-100/50 rounded-lg p-2.5 flex gap-2">
                                                            <Sparkles size={14} className="text-slate-950 shrink-0 mt-0.5" />
                                                            <div>
                                                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-950 block">AI Insight</span>
                                                                <p className="text-[10px] text-slate-500 leading-normal mt-0.5 font-normal">{emp.insight}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3 pt-2">
                                                        <div className="grid grid-cols-2 gap-4 text-center border-t border-slate-100 pt-3">
                                                            <div>
                                                                <span className="text-slate-950 font-bold text-sm block">{emp.leads}</span>
                                                                <span className="text-slate-400 text-[9px] font-medium mt-0.5 block">Leads</span>
                                                            </div>
                                                            <div className="border-l border-slate-100">
                                                                <span className="text-slate-950 font-bold text-sm block">{emp.avgResponse}</span>
                                                                <span className="text-slate-400 text-[9px] font-medium mt-0.5 block">Avg Response</span>
                                                            </div>
                                                        </div>

                                                        <Button
                                                            onClick={() => setSelectedEmployee(emp.name)}
                                                            className="w-full bg-slate-950 hover:bg-slate-900 text-white text-[11px] h-9 font-semibold rounded-lg shadow-sm gap-1 transition-all"
                                                        >
                                                            <span>View Details</span>
                                                            <ArrowRight size={12} />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
                                        <table className="w-full border-collapse text-left text-xs text-slate-600 min-w-[800px]">
                                            <thead>
                                                <tr className="border-b border-slate-100 bg-slate-50/70 font-semibold text-slate-500 uppercase text-[9px] tracking-wider">
                                                    <th className="p-4 pl-6">Employee</th>
                                                    <th className="p-4">Role</th>
                                                    <th className="p-4">Status</th>
                                                    <th className="p-4">Current Screen</th>
                                                    <th className="p-4">Profit/Month</th>
                                                    <th className="p-4">Deals</th>
                                                    <th className="p-4 text-center pr-6">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {employeesData.map((emp, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                                                        <td className="p-4 pl-6 flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-slate-950/5 border border-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">DT</div>
                                                            <div>
                                                                <span className="font-bold text-slate-950 block">{emp.name}</span>
                                                                <span className="text-[10px] text-slate-400 block mt-0.5">{emp.email}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 font-medium text-slate-800">{emp.role}</td>
                                                        <td className="p-4">
                                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                                <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                                                                {emp.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-slate-500 font-medium">{emp.currentScreen}</td>
                                                        <td className="p-4 font-bold text-slate-950">{emp.profit}</td>
                                                        <td className="p-4 font-semibold text-slate-700">{emp.deals.split(" ")[0]}</td>
                                                        <td className="p-4 text-center pr-6">
                                                            <Button
                                                                onClick={() => setSelectedEmployee(emp.name)}
                                                                variant="outline"
                                                                className="h-7 px-3 text-[10px] font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 gap-1 rounded-md"
                                                            >
                                                                <span>Manage</span>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            ) : (
                                <div className="w-full bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
                                    <table className="w-full border-collapse text-left text-xs text-slate-600 min-w-[850px]">
                                        <thead>
                                            <tr className="border-b border-slate-100 bg-slate-50/70 font-semibold text-slate-500 uppercase text-[9px] tracking-wider">
                                                <th className="p-4 pl-6">Employee</th>
                                                <th className="p-4">Role</th>
                                                <th className="p-4">Status</th>
                                                <th className="p-4">Invited By</th>
                                                <th className="p-4">Invited Date</th>
                                                <th className="p-4">Expires</th>
                                                <th className="p-4 text-center">Actions</th>
                                                <th className="p-4 text-center pr-6">BI</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {invitedList.map((inv, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                                                    <td className="p-4 pl-6 flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-slate-950/5 border border-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                                                            {inv.name.slice(0, 2).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-slate-950 block">{inv.name}</span>
                                                            <span className="text-[10px] text-slate-400 block mt-0.5">{inv.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 font-medium text-slate-800">{inv.role}</td>
                                                    <td className="p-4">
                                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                                                            {inv.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-slate-500 font-medium">{inv.invitedBy}</td>
                                                    <td className="p-4 text-slate-700 font-medium">{inv.invitedDate}</td>
                                                    <td className="p-4 text-slate-500 font-medium">
                                                        <span className="flex items-center gap-1">
                                                            🕒 {inv.expires}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button className="p-1 hover:bg-slate-50 rounded text-slate-500 hover:text-slate-900 transition-colors">
                                                                <Send size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteInvite(idx)}
                                                                className="p-1 hover:bg-red-50 rounded text-red-400 hover:text-red-600 transition-colors"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-center pr-6">
                                                        <button className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-slate-900 transition-colors text-[13px]">
                                                            🪄
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Tabs>

                        <footer className="flex items-center justify-center gap-1.5 pt-4 select-none w-full">
                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="h-7 w-7 p-0 border-slate-200 text-slate-500 hover:text-slate-900 rounded-md disabled:opacity-50"
                            >
                                <ChevronLeft size={14} />
                            </Button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={page === currentPage ? "default" : "outline"}
                                    onClick={() => handlePageChange(page)}
                                    className={`h-7 w-7 p-0 text-xs font-semibold rounded-md transition-all ${page === currentPage
                                        ? "bg-slate-950 text-white hover:bg-slate-900 shadow-sm"
                                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    {page}
                                </Button>
                            ))}

                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="h-7 w-7 p-0 border-slate-200 text-slate-500 hover:text-slate-900 rounded-md disabled:opacity-50"
                            >
                                <ChevronRight size={14} />
                            </Button>
                        </footer>

                    </div>
                ) : (
                    <div className="p-4 lg:p-8 space-y-6 max-w-7xl w-full mx-auto flex-1 flex flex-col">

                        <div className="flex flex-col gap-1">
                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-xs font-bold transition-all w-fit"
                            >
                                <ChevronLeft size={14} />
                                <span>Employee Details</span>
                            </button>
                            <p className="text-[11px] text-slate-400 pl-5">Review and Update Personal Information</p>
                        </div>

                        <Tabs value={detailTab} onValueChange={setDetailTab} className="w-full">
                            <TabsList className="bg-slate-200/60 p-0.5 rounded-lg h-9 w-full max-w-[320px] mb-6">
                                <TabsTrigger value="personal" className="text-xs font-semibold h-8 flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400">Personal Information</TabsTrigger>
                                <TabsTrigger value="statistics" className="text-xs font-semibold h-8 flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400">Statistics</TabsTrigger>
                            </TabsList>

                            <TabsContent value="personal" className="space-y-6 outline-none">
                                <Card className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm text-left">
                                    <h3 className="text-xs font-bold text-slate-950">Personal Info</h3>
                                    <p className="text-[11px] text-slate-400 mt-1">Personal Information are not editable by managers</p>
                                </Card>

                                <div className="flex flex-col md:flex-row items-start justify-between gap-6 bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                                        <div className="w-20 h-20 bg-slate-950 rounded-xl relative flex items-center justify-center text-white font-bold text-xl overflow-hidden">
                                            <div className="absolute bottom-2 right-2 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <h2 className="text-lg font-bold text-slate-950 tracking-tight">sina tavakoli</h2>
                                                <span className="text-xs text-slate-500 font-semibold block mt-0.5">Sales Manager</span>
                                                <span className="text-[10px] text-slate-400 block mt-1">Viewing: CRM Dashboard</span>
                                            </div>

                                            <div className="space-y-2.5 text-xs text-slate-600 font-medium pt-1">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={14} className="text-slate-400" />
                                                    <span>sarah.johnson@dealership.com</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone size={14} className="text-slate-400" />
                                                    <span>(555) 123-4567</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={14} className="text-slate-400" />
                                                    <span>123 Main St, New York, NY 10001</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-slate-400" />
                                                    <span>Date of Birth: <span className="text-slate-800 font-semibold">5/14/1990</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0">
                                        <Button
                                            onClick={() => setIsEditOpen(true)}
                                            variant="outline"
                                            className="flex-1 md:flex-initial h-9 text-xs font-semibold border-slate-200 text-slate-700 rounded-lg gap-1.5 hover:bg-slate-50"
                                        >
                                            <Edit2 size={14} />
                                            <span>Edit Role</span>
                                        </Button>
                                        <Button
                                            onClick={() => setIsDeactivateOpen(true)}
                                            variant="outline"
                                            className="flex-1 md:flex-initial h-9 text-xs font-semibold border-red-100 text-red-500 hover:bg-red-50/50 rounded-lg gap-1.5"
                                        >
                                            <UserX size={14} />
                                            <span>Deactivate</span>
                                        </Button>
                                    </div>
                                </div>

                                <Card className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm text-left">
                                    <div className="flex gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                            <Sparkles size={14} className="text-slate-950" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-950">AI Performance Analysis</h4>
                                            <p className="text-[11px] text-slate-500 leading-relaxed font-normal mt-1.5">
                                                Exceptional performance this month. Top converter with 92% close rate on qualified leads. Shows strong leadership qualities and mentors junior team members effectively.
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="statistics" className="space-y-6 outline-none">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                                    <Card className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                                        <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
                                            <div>
                                                <h3 className="text-xs font-bold text-slate-950">Revenue Performance</h3>
                                                <span className="text-[10px] text-slate-400 mt-0.5 block">Last 6 months</span>
                                            </div>
                                            <span className="text-xs">📊</span>
                                        </div>
                                        <div className="h-48 w-full relative bg-slate-50/50 rounded-lg border border-slate-100/70 overflow-hidden flex items-end">
                                            <div className="absolute inset-0 p-3 flex flex-col justify-between text-[9px] text-slate-400 font-bold">
                                                <span>60000</span><span>45000</span><span>30000</span><span>15000</span><span>0</span>
                                            </div>
                                            <svg className="w-full h-32 stroke-slate-950 stroke-2 fill-slate-950/5" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                <path d="M 0 50 Q 25 35 50 45 T 100 20 L 100 100 L 0 100 Z" />
                                            </svg>
                                            <div className="absolute bottom-1 left-0 right-0 px-8 flex justify-between text-[9px] text-slate-400 font-bold">
                                                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                                        <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
                                            <div>
                                                <h3 className="text-xs font-bold text-slate-950">Deals & Leads</h3>
                                                <span className="text-[10px] text-slate-400 mt-0.5 block">Monthly comparison</span>
                                            </div>
                                            <span className="text-xs">📊</span>
                                        </div>
                                        <div className="h-48 w-full relative bg-slate-50/50 rounded-lg border border-slate-100/70 p-4 flex items-end justify-between px-8">
                                            <div className="absolute top-3 left-3 flex flex-col justify-between h-[80%] text-[9px] text-slate-400 font-bold">
                                                <span>60</span><span>45</span><span>30</span><span>15</span><span>0</span>
                                            </div>
                                            {[
                                                { h1: "h-8 bg-orange-400", h2: "h-28 bg-slate-500" },
                                                { h1: "h-10 bg-orange-400", h2: "h-32 bg-slate-500" },
                                                { h1: "h-6 bg-orange-400", h2: "h-24 bg-slate-500" },
                                                { h1: "h-12 bg-orange-400", h2: "h-36 bg-slate-500" },
                                                { h1: "h-14 bg-orange-400", h2: "h-40 bg-slate-500" },
                                                { h1: "h-36 bg-orange-400", h2: "h-0" }
                                            ].map((bar, i) => (
                                                <div key={i} className="flex flex-col items-center gap-1 w-6 h-full justify-end">
                                                    <div className="flex items-end gap-0.5 h-full w-full">
                                                        <div className={`w-2.5 rounded-t-sm ${bar.h1}`}></div>
                                                        <div className={`w-2.5 rounded-t-sm ${bar.h2}`}></div>
                                                    </div>
                                                    <span className="text-[9px] text-slate-400 font-bold mt-1">{["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </div>

                                <Tabs value={leadTab} onValueChange={setLeadTab} className="w-full flex-1 flex flex-col pt-2">
                                    <TabsList className="bg-slate-200/60 p-0.5 rounded-lg h-9 w-full max-w-[320px] mb-4">
                                        <TabsTrigger value="recent-leads" className="text-xs font-semibold h-8 flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400">Recent Leads (2)</TabsTrigger>
                                        <TabsTrigger value="recent-deals" className="text-xs font-semibold h-8 flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400">Recent Deals (4)</TabsTrigger>
                                    </TabsList>

                                    <div className="w-full bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
                                        <table className="w-full border-collapse text-left text-xs text-slate-600 min-w-[700px]">
                                            <thead>
                                                <tr className="border-b border-slate-100 bg-slate-50/70 font-semibold text-slate-500 uppercase text-[9px] tracking-wider">
                                                    <th className="p-4 pl-6">Customer</th>
                                                    <th className="p-4">Vehicle</th>
                                                    <th className="p-4">Value</th>
                                                    <th className="p-4">Status</th>
                                                    <th className="p-4 pr-6">Time</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {leadsData.map((lead, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                                                        <td className="p-4 pl-6 font-bold text-slate-950">{lead.customer}</td>
                                                        <td className="p-4 font-medium text-slate-500">{lead.vehicle}</td>
                                                        <td className="p-4 font-bold text-slate-950">{lead.value}</td>
                                                        <td className="p-4">
                                                            <span className={`inline-flex items-center text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${idx === 2 ? "bg-slate-900 text-white" : idx === 3 ? "bg-slate-100 text-slate-600" : "bg-red-100 text-red-700"
                                                                }`}>
                                                                {idx === 2 ? "Warm" : idx === 3 ? "Cold" : "Hot"}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-slate-400 font-medium pr-6">{lead.time}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Tabs>
                            </TabsContent>
                        </Tabs>

                    </div>
                )}
            </main>

            <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                <DialogContent className={`${"max-w-md w-full bg-white p-6 rounded-xl border border-slate-100 font-sans shadow-xl text-left"} ${inter.className}`}>
                    <DialogHeader className="flex flex-col items-center text-center border-b border-slate-50 pb-4 relative">
                        <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-950 mb-2">
                            <UserCheck size={18} />
                        </div>
                        <DialogTitle className="text-base font-bold text-slate-950">Invite New Employee</DialogTitle>
                        <p className="text-[11px] text-slate-400 mt-0.5">Send an invitation to join your dealership team</p>
                    </DialogHeader>

                    <Tabs value={inviteModalTab} onValueChange={setInviteModalTab} className="w-full mt-4">
                        <TabsList className="bg-slate-100 p-0.5 rounded-lg h-8 w-full grid grid-cols-2 mb-4">
                            <TabsTrigger value="required" className="text-xs font-semibold rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400">Required Info</TabsTrigger>
                            <TabsTrigger value="optional" className="text-xs font-semibold rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400">Optional Info</TabsTrigger>
                        </TabsList>

                        <TabsContent value="required" className="space-y-4 outline-none">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-900">Email Address <span className="text-red-500">*</span></label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    placeholder="ex@gmail.com"
                                    className="h-10 text-xs w-full bg-white border-slate-200"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-900">Role <span className="text-red-500">*</span></label>
                                <Select value={formData.role} onValueChange={(val) => handleInputChange("role", val)}>
                                    <SelectTrigger className="h-10 text-xs w-full bg-white border-slate-200"><SelectValue placeholder="Select Role" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="manager">Sales Manager</SelectItem>
                                        <SelectItem value="associate">Sales Associate</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </TabsContent>

                        <TabsContent value="optional" className="space-y-4 outline-none max-h-[350px] overflow-y-auto pr-1 scrollbar-thin">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-900">First Name</label>
                                    <Input
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                                        placeholder="First Name"
                                        className="h-10 text-xs bg-white border-slate-200"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-900">Last Name</label>
                                    <Input
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                                        placeholder="Last Name"
                                        className="h-10 text-xs bg-white border-slate-200"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-900">Phone Number</label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    type="tel"
                                    placeholder="555-123-456"
                                    className="h-10 text-xs bg-white border-slate-200"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-900">Sex</label>
                                <Select value={formData.sex} onValueChange={(val) => handleInputChange("sex", val)}>
                                    <SelectTrigger className="h-10 text-xs w-full bg-white border-slate-200"><SelectValue placeholder="Select" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-900">Driver's License Scan</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative border border-dashed border-slate-200 bg-slate-50 rounded-lg p-4 text-center hover:bg-slate-100/50 transition-all group min-h-[82px] flex flex-col justify-center items-center">
                                        <input
                                            type="file"
                                            id="license-front"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) console.log("Front Side:", e.target.files[0].name);
                                            }}
                                        />
                                        <label htmlFor="license-front" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                                            <Upload size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors mb-1" />
                                            <span className="text-[10px] font-semibold text-slate-700 block">Front Side</span>
                                            <span className="text-[9px] text-slate-400 font-normal mt-0.5 block truncate max-w-full px-1">PNG, JPG up to 5MB</span>
                                        </label>
                                    </div>

                                    <div className="relative border border-dashed border-slate-200 bg-slate-50 rounded-lg p-4 text-center hover:bg-slate-100/50 transition-all group min-h-[82px] flex flex-col justify-center items-center">
                                        <input
                                            type="file"
                                            id="license-back"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) console.log("Back Side:", e.target.files[0].name);
                                            }}
                                        />
                                        <label htmlFor="license-back" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                                            <Upload size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors mb-1" />
                                            <span className="text-[10px] font-semibold text-slate-700 block">Back Side</span>
                                            <span className="text-[9px] text-slate-400 font-normal mt-0.5 block truncate max-w-full px-1">PNG, JPG up to 5MB</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-50">
                        <Button
                            variant="outline"
                            onClick={() => setIsInviteOpen(false)}
                            className="flex-1 h-9 text-xs border-slate-200 text-slate-700 font-semibold"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSendInvitation}
                            className="flex-1 h-9 text-xs bg-slate-950 text-white hover:bg-slate-900 font-semibold"
                        >
                            Send Invitation
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
                <DialogContent className={`${"max-w-md w-full bg-white p-6 rounded-xl border border-slate-100 font-sans shadow-xl text-center flex flex-col items-center"} ${inter.className}`}>
                    <button
                        onClick={() => setIsSuccessOpen(false)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                    >
                        <X size={16} />
                    </button>

                    <DialogHeader className="flex flex-col items-center text-center pb-2">
                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-3 border border-emerald-100/50">
                            <CheckCircle2 size={24} />
                        </div>
                        <DialogTitle className="text-base font-bold text-slate-950">Invitation Sent Successfully!</DialogTitle>
                        <p className="text-xs text-slate-500 mt-1 font-normal">
                            An invitation email has been sent successfully.
                        </p>
                    </DialogHeader>

                    <div className="w-full bg-slate-50/70 border border-slate-100/80 rounded-xl p-4 text-left space-y-2.5 mt-4">
                        <div className="flex items-start gap-2.5">
                            <Mail size={15} className="text-slate-950 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-xs font-bold text-slate-950">What happens next?</h4>
                                <p className="text-[11px] text-slate-500 leading-normal font-normal mt-1">
                                    The employee will receive an email with an invitation link.
                                </p>
                                <p className="text-[11px] text-slate-500 leading-normal font-normal mt-0.5">
                                    They have 14 days to accept the invitation.
                                </p>
                                <p className="text-[11px] text-slate-500 leading-normal font-normal mt-0.5">
                                    Once accepted, they'll appear in your active employees list.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => {
                            setIsSuccessOpen(false);
                            setActiveTab("invited");
                        }}
                        className="w-full h-10 bg-slate-950 text-white hover:bg-slate-900 text-xs font-semibold rounded-lg shadow-sm mt-6 transition-all"
                    >
                        View Invited Employees
                    </Button>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeactivateOpen} onOpenChange={setIsDeactivateOpen}>
                <DialogContent className={`${"max-w-sm w-full bg-white p-6 rounded-xl border border-slate-100 font-sans shadow-xl text-left"} ${inter.className}`}>
                    <DialogHeader className="pb-2">
                        <DialogTitle className="text-sm font-bold text-slate-950">Deactivate Employee</DialogTitle>
                        <p className="text-xs text-slate-500 leading-relaxed font-normal mt-2">
                            Are you sure you want to deactivate Sina Tavakoli? They will lose access to the system.
                        </p>
                    </DialogHeader>

                    <div className="flex items-center gap-3 mt-5">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeactivateOpen(false)}
                            className="flex-1 h-9 text-xs border-slate-200 text-slate-700 font-semibold rounded-lg"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setIsDeactivateOpen(false);
                                setSelectedEmployee(null);
                            }}
                            className="flex-1 h-9 text-xs bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-sm"
                        >
                            Deactivate
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditRoleOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className={`${"max-w-md w-full bg-white p-6 rounded-xl border border-slate-100 font-sans shadow-xl text-left"} ${inter.className}`}>
                    <DialogHeader className="pb-2 relative">
                        <DialogTitle className="text-sm font-bold text-slate-950">Edit Employee Role</DialogTitle>
                        <p className="text-[11px] text-slate-400 mt-1">Update the role and permissions for Sina Tavakoli</p>
                    </DialogHeader>

                    <div className="space-y-1.5 mt-4">
                        <label className="text-xs font-semibold text-slate-900">Role <span className="text-red-500">*</span></label>
                        <Select defaultValue="manager">
                            <SelectTrigger className="h-10 text-xs w-full bg-white border-slate-200">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="manager">Sales Manager</SelectItem>
                                <SelectItem value="associate">Sales Associate</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-50">
                        <Button
                            variant="outline"
                            onClick={() => setIsEditOpen(false)}
                            className="flex-1 h-9 text-xs border-slate-200 text-slate-700 font-semibold rounded-lg"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setIsEditOpen(false);
                            }}
                            className="flex-1 h-9 text-xs bg-slate-950 text-white hover:bg-slate-900 font-semibold rounded-lg shadow-sm"
                        >
                            Save Changes
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}