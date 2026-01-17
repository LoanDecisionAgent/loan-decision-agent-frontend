"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '../lib/user-context';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => (
  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-800/50 hover-lift animate-fade-in">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} shadow-lg`}>
        <span className="material-symbols-outlined text-white text-[24px]">{icon}</span>
      </div>
      {change && (
        <span className="text-xs font-black text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-lg">
          {change}
        </span>
      )}
    </div>
    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">{value}</h3>
    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{title}</p>
  </div>
);

const VendorDashboard: React.FC = () => {
  const { user } = useUser();
  const [stats, setStats] = useState({
    totalRequests: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading stats
    const timer = setTimeout(() => {
      setStats({
        totalRequests: 1247,
        approved: 892,
        rejected: 298,
        pending: 57,
      });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const recentActivity = [
    { id: 1, type: 'Approved', amount: 15000, time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'Pending', amount: 25000, time: '15 minutes ago', status: 'warning' },
    { id: 3, type: 'Rejected', amount: 5000, time: '1 hour ago', status: 'error' },
    { id: 4, type: 'Approved', amount: 30000, time: '2 hours ago', status: 'success' },
  ];

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="spinner w-12 h-12"></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
            Welcome back, {user?.name || 'Partner'}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Here's what's happening with your loan applications today.
          </p>
        </div>
        <Link
          href="/score"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:scale-105 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          New Application
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Requests"
          value={stats.totalRequests.toLocaleString()}
          change="+12%"
          icon="assessment"
          color="bg-gradient-to-br from-indigo-600 to-indigo-700"
        />
        <StatCard
          title="Approved"
          value={stats.approved.toLocaleString()}
          change="+8%"
          icon="check_circle"
          color="bg-gradient-to-br from-green-600 to-green-700"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected.toLocaleString()}
          icon="cancel"
          color="bg-gradient-to-br from-red-600 to-red-700"
        />
        <StatCard
          title="Pending Review"
          value={stats.pending.toLocaleString()}
          icon="schedule"
          color="bg-gradient-to-br from-yellow-600 to-yellow-700"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-800/50 animate-slide-in-left">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">flash_on</span>
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/score"
              className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-colors group"
            >
              <span className="material-symbols-outlined text-indigo-600 group-hover:scale-110 transition-transform">
                calculate
              </span>
              <span className="font-bold text-slate-900 dark:text-white">Score New Application</span>
              <span className="ml-auto material-symbols-outlined text-slate-400 group-hover:text-indigo-600">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/dashboard/batch-upload"
              className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-colors group"
            >
              <span className="material-symbols-outlined text-indigo-600 group-hover:scale-110 transition-transform">
                upload_file
              </span>
              <span className="font-bold text-slate-900 dark:text-white">Batch Upload</span>
              <span className="ml-auto material-symbols-outlined text-slate-400 group-hover:text-indigo-600">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/dashboard/request-logs"
              className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-colors group"
            >
              <span className="material-symbols-outlined text-indigo-600 group-hover:scale-110 transition-transform">
                history
              </span>
              <span className="font-bold text-slate-900 dark:text-white">View Request Logs</span>
              <span className="ml-auto material-symbols-outlined text-slate-400 group-hover:text-indigo-600">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-800/50 animate-slide-in-right">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-600">schedule</span>
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
              >
                <div
                  className={`p-2 rounded-lg ${
                    activity.status === 'success'
                      ? 'bg-green-100 dark:bg-green-950/30'
                      : activity.status === 'warning'
                      ? 'bg-yellow-100 dark:bg-yellow-950/30'
                      : 'bg-red-100 dark:bg-red-950/30'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      activity.status === 'success'
                        ? 'text-green-600 dark:text-green-400'
                        : activity.status === 'warning'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {activity.status === 'success'
                      ? 'check_circle'
                      : activity.status === 'warning'
                      ? 'schedule'
                      : 'cancel'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{activity.type}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ${activity.amount.toLocaleString()} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
