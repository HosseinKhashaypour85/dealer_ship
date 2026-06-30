"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
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
  LayoutGrid, 
  List,
  MoreHorizontal,
  SlidersHorizontal as SlidersIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Fingerprint,
  Edit2,
  UploadCloud
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const inter = localFont({
  src: '../../assets/fonts/Inter_18pt-Bold.ttf'
});

export default function CustomersComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  const [pageMode, setPageMode] = useState<"list" | "details" | "create" | "edit">("list");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  
  const [customerNavTab, setCustomerNavTab] = useState("overview");
  const [leadTab, setLeadTab] = useState("recent-leads");
  const totalPages = 6;

  const [mainFilter, setMainFilter] = useState("all-customers");
  const [cityFilter, setCityFilter] = useState("all-cities");
  const [genderFilter, setGenderFilter] = useState("all-genders");
  const [customerTypeFilter, setCustomerTypeFilter] = useState("all-types");
  const [activityStatusFilter, setActivityStatusFilter] = useState("all-activities");

  const [formFields, setFormData] = useState({
    firstName: "",
    lastName: "",
    sex: "Male",
    dob: "",
    email: "",
    phone: "",
    nationalCode: "",
    city: "",
    address: "",
    notes: "",
    additionalInfo: ""
  });

  const menuItems = [
    { icon: <LayoutDashboard size={16} />, label: "Intelligent Dashboard", href: "/dashboard" },
    { icon: <Car size={16} />, label: "Vehicles", href: "/vehicles" },
    { icon: <Users size={16} />, label: "Customers", href: "/customers", active: true },
    { icon: <UserCheck size={16} />, label: "Employees", href: "/employees" },
    { icon: <TrendingUp size={16} />, label: "Leads", href: "/leads", section: "Sales" },
    { icon: <FileText size={16} />, label: "Deals", href: "/deals", section: "Sales" },
    { icon: <SlidersHorizontal size={16} />, label: "BOS Customization", href: "/bos-customization", section: "Sales" },
    { icon: <Wrench size={16} />, label: "Test Drive", href: "/test-drive", section: "Service" },
    { icon: <CalendarIcon size={16} />, label: "Calendar", href: "/calendar", section: "Service" },
    { icon: <ShieldCheck size={16} />, label: "Vendors", href: "/vendors", section: "Service" },
    { icon: <DollarSign size={16} />, label: "Finance", href: "/finance", section: "Business" },
    { icon: <Ticket size={16} />, label: "Tickets", href: "/tickets", section: "Business" },
  ];

  const customersData = [
    { name: "sina tavakoli", firstName: "Sina", lastName: "Tavakoli", email: "alex.delpiero10.st@gmail.com", status: "Bought", tag: "VIP Customer", initials: "ST", phone: "(555) 123-4567", province: "Fars Province, Iran", dob: "08/09/1998", gender: "Male", id: "12412513531", address: "123 Main St" },
    { name: "Bob Smith", firstName: "Bob", lastName: "Smith", email: "bob.smith@example.com", status: "Prospect", tag: "First time buyer", initials: "BS", phone: "(555) 987-6543", province: "Tehran, Iran", dob: "10/22/1988", gender: "Male", id: "US789012", address: "456 Side St" },
  ];

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

  const openCreateMode = () => {
    setFormData({
      firstName: "",
      lastName: "",
      sex: "Male",
      dob: "",
      email: "",
      phone: "",
      nationalCode: "",
      city: "",
      address: "",
      notes: "",
      additionalInfo: ""
    });
    setPageMode("create");
  };

  const openEditMode = () => {
    setFormData({
      firstName: selectedCustomer.firstName || "",
      lastName: selectedCustomer.lastName || "",
      sex: selectedCustomer.gender || "Male",
      dob: selectedCustomer.dob || "",
      email: selectedCustomer.email || "",
      phone: selectedCustomer.phone || "",
      nationalCode: selectedCustomer.id || "",
      city: selectedCustomer.province || "",
      address: selectedCustomer.address || "",
      notes: "",
      additionalInfo: ""
    });
    setPageMode("edit");
  };

  return (
    <div className={`min-h-screen flex bg-slate-50 font-sans text-left ${inter.className}`}>
      
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 h-screen sticky top-0 p-5 justify-between select-none">
        <div className="space-y-6 overflow-y-auto no-scrollbar pr-1">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-9 h-9 rounded-lg bg-slate-950 flex items-center justify-center text-white text-lg">🚗</div>
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
                  <div className="w-9 h-9 rounded-lg bg-slate-950 flex items-center justify-center text-white text-lg">🚗</div>
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
              <span className="text-slate-900 font-semibold">Customers</span>
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

        {pageMode === "list" && (
          <div className="p-4 lg:p-8 space-y-6 max-w-7xl w-full mx-auto flex-1 flex flex-col">
            <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-slate-950 tracking-tight">Customer Management</h1>
                <p className="text-xs text-slate-500 mt-0.5">Management your Customers performance</p>
              </div>
            </section>

            <section className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4 text-left">
              <div className="flex items-center gap-2">
                <SlidersIcon size={15} className="text-slate-900" />
                <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider">AI Customer Insights</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-slate-100 rounded-xl p-4 bg-white">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Total Active</span>
                  <span className="text-xl font-bold text-slate-950 mt-1 block">1,248</span>
                  <span className="text-[10px] text-slate-400 block mt-1">+12% vs last month</span>
                </div>
                <div className="border border-slate-100 rounded-xl p-4 bg-white">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Conversion Rate</span>
                  <span className="text-xl font-bold text-slate-950 mt-1 block">24.5%</span>
                  <span className="text-[10px] text-slate-400 block mt-1">+2.1% vs last month</span>
                </div>
                <div className="border border-slate-100 rounded-xl p-4 bg-white">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Avg Customer Value</span>
                  <span className="text-xl font-bold text-slate-950 mt-1 block">$32,450</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Stable</span>
                </div>
              </div>

              <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 flex items-start gap-2.5">
                <Sparkles size={15} className="text-slate-950 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-600 italic font-medium leading-relaxed">
                    "Recent trends show an increase in SUV interest among families in the 30-45 age demographic. Consider targeting this segment with the new inventory arriving next week."
                  </p>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-1.5">AI Generated</span>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-4 w-full">
              <div className="flex flex-col sm:flex-row gap-3 w-full items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 items-center w-full flex-1">
                  <Button onClick={openCreateMode} className="bg-slate-950 hover:bg-slate-900 text-white text-xs h-9 font-semibold gap-1.5 w-full sm:w-auto shadow-sm shrink-0 rounded-lg">
                    <Plus size={14} />
                    <span>Create Customer</span>
                  </Button>
                  <div className="relative w-full">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input placeholder="Search customers by name or email..." className="pl-9 h-9 text-xs bg-white border-slate-200 w-full" />
                  </div>
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
                    <Select value={mainFilter} onValueChange={setMainFilter}>
                      <SelectTrigger className="h-9 text-xs bg-white border-slate-200 min-w-[130px] flex-1 sm:flex-initial">
                        <SelectValue placeholder="All Customers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-customers">All Customers</SelectItem>
                        <SelectItem value="has-bought">Has Bought</SelectItem>
                        <SelectItem value="prospects">Prospects</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                      variant={showAdvancedFilters ? "default" : "outline"} 
                      className={`h-9 w-9 p-0 shrink-0 ${showAdvancedFilters ? "bg-slate-950 text-white" : "bg-white border-slate-200"}`}
                    >
                      <SlidersIcon size={14} />
                    </Button>
                  </div>
                </div>
              </div>

              {showAdvancedFilters && (
                <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="text-xs font-bold text-slate-950">Advanced Filters</span>
                    <button onClick={() => setShowAdvancedFilters(false)} className="text-slate-400 hover:text-slate-600">
                      <X size={14} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-700">City</label>
                      <Select value={cityFilter} onValueChange={setCityFilter}>
                        <SelectTrigger className="h-9 text-xs bg-white border-slate-200 w-full">
                          <SelectValue placeholder="All Cities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-cities">All Cities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-700">Gender</label>
                      <Select value={genderFilter} onValueChange={setGenderFilter}>
                        <SelectTrigger className="h-9 text-xs bg-white border-slate-200 w-full">
                          <SelectValue placeholder="All Genders" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-genders">All Genders</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-700">Customer Type</label>
                      <Select value={customerTypeFilter} onValueChange={setCustomerTypeFilter}>
                        <SelectTrigger className="h-9 text-xs bg-white border-slate-200 w-full">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-types">All Types</SelectItem>
                          <SelectItem value="vip">VIP</SelectItem>
                          <SelectItem value="first-time-buyer">First Time Buyer</SelectItem>
                          <SelectItem value="loyalty-member">Loyalty Member</SelectItem>
                          <SelectItem value="repeat-customer">Repeat Customer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-700">Activity Status</label>
                      <Select value={activityStatusFilter} onValueChange={setActivityStatusFilter}>
                        <SelectTrigger className="h-9 text-xs bg-white border-slate-200 w-full">
                          <SelectValue placeholder="All Activities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-activities">All Activities</SelectItem>
                          <SelectItem value="has-active-leads">Has Active Leads</SelectItem>
                          <SelectItem value="has-active-deals">Has Active Deals</SelectItem>
                          <SelectItem value="has-test-drives">Has Test Drives</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="pt-2 text-[10px] font-semibold text-slate-400">3 customers found</div>
                </div>
              )}
            </section>

            {viewMode === "card" ? (
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {customersData.map((cust, idx) => (
                  <Card key={idx} className="bg-white border border-slate-100 shadow-sm rounded-xl overflow-hidden p-4 flex flex-col justify-between min-h-[165px]">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                          {cust.initials}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xs font-bold text-slate-950 leading-none">{cust.name}</h3>
                          <span className="text-[10px] text-slate-400 mt-1 block truncate max-w-[130px]">{cust.email}</span>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-900 p-0.5 rounded transition-colors">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 font-medium">Status:</span>
                        <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          cust.status === "Bought" ? "bg-emerald-50 text-emerald-700 border border-emerald-100/50" : "bg-slate-100 text-slate-600"
                        }`}>
                          {cust.status === "Bought" ? "✓ Bought" : "⚙ Prospect"}
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-50/50 border border-slate-100/70 rounded-lg p-2 mt-2 text-left">
                      <span className="text-[10px] font-semibold text-slate-600 block truncate">{cust.tag}</span>
                    </div>

                    <Button 
                      onClick={() => { setSelectedCustomer(cust); setPageMode("details"); }}
                      variant="outline" 
                      className="w-full h-7 mt-3 text-[10px] font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 rounded-md"
                    >
                      <span>View Profile</span>
                    </Button>
                  </Card>
                ))}
              </section>
            ) : (
              <section className="w-full bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs text-slate-600 min-w-[750px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 font-semibold text-slate-500 uppercase text-[9px] tracking-wider">
                      <th className="p-4 pl-6">Customer</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Segment / Tag</th>
                      <th className="p-4 text-center pr-6">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customersData.map((cust, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                        <td className="p-4 pl-6 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                            {cust.initials}
                          </div>
                          <span className="font-bold text-slate-950">{cust.name}</span>
                        </td>
                        <td className="p-4 font-medium text-slate-500">{cust.email}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            cust.status === "Bought" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                          }`}>
                            {cust.status}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-slate-700">{cust.tag}</td>
                        <td className="p-4 text-center pr-6">
                          <Button 
                            onClick={() => { setSelectedCustomer(cust); setPageMode("details"); }}
                            variant="outline" 
                            className="h-7 px-3 text-[10px] font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 rounded-md"
                          >
                            <span>View Profile</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

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
                  className={`h-7 w-7 p-0 text-xs font-semibold rounded-md transition-all ${
                    page === currentPage ? "bg-slate-950 text-white hover:bg-slate-900 shadow-sm" : "border-slate-200 text-slate-600 hover:bg-slate-50"
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
        )}

        {pageMode === "details" && (
          <div className="p-4 lg:p-8 space-y-6 max-w-7xl w-full mx-auto flex-1 flex flex-col lg:flex-row items-start gap-6">
            <div className="w-full lg:w-64 bg-white border border-slate-100 rounded-xl p-5 shadow-sm text-center flex flex-col items-center shrink-0">
              <div className="w-full text-left mb-4">
                <button 
                  onClick={() => setPageMode("list")}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-xs font-bold transition-all"
                >
                  <ChevronLeft size={14} />
                  <span>Customer Details</span>
                </button>
                <p className="text-[10px] text-slate-400 mt-0.5">Review and Update Customer Information</p>
              </div>

              <div className="w-20 h-20 bg-slate-950 rounded-xl relative flex items-center justify-center text-white font-bold text-xl overflow-hidden mb-3">
                <div className="absolute bottom-2 right-2 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
              </div>

              <h2 className="text-base font-bold text-slate-950 tracking-tight">{selectedCustomer?.name}</h2>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100/50">Purchased</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/50">VIP Customer</span>
              </div>

              <div className="w-full space-y-2.5 text-xs text-slate-600 font-medium pt-5 border-t border-slate-50 mt-5 text-left">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-slate-400 shrink-0" />
                  <span className="truncate">{selectedCustomer?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400 shrink-0" />
                  <span>{selectedCustomer?.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-slate-400 shrink-0" />
                  <span className="truncate">{selectedCustomer?.province}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-slate-400 shrink-0" />
                  <span>DOB: {selectedCustomer?.dob}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-slate-400 shrink-0" />
                  <span>Gender: {selectedCustomer?.gender}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fingerprint size={14} className="text-slate-400 shrink-0" />
                  <span>ID: {selectedCustomer?.id}</span>
                </div>
              </div>

              <Button onClick={openEditMode} variant="outline" className="w-full h-9 text-xs font-semibold border-slate-200 text-slate-700 rounded-lg gap-1.5 hover:bg-slate-50 mt-5 shadow-sm">
                <Edit2 size={13} />
                <span>Edit Customer</span>
              </Button>
            </div>

            <div className="flex-1 w-full flex flex-col">
              <Tabs value={customerNavTab} onValueChange={setCustomerNavTab} className="w-full flex-1 flex flex-col">
                <TabsList className="bg-slate-200/60 p-0.5 rounded-lg h-9 w-full max-w-[550px] mb-6 overflow-x-auto no-scrollbar justify-start">
                  <TabsTrigger value="overview" className="text-xs font-semibold h-8 px-4 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400 transition-all shrink-0">Overview</TabsTrigger>
                  <TabsTrigger value="leads" className="text-xs font-semibold h-8 px-4 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400 transition-all shrink-0">Leads</TabsTrigger>
                  <TabsTrigger value="deals" className="text-xs font-semibold h-8 px-4 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400 transition-all shrink-0">Deals</TabsTrigger>
                  <TabsTrigger value="history" className="text-xs font-semibold h-8 px-4 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400 transition-all shrink-0">Purchase History</TabsTrigger>
                  <TabsTrigger value="bhph" className="text-xs font-semibold h-8 px-4 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400 transition-all shrink-0">BHPH</TabsTrigger>
                  <TabsTrigger value="test-drive" className="text-xs font-semibold h-8 px-4 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400 transition-all shrink-0">Test Drive</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-5 outline-none text-left">
                  <Card className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-950 uppercase tracking-wider">Notes</h3>
                    <p className="text-xs text-slate-500 italic mt-3 bg-slate-50/50 border border-slate-100 rounded-lg p-3">
                      Preferred contact via email. Interested in SUVs.
                    </p>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Card className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Spent</span>
                      <span className="text-xl font-bold text-slate-950 mt-4 block">$35,000</span>
                    </Card>
                    <Card className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Visit</span>
                      <span className="text-xl font-bold text-slate-950 mt-4 block">12 Days Ago</span>
                    </Card>
                  </div>

                  <Card className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                    <div className="flex gap-2.5 items-start">
                      <Sparkles size={15} className="text-slate-950 shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">AI Analysis</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          High value customer with strong preference for Japanese SUVs. Likely to upgrade in 3 years. Responds well to email campaigns.
                        </p>
                        <div className="flex items-center gap-1.5 pt-1">
                          <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">High Intent</span>
                          <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">SUV Preferred</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="leads" className="space-y-4 outline-none text-left">
                  <div>
                    <h3 className="text-base font-bold text-slate-950 tracking-tight">Leads</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Update your leads details here</p>
                  </div>
                  <Card className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
                    <div className="border-b border-slate-50 pb-2.5">
                      <h4 className="text-xs font-bold text-slate-950">Active Leads</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Recent inquiries and lead status.</p>
                    </div>
                    <div className="flex items-center justify-between border border-slate-100 rounded-xl p-4 bg-slate-50/40">
                      <div>
                        <span className="text-xs font-bold text-slate-950 block">Toyota RAV4</span>
                        <span className="text-[10px] text-slate-400 font-medium block mt-1">Friday, February 10, 2023 at 5:57 PM</span>
                      </div>
                      <span className="inline-flex items-center text-[10px] font-bold text-white bg-slate-950 px-3 py-1 rounded-md shadow-sm">Converted</span>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="deals" className="space-y-4 outline-none text-left">
                  <div>
                    <h3 className="text-base font-bold text-slate-950 tracking-tight">Deals</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Update your leads details here</p>
                  </div>
                  <Card className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
                    <div className="border-b border-slate-50 pb-1">
                      <h4 className="text-xs font-bold text-slate-950">Deals</h4>
                    </div>
                    <div className="flex items-center justify-between border border-slate-100 rounded-xl p-4 bg-white shadow-sm">
                      <div>
                        <span className="text-xs font-bold text-slate-950 block">Deal #d1</span>
                        <span className="text-[10px] text-slate-400 font-medium block mt-1">2023-11-20</span>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="text-xs font-bold text-slate-950 block">$35,000</span>
                        <span className="inline-flex items-center text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/50">Closed Won</span>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4 outline-none text-left">
                  <Card className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
                    <div className="border-b border-slate-50 pb-1">
                      <h4 className="text-xs font-bold text-slate-950">Purchase History</h4>
                    </div>
                    <div className="flex items-center justify-between border border-slate-100 rounded-xl p-4 bg-white shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">🗃</div>
                        <div>
                          <span className="text-xs font-bold text-slate-950 block">2023 Toyota RAV4</span>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">2023-11-20</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-950">$35,000</span>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="bhph" className="space-y-4 outline-none text-left">
                  <div>
                    <h3 className="text-base font-bold text-slate-950 tracking-tight">BHPH</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Update your BHPH details here</p>
                  </div>
                  <Card className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
                    <div className="border-b border-slate-50 pb-1">
                      <h4 className="text-xs font-bold text-slate-950">Buy Here Pay Here History</h4>
                    </div>
                    <div className="py-12 text-center text-slate-400 text-xs font-medium">No BHPH history available.</div>
                  </Card>
                </TabsContent>

                <TabsContent value="test-drive" className="space-y-4 outline-none text-left">
                  <div>
                    <h3 className="text-base font-bold text-slate-950 tracking-tight">Test Drives</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Update your Test Drives details here</p>
                  </div>
                  <Card className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
                    <div className="border-b border-slate-50 pb-1">
                      <h4 className="text-xs font-bold text-slate-950">Test Drive History & BI</h4>
                    </div>
                    <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs">🚗</span>
                          <div>
                            <span className="text-xs font-bold text-slate-950 block">2023 Toyota RAV4</span>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">2023-11-18, 20:07</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center text-[9px] font-bold text-white bg-slate-950 px-2.5 py-0.5 rounded">Completed</span>
                      </div>
                      <div className="bg-slate-50/60 border border-slate-100 rounded-lg p-2.5">
                        <p className="text-[11px] text-slate-500 italic font-medium">"Loved the handling"</p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        {(pageMode === "create" || pageMode === "edit") && (
          <div className="p-4 lg:p-8 space-y-6 max-w-7xl w-full mx-auto flex-1 flex flex-col text-left animate-in fade-in duration-150">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setPageMode(pageMode === "edit" ? "details" : "list")} 
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-xs font-bold transition-all"
              >
                <ChevronLeft size={16} />
                <span>{pageMode === "create" ? "Create Customer" : "Edit Customer"}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 pl-5 -mt-4">Review and Update Customer Information</p>

            <form className="bg-white border border-slate-100 rounded-xl p-6 lg:p-8 shadow-sm space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-900">First Name {pageMode === "create" && <span className="text-red-500">*</span>}</label>
                  <Input 
                    value={formFields.firstName} 
                    onChange={(e) => setFormData({...formFields, firstName: e.target.value})} 
                    placeholder="First Name" 
                    className="h-10 text-xs bg-white border-slate-200" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-900">Last Name {pageMode === "create" && <span className="text-red-500">*</span>}</label>
                  <Input 
                    value={formFields.lastName} 
                    onChange={(e) => setFormData({...formFields, lastName: e.target.value})} 
                    placeholder="Last Name" 
                    className="h-10 text-xs bg-white border-slate-200" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-900">Sex/Gender</label>
                  <Select value={formFields.sex} onValueChange={(val) => setFormData({...formFields, sex: val})}>
                    <SelectTrigger className="h-10 text-xs bg-white border-slate-200">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-900">Date of Birth</label>
                  <Input 
                    type="text"
                    value={formFields.dob} 
                    onChange={(e) => setFormData({...formFields, dob: e.target.value})} 
                    placeholder="mm/dd/yyyy" 
                    className="h-10 text-xs bg-white border-slate-200" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-900">Email Address <span className="text-red-500">*</span></label>
                  <Input 
                    type="email" 
                    value={formFields.email} 
                    onChange={(e) => setFormData({...formFields, email: e.target.value})} 
                    placeholder="ex@gmail.com" 
                    className="h-10 text-xs bg-white border-slate-200" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-900">Phone</label>
                  <Input 
                    type="tel" 
                    value={formFields.phone} 
                    onChange={(e) => setFormData({...formFields, phone: e.target.value})} 
                    placeholder="(555) 123-4567" 
                    className="h-10 text-xs bg-white border-slate-200" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-900">National Code</label>
                  <Input 
                    value={formFields.nationalCode} 
                    onChange={(e) => setFormData({...formFields, nationalCode: e.target.value})} 
                    placeholder="SSN/ID Number" 
                    className="h-10 text-xs bg-white border-slate-200" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-900">City</label>
                  <Input 
                    value={formFields.city} 
                    onChange={(e) => setFormData({...formFields, city: e.target.value})} 
                    placeholder="City" 
                    className="h-10 text-xs bg-white border-slate-200" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-900">Address</label>
                <Input 
                  value={formFields.address} 
                  onChange={(e) => setFormData({...formFields, address: e.target.value})} 
                  placeholder="123 Main St" 
                  className="h-10 text-xs bg-white border-slate-200" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-900">Driver's License Scan</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-dashed border-slate-200 bg-slate-50/50 rounded-xl p-5 text-center hover:bg-slate-50 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[100px]">
                    <UploadCloud size={20} className="text-slate-400 mb-1.5" />
                    <span className="text-xs font-semibold text-slate-700 block">Click to upload or drag and drop</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Will auto-fill personal information</span>
                  </div>
                  <div className="border border-dashed border-slate-200 bg-slate-50/50 rounded-xl p-5 text-center hover:bg-slate-50 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[100px]">
                    <UploadCloud size={20} className="text-slate-400 mb-1.5" />
                    <span className="text-xs font-semibold text-slate-700 block">Click to upload or drag and drop</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Will auto-fill personal information</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-900">Note/Comments {pageMode === "edit" && <span className="text-red-500">*</span>}</label>
                <textarea 
                  value={formFields.notes}
                  onChange={(e) => setFormData({...formFields, notes: e.target.value})}
                  placeholder="Internal notes about the customer..." 
                  className="w-full h-24 p-3 border border-slate-200 rounded-lg text-xs bg-white outline-none focus:border-slate-300 transition-all font-sans"
                />
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Additional Details</span>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-900">Other Customer Info</label>
                  <Input 
                    value={formFields.additionalInfo} 
                    onChange={(e) => setFormData({...formFields, additionalInfo: e.target.value})} 
                    placeholder="Add more details..." 
                    className="h-10 text-xs bg-white border-slate-200" 
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setPageMode(pageMode === "edit" ? "details" : "list")}
                  className="h-9 text-xs border-slate-200 text-slate-700 font-semibold px-5 rounded-lg"
                >
                  Cancel
                </Button>
                <Button 
                  type="button"
                  onClick={() => setPageMode(pageMode === "edit" ? "details" : "list")}
                  className="h-9 text-xs bg-slate-950 text-white hover:bg-slate-900 font-semibold px-5 rounded-lg shadow-sm"
                >
                  {pageMode === "create" ? "Create Customer" : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}