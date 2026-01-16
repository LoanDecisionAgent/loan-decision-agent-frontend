
import React from 'react';
import { Vendor } from '../types';

const MOCK_VENDORS: Vendor[] = [
  { id: '#V-8922', name: 'Acme Corp', status: 'Active', tokensIssued: 45000, lastActivity: '2 mins ago', logoInitials: 'AC' },
  { id: '#V-1024', name: 'FinTech Solutions', status: 'Warning', tokensIssued: 12000, lastActivity: '45 mins ago', logoInitials: 'FS' },
  { id: '#V-3341', name: 'Global Bank', status: 'Pending', tokensIssued: 0, lastActivity: '1 day ago', logoInitials: 'GB' },
  { id: '#V-5512', name: 'QuickLoan Inc', status: 'Suspended', tokensIssued: 850, lastActivity: '3 days ago', logoInitials: 'QL' },
];

const Vendors: React.FC = () => {
  return (
    <div className="p-6 lg:p-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Vendor Management</h1>
          <p className="text-slate-500 mt-2">Oversee all integrated partners and their platform usage.</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          Invite Vendor
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-5">Partner</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">API Volume</th>
                <th className="px-6 py-5">Last Activity</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_VENDORS.map(v => (
                <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                        {v.logoInitials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{v.name}</p>
                        <p className="text-xs text-slate-400 font-mono">{v.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                      v.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' :
                      v.status === 'Suspended' ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' :
                      'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-mono text-sm">{v.tokensIssued.toLocaleString()}</td>
                  <td className="px-6 py-5 text-sm text-slate-500">{v.lastActivity}</td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <span className="material-symbols-outlined">settings</span>
                    </button>
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

export default Vendors;
