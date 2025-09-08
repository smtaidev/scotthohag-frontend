'use client';

import EditProfile from '@/components/userProfile/EditProfile';
import { useUpdateProfileMutation } from '@/redux/api/getMe/getMeApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProfileData {
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  address: string;
  profileImage?: File;
}

const EditProfilePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const [updateProfile] = useUpdateProfileMutation()

  const handleSave = async (data: ProfileData) => {
    setLoading(true);
    try {
      // Build only fields that are not null/undefined/empty
      const filteredData: Record<string, string> = {};
      if (data.fullName) {

        filteredData.name = data.fullName
      } else {
        setLoading(false)
        return toast.error("Name cannot be null.")
      }
      if (data.address) {

        filteredData.address = data.address;
      } else {
        setLoading(false)
        return toast.error("Location cannot be null.")
      }
      if (data.dateOfBirth) filteredData.dateOfBirth = data.dateOfBirth;

        if (data.phoneNumber) {

        filteredData.phone = data.phoneNumber;
      } else {
        setLoading(false)
        return toast.error("Phone cannot be null.")
      }

      

      if (data.gender) {

        filteredData.gender = data.gender
      } else {
        setLoading(false)
        return toast.error("Name cannot be null.")
      }

      const res = await updateProfile(filteredData);

      if (res.data) {
        toast.success("Profile Updated Successfully!");
        setLoading(false)
      }

    } catch (error) {
      toast.error("Profile Update Failed!");
      setLoading(false)
    }
    setLoading(false)
  };


  const handleCancel = () => {
    router.push('/health-report');
  };

  return (
    <EditProfile
      onSave={handleSave}
      onCancel={handleCancel}
      loading={loading}
    />
  );
};

export default EditProfilePage;
