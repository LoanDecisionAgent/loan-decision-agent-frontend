"use client";

import React, { useState, useEffect } from 'react';
import { getAuditLogs, ApiClientError } from '../lib/api';
import { handleError } from '../lib/error-handler';
import { AuditLog } from '../types';
import LoadingState from '../components/LoadingState';
import PageTransition from '../components/PageTransition';

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [filter, setFilter] = useState({ actor: '' });

  useEffect(() => {
    loadLogs();
  }, [page, filter]);

  const loadLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAuditLogs({
        limit,
        offset: (page - 1) * limit,
        actor: filter.actor || undefined,
      });
      setLogs(result.logs || []);
      setTotal(result.total || 0);
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatPayload = (payload: any) => {
    try {
      return JSON.stringify(payload, null, 2);
    } catch {
      return String(payload);
    }
  };

  return (
    <PageTransition className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
            Audit Logs
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            System activity and change tracking
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
              Filter by Actor
            </label>
            <input
              type="text"
              value={filter.actor}
              onChange={(e) => {
                setFilter({ ...filter, actor: e.target.value });
                setPage(1);
              }}
              placeholder="Enter actor name or ID..."
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
          <LoadingState message="Loading audit logs..." />
        ) : (Array.isArray(logs) ? logs : []).length === 0 ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">inbox</span>
            <p className="text-slate-500 dark:text-slate-400">No audit logs found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Actor</th>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Application ID</th>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Action</th>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {(Array.isArray(logs) ? logs : []).map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 font-mono">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-900 dark:text-white">{log.actor}</span>
                      </td>
                      <td className="py-4 px-6 text-sm font-mono text-slate-600 dark:text-slate-400">
                        {log.appId || 'N/A'}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 rounded-lg text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400">
                          {log.payload?.action || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <details className="cursor-pointer">
                          <summary className="text-sm text-indigo-600 hover:text-indigo-700 font-bold">
                            View Details
                          </summary>
                          <pre className="mt-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-400 overflow-x-auto">
                            {formatPayload(log.payload)}
                          </pre>
                        </details>
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
    </PageTransition>
  );
}
