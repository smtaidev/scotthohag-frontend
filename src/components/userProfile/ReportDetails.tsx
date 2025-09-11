'use client';

import { useReportDetailsQuery } from '@/redux/api/reports/reportSlice';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
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

    const { id } = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);

    const { data: reports } = useReportDetailsQuery(id);
    const report = reports?.data;

    // Reset index when report data changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [report?.resultUrls]);

    // Safe array access with null checks
    const resultUrls = report?.resultUrls || [];
    const totalFiles = resultUrls.length;   

    // Function to go to the next image
    const nextImage = () => {
        if (totalFiles === 0) return;
        setCurrentIndex((prevIndex) =>
            prevIndex === totalFiles - 1 ? 0 : prevIndex + 1
        );
    };

    // Function to go to the previous image
    const prevImage = () => {
        if (totalFiles === 0) return;
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalFiles - 1 : prevIndex - 1
        );
    };

    const isPDF = (url: string) => {
        return url?.toLowerCase().endsWith(".pdf");
    };

    // Get current file URL safely
    const currentFileUrl = resultUrls[currentIndex];

    // Debug logging (remove in production)
    console.log('Debug info:', {
        totalFiles,
        currentIndex,
        currentFileUrl,
        resultUrls
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="max-w-10/12 mx-auto px-0 py-6 sm:px-6 lg:px-8">
                <div className="flex justify-start items-center">
                    <Link href={'/report-history'}>
                        <button
                            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-200 cursor-pointer"
                        >
                            <LuArrowLeft size={20} />
                        </button>
                    </Link>
                    <h1 className="md:text-[32px] text-2xl text-primary font-bold">
                        Report Details
                    </h1>
                    <div className="w-10"></div>
                </div>

                <div className="">
                    {/* Report Information Section */}
                    <div className="px-6 pt-6 pb-16 bg-white rounded-xl">
                        <div className='flex justify-between items-start mb-6 flex-col md:flex-row gap-4'>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-primary-text mb-4">
                                    {report?.title}
                                </h2>
                                
                                {/* Report Type */}
                                <div className="flex items-start gap-3 mb-4">
                                    <LuClock size={20} className="text-gray-600 mt-1" />
                                    <div>
                                        <p className="text-sm text-[#4B4B4B] font-medium">Report Type</p>
                                        <p className="text-base text-black font-medium">{report?.type}</p>
                                    </div>
                                </div>

                                {/* Date Submitted */}
                                <div className="flex items-start gap-3">
                                    <LuCalendar size={20} className="text-gray-600 mt-1" />
                                    <div>
                                        <p className="text-sm text-[#4B4B4B] font-medium">Date Submitted</p>
                                        <p className="text-base text-black font-medium">{reportData.dateSubmitted}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Single Download Button */}
                            {currentFileUrl && (
                                <a
                                    href={currentFileUrl}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
                                >
                                    <LuDownload size={16} />
                                    Download Current File
                                </a>
                            )}
                        </div>

                        {/* File Display Section */}
                        <div className="space-y-4 max-w-[1114px] mx-auto">
                            {totalFiles > 0 ? (
                                <div className="relative">
                                    {/* Navigation Arrows - Always visible, but disabled if only 1 file */}
                                    <button
                                        onClick={prevImage}
                                        disabled={totalFiles <= 1}
                                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-100 text-white p-2 rounded-full z-10 ${
                                            totalFiles <= 1 
                                                ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                                                : 'hover:bg-black/30 bg-black/10 cursor-pointer'
                                        }`}
                                    >
                                        <IoIosArrowBack className="size-9" />
                                    </button>

                                    <button
                                        onClick={nextImage}
                                        disabled={totalFiles <= 1}
                                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-100 text-white p-2 rounded-full z-10 ${
                                            totalFiles <= 1 
                                                ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                                                : 'hover:bg-black/30 bg-black/10 cursor-pointer'
                                        }`}
                                    >
                                        <IoIosArrowForward className="size-9" />
                                    </button>

                                    {/* File Counter */}
                                    {totalFiles > 1 && (
                                        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-10">
                                            {currentIndex + 1} / {totalFiles}
                                        </div>
                                    )}

                                    {/* File Display */}
                                    <div className="border-2 border-primary rounded-lg overflow-hidden">
                                        {currentFileUrl ? (
                                            isPDF(currentFileUrl) ? (
                                                <iframe
                                                    src={currentFileUrl}
                                                    width="100%"
                                                    height="764px"
                                                    frameBorder="0"
                                                    title={`Report PDF ${currentIndex + 1}`}
                                                />
                                            ) : (
                                                <img
                                                    src={currentFileUrl}
                                                    alt={`Report ${currentIndex + 1}`}
                                                    className="h-[764px] w-full object-contain bg-gray-50"
                                                    onError={(e) => {
                                                        console.error('Image failed to load:', currentFileUrl);
                                                        e.currentTarget.src = '/placeholder-image.png'; // Add fallback image
                                                    }}
                                                />
                                            )
                                        ) : (
                                            <div className="h-[764px] w-full flex items-center justify-center bg-gray-100 text-gray-500">
                                                No file available
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="border-2 border-gray-300 rounded-lg h-[764px] flex items-center justify-center bg-gray-50">
                                    <p className="text-gray-500">No files available to display</p>
                                </div>
                            )}
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
                                {report?.result || 'No result available'}
                            </div>
                        </div>
                    </div>

                    {/* Supplement Recommendations Section */}
                    {/* <div className="px-6 py-6 bg-white rounded-xl mt-8">
                        <div className='bg-gray-50 rounded-xl p-6 mt-4'>
                            <h4 className="text-base font-medium text-primary-text mb-4">
                                {reportData.recommendationsTitle}
                            </h4>
                            <div className="bg-white rounded-xl p-4 text-[#4B4B4B] text-base font-normal text-justify leading-relaxed space-y-4">
                                {report?.recomendation || 'No recommendations available'}
                            </div>
                        </div>
                    </div> */}
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