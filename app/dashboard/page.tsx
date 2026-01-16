
"use client";

import React from 'react';
import { useUser } from '../../lib/user-context';
import { UserRole } from '../../types';
import VendorDashboard from '../../components/VendorDashboard';
import AdminDashboard from '../../components/AdminDashboard';

export default function DashboardPage() {
  const { user } = useUser();

  if (!user) return null;

  return user.role === UserRole.ADMIN ? <AdminDashboard /> : <VendorDashboard />;
}
