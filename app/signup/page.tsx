"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '../../lib/user-context';
import { UserRole } from '../../types';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    role: 'VENDOR' as UserRole,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call - in production, this would call your backend
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Auto-login after signup
      login(formData.role);
      router.push('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950 flex items-center justify-center p-4">
      <main className="w-full max-w-[480px] flex flex-col items-center animate-fade-in">
        <div className="mb-8 flex flex-col items-center gap-3 animate-slide-in-right">
          <Link href="/" className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-600/30 mb-2 hover-lift">
            <span className="material-symbols-outlined text-[40px]">account_balance</span>
          </Link>
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Join LoanDecision
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Create your account to get started
          </p>
        </div>

        <div className="w-full rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden animate-scale-in">
          <div className="p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-400">
                    person
                  </span>
                  <input
                    className={`w-full h-14 rounded-2xl border pl-12 pr-4 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none ${
                      errors.name
                        ? 'border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-800'
                        : 'border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700'
                    }`}
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-600 dark:text-red-400 animate-fade-in">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-400">
                    mail
                  </span>
                  <input
                    className={`w-full h-14 rounded-2xl border pl-12 pr-4 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none ${
                      errors.email
                        ? 'border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-800'
                        : 'border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700'
                    }`}
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600 dark:text-red-400 animate-fade-in">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-400">
                      lock
                    </span>
                    <input
                      className={`w-full h-14 rounded-2xl border pl-12 pr-12 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none ${
                        errors.password
                          ? 'border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-800'
                          : 'border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700'
                      }`}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-600 dark:text-red-400 animate-fade-in">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                    Confirm
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-400">
                      lock
                    </span>
                    <input
                      className={`w-full h-14 rounded-2xl border pl-12 pr-12 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none ${
                        errors.confirmPassword
                          ? 'border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-800'
                          : 'border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700'
                      }`}
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showConfirmPassword ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-600 dark:text-red-400 animate-fade-in">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                  Organization
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-400">
                    business
                  </span>
                  <input
                    className={`w-full h-14 rounded-2xl border pl-12 pr-4 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none ${
                      errors.organization
                        ? 'border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-800'
                        : 'border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700'
                    }`}
                    type="text"
                    name="organization"
                    placeholder="Your Organization"
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </div>
                {errors.organization && (
                  <p className="text-xs text-red-600 dark:text-red-400 animate-fade-in">
                    {errors.organization}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                  Account Type
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-400">
                    badge
                  </span>
                  <select
                    className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none appearance-none cursor-pointer"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value={UserRole.VENDOR}>Vendor / Partner</option>
                    <option value={UserRole.ADMIN}>Administrator</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-400 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-fade-in">
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="spinner w-5 h-5 border-2"></span>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>

          <div className="bg-slate-50/50 dark:bg-slate-800/30 px-10 py-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Already have an account?{' '}
              <Link href="/login" className="font-black text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
