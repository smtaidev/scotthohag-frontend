'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Profile from '@/components/userProfile/Profile';

const ProfileDemoPage: React.FC = () => {
  const router = useRouter();

  // Mock user data for incomplete profile
  const incompleteUserData = {
    userName: "Sarah Johnson",
    userEmail: "sarah.johnson@email.com",
    userAge: 30,
    profileImage: "/images/scott.png",
    phoneNumber: "", // Empty to simulate incomplete profile
    address: "" // Empty to simulate incomplete profile
  };

  // Mock user data for complete profile
  const completeUserData = {
    userName: "Sarah Johnson",
    userEmail: "sarah.johnson@email.com",
    userAge: 30,
    profileImage: "/images/scott.png",
    phoneNumber: "+1 (555) 000-0000", // Filled to simulate complete profile
    address: "123 Main Street, City, State 12345" // Filled to simulate complete profile
  };

  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  const handleCompleteProfile = () => {
    router.push('/edit-profile');
  };

  const toggleProfileState = () => {
    setIsProfileComplete(!isProfileComplete);
  };

  const currentUserData = isProfileComplete ? completeUserData : incompleteUserData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Controls */}
      <div className="max-w-10/12 mx-auto px-4 py-4">
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Profile Demo Controls</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleProfileState}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              Toggle Profile State
            </button>
            <span className="text-sm text-gray-600">
              Current State: {isProfileComplete ? 'Complete Profile' : 'Incomplete Profile'}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Click the button above to toggle between complete and incomplete profile states.
            When incomplete, you'll see the "Please Complete your Profile" button.
          </p>
        </div>
      </div>

      {/* Profile Component */}
      <Profile 
        userName={currentUserData.userName}
        userEmail={currentUserData.userEmail}
        userAge={currentUserData.userAge}
        profileImage={currentUserData.profileImage}
        phoneNumber={currentUserData.phoneNumber}
        address={currentUserData.address}
        onEditProfile={handleEditProfile}
        onCompleteProfile={handleCompleteProfile}
      />
    </div>
  );
};

export default ProfileDemoPage;
