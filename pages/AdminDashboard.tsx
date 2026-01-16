
import React from 'react';
import { Link } from 'react-router-dom';
import { Vendor } from '../types';

const MOCK_VENDORS: Vendor[] = [
  { id: '#V-8922', name: 'Acme Corp', status: 'Active', tokensIssued: 45000, lastActivity: '2 mins ago', logoInitials: 'AC' },
  { id: '#V-1024', name: 'FinTech Solutions', status: 'Warning', tokensIssued: 12000, lastActivity: '45 mins ago', logoInitials: 'FS' },
  { id: '#V-3341', name: 'Global Bank', status: 'Pending', tokensIssued: 0, lastActivity: '1 day ago', logoInitials: 'GB' },
  { id: '#V-5512', name: 'QuickLoan Inc', status: 'Suspended', tokensIssued: 850, lastActivity: '3 days ago', logoInitials: 'QL' },
  { id: '#V-7719', name: 'NeoX Bank', status: 'Active', tokensIssued: 22100, lastActivity: '5 hours ago', logoInitials: 'NX' },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex-1 p-6 lg:p-12 max-w-[1600px] mx-auto w-full flex flex-col gap-10">
      <section>
        <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600">bolt</span>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Upload Mapping Templates', icon: 'upload_file', desc: 'CSV or JSON configuration', path: '/docs' },
            { title: 'Manage API Keys', icon: 'key', desc: 'Revoke or issue vendor tokens', path: '/api-keys' },
            { title: 'View Audit Logs', icon: 'history', desc: 'Review all system activity', path: '/audit-logs' },
          ].map(action => (
            <Link key={action.title} to={action.path} className="group flex items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xl transition-all text-left transform hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white transition-all`}>
                  <span className="material-symbols-outlined text-[24px]">{action.icon}</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{action.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{action.desc}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 transition-colors">arrow_forward_ios</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col flex-1 min-h-[400px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-slate-900 dark:text-white text-xl font-black">Vendor Management</h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </span>
              <input className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all" placeholder="Search vendors..." type="text"/>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Vendor
            </button>
          </div>
        </div>

        <div className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm flex flex-col">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs font-black uppercase tracking-widest text-slate-400">
                  <th className="px-6 py-5">Vendor Name</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5">Tokens Issued</th>
                  <th className="px-6 py-5">Last Activity</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {MOCK_VENDORS.map(v => (
                  <tr key={v.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
                          {v.logoInitials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{v.name}</p>
                          <p className="text-xs text-slate-500">ID: {v.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                        v.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' :
                        v.status === 'Warning' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800' :
                        v.status === 'Suspended' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' :
                        'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          v.status === 'Active' ? 'bg-emerald-500' :
                          v.status === 'Warning' ? 'bg-amber-500' :
                          v.status === 'Suspended' ? 'bg-red-500' :
                          'bg-slate-400'
                        }`}></span>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-mono font-bold text-slate-600 dark:text-slate-300">{v.tokensIssued.toLocaleString()}</td>
                    <td className="px-6 py-5 text-slate-500">{v.lastActivity}</td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors p-1">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 px-6 py-4 mt-auto">
            <p className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-900 dark:text-white">1</span> to <span className="font-bold text-slate-900 dark:text-white">5</span> of <span className="font-bold text-slate-900 dark:text-white">124</span> vendors
            </p>
            <div className="flex gap-2">
              <button className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-1.5 text-sm font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
              <button className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-1.5 text-sm font-bold text-slate-500 hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
