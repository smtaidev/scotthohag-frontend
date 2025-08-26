'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import SubmitReport from '@/components/userProfile/SubmitReport';
import Profile from '@/components/userProfile/Profile';

const HealthReportPage: React.FC = () => {
  const router = useRouter();

  // Mock user data - in a real app, this would come from your state management or API
  const userData = {
    userName: "Sarah Johnson",
    userEmail: "sarah.johnson@email.com",
    userAge: 30,
    profileImage: "/images/scott.png",
    phoneNumber: "", // Empty to simulate incomplete profile
    address: "" // Empty to simulate incomplete profile
  };

  const handleReportSubmit = (data: any) => {
    console.log('Report submitted:', data);
    // Handle report submission logic here
  };

  const handleViewHistory = () => {
    console.log('View history clicked');
    // Handle view history logic here
  };

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  const handleCompleteProfile = () => {
    router.push('/edit-profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Profile 
        userName={userData.userName}
        userEmail={userData.userEmail}
        userAge={userData.userAge}
        profileImage={userData.profileImage}
        phoneNumber={userData.phoneNumber}
        address={userData.address}
        onEditProfile={handleEditProfile}
        onCompleteProfile={handleCompleteProfile}
      />
      <SubmitReport 
        onReportSubmit={handleReportSubmit}
        onViewHistory={handleViewHistory}
      />
    </div>
  );
};

export default HealthReportPage;
