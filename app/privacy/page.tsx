"use client";

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-50 dark:from-slate-950 dark:via-indigo-950/10 dark:to-slate-950">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-8 animate-fade-in">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 mb-6 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
          
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 lg:p-12 shadow-xl border border-slate-200/50 dark:border-slate-800/50 space-y-8 animate-slide-in-right">
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              LoanDecisionAgent ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our loan scoring platform and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2.1 Personal Information</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We collect information that you provide directly to us, including but not limited to:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2 text-slate-600 dark:text-slate-400 ml-4">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Organization name and details</li>
                  <li>Account credentials and authentication information</li>
                  <li>Financial information for loan applications</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2.2 Usage Data</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We automatically collect information about how you interact with our services, including API usage, request logs, and system activity.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>Provide, maintain, and improve our loan scoring services</li>
              <li>Process loan applications and generate risk assessments</li>
              <li>Authenticate users and prevent fraud</li>
              <li>Monitor system performance and security</li>
              <li>Comply with legal obligations and regulatory requirements</li>
              <li>Send administrative information and updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">4. Data Security</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We implement industry-standard security measures to protect your information, including encryption, secure data transmission, access controls, and regular security audits. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">5. Data Retention</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">6. Your Rights</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Depending on your jurisdiction, you may have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
              <li>Withdrawal of consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">7. Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="font-bold text-slate-900 dark:text-white">Email:</p>
              <p className="text-indigo-600 dark:text-indigo-400">privacy@loandecisionagent.com</p>
              <p className="font-bold text-slate-900 dark:text-white mt-4">Support:</p>
              <Link href="/support" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Visit Support Center
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
