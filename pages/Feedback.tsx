"use client";

import React, { useState, useEffect } from 'react';
import { getFeedback, submitFeedback, ApiClientError } from '../lib/api';
import { handleError } from '../lib/error-handler';
import type { Feedback } from '../types';

export default function Feedback() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ applicationId: '', rating: 5, comment: '' });

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getFeedback({ limit: 50 });
      setFeedbackList(result.feedback);
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await submitFeedback(formData.applicationId, formData.rating, formData.comment);
      setSuccess('Feedback submitted successfully!');
      setFormData({ applicationId: '', rating: 5, comment: '' });
      setShowForm(false);
      await loadFeedback();
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`material-symbols-outlined text-[20px] ${
          i < rating ? 'text-yellow-500' : 'text-slate-300 dark:text-slate-700'
        }`}
      >
        star
      </span>
    ));
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
            Model Feedback
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Submit feedback to improve model accuracy
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:scale-105 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          {showForm ? 'Cancel' : 'Submit Feedback'}
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-red-600">error</span>
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-green-600">check_circle</span>
            <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
          </div>
        </div>
      )}

      {/* Feedback Form */}
      {showForm && (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-800/50 animate-scale-in">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
            Submit Feedback
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Application ID
              </label>
              <input
                type="text"
                value={formData.applicationId}
                onChange={(e) => setFormData({ ...formData, applicationId: e.target.value })}
                required
                placeholder="Enter the application ID"
                className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating })}
                    className={`p-2 rounded-lg transition-all ${
                      formData.rating >= rating
                        ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
                        : 'text-slate-300 dark:text-slate-700 hover:text-yellow-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[32px]">star</span>
                  </button>
                ))}
                <span className="ml-4 font-bold text-slate-900 dark:text-white">
                  {formData.rating} / 5
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Comment
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                required
                rows={4}
                placeholder="Provide detailed feedback about the model's decision..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="spinner w-5 h-5 border-2"></span>
                  Submitting...
                </span>
              ) : (
                'Submit Feedback'
              )}
            </button>
          </form>
        </div>
      )}

      {/* Feedback List */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-800/50">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-purple-600">reviews</span>
          Recent Feedback
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <span className="spinner w-8 h-8"></span>
          </div>
        ) : feedbackList.length === 0 ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">reviews</span>
            <p className="text-slate-500 dark:text-slate-400">No feedback submitted yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedbackList.map((feedback) => (
              <div
                key={feedback.id}
                className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 animate-fade-in"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white mb-1">
                      Application: {feedback.applicationId}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      By {feedback.submittedBy} • {formatDate(feedback.submittedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {getRatingStars(feedback.rating)}
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{feedback.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
