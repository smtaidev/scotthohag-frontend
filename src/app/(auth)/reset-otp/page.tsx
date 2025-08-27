import OtpVerification from '@/feature/auth/Otp';
import React from 'react';

import { Metadata } from 'next';
import ResetOtp from '@/feature/auth/ResetOtp';

export const metadata: Metadata = {
    title: 'OTP',
}


const page = () => {
    return (
        <div>
            <ResetOtp/>
        </div>
    );
};

export default page;