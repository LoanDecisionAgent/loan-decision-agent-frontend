
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Job, JobStatus } from '../types';

const MOCK_JOBS: Job[] = [
  { id: '#8821', status: JobStatus.PROCESSING, createdAt: 'Oct 24, 10:42 AM', recordsCount: 1500 },
  { id: '#8820', status: JobStatus.COMPLETED, createdAt: 'Oct 24, 09:15 AM', recordsCount: 500 },
  { id: '#8819', status: JobStatus.FAILED, createdAt: 'Oct 23, 04:50 PM', recordsCount: 1200 },
  { id: '#8818', status: JobStatus.QUEUED, createdAt: 'Oct 23, 02:10 PM', recordsCount: 800 },
];

const VendorDashboard: React.FC = () => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-12">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Vendor Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your API integrations and CSV batches.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            API System Normal
          </div>
        </div>
      </div>

      {/* API Key Section */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Your API Key</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Use this key to authenticate requests via the SDK.</p>
          </div>
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
            <div className="relative flex-1 md:w-96">
              <input 
                className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-2.5 font-mono text-sm text-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 outline-none" 
                readOnly 
                type="text" 
                value={showKey ? "sk_live_5829fjks8293kfjs829skfj" : "sk_live_••••••••••••••••••••••"}
              />
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowKey(!showKey)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">{showKey ? 'visibility_off' : 'visibility'}</span>
                {showKey ? 'Hide' : 'Reveal'}
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 transition-all">
                <span className="material-symbols-outlined text-[20px]">content_copy</span>
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link to="/batch-upload" className="group flex flex-col items-center justify-center rounded-2xl bg-indigo-600 p-8 text-center shadow-xl shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:scale-[1.02]">
          <div className="mb-4 rounded-full bg-white/20 p-4 text-white">
            <span className="material-symbols-outlined text-[36px]">upload_file</span>
          </div>
          <h3 className="text-xl font-bold text-white">Upload CSV</h3>
          <p className="mt-2 text-sm text-indigo-100">Submit new loan batch</p>
        </Link>
        <Link to="/request-logs" className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all hover:border-indigo-500/50 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">
          <div className="mb-4 rounded-full bg-violet-50 dark:bg-violet-900/20 p-4 text-violet-600 dark:text-violet-400">
            <span className="material-symbols-outlined text-[36px]">list_alt</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">View Logs</h3>
          <p className="mt-2 text-sm text-slate-500">Check status & results</p>
        </Link>
        <Link to="/docs" className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all hover:border-indigo-500/50 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">
          <div className="mb-4 rounded-full bg-blue-50 dark:bg-blue-900/20 p-4 text-blue-600 dark:text-blue-400">
            <span className="material-symbols-outlined text-[36px]">menu_book</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">API Docs</h3>
          <p className="mt-2 text-sm text-slate-500">Integration guides</p>
        </Link>
      </div>

      {/* Recent Jobs Table */}
      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Jobs</h2>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-black uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-6 py-4 w-1/3">Job ID</th>
                <th className="px-6 py-4 w-1/3">Status</th>
                <th className="px-6 py-4 text-right w-1/3">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_JOBS.map((job) => (
                <tr key={job.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link to={`/jobs/${job.id.slice(1)}`} className="font-mono text-indigo-600 font-bold hover:underline">
                      {job.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      job.status === JobStatus.COMPLETED ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      job.status === JobStatus.FAILED ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      job.status === JobStatus.PROCESSING ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500">
                    {job.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
