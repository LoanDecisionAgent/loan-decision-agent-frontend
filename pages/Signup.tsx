
"use client";

import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole } from '../types';

interface SignupProps {
  onSignup: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const strengthInfo = useMemo(() => {
    if (!password) return { score: 0, text: 'Empty', color: 'bg-slate-200' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const map = [
      { text: 'Critical', color: 'bg-red-500' },
      { text: 'Weak', color: 'bg-orange-500' },
      { text: 'Average', color: 'bg-yellow-500' },
      { text: 'Good', color: 'bg-blue-500' },
      { text: 'Secure', color: 'bg-emerald-500' },
    ];
    return { score, ...map[score] };
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
  };

  const handleVerifyComplete = () => {
    onSignup();
    navigate('/dashboard');
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-12 text-center animate-in fade-in zoom-in duration-500">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600">
            <span className="material-symbols-outlined text-[56px] animate-pulse">forward_to_inbox</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Check your email</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-12 leading-relaxed">
            We've sent a secure verification link to <span className="font-black text-indigo-600 underline">{email}</span>. Click it to proceed.
          </p>
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleVerifyComplete}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-indigo-600/30 active:scale-[0.98]"
            >
              Verify Now (Test Mode)
            </button>
            <button 
              onClick={() => setIsVerifying(false)}
              className="w-full py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
            >
              Back to registration
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-12">
          <header className="mb-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/30">
              <span className="material-symbols-outlined text-[36px]">dataset</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Create partner account</h1>
            <p className="mt-3 text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">Join the network to start processing loan applications via API.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Organization Email</label>
              <input 
                className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-6 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none"
                type="email" placeholder="dev-leads@fintech.co" required
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Secret (Password)</label>
              <input 
                className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-6 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none"
                type="password" placeholder="••••••••" required
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <div className="pt-2">
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-1 p-0.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step}
                      className={`h-full flex-1 rounded-full transition-all duration-700 ${
                        strengthInfo.score >= step ? strengthInfo.color : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-3 px-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Grade</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${strengthInfo.score > 0 ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {strengthInfo.text}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
              <input type="checkbox" className="mt-1 size-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500" required />
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                I agree to the <Link to="/terms" className="text-indigo-600 font-black">Terms of Service</Link> and understand that all scoring activity is recorded for audit purposes.
              </p>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-16 rounded-2xl font-black text-lg shadow-2xl shadow-indigo-600/30 transition-all active:scale-[0.98]">
              Begin Registration
            </button>
          </form>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/30 p-10 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Already registered? <Link to="/login" className="font-black text-indigo-600 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
