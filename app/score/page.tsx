"use client";

import React, { useState } from 'react';
import { scoreLoan, ApiClientError } from '../../lib/api';
import { ScoreRequest, ScoreResponse } from '../../types';
import Link from 'next/link';

export default function ScorePage() {
  const [formData, setFormData] = useState<ScoreRequest>({
    age: 30,
    income: 5000,
    loanamount: 10000,
    interestrate: 0.08,
    loanterm: 36,
    dtiratio: 0.15,
    employmenttype: 'Salaried',
    maritalstatus: 'Single',
    loanpurpose: 'Education',
    hasdependents: 0,
  });

  const [result, setResult] = useState<ScoreResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'hasdependents' || name === 'age' || name === 'loanterm'
        ? parseInt(value, 10)
        : name === 'interestrate' || name === 'dtiratio'
        ? parseFloat(value)
        : name === 'income' || name === 'loanamount'
        ? parseFloat(value)
        : value,
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
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 mb-4">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
            Loan Scoring Portal
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Submit loan application details for AI-powered risk assessment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
              Application Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    Monthly Income
                  </label>
                  <input
                    type="number"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    min="0"
                    step="100"
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Loan Amount
                </label>
                <input
                  type="number"
                  name="loanamount"
                  value={formData.loanamount}
                  onChange={handleChange}
                  min="0"
                  step="100"
                  required
                  className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Interest Rate (e.g., 0.08 for 8%)
                  </label>
                  <input
                    type="number"
                    name="interestrate"
                    value={formData.interestrate}
                    onChange={handleChange}
                    min="0"
                    max="1"
                    step="0.01"
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Loan Term (months)
                  </label>
                  <input
                    type="number"
                    name="loanterm"
                    value={formData.loanterm}
                    onChange={handleChange}
                    min="1"
                    max="360"
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Debt-to-Income Ratio (e.g., 0.18 for 18%)
                </label>
                <input
                  type="number"
                  name="dtiratio"
                  value={formData.dtiratio}
                  onChange={handleChange}
                  min="0"
                  max="1"
                  step="0.01"
                  required
                  className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Employment Type
                </label>
                <select
                  name="employmenttype"
                  value={formData.employmenttype}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                >
                  <option value="Salaried">Salaried</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Marital Status
                </label>
                <select
                  name="maritalstatus"
                  value={formData.maritalstatus}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Loan Purpose
                </label>
                <select
                  name="loanpurpose"
                  value={formData.loanpurpose}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                >
                  <option value="Education">Education</option>
                  <option value="Home">Home</option>
                  <option value="Business">Business</option>
                  <option value="Personal">Personal</option>
                  <option value="Medical">Medical</option>
                  <option value="Vehicle">Vehicle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Has Dependents
                </label>
                <select
                  name="hasdependents"
                  value={formData.hasdependents}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                >
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
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
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
              Scoring Results
            </h2>

            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <span className="material-symbols-outlined text-6xl text-indigo-600 animate-spin mb-4">
                  sync
                </span>
                <p className="text-slate-600 dark:text-slate-400">Analyzing application...</p>
              </div>
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
                      Default Probability
                    </p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">
                      {(result.default_probability * 100).toFixed(1)}%
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
                    className={`inline-block px-6 py-3 rounded-xl font-black text-lg border ${getDecisionColor(result.model_decision)}`}
                  >
                    {result.model_decision}
                  </span>
                </div>

                {result.top_factors && result.top_factors.length > 0 && (
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-4">
                      Top Influencing Factors
                    </p>
                    <div className="space-y-2">
                      {result.top_factors.map((factor, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-white dark:bg-slate-900 rounded-lg p-3"
                        >
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-bold text-sm">
                            {index + 1}
                          </span>
                          <span className="text-slate-900 dark:text-white font-medium capitalize">
                            {factor}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
    </div>
  );
}
