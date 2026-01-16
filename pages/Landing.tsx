
import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <nav className="w-full border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-900 rounded-lg text-white">
              <span className="material-symbols-outlined text-[20px]">dataset</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">LoanDecisionAgent</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/docs" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Docs</Link>
            <Link to="/login" className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2 px-4 rounded-md transition-all">
              Log In
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col justify-center py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-20">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
              API-first loan scoring engine
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              A minimal decision engine for fintech developers. Automate approvals, batch process applicant data, and maintain audit-ready logs without the enterprise bloat.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-12 px-8 rounded-md transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20">
                <span>Get Started</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
              <Link to="/docs" className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold h-12 px-8 rounded-md transition-colors flex items-center">
                View Documentation
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-12 border-t border-slate-100 dark:border-slate-800 pt-16">
            {[
              { title: 'Real-time Decisions', icon: 'bolt', desc: 'Generate scores in <100ms. Designed for synchronous user flows and instant feedback.' },
              { title: 'Batch CSV Upload', icon: 'folder_zip', desc: 'Drop in large datasets for retrospective analysis. Process thousands of records asynchronously.' },
              { title: 'Explainability (SHAP)', icon: 'psychology', desc: 'Transparent scoring logic. Every decision comes with feature importance values for compliance.' },
              { title: 'Immutable Audit Logs', icon: 'history', desc: 'Full history of every API call and scoring event. Exportable for regulatory review.' },
            ].map(f => (
              <div key={f.title} className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
                  <span className="material-symbols-outlined text-indigo-600">{f.icon}</span>
                  {f.title}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-10 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            © 2025 LoanDecisionAgent. All rights reserved.
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms</Link>
            <Link to="/support" className="hover:text-indigo-600 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
