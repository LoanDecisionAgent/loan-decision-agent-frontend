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

const AdminDashboard: React.FC = () => {
  const { user } = useUser();
  const [stats, setStats] = useState({
    totalVendors: 0,
    activeVendors: 0,
    totalRequests: 0,
    systemHealth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading stats
    const timer = setTimeout(() => {
      setStats({
        totalVendors: 47,
        activeVendors: 42,
        totalRequests: 125847,
        systemHealth: 99.8,
      });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const systemAlerts = [
    { id: 1, type: 'info', message: 'System update scheduled for tonight', time: '2 hours ago' },
    { id: 2, type: 'success', message: 'Backup completed successfully', time: '4 hours ago' },
    { id: 3, type: 'warning', message: 'High API request volume detected', time: '6 hours ago' },
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
            Admin Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            System overview and management for {user?.organization || 'your organization'}.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/vendors"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <span className="material-symbols-outlined">group</span>
            Manage Vendors
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Vendors"
          value={stats.totalVendors}
          change="+3 this month"
          icon="group"
          color="bg-gradient-to-br from-indigo-600 to-indigo-700"
        />
        <StatCard
          title="Active Vendors"
          value={stats.activeVendors}
          icon="check_circle"
          color="bg-gradient-to-br from-green-600 to-green-700"
        />
        <StatCard
          title="Total Requests"
          value={stats.totalRequests.toLocaleString()}
          change="+15%"
          icon="assessment"
          color="bg-gradient-to-br from-purple-600 to-purple-700"
        />
        <StatCard
          title="System Health"
          value={`${stats.systemHealth}%`}
          icon="monitor_heart"
          color="bg-gradient-to-br from-blue-600 to-blue-700"
        />
      </div>

      {/* Management Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-800/50 animate-slide-in-left">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">settings</span>
            Quick Management
          </h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/vendors"
              className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-colors group"
            >
              <span className="material-symbols-outlined text-indigo-600 group-hover:scale-110 transition-transform">
                group
              </span>
              <span className="font-bold text-slate-900 dark:text-white">Vendor Management</span>
              <span className="ml-auto material-symbols-outlined text-slate-400 group-hover:text-indigo-600">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/dashboard/api-keys"
              className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-colors group"
            >
              <span className="material-symbols-outlined text-indigo-600 group-hover:scale-110 transition-transform">
                vpn_key
              </span>
              <span className="font-bold text-slate-900 dark:text-white">API Keys</span>
              <span className="ml-auto material-symbols-outlined text-slate-400 group-hover:text-indigo-600">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/dashboard/audit-logs"
              className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-colors group"
            >
              <span className="material-symbols-outlined text-indigo-600 group-hover:scale-110 transition-transform">
                history
              </span>
              <span className="font-bold text-slate-900 dark:text-white">Audit Logs</span>
              <span className="ml-auto material-symbols-outlined text-slate-400 group-hover:text-indigo-600">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-800/50 animate-slide-in-right">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-600">notifications</span>
            System Alerts
          </h2>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start gap-3 p-3 rounded-xl ${
                  alert.type === 'success'
                    ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50'
                    : alert.type === 'warning'
                    ? 'bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/50'
                    : 'bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    alert.type === 'success'
                      ? 'text-green-600 dark:text-green-400'
                      : alert.type === 'warning'
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-blue-600 dark:text-blue-400'
                  }`}
                >
                  {alert.type === 'success'
                    ? 'check_circle'
                    : alert.type === 'warning'
                    ? 'warning'
                    : 'info'}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{alert.message}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
