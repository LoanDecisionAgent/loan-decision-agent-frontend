
import React from 'react';

const RequestLogs: React.FC = () => {
  const logs = [
    { id: 'req_1', app: 'A3901', status: 'Success', score: 742, latency: '85ms', time: '10:42:01' },
    { id: 'req_2', app: 'A3902', status: 'Success', score: 620, latency: '92ms', time: '10:42:15' },
    { id: 'req_3', app: 'A3903', status: 'Error', score: '-', latency: '42ms', time: '10:43:05' },
    { id: 'req_4', app: 'A3904', status: 'Success', score: 810, latency: '88ms', time: '10:44:22' },
  ];

  return (
    <div className="p-6 lg:p-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Request Logs</h1>
          <p className="text-slate-500 mt-2">Historical view of all synchronous API scoring requests.</p>
        </div>
        <div className="flex gap-2">
          <input className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 w-64" placeholder="Search Application ID..." />
          <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-indigo-600 transition-colors">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-5">Request ID</th>
              <th className="px-6 py-5">App ID</th>
              <th className="px-6 py-5">Outcome</th>
              <th className="px-6 py-5">Score</th>
              <th className="px-6 py-5">Latency</th>
              <th className="px-6 py-5 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-5 font-mono text-sm">{log.id}</td>
                <td className="px-6 py-5 font-bold">{log.app}</td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    log.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-5 font-mono font-bold">{log.score}</td>
                <td className="px-6 py-5 text-slate-400 text-sm">{log.latency}</td>
                <td className="px-6 py-5 text-right text-slate-500 text-sm">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestLogs;
