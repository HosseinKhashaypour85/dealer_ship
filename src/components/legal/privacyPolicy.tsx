"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import Image from "next/image";
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
    router.back();
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

      <div className="flex-[1.4] flex flex-col items-center lg:items-start bg-transparent p-4 lg:p-10 lg:pl-16 w-full justify-center">
        
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
              <Lock size={20} />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-950">Privacy Policy</CardTitle>
            <CardDescription className="text-[11px] text-slate-400 mt-1">Effective Date: [EFFECTIVE DATE]   |   Last Updated: [LAST UPDATED DATE]</CardDescription>
          </CardHeader>

          <CardContent 
            className="p-0 mb-6 max-h-[380px] overflow-y-auto pr-2 space-y-5 text-xs text-slate-600 leading-relaxed scrollbar-thin select-none relative"
          >
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">1. Introduction</h4>
              <p>
                DealerIQ Inc. ("DealerIQ," "we," "our," or "us") is a business-to-business (B2B) Software-as-a-Service (SaaS) company incorporated in [PROVINCE/TERRITORY OF INCORPORATION], Canada. Our registered address is [FULL REGISTERED ADDRESS, CITY, PROVINCE, POSTAL CODE].
              </p>
              <p>
                This Privacy Policy describes how DealerIQ collects, uses, discloses, stores, and protects personal information obtained through our Customer Relationship Management (CRM) platform and related services (collectively, the "Services") provided to used car dealerships and their authorized personnel across Canada.
              </p>
              <p>
                This Policy is governed by the Personal Information Protection and Electronic Documents Act (PIPEDA) and, where applicable, provincial privacy legislation including Quebec's Act Respecting the Protection of Personal Information in the Private Sector (Law 25 / Bill 64). By using our Services, you agree to the collection and use of information as described in this Policy.
              </p>
              <p className="font-semibold bg-slate-50 p-2.5 border-l-2 border-slate-900 rounded">
                ⚠ Note: This Policy applies to DealerIQ's role as both a data controller (for account and billing data) and a data processor (for dealership customer data processed on behalf of our clients). A separate Data Processing Agreement (DPA) governs our obligations as a processor.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">2. Definitions</h4>
              <ul className="list-none space-y-2 pl-0">
                <li><strong>"Personal Information"</strong> means any information about an identifiable individual, as defined under PIPEDA.</li>
                <li><strong>"Dealership Data"</strong> means personal information about end-customers of our dealership clients that is uploaded to or processed through our platform.</li>
                <li><strong>"Platform"</strong> means the DealerIQ CRM application, APIs, dashboards, and all related software services.</li>
                <li><strong>"Client"</strong> means a licensed dealership or business entity that has entered into a Subscription Agreement with DealerIQ.</li>
                <li><strong>"Authorized User"</strong> means an employee, contractor, or agent of a Client who has been granted access to the Platform.</li>
                <li><strong>"Processing"</strong> means any operation performed on personal information, including collection, storage, use, disclosure, or deletion.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">3. Information We Collect</h4>
              
              <div className="space-y-1">
                <span className="font-bold text-slate-800 block">3.1 Information About Clients and Authorized Users</span>
                <p>When a dealership subscribes to DealerIQ, we collect the following categories of personal information about their representatives and Authorized Users:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Identity Information:</strong> Full name, job title, and role within the dealership.</li>
                  <li><strong>Contact Information:</strong> Business email address, phone number, and business address.</li>
                  <li><strong>Account Credentials:</strong> Usernames and hashed/encrypted passwords.</li>
                  <li><strong>Billing Information:</strong> Business name, billing address, and payment details. Note: Full payment card numbers are not stored by DealerIQ; they are processed by our PCI-DSS compliant payment processor.</li>
                  <li><strong>Usage Data:</strong> Login timestamps, IP addresses, browser/device type, feature interactions, and session activity logs within the Platform.</li>
                </ul>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800 block">3.2 Dealership Customer Data (Processed on Behalf of Clients)</span>
                <p>Our Clients upload and manage personal information about their own customers through the Platform. This Dealership Data may include:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Customer identity information (names, contact details).</li>
                  <li>Vehicle purchase history, trade-in records, and financing information.</li>
                  <li>Lead and sales pipeline data.</li>
                  <li>Communication logs between dealership staff and customers.</li>
                </ul>
                <p className="font-semibold bg-slate-50 p-2.5 border-l-2 border-slate-900 rounded mt-2">
                  ⚠ Note: DealerIQ acts as a data processor with respect to Dealership Data. Our Clients (the dealerships) are the data controllers and are responsible for ensuring they have the appropriate legal basis to upload this data to our Platform. DealerIQ processes this data strictly on behalf of and under the instructions of our Clients.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800 block">3.3 Automatically Collected Technical Data</span>
                <p>We automatically collect certain technical data when Authorized Users access the Platform:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Server logs, error reports, and performance metrics.</li>
                  <li>API call records and integration activity.</li>
                  <li>Cookies and similar tracking technologies (see Section 9).</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">4. Purposes of Collection and Use</h4>
              <p>We collect and use personal information only for the following specific, identified purposes:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Service Delivery:</strong> To provision, operate, maintain, and improve the DealerIQ Platform and Services purchased by our Clients.</li>
                <li><strong>Account Management:</strong> To create and manage Client accounts, authenticate Authorized Users, and provide customer support.</li>
                <li><strong>Billing and Payments:</strong> To process subscription fees, issue invoices, and manage payment transactions.</li>
                <li><strong>Security and Fraud Prevention:</strong> To monitor for unauthorized access, security breaches, and fraudulent activity, and to maintain audit logs for accountability.</li>
                <li><strong>Legal Compliance:</strong> To fulfill our obligations under applicable Canadian laws, respond to lawful government requests, and enforce our contractual agreements.</li>
                <li><strong>Product Improvement:</strong> To analyze aggregated, de-identified usage patterns to improve platform functionality. We do not use identifiable Dealership Customer Data for this purpose.</li>
                <li><strong>Communications:</strong> To send service notifications, security alerts, product updates, and (where consent is obtained) promotional communications under the Canadian Anti-Spam Legislation (CASL).</li>
              </ul>
              <p>We do not sell, rent, or trade personal information to third parties for their own marketing purposes.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">5. Legal Basis for Processing (PIPEDA Compliance)</h4>
              <p>Under PIPEDA, DealerIQ relies on the following legal bases for processing personal information:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Contractual Necessity:</strong> Processing required to fulfill our Subscription Agreement with Clients (account creation, service delivery, billing).</li>
                <li><strong>Consent:</strong> Where required by law, we obtain express or implied consent prior to collecting personal information. Authorized Users provide consent upon account registration.</li>
                <li><strong>Legitimate Business Interests:</strong> Processing for security monitoring, fraud prevention, and aggregated analytics, where such interests are not overridden by individual rights.</li>
                <li><strong>Legal Obligation:</strong> Processing required to comply with applicable Canadian federal and provincial laws.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">6. Cross-Border Data Transfers</h4>
              <p>DealerIQ operates with a distributed team model. Personal information collected through our Platform may be accessed, processed, or stored in jurisdictions outside Canada, including:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Cloud Infrastructure:</strong> Data is stored on servers located in [AWS/AZURE REGION — e.g., Canada (Central)]. Primary data storage is within Canada.</li>
                <li><strong>Technical Operations:</strong> Our engineering and technical support team is located in [COUNTRY — e.g., Iran / Middle East]. These personnel may access personal information for purposes of platform maintenance, security monitoring, and technical support.</li>
                <li><strong>Third-Party Service Providers:</strong> Certain sub-processors located outside Canada may process data (see Section 7).</li>
              </ul>
              <p>As permitted under PIPEDA Section 4.1.3, when personal information is transferred to a third party (including overseas personnel) for processing, we use contractual means and internal data access policies to ensure comparable protection is applied. However, please be aware that personal information transferred outside Canada may be subject to the laws of the receiving jurisdiction.</p>
              <p className="font-semibold bg-slate-50 p-2.5 border-l-2 border-slate-900 rounded">
                ⚠ Note: Quebec Law 25 imposes additional obligations for cross-border transfers, including a Privacy Impact Assessment (PIA). If your dealership is located in Quebec, please contact us for our Quebec-specific data transfer disclosures.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">7. Disclosure of Personal Information</h4>
              <p>DealerIQ does not disclose personal information except in the following circumstances:</p>
              
              <p><strong>7.1 Service Providers and Sub-Processors</strong></p>
              <p>We engage trusted third-party service providers who process data on our behalf, under binding data processing agreements:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Payment Processing:</strong> [PAYMENT PROCESSOR — e.g., Stripe, Inc.] — for billing and subscription management.</li>
                <li><strong>Cloud Hosting:</strong> [CLOUD PROVIDER — e.g., Amazon Web Services / Microsoft Azure] — for data storage and infrastructure.</li>
                <li><strong>Email Communications:</strong> [EMAIL SERVICE PROVIDER — e.g., SendGrid / Postmark] — for transactional and notification emails.</li>
                <li><strong>Analytics:</strong> [ANALYTICS PROVIDER, IF ANY — e.g., Mixpanel / Amplitude] — for aggregated product analytics.</li>
                <li><strong>Customer Support:</strong> [SUPPORT PLATFORM, IF ANY — e.g., Intercom / Zendesk] — for support ticketing.</li>
              </ul>
              <p>All sub-processors are contractually obligated to handle personal information with equivalent protections to those described in this Policy.</p>

              <p><strong>7.2 Legal Requirements and Safety</strong></p>
              <p>We may disclose personal information without consent when required or authorized by law, including:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>In response to a court order, subpoena, or lawful request by government authorities.</li>
                <li>To investigate, detect, or prevent fraud, illegal activity, or security threats.</li>
                <li>To protect the rights, property, or safety of DealerIQ, our Clients, or the public.</li>
              </ul>

              <p><strong>7.3 Business Transactions</strong></p>
              <p>In the event of a merger, acquisition, financing, or sale of all or part of DealerIQ's business, personal information may be transferred to the successor entity, subject to equivalent privacy protections and notification to affected individuals where required by law.</p>

              <p><strong>7.4 Client-Authorized Disclosures</strong></p>
              <p>Authorized Users may export or share Dealership Data through the Platform's built-in features (e.g., exporting reports, integrating with third-party tools). Such disclosures are made at the direction of the Client and are governed by the Client's own privacy obligations.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">8. Data Retention</h4>
              <p>DealerIQ retains personal information only as long as necessary for the purposes identified in this Policy, or as required by law:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Account and user data is retained for the duration of the active subscription, plus [RETENTION PERIOD — e.g., 12 months] following account termination, after which it is securely deleted or anonymized.</li>
                <li>Dealership Customer Data (uploaded by Clients) is retained per the terms of the applicable Subscription Agreement and DPA. Upon contract termination, Clients may request data export within [EXPORT WINDOW — e.g., 30 days], after which data will be permanently deleted.</li>
                <li>Billing and transaction records are retained for [BILLING RETENTION PERIOD — e.g., 7 years] to comply with Canadian tax and accounting requirements.</li>
                <li>Security and audit logs are retained for [AUDIT LOG RETENTION — e.g., 12 months] to support security investigations and regulatory compliance.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">9. Cookies and Tracking Technologies</h4>
              <p>The DealerIQ Platform uses cookies and similar technologies to maintain session state, enhance security, and analyze usage patterns. We use the following categories:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Essential Cookies:</strong> Required for Platform authentication and security. Cannot be disabled without impairing core functionality.</li>
                <li><strong>Functional Cookies:</strong> Remember user preferences and settings within the Platform.</li>
                <li><strong>Analytics Cookies:</strong> Collect aggregated, pseudonymized data about feature usage to improve the Platform. [SPECIFY IF THIRD-PARTY ANALYTICS USED]</li>
              </ul>
              <p>Authorized Users may manage cookie preferences through their browser settings. Disabling non-essential cookies will not affect core CRM functionality.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">10. Security Measures</h4>
              <p>DealerIQ employs industry-standard technical and organizational measures to protect personal information against unauthorized access, disclosure, alteration, and destruction:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Encryption:</strong> All data transmitted between users and our Platform is encrypted using TLS 1.2 or higher. Data at rest is encrypted using [ENCRYPTION STANDARD — e.g., AES-256].</li>
                <li><strong>Access Controls:</strong> Access to personal information is restricted to authorized personnel on a need-to-know basis, governed by role-based access control (RBAC) policies.</li>
                <li><strong>Audit Logging:</strong> All administrative access to personal data is logged with timestamps and user identifiers to maintain accountability.</li>
                <li><strong>Authentication:</strong> Multi-factor authentication (MFA) is [available / required — SPECIFY] for Authorized User accounts.</li>
                <li><strong>Vulnerability Management:</strong> We conduct [periodic security assessments / penetration tests — SPECIFY FREQUENCY] and promptly address identified vulnerabilities.</li>
                <li><strong>Incident Response:</strong> We maintain a written data breach response plan. In the event of a breach involving real risk of significant harm, we will notify the Office of the Privacy Commissioner of Canada (OPC) and affected individuals as required under PIPEDA's breach notification obligations (within [SPECIFY TIMEFRAME — e.g., 72 hours of discovery]).</li>
              </ul>
              <p className="font-semibold bg-slate-50 p-2.5 border-l-2 border-slate-900 rounded">
                ⚠ Note: No method of transmission over the Internet or electronic storage is 100% secure. While DealerIQ uses commercially reasonable measures to protect your information, we cannot guarantee absolute security.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">11. Your Rights and Choices</h4>
              <p>Under PIPEDA and applicable provincial legislation, individuals whose personal information we process have the following rights:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Right of Access:</strong> You may request confirmation of whether we hold personal information about you and obtain a copy of that information.</li>
                <li><strong>Right of Correction:</strong> You may request correction of inaccurate or incomplete personal information.</li>
                <li><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw consent at any time, subject to legal or contractual restrictions.</li>
                <li><strong>Right to Complain:</strong> You have the right to submit a complaint to the Office of the Privacy Commissioner of Canada (OPC) at www.priv.gc.ca, or to the applicable provincial privacy authority.</li>
              </ul>
              <p><strong>For Authorized Users:</strong> Requests regarding your account information should be submitted to your dealership's designated administrator or to DealerIQ directly using the contact information in Section 14.</p>
              <p><strong>For Dealership Customers:</strong> Requests relating to personal information held by a dealership client should be directed to that dealership. DealerIQ will assist our Clients in fulfilling such requests as outlined in the applicable DPA.</p>
              <p className="font-semibold bg-slate-50 p-2.5 border-l-2 border-slate-900 rounded">
                ⚠ Note: Quebec Law 25 grants additional rights to Quebec residents, including enhanced transparency rights and the right to data portability. Please contact us if you are a Quebec resident seeking to exercise these rights.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">12. Commercial Electronic Messages (CASL)</h4>
              <p>DealerIQ complies with Canada's Anti-Spam Legislation (CASL). We send commercial electronic messages (such as promotional emails) only to individuals who have provided express or implied consent as defined under CASL. Each such message includes:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Clear identification of DealerIQ as the sender.</li>
                <li>Our mailing address and contact information.</li>
                <li>A simple, functional unsubscribe mechanism honored within 10 business days.</li>
              </ul>
              <p>Service-related communications (e.g., account notifications, security alerts, billing receipts) are not commercial electronic messages and may be sent regardless of marketing consent.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">13. Children's Privacy</h4>
              <p>The DealerIQ Platform is designed exclusively for business use by adults. We do not knowingly collect personal information from individuals under the age of 18. If we become aware that personal information from a minor has been collected inadvertently, we will take immediate steps to delete such information.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">14. Contact Information and Privacy Officer</h4>
              <p>DealerIQ has designated a Privacy Officer responsible for overseeing compliance with this Policy and applicable privacy legislation. To exercise your rights, submit a privacy inquiry, or report a concern, please contact:</p>
              <ul className="list-none pl-0 space-y-1">
                <li><strong>Privacy Officer:</strong> [FULL NAME OF PRIVACY OFFICER]</li>
                <li><strong>Title:</strong> [TITLE — e.g., Chief Executive Officer / Privacy Officer]</li>
                <li><strong>Email:</strong> [PRIVACY EMAIL ADDRESS — e.g., privacy@dealeriq.com]</li>
                <li><strong>Mailing Address:</strong> [FULL MAILING ADDRESS, CITY, PROVINCE, POSTAL CODE, CANADA]</li>
                <li><strong>Phone:</strong> [BUSINESS PHONE NUMBER]</li>
              </ul>
              <p>We will respond to privacy inquiries within 30 days of receipt, as required under PIPEDA.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">15. Changes to This Privacy Policy</h4>
              <p>DealerIQ reserves the right to update or modify this Privacy Policy at any time. In the event of material changes, we will:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Post the revised Policy on our website at [WEBSITE URL — e.g., www.dealeriq.com/privacy] with an updated "Last Updated" date.</li>
                <li>Notify active Client accounts by email or through an in-Platform notification at least [NOTICE PERIOD — e.g., 30 days] prior to the changes taking effect.</li>
                <li>Where required by law, obtain renewed consent for material changes that affect the purpose of processing.</li>
              </ul>
              <p>Your continued use of the Platform after the effective date of any changes constitutes your acceptance of the revised Policy.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">16. Governing Law and Jurisdiction</h4>
              <p>This Privacy Policy is governed by the laws of Canada and the Province of [PROVINCE — e.g., Ontario / British Columbia]. Any disputes arising from this Policy shall be subject to the exclusive jurisdiction of the courts of [PROVINCE], Canada.</p>
            </div>

            <div className="space-y-1 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
              <p><strong>Acknowledged and Approved by:</strong></p>
              <p>Name: [FULL LEGAL NAME]</p>
              <p>Title: [TITLE — e.g., Chief Executive Officer]</p>
              <p>Company: DealerIQ Inc.</p>
              <p>Date: [DATE OF APPROVAL]</p>
            </div>

            <div className="bg-amber-50 text-amber-800 p-3 rounded text-[10px] uppercase font-semibold tracking-wider">
              LEGAL DISCLAIMER: This document is a template prepared for internal use and does not constitute legal advice. DealerIQ should engage qualified Canadian legal counsel to review and finalize this Privacy Policy prior to publication to ensure full compliance with PIPEDA, applicable provincial legislation (including Quebec Law 25), and any sector-specific requirements.
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