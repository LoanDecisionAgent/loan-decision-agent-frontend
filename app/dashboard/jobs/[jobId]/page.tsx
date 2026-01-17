import React from 'react';
import JobDetailsClient from './JobDetailsClient';

// Required for static export with dynamic routes
export function generateStaticParams() {
  // Return empty array for static export - routes will be handled client-side
  return Promise.resolve([]);
}

export default function JobDetailsPage({ params }: { params: Promise<{ jobId: string }> | { jobId: string } }) {
  const jobId = params instanceof Promise ? '' : params.jobId;
  return <JobDetailsClient jobId={jobId} />;
}
