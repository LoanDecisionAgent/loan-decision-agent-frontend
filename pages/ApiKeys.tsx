"use client";

import React, { useState, useEffect } from 'react';
import { getApiKeys, createApiKey, revokeApiKey, deleteApiKey, ApiClientError } from '../lib/api';
import { handleError } from '../lib/error-handler';
import { ApiKey } from '../types';
import LoadingState from '../components/LoadingState';
import PageTransition from '../components/PageTransition';

export default function ApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', permissions: ['read', 'write'] });
  const [newKey, setNewKey] = useState<string | null>(null);

  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    setLoading(true);
    setError(null);
    try {
      const keyList = await getApiKeys();
      setKeys(keyList);
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setFormData({ name: '', permissions: ['read', 'write'] });
    setNewKey(null);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const result = await createApiKey(formData.name, formData.permissions);
      setNewKey(result.key);
      setSuccess('API key created successfully! Make sure to copy it now - you won\'t be able to see it again.');
      await loadKeys();
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    }
  };

  const handleRevoke = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this API key?')) return;

    try {
      await revokeApiKey(id);
      setSuccess('API key revoked successfully');
      await loadKeys();
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) return;

    try {
      await deleteApiKey(id);
      setSuccess('API key deleted successfully');
      await loadKeys();
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <PageTransition className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
            API Keys
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage API keys for authentication
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:scale-105 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          Create API Key
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-red-600">error</span>
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-green-600">check_circle</span>
            <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
          </div>
        </div>
      )}

      {/* Keys List */}
      {loading ? (
        <LoadingState message="Loading API keys..." />
      ) : (Array.isArray(keys) ? keys : []).length === 0 ? (
        <div className="text-center py-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">vpn_key</span>
          <p className="text-slate-500 dark:text-slate-400 mb-4">No API keys found</p>
          <button
            onClick={handleCreate}
            className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline"
          >
            Create your first API key
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {(Array.isArray(keys) ? keys : []).map((key) => (
            <div
              key={key.id}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-800/50 hover-lift animate-fade-in"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-black text-slate-900 dark:text-white text-lg">{key.name}</h3>
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${key.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                      {key.status?.toUpperCase() || 'UNKNOWN'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span>Created: {formatDate(key.createdAt)}</span>
                    {key.lastUsed && <span>Last used: {formatDate(key.lastUsed)}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  {key.status === 'active' && (
                    <button
                      onClick={() => handleRevoke(key.id)}
                      className="px-4 py-2 text-sm font-bold text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950/20 rounded-xl transition-colors"
                    >
                      Revoke
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(key.id)}
                    className="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  API Key
                </label>
                <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <code className="flex-1 font-mono text-sm text-slate-900 dark:text-white break-all">
                    {key.key}
                  </code>
                  <button
                    onClick={() => copyToClipboard(key.key)}
                    className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                    title="Copy to clipboard"
                  >
                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                  </button>
                </div>
              </div>

              {(Array.isArray(key.permissions) ? key.permissions : []).length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                    Permissions
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(key.permissions) ? key.permissions : []).map((perm) => (
                      <span
                        key={perm}
                        className="px-2 py-1 rounded-lg text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
              Create API Key
            </h2>
            {newKey ? (
              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                  <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                    Your API key has been created. Make sure to copy it now - you won't be able to see it again!
                  </p>
                  <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-xl">
                    <code className="flex-1 font-mono text-sm text-slate-900 dark:text-white break-all">
                      {newKey}
                    </code>
                    <button
                      onClick={() => copyToClipboard(newKey)}
                      className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">content_copy</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setNewKey(null);
                    setSuccess(null);
                  }}
                  className="w-full h-12 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g., Production Key, Test Key"
                    className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Permissions
                  </label>
                  <div className="space-y-2">
                    {['read', 'write', 'admin'].map((perm) => (
                      <label key={perm} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(perm)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, permissions: [...formData.permissions, perm] });
                            } else {
                              setFormData({ ...formData, permissions: formData.permissions.filter(p => p !== perm) });
                            }
                          }}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="font-bold text-slate-900 dark:text-white capitalize">{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 h-12 px-6 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-12 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 transition-all"
                  >
                    Create Key
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </PageTransition>
  );
}
