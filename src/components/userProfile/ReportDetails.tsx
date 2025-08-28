'use client';

import { useReportDetailsQuery } from '@/redux/api/reports/reportSlice';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { LuArrowLeft, LuClock, LuCalendar, LuDownload } from 'react-icons/lu';

interface ReportDetailsProps {
    onBack?: () => void;
    reportId?: string;
}

const ReportDetails: React.FC<ReportDetailsProps> = ({
    onBack,
    reportId
}) => {
    // Mock data for the report details
    const reportData = {
        id: reportId || '1',
        reportType: 'Blood Panel',
        dateSubmitted: '08 Aug 2025',
        title: 'Blood Panel Report',
        previewTitle: 'Blood Panel Results',
        recommendationsTitle: 'Supplement Recommendations'
    };

    const {id}=useParams()

    const {data:reports}=useReportDetailsQuery(id);

    const report=reports?.data


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Bar */}
            <div className="bg-primary text-white px-0 py-4 shadow-sm">
                <div className="max-w-10/12 mx-auto">
                    <div className="flex items-center justify-between">
                        <Link href={'/report-history'}>
                            <button
                                className="p-2 hover:bg-primary/80 rounded-lg transition-colors duration-200"
                            >
                                <LuArrowLeft size={20} />
                            </button>
                        </Link>
                        <h1 className="md:text-[32px] text-2xl text-white font-bold absolute left-1/2 transform -translate-x-1/2">
                            Report Details
                        </h1>
                        <div className="w-10"></div> {/* Spacer to balance the layout */}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-10/12 mx-auto px-0 py-6 sm:px-6 lg:px-8">
                <div className=" ">
                    {/* Report Information Section */}
                    <div className=" px-6 pt-6 pb-16 bg-white rounded-xl">
                        <div className='flex justify-between items-center mb-2'>
                            <h2 className="text-xl font-bold text-primary-text ">
                                {report?.title}
                            </h2>

                            <div className="flex items-center gap-3">
                                <div className="">
                                    <LuCalendar size={20} className="text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-base text-[#4B4B4B] font-medium">Date Submitted</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div className="">
                                    <div className="flex items-start gap-3">
                                        <LuClock size={20} className="text-gray-600" />
                                        <div>
                                            <p className="text-sm text-[#4B4B4B] font-medium">Report Type</p>
                                            <p className="text-base text-black font-medium">{report?.type}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4 mt-4">


                                <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium">
                                    <LuDownload size={16} />
                                    Download PDF
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Report Preview Section */}
                    <div className="px-6 py-6 bg-white rounded-xl mt-8">
                        <h3 className="text-xl font-bold text-primary-text">
                            Report Preview
                        </h3>
                        <div className='bg-gray-50 rounded-xl p-6 mt-4'>
                            <h4 className="text-base font-medium text-primary-text mb-4">
                                {report?.title}
                            </h4>
                            <div className="bg-white rounded-xl p-4 text-[#4B4B4B] text-base font-normal text-justify leading-relaxed space-y-4">
                             {report?.result}
                            </div>
                        </div>
                    </div>

                    {/* Supplement Recommendations Section */}
                    <div className="px-6 py-6 bg-white rounded-xl mt-8">
                        
                        <div className='bg-gray-50 rounded-xl p-6 mt-4'>
                            <h4 className="text-base font-medium text-primary-text mb-4">
                                {reportData.recommendationsTitle}
                            </h4>
                            <div className="bg-white rounded-xl p-4 text-[#4B4B4B] text-base font-normal text-justify leading-relaxed space-y-4">

                              {report?.recomendation}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto py-6 text-center">
                <p className="text-gray-400 text-sm">
                    © 2025 Medical Reports Portal. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default ReportDetails;
