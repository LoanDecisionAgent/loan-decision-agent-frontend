"use client";

import React, { useState, useEffect } from 'react';
import { getRequestLogs, ApiClientError } from '../lib/api';
import { handleError } from '../lib/error-handler';
import { RequestLog } from '../types';

export default function RequestLogs() {
  const [logs, setLogs] = useState<RequestLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [filter, setFilter] = useState({ vendorId: '' });

  useEffect(() => {
    loadLogs();
  }, [page, filter]);

  const loadLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getRequestLogs({
        limit,
        offset: (page - 1) * limit,
        vendorId: filter.vendorId || undefined,
      });
      setLogs(result.logs);
      setTotal(result.total);
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-emerald-600 dark:text-emerald-400';
    if (status >= 400 && status < 500) return 'text-yellow-600 dark:text-yellow-400';
    if (status >= 500) return 'text-red-600 dark:text-red-400';
    return 'text-slate-600 dark:text-slate-400';
  };

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'POST':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'PUT':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'DELETE':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatResponseTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
            Request Logs
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Monitor API requests and responses in real-time
          </p>
        </div>
        <button
          onClick={loadLogs}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-black rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:scale-105 transition-all disabled:opacity-50"
        >
          <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>refresh</span>
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-800/50">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Filter by Vendor ID
            </label>
            <input
              type="text"
              value={filter.vendorId}
              onChange={(e) => {
                setFilter({ ...filter, vendorId: e.target.value });
                setPage(1);
              }}
              placeholder="Enter vendor ID..."
              className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-red-600">error</span>
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Logs Table */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <span className="spinner w-8 h-8"></span>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">inbox</span>
            <p className="text-slate-500 dark:text-slate-400">No request logs found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Method</th>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Endpoint</th>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Response Time</th>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Vendor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 font-mono">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-black ${getMethodColor(log.method)}`}>
                          {log.method}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm font-mono text-slate-900 dark:text-white">
                        {log.endpoint}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-bold text-sm ${getStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                        {formatResponseTime(log.responseTime)}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                        {log.vendorName || log.vendorId || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {total > limit && (
              <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} logs
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page * limit >= total}
                    className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
