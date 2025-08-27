'use client';

import EditProfile from '@/components/userProfile/EditProfile';
import { useUpdateProfileMutation } from '@/redux/api/getMe/getMeApi';
import { useRouter } from 'next/navigation';
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

    const [updateProfile]=useUpdateProfileMutation()

    const handleSave = async(data: ProfileData) => {
       try {
         const res = await updateProfile({
            name:data.fullName,
            address:data.address,
            dateOfBirth:data.dateOfBirth,
            phone:data.phoneNumber
         });
         if(res.data){
            toast.success("Profile Updated Successfully!")
         }
       } catch (error) {
        toast.error("Profile Update Fail!")
       }
    };

    const handleCancel = () => {
        router.push('/health-report');
    };

    return (
        <EditProfile 
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
};

export default EditProfilePage;
