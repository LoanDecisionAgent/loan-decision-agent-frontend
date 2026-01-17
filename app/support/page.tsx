"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '', priority: 'medium' });
    }, 3000);
  };

  const faqs = [
    {
      question: 'How do I get started with the API?',
      answer: 'First, create an account and generate an API key from the API Keys section. Then refer to our documentation for integration examples.',
    },
    {
      question: 'What file formats are supported for batch uploads?',
      answer: 'We support CSV and Excel (.xlsx, .xls) formats. Maximum file size is 10MB.',
    },
    {
      question: 'How accurate is the loan scoring model?',
      answer: 'Our models are trained on historical data and continuously improved. Results should be used as decision support, not as the sole basis for loan decisions.',
    },
    {
      question: 'What is the API rate limit?',
      answer: 'Rate limits depend on your subscription tier. Check your dashboard for current limits. Contact sales to upgrade if needed.',
    },
    {
      question: 'How do I revoke an API key?',
      answer: 'Go to the API Keys page in your dashboard, click Revoke on the key you want to disable. You can delete it permanently if needed.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use industry-standard encryption, secure data transmission, and comply with financial data protection regulations.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-50 dark:from-slate-950 dark:via-indigo-950/10 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-8 animate-fade-in">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 mb-6 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
          
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4">
            Support Center
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            We're here to help. Find answers or reach out to our team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-800/50 animate-slide-in-left">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600">mail</span>
              Contact Us
            </h2>

            {submitted ? (
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center animate-fade-in">
                <span className="material-symbols-outlined text-6xl text-green-600 mb-4">check_circle</span>
                <p className="text-green-600 dark:text-green-400 font-bold">
                  Thank you! We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* FAQs */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-800/50">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-600">help</span>
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-colors"
                  >
                    <summary className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                      <span>{faq.question}</span>
                      <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">
                        expand_more
                      </span>
                    </summary>
                    <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-800/50">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600">link</span>
                Quick Links
              </h2>
              <div className="space-y-3">
                <Link
                  href="/docs"
                  className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-colors group"
                >
                  <span className="material-symbols-outlined text-indigo-600">description</span>
                  <span className="font-bold text-slate-900 dark:text-white">API Documentation</span>
                  <span className="ml-auto material-symbols-outlined text-slate-400 group-hover:text-indigo-600">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="/terms"
                  className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-colors group"
                >
                  <span className="material-symbols-outlined text-indigo-600">gavel</span>
                  <span className="font-bold text-slate-900 dark:text-white">Terms of Service</span>
                  <span className="ml-auto material-symbols-outlined text-slate-400 group-hover:text-indigo-600">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="/privacy"
                  className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-colors group"
                >
                  <span className="material-symbols-outlined text-indigo-600">privacy_tip</span>
                  <span className="font-bold text-slate-900 dark:text-white">Privacy Policy</span>
                  <span className="ml-auto material-symbols-outlined text-slate-400 group-hover:text-indigo-600">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
