'use client';

import { useGetMeQuery } from '@/redux/api/getMe/getMeApi';
import React from 'react';
import { LuPencil } from 'react-icons/lu';

interface ProfileProps {
  userName?: string;
  userEmail?: string;
  userAge?: number;
  profileImage?: string;
  phoneNumber?: string;
  address?: string;
  onEditProfile?: () => void;
  onCompleteProfile?: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  userName = "Sarah Johnson",
  userEmail = "sarah.johnson@email.com",
  userAge = 30,
  profileImage = "/images/profile.png",
  phoneNumber = "",
  address = "",
  onEditProfile,
  onCompleteProfile
}) => {
  // Check if profile is complete
  const isProfileComplete = () => {
    return userName && userEmail && userAge && phoneNumber && address && 
           userName.trim() !== "" && userEmail.trim() !== "" && 
           phoneNumber.trim() !== "" && address.trim() !== "";
  };

  const {data:userInfo}=useGetMeQuery({});
  const user=userInfo?.data;


     const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const profileComplete = isProfileComplete();

  return (
    <div className="max-w-10/12 mx-auto px-0 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Welcome, {user?.name}
        </h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-30 h-30 rounded-full overflow-hidden border-4 border-gray-100">
                <img
                  src={user?.avatar}
                  alt={`${userName}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-black text-center md:text-left">
                  {user?.name}
                </h2>
                <p className="text-gray-600 text-sm md:text-base text-center md:text-left">
                  {user?.email}
                </p>

                <div className="text-center md:text-left space-y-2">
                  <button 
                    onClick={onEditProfile}
                    className="inline-flex items-center gap-2 mt-1 px-4 py-2 border border-primary text-black hover:text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm font-medium"
                  >
                    <LuPencil size={16} />
                    Edit Profile
                  </button>
                  
                  {/* Show "Please Complete your Profile" button only when profile is incomplete */}
                  {!profileComplete && (
                    <button 
                      onClick={onCompleteProfile}
                      className="inline-flex items-center ml-4 gap-2 px-4 py-2 bg-orange-100 text-orange-800 hover:bg-orange-200 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      Please Complete your Profile
                    </button>
                  )}
                </div>
              </div>
            </div>


          </div>
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="text-right">
              <p className="text-gray-600 text-base md:text-lg font-normal">
                Age:  {calculateAge(user?.dateOfBirth)}  years
              </p>
            </div>
          </div>


        </div>

      </div>
    </div>
  );
};

export default Profile;
