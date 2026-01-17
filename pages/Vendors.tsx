"use client";

import React, { useState, useEffect } from 'react';
import { getVendors, createVendor, updateVendor, deleteVendor, ApiClientError } from '../lib/api';
import { handleError } from '../lib/error-handler';
import { Vendor } from '../types';

export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState({ name: '', status: 'Active' as Vendor['status'] });

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const vendorList = await getVendors();
      setVendors(vendorList);
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingVendor(null);
    setFormData({ name: '', status: 'Active' });
    setShowModal(true);
  };

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setFormData({ name: vendor.name, status: vendor.status });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (editingVendor) {
        await updateVendor(editingVendor.id, formData);
      } else {
        await createVendor(formData);
      }
      setShowModal(false);
      await loadVendors();
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vendor?')) return;

    try {
      await deleteVendor(id);
      await loadVendors();
    } catch (err) {
      const errorInfo = handleError(err);
      setError(errorInfo.userMessage);
    }
  };

  const getStatusColor = (status: Vendor['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Warning':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Pending':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Suspended':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
            Vendor Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage partner vendors and their access
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:scale-105 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          Add Vendor
        </button>
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

      {/* Vendors Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <span className="spinner w-8 h-8"></span>
        </div>
      ) : vendors.length === 0 ? (
        <div className="text-center py-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">group</span>
          <p className="text-slate-500 dark:text-slate-400 mb-4">No vendors found</p>
          <button
            onClick={handleCreate}
            className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline"
          >
            Add your first vendor
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-800/50 hover-lift animate-fade-in"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-lg">
                    {vendor.logoInitials}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white">{vendor.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">ID: {vendor.id.slice(0, 8)}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-bold border ${getStatusColor(vendor.status)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    vendor.status === 'Active' ? 'bg-emerald-500' :
                    vendor.status === 'Warning' ? 'bg-yellow-500' :
                    vendor.status === 'Pending' ? 'bg-blue-500' :
                    'bg-red-500'
                  }`}></span>
                  {vendor.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Tokens Issued</span>
                  <span className="font-bold text-slate-900 dark:text-white">{vendor.tokensIssued.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Last Activity</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatDate(vendor.lastActivity)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => handleEdit(vendor)}
                  className="flex-1 px-4 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-xl transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vendor.id)}
                  className="flex-1 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
              {editingVendor ? 'Edit Vendor' : 'Add Vendor'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Vendor Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Vendor['status'] })}
                  className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Warning">Warning</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
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
                  {editingVendor ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
