"use client";

import React, { useState, useRef } from 'react';
import { uploadBatchFile, getBatchJobs, ApiClientError } from '../lib/api';
import { handleError } from '../lib/error-handler';
import { BatchJob, JobStatus } from '../types';
import Link from 'next/link';

export default function BatchUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [jobs, setJobs] = useState<BatchJob[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoadingJobs(true);
    try {
      const jobList = await getBatchJobs();
      setJobs(jobList);
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.name.endsWith('.csv') && !selectedFile.name.endsWith('.xlsx')) {
        setError('Please upload a CSV or Excel file');
        return;
      }
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
      setSuccess(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await uploadBatchFile(file);
      setSuccess(`File uploaded successfully! Job ID: ${result.jobId}`);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      // Reload jobs list
      await loadJobs();
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    } finally {
      setUploading(false);
    }
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.COMPLETED:
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case JobStatus.PROCESSING:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case JobStatus.FAILED:
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case JobStatus.QUEUED:
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
          Batch Upload
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Upload CSV or Excel files for bulk loan scoring
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-800/50 animate-slide-in-left">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600">upload_file</span>
          Upload File
        </h2>

        <div className="space-y-6">
          {/* File Input */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              Select File (CSV or Excel, max 10MB)
            </label>
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/10 dark:hover:bg-indigo-950/10 transition-all"
              >
                <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">cloud_upload</span>
                <p className="text-slate-600 dark:text-slate-400 font-bold mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  CSV, XLSX (MAX. 10MB)
                </p>
              </label>
            </div>
            {file && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-indigo-600">description</span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="text-slate-400 hover:text-red-600 transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            )}
          </div>

          {/* Error/Success Messages */}
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

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner w-5 h-5 border-2"></span>
                Uploading...
              </span>
            ) : (
              'Upload and Process'
            )}
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-800/50 animate-slide-in-right">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-600">history</span>
            Recent Jobs
          </h2>
          <button
            onClick={loadJobs}
            disabled={loadingJobs}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <span className={`material-symbols-outlined ${loadingJobs ? 'animate-spin' : ''}`}>refresh</span>
            Refresh
          </button>
        </div>

        {loadingJobs ? (
          <div className="flex items-center justify-center py-12">
            <span className="spinner w-8 h-8"></span>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">inbox</span>
            <p className="text-slate-500 dark:text-slate-400">No jobs yet. Upload a file to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-4 px-4 text-xs font-black uppercase tracking-widest text-slate-400">Job ID</th>
                  <th className="text-left py-4 px-4 text-xs font-black uppercase tracking-widest text-slate-400">Filename</th>
                  <th className="text-left py-4 px-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="text-left py-4 px-4 text-xs font-black uppercase tracking-widest text-slate-400">Progress</th>
                  <th className="text-left py-4 px-4 text-xs font-black uppercase tracking-widest text-slate-400">Created</th>
                  <th className="text-left py-4 px-4 text-xs font-black uppercase tracking-widest text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {job.id.slice(0, 8)}...
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">{job.filename || 'N/A'}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(job.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          job.status === JobStatus.COMPLETED ? 'bg-emerald-500' :
                          job.status === JobStatus.PROCESSING ? 'bg-blue-500' :
                          job.status === JobStatus.FAILED ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}></span>
                        {job.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 transition-all"
                            style={{
                              width: `${job.totalRecords > 0 ? (job.processedRecords / job.totalRecords) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 min-w-[60px]">
                          {job.processedRecords}/{job.totalRecords}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(job.createdAt)}
                    </td>
                    <td className="py-4 px-4">
                      <Link
                        href={`/dashboard/jobs/${job.id}`}
                        className="text-indigo-600 hover:text-indigo-700 font-bold text-sm hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
