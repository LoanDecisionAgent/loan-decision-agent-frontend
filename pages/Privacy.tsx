
"use client";

import React from 'react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <nav className="border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-indigo-600 font-black text-sm">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Portal
          </Link>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Legal Center</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-20 pb-32">
        <header className="mb-16">
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-400 font-medium">Effective Date: October 27, 2025</p>
        </header>
        
        <div className="space-y-16">
          {[
            { 
              title: "1. Data Philosophy", 
              content: "At LoanDecisionAgent, we prioritize the security and confidentiality of the financial data processed through our systems. We operate on a principle of 'data minimization,' collecting only the essential attributes required for risk assessment."
            },
            { 
              title: "2. Information We Process", 
              content: "Data submitted via our API (including but not limited to income, identity markers, and credit indicators) is used exclusively for score calculation and retrospective analysis as explicitly requested by the account holder."
            },
            { 
              title: "3. Cryptographic Security", 
              content: "We employ AES-256 encryption for all data at rest and TLS 1.3 for data in transit. Our infrastructure is hosted in SOC 2 Type II compliant data centers with strict logical and physical access controls."
            },
            { 
              title: "4. Compliance & Explained AI", 
              content: "Our engine supports SHAP values and explainable AI metrics. This ensures our clients can fulfill their legal obligations under the Fair Credit Reporting Act (FCRA) and other regulatory frameworks."
            },
            { 
              title: "5. Contact Information", 
              content: "For inquiries regarding data deletion or jurisdictional requirements (GDPR/CCPA), please reach out to our Data Privacy Officer via the Support portal."
            }
          ].map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">{section.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-[1.8] text-lg">
                {section.content}
              </p> section>
          ))}
        </div>

        <div className="mt-24 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-500 font-medium text-center">
            Questions? Visit our <Link to="/support" className="text-indigo-600 font-black">Support Center</Link> or view our <Link to="/terms" className="text-indigo-600 font-black">Terms of Service</Link>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
