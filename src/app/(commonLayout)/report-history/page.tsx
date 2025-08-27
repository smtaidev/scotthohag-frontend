'use client';

import React from 'react';
import ReportHistory from '@/components/userProfile/ReportHistory';
import { useRouter } from 'next/navigation';

const ReportHistoryPage: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleViewReport = (reportId: string) => {
    // Handle viewing individual report
    console.log('Viewing report:', reportId);
    // You can navigate to a detailed report view here
    // router.push(`/report/${reportId}`);
  };

  return (
    <ReportHistory
      onBack={handleBack}
      onViewReport={handleViewReport}
    />
  );
};

export default ReportHistoryPage;
