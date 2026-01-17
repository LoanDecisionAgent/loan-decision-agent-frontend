"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, language = 'json' }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-20 group-hover:opacity-30 blur transition-opacity"></div>
    <pre className="relative bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
      <code className={`text-sm text-slate-100 font-mono`}>{children}</code>
    </pre>
  </div>
);

export default function ApiDocs() {
  const [activeTab, setActiveTab] = useState<'overview' | 'endpoints' | 'examples'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'info' },
    { id: 'endpoints', label: 'Endpoints', icon: 'api' },
    { id: 'examples', label: 'Examples', icon: 'code' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-50 dark:from-slate-950 dark:via-indigo-950/10 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 mb-6 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl text-white shadow-lg shadow-indigo-600/20">
              <span className="material-symbols-outlined text-[32px]">api</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                API Documentation
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Complete reference for LoanDecisionAgent API integration
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 animate-slide-in-right">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-bold text-sm border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-800/50">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                  Getting Started
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  LoanDecisionAgent provides a RESTful API for loan scoring and risk assessment.
                  All requests must be authenticated and sent to the base URL configured in your environment.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="p-6 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="material-symbols-outlined text-indigo-600">link</span>
                      <h3 className="font-black text-slate-900 dark:text-white">Base URL</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                      {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://backend:3001'}
                    </p>
                  </div>

                  <div className="p-6 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-100 dark:border-purple-900/50">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="material-symbols-outlined text-purple-600">security</span>
                      <h3 className="font-black text-slate-900 dark:text-white">Authentication</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      API key required in request headers
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-800/50">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                  Response Format
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  All responses are returned in JSON format with the following structure:
                </p>
                <CodeBlock>
{`{
  "default_probability": 0.48,
  "risk_band": "MEDIUM",
  "model_decision": "APPROVE",
  "top_factors": ["income", "dtiratio", "loanamount"]
}`}
                </CodeBlock>
              </div>
            </div>
          )}

          {activeTab === 'endpoints' && (
            <div className="space-y-8">
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-800/50">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg font-black text-xs">
                    POST
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    /api/score
                  </h2>
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Submit a loan application for AI-powered risk assessment and scoring.
                </p>

                <div className="mb-6">
                  <h3 className="font-black text-slate-900 dark:text-white mb-3">Request Body</h3>
                  <CodeBlock>
{`{
  "age": 35,
  "income": 5500,
  "loanamount": 12000,
  "interestrate": 0.08,
  "loanterm": 36,
  "dtiratio": 0.18,
  "employmenttype": "Salaried",
  "maritalstatus": "Single",
  "loanpurpose": "Education",
  "hasdependents": 0
}`}
                  </CodeBlock>
                </div>

                <div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-3">Response</h3>
                  <CodeBlock>
{`{
  "default_probability": 0.48,
  "risk_band": "MEDIUM",
  "model_decision": "APPROVE",
  "top_factors": ["income", "dtiratio", "loanamount"]
}`}
                  </CodeBlock>
                </div>

                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <h4 className="font-black text-slate-900 dark:text-white mb-2 text-sm">Field Descriptions</h4>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span className="font-mono font-bold">age</span>
                      <span>Applicant's age (18-100)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono font-bold">income</span>
                      <span>Monthly income in currency units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono font-bold">loanamount</span>
                      <span>Requested loan amount</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono font-bold">interestrate</span>
                      <span>Interest rate (0.0-1.0)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono font-bold">loanterm</span>
                      <span>Loan term in months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono font-bold">dtiratio</span>
                      <span>Debt-to-income ratio (0.0-1.0)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono font-bold">employmenttype</span>
                      <span>Salaried, Self-Employed, Unemployed, Retired</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono font-bold">maritalstatus</span>
                      <span>Single, Married, Divorced, Widowed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono font-bold">loanpurpose</span>
                      <span>Education, Home, Business, Personal, Medical, Vehicle</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono font-bold">hasdependents</span>
                      <span>0 or 1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-8">
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-800/50">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                  cURL Example
                </h2>
                <CodeBlock language="bash">
{`curl -X POST ${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://backend:3001'}/api/score \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "age": 35,
    "income": 5500,
    "loanamount": 12000,
    "interestrate": 0.08,
    "loanterm": 36,
    "dtiratio": 0.18,
    "employmenttype": "Salaried",
    "maritalstatus": "Single",
    "loanpurpose": "Education",
    "hasdependents": 0
  }'`}
                </CodeBlock>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-800/50">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                  JavaScript Example
                </h2>
                <CodeBlock language="javascript">
{`const response = await fetch('${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://backend:3001'}/api/score', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    age: 35,
    income: 5500,
    loanamount: 12000,
    interestrate: 0.08,
    loanterm: 36,
    dtiratio: 0.18,
    employmenttype: 'Salaried',
    maritalstatus: 'Single',
    loanpurpose: 'Education',
    hasdependents: 0
  })
});

const result = await response.json();
console.log(result);`}
                </CodeBlock>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-800/50">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                  Python Example
                </h2>
                <CodeBlock language="python">
{`import requests

url = "${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://backend:3001'}/api/score"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}
data = {
    "age": 35,
    "income": 5500,
    "loanamount": 12000,
    "interestrate": 0.08,
    "loanterm": 36,
    "dtiratio": 0.18,
    "employmenttype": "Salaried",
    "maritalstatus": "Single",
    "loanpurpose": "Education",
    "hasdependents": 0
}

response = requests.post(url, json=data, headers=headers)
result = response.json()
print(result)`}
                </CodeBlock>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
