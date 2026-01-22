"use client";

import React, { useState } from 'react';
import { scoreLoan } from '../../lib/api';
import { ScoreRequest, ScoreResponse } from '../../types';
import { handleError } from '../../lib/error-handler';
import Link from 'next/link';
import LoadingState from '../../components/LoadingState';
import PageTransition from '../../components/PageTransition';

export default function ScorePage() {
  const [formData, setFormData] = useState<ScoreRequest>({
    applicant_id: `APP-${Math.floor(Math.random() * 10000)}`,
    requested_amount: 50000,
    requested_term_months: 36,
    income: 5000,
    monthly_expenses: 2000,
    existing_debt: 500,
    credit_score: 720,
    employment_status: 'EMPLOYED',
    employment_duration_months: 24,
    age: 30,
  });

  const [result, setResult] = useState<ScoreResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'employment_status' || name === 'applicant_id'
        ? value
        : value === '' ? 0 : parseInt(value, 10),
    }));
    // Clear previous results/errors when form changes
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await scoreLoan(formData);
      setResult(response);
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBandColor = (riskBand: string) => {
    switch (riskBand?.toUpperCase()) {
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'HIGH':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision?.toUpperCase()) {
      case 'APPROVE':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'REJECT':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <PageTransition className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-50 dark:from-slate-950 dark:via-indigo-950/10 dark:to-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-8 transition-colors group">
            <span className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </span>
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl text-white shadow-lg shadow-indigo-600/20">
              <span className="material-symbols-outlined text-[32px]">calculate</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                Loan Scoring Portal
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Submit loan application details for AI-powered risk assessment
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 p-8 animate-slide-in-left">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
              Application Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Applicant ID
                </label>
                <input
                  type="text"
                  name="applicant_id"
                  value={formData.applicant_id}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Request Amount
                  </label>
                  <input
                    type="number"
                    name="requested_amount"
                    value={formData.requested_amount}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Term (Months)
                  </label>
                  <input
                    type="number"
                    name="requested_term_months"
                    value={formData.requested_term_months}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Income
                  </label>
                  <input
                    type="number"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Expenses
                  </label>
                  <input
                    type="number"
                    name="monthly_expenses"
                    value={formData.monthly_expenses}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Existing Debt
                  </label>
                  <input
                    type="number"
                    name="existing_debt"
                    value={formData.existing_debt}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Credit Score
                  </label>
                  <input
                    type="number"
                    name="credit_score"
                    value={formData.credit_score}
                    onChange={handleChange}
                    min="300"
                    max="850"
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="18"
                    max="100"
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Emp. Duration (Mo)
                  </label>
                  <input
                    type="number"
                    name="employment_duration_months"
                    value={formData.employment_duration_months}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Employment Status
                </label>
                <select
                  name="employment_status"
                  value={formData.employment_status}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                >
                  <option value="EMPLOYED">Employed</option>
                  <option value="SELF_EMPLOYED">Self-Employed</option>
                  <option value="UNEMPLOYED">Unemployed</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-indigo-600 text-white rounded-xl font-black text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/30"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    Processing...
                  </span>
                ) : (
                  'Submit for Scoring'
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 p-8 animate-slide-in-right">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
              Scoring Results
            </h2>

            {loading && (
              <LoadingState message="Analyzing application..." />
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-red-600">error</span>
                  <div>
                    <h3 className="font-bold text-red-900 dark:text-red-200 mb-1">Error</h3>
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">
                      Default Risk
                    </p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">
                      {(result.probability * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">
                      Risk Band
                    </p>
                    <span
                      className={`inline-block px-4 py-2 rounded-lg font-bold text-sm border ${getRiskBandColor(result.risk_band)}`}
                    >
                      {result.risk_band}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-3">
                    Model Decision
                  </p>
                  <span
                    className={`inline-block px-6 py-3 rounded-xl font-black text-lg border ${getDecisionColor(result.decision)}`}
                  >
                    {result.decision}
                  </span>
                </div>

                {/* AI Analysis Explanation */}
                <div className={`rounded-xl p-6 border ${result.decision === 'APPROVE'
                    ? 'bg-green-50/50 border-green-200 dark:bg-green-900/10 dark:border-green-800'
                    : 'bg-red-50/50 border-red-200 dark:bg-red-900/10 dark:border-red-800'
                  }`}>
                  <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${result.decision === 'APPROVE' ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'
                    }`}>
                    <span className="material-symbols-outlined">lightbulb</span>
                    AI Analysis
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {result.decision === 'APPROVE'
                      ? `Based on the analysis, this application is recommended for approval. The estimated default risk is only ${(result.probability * 100).toFixed(1)}%, placing it in the ${result.risk_band} risk category.`
                      : `This application has been flagged for rejection due to a higher estimated default risk of ${(result.probability * 100).toFixed(1)}%. The ${result.risk_band} risk classification suggests potential repayment challenges.`
                    }
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Application ID: {result.application_id}
                  </p>
                </div>

              </div>
            )}

            {!result && !loading && !error && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">
                  assessment
                </span>
                <p className="text-slate-500 dark:text-slate-400">
                  Submit an application to see scoring results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
