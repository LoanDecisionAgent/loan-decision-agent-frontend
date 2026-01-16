
import React, { useState } from 'react';
import { AuditLog } from '../types';

const MOCK_LOGS: AuditLog[] = [
  { id: 'evt_8839201', appId: 'a3f9...99b2', actor: 'api-system', timestamp: 'Oct 24, 14:32:01', payload: { event: "decision.created", score: 782, risk_tier: "A+" } },
  { id: 'evt_8839202', appId: 'c7b2...11a4', actor: 'admin@sys', timestamp: 'Oct 24, 14:30:15', payload: { action: "api_key.created", vendor_id: "v-8231" } },
  { id: 'evt_8839203', appId: 'f4e1...00d8', actor: 'api-system', timestamp: 'Oct 24, 14:28:44', payload: { event: "decision.created", score: 615, risk_tier: "B" } },
  { id: 'evt_8839204', appId: 'b1a6...88c3', actor: 'cron-service', timestamp: 'Oct 24, 14:25:10', payload: { task: "batch_cleanup", deleted: 42 } },
];

const AuditLogs: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  return (
    <div className="max-w-[1400px] mx-auto p-6 md:p-10 w-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Audit Log Viewer (Admin Only)</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl">View and inspect system events, hashed application IDs, and payloads.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center justify-center gap-2 rounded-xl h-11 px-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Export CSV
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl h-11 px-5 bg-indigo-600 text-white text-sm font-black hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all">
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="px-6 py-5">Event ID</th>
                <th className="px-6 py-5">App ID (Hashed)</th>
                <th className="px-6 py-5">Actor</th>
                <th className="px-6 py-5">Timestamp</th>
                <th className="px-6 py-5 text-right">Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_LOGS.map((log) => (
                <tr key={log.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-5 text-sm font-mono font-bold text-slate-700 dark:text-slate-300">{log.id}</td>
                  <td className="px-6 py-5 text-sm font-mono text-slate-400">{log.appId}</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-200">{log.actor}</span>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500">{log.timestamp}</td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => setSelectedLog(log)}
                      className="text-indigo-600 font-bold text-sm inline-flex items-center gap-1 hover:underline"
                    >
                      JSON
                      <span className="material-symbols-outlined text-[16px]">data_object</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800 p-4 flex items-center justify-between">
           <span className="text-sm text-slate-500 font-medium">Showing 1-4 of 52 logs</span>
           <div className="flex gap-2">
             <button className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
             <button className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 hover:bg-slate-50">Next</button>
           </div>
        </div>
      </div>

      {selectedLog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payload Details</h3>
                <p className="text-xs text-slate-400 font-mono">ID: {selectedLog.id}</p>
              </div>
              <button 
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 overflow-auto bg-slate-950 flex-1">
              <pre className="font-mono text-sm leading-6">
                <code className="text-emerald-400">
                  {JSON.stringify(selectedLog.payload, null, 2)}
                </code>
              </pre>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-900">
              <button 
                onClick={() => setSelectedLog(null)}
                className="px-6 py-2 text-sm font-bold text-slate-600 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 transition-all hover:bg-slate-50"
              >
                Close
              </button>
              <button className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 rounded-xl transition-all hover:bg-indigo-700 shadow-md">
                Download JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
