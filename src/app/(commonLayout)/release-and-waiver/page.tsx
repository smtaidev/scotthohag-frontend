'use client';

import ReleaseAndWaiver from '@/components/legal/ReleaseAndWaiver';
import { useRouter } from 'next/navigation';

const ReleaseAndWaiverPage = () => {
    const router = useRouter();

    const handleAgree = () => {
        alert('Thank you for agreeing to the terms. You will be redirected to the main page.');
        router.push('/health-report');
    };

    return (
        <ReleaseAndWaiver 
            onAgree={handleAgree}
        />
    );
};

export default ReleaseAndWaiverPage;
