
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetails: React.FC = () => {
  const { jobId } = useParams();

  const mockRows = [
    { index: '0001', status: 'Valid', score: '785', color: 'green' },
    { index: '0002', status: 'Valid', score: '620', color: 'green' },
    { index: '0003', status: 'Failed', score: 'Invalid SSN Format: Must be 9 digits', color: 'red' },
    { index: '0004', status: 'Valid', score: '810', color: 'green' },
    { index: '0005', status: 'Valid', score: '755', color: 'green' },
    { index: '0006', status: 'Valid', score: '690', color: 'green' },
    { index: '0007', status: 'Failed', score: 'Missing required field: annual_income', color: 'red' },
  ];

  const jobSummary = {
    id: jobId,
    total: 1500,
    success: 1498,
    failed: 2,
    failureReasons: ["Missing annual_income", "Invalid SSN"],
    averageScore: 712
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-8 flex flex-col gap-10">
      <div>
        <div className="flex flex-wrap gap-2 mb-8 text-sm">
          <Link className="text-slate-400 hover:text-indigo-500 font-medium" to="/dashboard">Dashboard</Link>
          <span className="text-slate-400 font-medium">/</span>
          <span className="text-slate-400 font-medium">Batch Processing</span>
          <span className="text-slate-400 font-medium">/</span>
          <span className="text-slate-900 dark:text-white font-bold">Job #{jobId}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col gap-3">
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black tracking-tight">Job #{jobId}</h1>
            <div className="flex items-center gap-4 text-slate-500 text-sm">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                COMPLETED
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                Oct 24, 2023, 14:30 EST
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 h-11 px-6 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-white text-sm font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined text-[20px]">refresh</span>
              Rerun Job
            </button>
            <button className="flex items-center gap-2 h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black shadow-lg shadow-indigo-600/20 transition-all">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Download Results
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Job ID', value: jobId, mono: true },
          { label: 'Total Records', value: '1,500', mono: true },
          { label: 'Scored Successfully', value: '1,498', extra: '(99.8%)', color: 'emerald' },
          { label: 'Validation Errors', value: '2', extra: '(0.2%)', color: 'red' },
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
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-black uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-6 py-5 w-24">Row Index</th>
                <th className="px-6 py-5 w-48">Validation Status</th>
                <th className="px-6 py-5">Score OR Error Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockRows.map(row => (
                <tr key={row.index} className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${row.status === 'Failed' ? 'bg-red-50/30 dark:bg-red-900/5' : ''}`}>
                  <td className="px-6 py-5 font-mono font-bold text-slate-900 dark:text-white">{row.index}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                      row.status === 'Valid' 
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                      : 'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Valid' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                      {row.status}
                    </span>
                  </td>
                  <td className={`px-6 py-5 font-bold ${row.status === 'Valid' ? 'font-mono text-slate-900 dark:text-white text-base' : 'text-red-500'}`}>
                    {row.status === 'Failed' && <span className="material-symbols-outlined text-[18px] mr-2 inline-block align-text-bottom">error</span>}
                    {row.score}
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

export default JobDetails;
