
"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import JobDetails from '../../../../pages/JobDetails';

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params?.jobId as string;

  if (!jobId) return <div>Job not found</div>;

  return <JobDetails jobId={jobId} />;
}
