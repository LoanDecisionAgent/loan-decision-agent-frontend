
import React from 'react';

const Feedback: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col items-center py-12 px-6 lg:px-40 w-full max-w-[1200px] mx-auto">
      <div className="w-full max-w-[640px] flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-black leading-tight">Submit Feedback</h1>
          <p className="text-slate-500 text-base leading-relaxed">
            Submit a loan outcome for model retraining via <code className="bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded text-sm font-mono text-indigo-600 font-bold">POST /feedback</code>.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-indigo-100/50 dark:shadow-none">
          <form className="p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-slate-900 dark:text-white text-sm font-bold">Application ID</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 group-focus-within:text-indigo-600 transition-colors">badge</span>
                </div>
                <input 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-white h-12 pl-12 pr-4 text-base placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all outline-none" 
                  placeholder="e.g. APP-2023-XXXX" 
                  type="text" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-slate-900 dark:text-white text-sm font-bold">Outcome Label</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 group-focus-within:text-indigo-600 transition-colors">fact_check</span>
                </div>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-white h-12 pl-12 pr-10 text-base focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all appearance-none cursor-pointer outline-none">
                  <option disabled selected value="">Select outcome...</option>
                  <option value="repaid">Repaid in Full</option>
                  <option value="default">Defaulted</option>
                  <option value="partially_recovered">Partially Recovered</option>
                  <option value="written_off">Written Off</option>
                </select>
                <div className="absolute right-3 inset-y-0 flex items-center pointer-events-none text-slate-400">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-slate-900 dark:text-white text-sm font-bold">Outcome Date</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 group-focus-within:text-indigo-600 transition-colors">calendar_today</span>
                </div>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-white h-12 pl-12 pr-4 text-base focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all outline-none" type="date" />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-slate-900 dark:text-white text-sm font-bold">Optional Notes</label>
              <div className="relative group">
                <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 group-focus-within:text-indigo-600 transition-colors">description</span>
                </div>
                <textarea 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-white min-h-[120px] pl-12 pr-4 py-3.5 text-base placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all resize-y outline-none" 
                  placeholder="Add any relevant details about this loan outcome..."
                ></textarea>
              </div>
            </div>

            <div className="pt-2">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all" type="button">
                Submit Feedback
              </button>
            </div>
          </form>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800 flex items-start gap-4">
          <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 mt-0.5">wifi_tethering</span>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-black text-emerald-900 dark:text-emerald-100 uppercase tracking-widest">Feedback Service Online</p>
            <p className="text-sm text-emerald-800/80 dark:text-emerald-400/80">
              Ready to process POST requests. Responses will return a static 201 confirmation.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Feedback;
