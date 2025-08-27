'use client';

import React, { useState } from 'react';
import SubmitReport from '@/components/userProfile/SubmitReport';
import ReportHistory from '@/components/userProfile/ReportHistory';

const DemoReportPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'submit' | 'history'>('submit');

  const handleReportSubmit = (data: any) => {
    console.log('Report submitted:', data);
    // You can handle the report submission here
    alert('Report submitted successfully!');
  };

  const handleViewHistory = () => {
    setCurrentView('history');
  };

  const handleBack = () => {
    setCurrentView('submit');
  };

  const handleViewReport = (reportId: string) => {
    console.log('Viewing report:', reportId);
    // You can handle viewing individual reports here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'submit' ? (
        <SubmitReport
          onReportSubmit={handleReportSubmit}
          onViewHistory={handleViewHistory}
        />
      ) : (
        <ReportHistory
          onBack={handleBack}
          onViewReport={handleViewReport}
        />
      )}
    </div>
  );
};

export default DemoReportPage;
