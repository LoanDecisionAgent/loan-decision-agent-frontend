"use client";

import React from 'react';
import JobDetails from '../../../../pages/JobDetails';

export default function JobDetailsClient({ jobId }: { jobId: string }) {
  if (!jobId) return <div>Job not found</div>;
  return <JobDetails jobId={jobId} />;
}
