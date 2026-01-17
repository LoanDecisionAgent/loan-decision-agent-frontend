"use client";

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 lg:p-12 shadow-xl border border-slate-200/50 dark:border-slate-800/50 space-y-8 animate-slide-in-right">
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              By accessing and using LoanDecisionAgent ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">2. Description of Service</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              LoanDecisionAgent provides an API-first loan scoring and risk assessment platform for financial institutions, SACCOs, and MFIs. The service uses machine learning models to evaluate loan applications and provide decisioning recommendations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">3. Use of Service</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">3.1 Eligibility</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  You must be at least 18 years old and have the legal authority to enter into this agreement. You represent that all information provided during registration is accurate and complete.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">3.2 Prohibited Uses</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
                  <li>Use the service for any illegal purpose or in violation of any laws</li>
                  <li>Attempt to reverse engineer, decompile, or disassemble the service</li>
                  <li>Introduce viruses, malware, or harmful code</li>
                  <li>Interfere with or disrupt the service or servers</li>
                  <li>Use automated systems to access the service without authorization</li>
                  <li>Share your API credentials with unauthorized parties</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">4. API Usage and Limits</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Your use of the API is subject to rate limits and usage quotas as specified in your subscription plan. We reserve the right to modify these limits with reasonable notice. Excessive usage may result in throttling or suspension of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">5. Intellectual Property</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              All content, features, and functionality of the Service are owned by LoanDecisionAgent and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">6. Disclaimers</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. We do not guarantee the accuracy, completeness, or usefulness of any scoring results, and you acknowledge that loan decisions should not be based solely on our service outputs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">7. Limitation of Liability</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              To the maximum extent permitted by law, LoanDecisionAgent shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">8. Termination</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We reserve the right to suspend or terminate your access to the Service at any time, with or without cause or notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">9. Changes to Terms</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of material changes via email or through the Service. Your continued use of the Service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">10. Contact Information</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              For questions about these Terms, please contact us:
            </p>
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="font-bold text-slate-900 dark:text-white">Email:</p>
              <p className="text-indigo-600 dark:text-indigo-400">legal@loandecisionagent.com</p>
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
