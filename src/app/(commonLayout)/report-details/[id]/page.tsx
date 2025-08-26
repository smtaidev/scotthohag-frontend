import ReportDetails from '@/components/userProfile/ReportDetails';

interface ReportDetailsPageProps {
    params: {
        id: string;
    };
}

const ReportDetailsPage: React.FC<ReportDetailsPageProps> = ({ params }) => {
    return (
        <ReportDetails 
            reportId={params.id}
        />
    );
};

export default ReportDetailsPage;
