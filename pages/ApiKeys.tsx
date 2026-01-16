
import React from 'react';

const ApiKeys: React.FC = () => {
  const keys = [
    { name: 'Production Main', prefix: 'pk_live_82...', created: 'Oct 12, 2023', lastUsed: '2 mins ago', status: 'Active' },
    { name: 'Staging Environment', prefix: 'pk_test_a1...', created: 'Sep 30, 2023', lastUsed: '1 hour ago', status: 'Active' },
    { name: 'Legacy Integration', prefix: 'pk_live_f4...', created: 'Jan 15, 2023', lastUsed: '3 months ago', status: 'Revoked' },
  ];

  return (
    <div className="p-6 lg:p-12 max-w-5xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">API Keys</h1>
        <p className="text-slate-500 mt-2">Manage secret tokens for server-to-server communication.</p>
      </div>

      <div className="grid gap-6">
        {keys.map(key => (
          <div key={key.prefix} className={`p-6 rounded-2xl border bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm transition-all ${
            key.status === 'Revoked' ? 'opacity-60 border-slate-200 dark:border-slate-800' : 'border-slate-200 dark:border-slate-800 hover:border-indigo-500/50'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${key.status === 'Revoked' ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'}`}>
                <span className="material-symbols-outlined text-[28px]">key</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{key.name}</h3>
                <p className="text-sm font-mono text-slate-400 mt-1">{key.prefix}••••••••••••••••</p>
                <div className="flex items-center gap-4 mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Created: {key.created}</span>
                  <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                  <span>Last used: {key.lastUsed}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {key.status !== 'Revoked' ? (
                <>
                  <button className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-red-600 transition-colors">Revoke</button>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/10">Rotate</button>
                </>
              ) : (
                <span className="text-sm font-bold text-slate-400 px-4 py-2 italic">Revoked</span>
              )}
            </div>
          </div>
        ))}

        <button className="mt-4 border-2 border-dashed border-slate-200 dark:border-slate-800 p-8 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-indigo-500/50 hover:text-indigo-500 transition-all group">
          <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">add_circle</span>
          <span className="font-bold text-sm">Generate New API Key</span>
        </button>
      </div>
    </div>
  );
};

export default ApiKeys;
