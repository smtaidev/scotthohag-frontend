import ReportDetails from '@/components/userProfile/ReportDetails';

interface ReportDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const ReportDetailsPage: React.FC<ReportDetailsPageProps> = async ({ params }) => {
    const { id } = await params;
    
    return (
        <ReportDetails 
            reportId={id}
        />
    );
};

export default ReportDetailsPage;
