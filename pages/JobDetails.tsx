"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBatchJobDetails, downloadBatchResults } from '../lib/api';
import { BatchJob, JobStatus } from '../types';
import LoadingState from '../components/LoadingState';

interface JobDetailsProps {
  jobId: string;
}

const JobDetails: React.FC<JobDetailsProps> = ({ jobId }) => {
  const [job, setJob] = useState<BatchJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJob() {
      try {
        const data = await getBatchJobDetails(jobId);
        setJob(data);
      } catch (err) {
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    }
    loadJob();
  }, [jobId]);

  const handleDownload = async () => {
    if (!jobId) return;
    setDownloading(true);
    try {
      await downloadBatchResults(jobId);
    } catch (err) {
      console.error('Download failed', err);
      // Optional: show toast or error
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error || !job) return (
    <div className="p-8 text-center">
      <div className="text-red-500 mb-4">Error: {error || 'Job not found'}</div>
      <Link href="/dashboard/batch-upload" className="text-indigo-600 font-bold hover:underline">
        Back to Batch Upload
      </Link>
    </div>
  );

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.COMPLETED: return 'emerald';
      case JobStatus.PROCESSING: return 'blue';
      case JobStatus.FAILED: return 'red';
      default: return 'yellow';
    }
  };

  const statusColor = getStatusColor(job.status);

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-8 flex flex-col gap-10">
      <div>
        <div className="flex flex-wrap gap-2 mb-8 text-sm">
          <Link className="text-slate-400 hover:text-indigo-500 font-medium" href="/dashboard">Dashboard</Link>
          <span className="text-slate-400 font-medium">/</span>
          <Link href="/dashboard/batch-upload" className="text-slate-400 hover:text-indigo-500 font-medium">Batch Processing</Link>
          <span className="text-slate-400 font-medium">/</span>
          <span className="text-slate-900 dark:text-white font-bold">Job #{jobId ? jobId.slice(0, 8) : 'Unknown'}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col gap-3">
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black tracking-tight">
              Job #{(jobId || job?.id || job?.jobId || '').slice(0, 8)}...
            </h1>
            <div className="flex items-center gap-4 text-slate-500 text-sm">
              <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-${statusColor}-500/10 text-${statusColor}-500 border border-${statusColor}-500/20`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-${statusColor}-500`}></span>
                {job.status}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                {new Date(job.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-70 disabled:cursor-wait"
            >
              {downloading ? (
                <>
                  <span className="spinner w-4 h-4 border-2 border-white/30 border-t-white"></span>
                  Downloading...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  Download Results
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Job ID', value: (job.id || job.jobId || '').slice(0, 12) || 'N/A', mono: true },
          {
            label: 'Total Records',
            value: typeof job?.totalRecords === 'number' ? job.totalRecords.toLocaleString() : '-',
            mono: true
          },
          {
            label: 'Processed',
            value: typeof job?.processedRecords === 'number' ? job.processedRecords.toLocaleString() : '-',
            extra: (typeof job?.totalRecords === 'number' && typeof job?.processedRecords === 'number' && job.totalRecords > 0)
              ? `(${((job.processedRecords / job.totalRecords) * 100).toFixed(1)}%)`
              : '',
            color: 'blue'
          },
          {
            label: 'Failed',
            value: typeof job?.failedRecords === 'number' ? job.failedRecords.toLocaleString() : '-',
            extra: (typeof job?.totalRecords === 'number' && typeof job?.failedRecords === 'number' && job.totalRecords > 0)
              ? `(${((job.failedRecords / job.totalRecords) * 100).toFixed(1)}%)`
              : '',
            color: 'red'
          },
        ].map(stat => (
          <div key={stat.label} className="flex flex-col gap-1 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-center gap-2">
              <p className={`text-slate-900 dark:text-white text-xl font-bold ${stat.mono ? 'font-mono' : ''}`}>{stat.value}</p>
              {stat.extra && <span className={`text-${stat.color}-500 text-xs font-bold`}>{stat.extra}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="p-8 text-center text-slate-500">
          <span className="material-symbols-outlined text-4xl mb-2">table_view</span>
          <p>Detailed row-level results can be viewed by downloading the results file.</p>
        </div>
        {/* Table structure kept for future implementation of row details */}
        {/*
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-black uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-6 py-5 w-24">Row #</th>
                <th className="px-6 py-5 w-48">Status</th>
                <th className="px-6 py-5">Default Risk</th>
                <th className="px-6 py-5">Risk Band</th>
                <th className="px-6 py-5">Decision</th>
                <th className="px-6 py-5">Error Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {/* Row data would go here *}
            </tbody>
          </table>
        </div>
        */}
      </div>
    </div>
  );
};

export default JobDetails;