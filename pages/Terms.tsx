
"use client";

import React from 'react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
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
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-slate-400 font-medium">Effective Date: January 1, 2025</p>
        </header>
        
        <div className="space-y-16">
          {[
            { 
              title: "1. Service Eligibility", 
              content: "LoanDecisionAgent is a business-to-business (B2B) platform. By using our services, you represent that you are an authorized representative of a licensed financial institution or authorized vendor."
            },
            { 
              title: "2. API Credentials", 
              content: "Users are solely responsible for the security and lifecycle management of their API keys. Any activity performed via your credentials will be attributed to your organization."
            },
            { 
              title: "3. Service Level Agreement (SLA)", 
              content: "While we strive for 99.9% availability, synchronous scoring responses are subject to network conditions. We do not guarantee the financial performance of any loan issued based on our scoring engine."
            },
            { 
              title: "4. Prohibited Conduct", 
              content: "Reverse engineering the scoring models, automated scraping of documentation, or intentional overloading of API endpoints is strictly prohibited and will result in immediate termination."
            },
            { 
              title: "5. Governing Law", 
              content: "These terms are governed by the laws of the jurisdiction in which Fintech Core Engine is incorporated, without regard to conflict of law principles."
            }
          ].map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">{section.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-[1.8] text-lg">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Terms;
