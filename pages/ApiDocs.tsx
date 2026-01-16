
import React, { useState } from 'react';

const ApiDocs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'curl' | 'python' | 'nodejs'>('curl');

  return (
    <div className="flex flex-1 overflow-hidden relative h-full">
      <aside className="hidden lg:flex w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-y-auto pb-10">
        <div className="p-5 sticky top-0 bg-inherit z-10">
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-slate-400">sell</span>
            <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-10 pr-8 text-sm font-bold focus:ring-indigo-600 focus:border-indigo-600 cursor-pointer outline-none">
              <option>v1.2.0 (Latest)</option>
              <option>v1.1.0</option>
              <option>v1.0.0-beta</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-8 px-4 mt-4">
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 pl-3">Getting Started</h3>
            <div className="flex flex-col space-y-1">
              {['Introduction', 'Authentication', 'Errors & Rate Limits'].map((label, i) => (
                <a key={label} className={`flex items-center gap-3 px-3 py-2 text-sm font-bold rounded-xl transition-all ${i === 1 ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-900'}`} href="#">
                  <span className="material-symbols-outlined text-[20px]">{['rocket_launch', 'key', 'error'][i]}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 pl-3">Endpoints</h3>
            <div className="flex flex-col space-y-1">
              {[
                { label: 'Score Calculation', color: 'bg-emerald-500' },
                { label: 'Applicants', color: 'bg-blue-500' },
                { label: 'Decisions', color: 'bg-purple-500' },
                { label: 'Batch Uploads', color: 'bg-orange-500' },
              ].map(item => (
                <a key={item.label} className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-500 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all" href="#">
                  <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-white dark:bg-slate-950 custom-scrollbar">
        <div className="max-w-[840px] mx-auto px-8 py-12 pb-32">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-widest">API v1.2.0</span>
              <span className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                System Operational
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">Loan Scoring API</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              Submit applicant data to receive a real-time credit decision. Our engine processes thousands of data points to return a risk score in under 200ms.
            </p>
          </div>

          <section className="mb-20 scroll-mt-24" id="authentication">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Authentication</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              The LoanEngine API uses API keys to authenticate requests. You can view and manage your API keys in the dashboard.
              Pass the key in the header of each request.
            </p>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Authorization Header</label>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-4 font-mono text-sm text-slate-700 dark:text-slate-300 flex items-center">
                  <span className="text-indigo-600 mr-2 font-bold">Authorization:</span> Bearer <span className="text-slate-400 mx-1">pk_live_...</span>
                </div>
                <button className="p-3.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100">
                  <span className="material-symbols-outlined text-[22px]">content_copy</span>
                </button>
              </div>
              <div className="flex items-start gap-4 text-sm text-amber-700 bg-amber-50 border border-amber-100 p-5 rounded-xl">
                <span className="material-symbols-outlined text-[22px] shrink-0">warning</span>
                <p className="font-medium">Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas.</p>
              </div>
            </div>
          </section>

          <section className="scroll-mt-24">
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-[10px] font-black font-mono tracking-widest">POST</span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono tracking-tight">/v1/score/calculate</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                Calculate the credit score for a given applicant. This endpoint accepts a payload containing personal information, income data, and loan request details.
              </p>
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6">Body Parameters</h3>
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Parameter</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { name: 'applicant_id', type: 'string', desc: 'Unique identifier for the applicant.', req: true },
                    { name: 'annual_income', type: 'integer', desc: 'Total annual income in USD cents.', req: true },
                    { name: 'employment_status', type: 'enum', desc: 'One of: full_time, part_time, self_employed.', req: false },
                  ].map(param => (
                    <tr key={param.name} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-5 font-mono text-sm text-indigo-600 font-bold">
                        {param.name}
                        {param.req && <span className="ml-2 text-[10px] font-black bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-100 uppercase tracking-widest">Required</span>}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-500 font-mono">{param.type}</td>
                      <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400 font-medium">{param.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <aside className="hidden xl:flex w-[480px] flex-col bg-slate-950 border-l border-slate-800 z-20 shadow-2xl overflow-hidden">
        <div className="flex-none flex items-center justify-between px-2 h-12 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center h-full">
            {['curl', 'python', 'nodejs'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`h-full px-5 relative text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600"></div>}
              </button>
            ))}
          </div>
          <button className="p-2 text-slate-500 hover:text-white transition-all">
            <span className="material-symbols-outlined text-[18px]">content_copy</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto font-mono text-xs leading-relaxed p-6 bg-slate-950">
          <div className="text-slate-500 mb-6 font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">terminal</span>
            Request
          </div>
          <pre className="text-slate-300 whitespace-pre overflow-x-auto">
            <code className="block">
{activeTab === 'curl' ? `curl -X POST https://api.loanengine.io/v1/score/calculate \\
  -H "Authorization: Bearer pk_live_8f9s8d..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "applicant_id": "app_923842",
    "annual_income": 8500000,
    "employment_status": "full_time",
    "loan_amount": 2500000
}'` : activeTab === 'python' ? `import requests

url = "https://api.loanengine.io/v1/score/calculate"
headers = {
    "Authorization": "Bearer pk_live_...",
    "Content-Type": "application/json"
}
data = {
    "applicant_id": "app_923842",
    "annual_income": 8500000,
    "employment_status": "full_time"
}
response = requests.post(url, headers=headers, json=data)
print(response.json())` : `const axios = require('axios');

const res = await axios.post('https://api.loanengine.io/v1/score/calculate', {
  applicant_id: 'app_923842',
  annual_income: 8500000,
  employment_status: 'full_time'
}, {
  headers: { 'Authorization': 'Bearer pk_live_...' }
});`}
            </code>
          </pre>
          
          <div className="mt-12 text-slate-500 mb-6 font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Response (200 OK)
          </div>
          <pre className="text-emerald-400/90 whitespace-pre overflow-x-auto bg-slate-900/40 p-5 rounded-xl border border-slate-800">
            <code>
{`{
  "id": "score_99210",
  "score": 742,
  "risk_tier": "A-",
  "approved": true,
  "factors": [
    "stable_employment",
    "low_dti_ratio"
  ],
  "timestamp": "2023-10-27T14:30:00Z"
}`}
            </code>
          </pre>
        </div>
        <div className="flex-none p-5 border-t border-slate-800 bg-slate-900/50">
          <button className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30">
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            Run Request
          </button>
        </div>
      </aside>
    </div>
  );
};

export default ApiDocs;
