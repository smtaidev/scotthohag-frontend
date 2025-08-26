'use client';

import EditProfile from '@/components/userProfile/EditProfile';
import { useRouter } from 'next/navigation';

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

    const handleSave = (data: ProfileData) => {
        console.log('Profile data to save:', data);
        // Here you would typically make an API call to save the data
        alert('Profile updated successfully!');
        router.push('/health-report');
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
