'use client';

import { useGetMeQuery, useGetSignedUrlQuery, useUpdateProfileMutation } from '@/redux/api/getMe/getMeApi';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { LuArrowLeft, LuCamera, LuLock } from 'react-icons/lu';
import { toast } from 'sonner';

interface EditProfileProps {
    onBack?: () => void;
    onSave?: (data: ProfileData) => void;
    onCancel?: () => void;
}

interface ProfileData {
    fullName: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    phoneNumber: string;
    address: string;
    profileImage?: File;
}

const EditProfile: React.FC<EditProfileProps> = ({
    onBack,
    onSave,
    onCancel
}) => {

    const { data: user } = useGetMeQuery({});
    console.log(user)

    const [update, { isLoading }] = useUpdateProfileMutation()

    const [formData, setFormData] = useState<ProfileData>({
        fullName: user?.data.name,
        email: user?.data.email,
        dateOfBirth: user?.data.dateOfBirth,
        gender: user?.data.gender,
        phoneNumber: user?.data.phone,
        address: user?.data.address
    });

    console.log("My form data is here", formData)
    const [profileImage, setProfileImage] = useState<string>('/images/profile.png'); // Default profile image
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);


    const handleInputChange = (field: keyof ProfileData, value: string) => {

        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = e.target.files?.[0]; // Get the first selected file
        if (file) {
            setSelectedFile(file);
            // Get mime type (e.g., "image/png")

        }
    };

    const fileType = selectedFile?.name.split('.').pop();
    const mimeType = selectedFile?.type;

    // Use the RTK Query hook to get the signed URL
    const { data: getRes } = useGetSignedUrlQuery({
        fileType: fileType || '',
        mimeType: mimeType || '',
    });

    const signedUrl = getRes?.data.signedUrl;
    console.log(signedUrl)
    console.log(selectedFile)


    useEffect(() => {
        if (signedUrl && selectedFile) {

            try {
                // Upload the file to S3 using the signed URL
                const uploadResponse: any = fetch(signedUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': mimeType || 'application/octet-stream',
                    },
                    body: selectedFile,
                });
                const publicUrl = signedUrl.split('?')[0];
                update({
                    avatar: publicUrl
                })


                if (uploadResponse.ok) {
                    console.log('File uploaded successfully!');
                } else {
                    console.error('File upload failed');
                }
            } catch (error) {
                console.error('Upload error:', error);
            }

        }
    }, [signedUrl])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file:any = event.target.files?.[0];
        if( file.fileType !=="image"){
            return toast.error("Only image can be uploaded!");

        }
        if (file) {
            setSelectedFile(file);
            console.log("My selected file", selectedFile)
            // Get mime type (e.g., "image/png")

        }
        // if (file) {
        //     // Check file size (5MB limit)
        //     if (file.size > 5 * 1024 * 1024) {
        //         alert('File size must be less than 5MB');
        //         return;
        //     }

        //     // Create preview URL
        //     const reader = new FileReader();
        //     reader.onload = (e) => {
        //         setProfileImage(e.target?.result as string);
        //     };
        //     reader.readAsDataURL(file);

        //     setFormData(prev => ({
        //         ...prev,
        //         profileImage: file
        //     }));
        // }
    };

    const handleSave = () => {
        const dob = new Date(formData?.dateOfBirth);
        const today = new Date();

        // 1. Check if DOB is in the future
        if (dob > today) {
            return toast.error("Date of birth cannot be in the future");
        }
        onSave?.(formData);
    };

    const handleCancel = () => {
        onCancel?.();
    };
    useEffect(() => {
        setFormData({
            fullName: user?.data.name,
            email: user?.data.email,
            dateOfBirth: user?.data.dateOfBirth,
            gender: user?.data.gender,
            phoneNumber: user?.data.phone,
            address: user?.data.address
        })
    }, [user?.data])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Bar */}


            {/* Main Content */}
            <div className="max-w-10/12 mx-auto px-0 py-8 sm:px-6 lg:px-8">
                <h1 className="text-[32px] text-black font-bold absolute left-1/2 transform -translate-x-1/2">
                    Edit Profile
                </h1>
                <div className=" rounded-xl ">
                    {/* Profile Picture Section */}
                    <div className="px-6 py-8 text-center">
                        <div className="relative inline-block">
                            {/* Profile Picture */}
                            <div className="relative w-32 h-32 mx-auto mb-4 mt-10">
                                <img
                                    src={user?.data.avatar}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                                />
                                {/* Camera Icon Overlay */}
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors duration-200 shadow-lg"
                                >
                                    <LuCamera size={20} />
                                </button>
                            </div>

                            {/* Hidden File Input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        {/* Change Photo Text */}
                        <div className="space-y-1">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="text-primary text-lg font-medium hover:text-primary/80 transition-colors duration-200"
                            >
                                Change Photo
                            </button>
                            <p className="text-base text-primary-text font-normal mt-2">
                                Upload a new photo (max 5MB)
                            </p>
                        </div>
                    </div>

                    {/* Profile Details Form */}
                    <div className="py-6">
                        <form className="space-y-6 bg-white rounded-xl p-6">

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    placeholder='Enter your full name'
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    className="w-full px-4 py-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-[#F7F7F7]"
                                />
                            </div>

                            {/* Email Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={formData.email}
                                        placeholder='e.g., sarah.johnson@email.com'
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full px-4 py-3 pr-12  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-[#F7F7F7]"
                                        disabled
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <LuLock size={20} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-6">


                                    {/* Date of Birth */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date of Birth
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                placeholder=' 1997 / 08 / 28'
                                                onChange={(e) => {
                                                    const isoDate = new Date(e.target.value).toISOString();
                                                    handleInputChange("dateOfBirth", isoDate);
                                                }}
                                                className="w-full px-4 py-3 pr-12  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-[#F7F7F7]"
                                                value={
                                                    formData.dateOfBirth && !isNaN(new Date(formData.dateOfBirth).getTime())
                                                        ? new Date(formData.dateOfBirth).toISOString().split("T")[0]
                                                        : ""
                                                }
                                            />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden">
                                                <LuLock size={20} className="text-gray-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Gender */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Gender
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={formData.gender?.toLowerCase()}
                                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                                className="w-full px-4 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-[#F7F7F7] appearance-none"

                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                <LuLock size={20} className="text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Phone Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number (Optional)
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phoneNumber}
                                            placeholder='+1 (555) 000-0000'
                                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-[#F7F7F7]"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Address
                                        </label>
                                        <textarea
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            placeholder="Type your Address"
                                            rows={1}
                                            className="w-full px-4 py-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-[#F7F7F7] resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-3 max-w-md">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className=" px-6 py-3 border cursor-pointer border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-[#F7F7F7] transition-colors duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="px-6 py-3 bg-primary cursor-pointer text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium "
                                >
                                    {isLoading ? "Loading.." : " Save Change"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
