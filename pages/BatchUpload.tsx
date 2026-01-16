
import React, { useState } from 'react';

const BatchUpload: React.FC = () => {
  const [mappingId, setMappingId] = useState('');
  
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Submit Batch CSV</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Upload loan applications in bulk using a standard CSV format. Please ensure your mapping ID correlates with your configured schema.
          </p>
        </div>
        <button className="px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-all">
          <span className="material-symbols-outlined text-lg">download</span>
          Template CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600">post_add</span>
              New Batch Submission
            </h3>
            <form className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2.5">Mapping ID</label>
                <div className="relative">
                  <input 
                    className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all" 
                    placeholder="e.g. map_8823_cred_bureau_v2" 
                    type="text"
                    value={mappingId}
                    onChange={(e) => setMappingId(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <span className="material-symbols-outlined text-xl cursor-help">info</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2.5">CSV File</label>
                <div className="relative">
                  <input 
                    accept=".csv" 
                    className="block w-full text-sm text-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-950 dark:text-slate-400 focus:outline-none file:mr-4 file:py-3.5 file:px-6 file:border-0 file:text-sm file:font-black file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 h-14" 
                    type="file"
                  />
                </div>
                <p className="mt-3 text-xs text-slate-400 font-medium">Supported format: .csv (Max 50MB)</p>
              </div>

              <div className="pt-4">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2" type="button">
                  <span>Submit Batch</span>
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Recent Batches</h3>
              <a className="text-xs text-indigo-600 font-bold hover:underline" href="#">View All</a>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { id: '8820-BETA', status: 'check_circle', statusColor: 'emerald', time: '2 hrs ago', count: '500' },
                { id: '8819-ALPHA', status: 'error', statusColor: 'red', time: '5 hrs ago', count: 'Mapping Error' },
                { id: '8818-PROD', status: 'check_circle', statusColor: 'emerald', time: 'Yesterday', count: '1,200' },
              ].map(batch => (
                <div key={batch.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white font-mono group-hover:text-indigo-600">#JOB-{batch.id}</span>
                    <span className={`text-${batch.statusColor}-500 material-symbols-outlined text-lg`}>{batch.status}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                    <span>{batch.time}</span>
                    <span className={batch.statusColor === 'red' ? 'text-red-500 font-bold' : ''}>{batch.count} Records</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchUpload;
