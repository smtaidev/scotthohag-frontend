'use client';

import { useGetAllReportsQuery } from '@/redux/api/reports/reportSlice';
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import { LuArrowLeft, LuCalendar, LuEye, LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface ReportHistoryProps {
    onBack?: () => void;
    onViewReport?: (reportId: string) => void;
}

interface Report {
    id: string;
    reportType: string;
    date: string;
    status: 'pending' | 'completed';
}

const ReportHistory: React.FC<ReportHistoryProps> = ({
    onBack,
    onViewReport
}) => {
    const [sortBy, setSortBy] = useState<'date' | 'type' | 'status'>('date');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Show 10 items per page

    // Mock data based on the image description - expanded for pagination demo
    // const reports: Report[] = [
    //     { id: '1', reportType: 'Blood Panel', date: '08 Aug 2025', status: 'pending' },
    //     { id: '2', reportType: 'Blood Panel', date: '08 Aug 2025', status: 'pending' },
    //     { id: '3', reportType: 'Blood Panel', date: '08 Aug 2025', status: 'pending' },
    //     { id: '4', reportType: 'Blood Panel', date: '08 Aug 2025', status: 'completed' },
    //     { id: '5', reportType: 'Blood Panel', date: '08 Aug 2025', status: 'completed' },
    //     { id: '6', reportType: 'Blood Panel', date: '08 Aug 2025', status: 'completed' },
    //     { id: '7', reportType: 'Blood Panel', date: '08 Aug 2025', status: 'completed' },
    //     { id: '8', reportType: 'Blood Panel', date: '08 Aug 2025', status: 'completed' },
    //     { id: '9', reportType: 'Blood Panel', date: '08 Aug 2025', status: 'completed' },
    //     { id: '10', reportType: 'Blood Panel', date: '08 Aug 2025', status: 'completed' },
    //     { id: '11', reportType: 'Thyroid Panel', date: '08 Aug 2025', status: 'completed' },
    //     { id: '12', reportType: 'Lipid Panel', date: '07 Aug 2025', status: 'completed' },
    //     { id: '13', reportType: 'Hormone Panel', date: '06 Aug 2025', status: 'pending' },
    //     { id: '14', reportType: 'Vitamin Panel', date: '05 Aug 2025', status: 'completed' },
    //     { id: '15', reportType: 'Liver Function', date: '04 Aug 2025', status: 'completed' },
    //     { id: '16', reportType: 'Kidney Function', date: '03 Aug 2025', status: 'pending' },
    //     { id: '17', reportType: 'Blood Sugar', date: '02 Aug 2025', status: 'completed' },
    //     { id: '18', reportType: 'Inflammatory Markers', date: '01 Aug 2025', status: 'completed' },
    //     { id: '19', reportType: 'Electrolyte Panel', date: '31 Jul 2025', status: 'completed' },
    //     { id: '20', reportType: 'Cardiac Risk Markers', date: '30 Jul 2025', status: 'completed' },
    // ];

    // Filter and sort reports
    const queryParams = useMemo(() => {
        const params: any = {
            skip: (currentPage - 1) * itemsPerPage,
            limit: itemsPerPage,
            sort: 'asc',
            count: true
        }

        if (searchTerm.trim()) {
            params.type = searchTerm.trim()
        }

        // if (statusFilter !== "Status") {
        //   params.status = statusFilter.toLowerCase()
        // }

        // if (genderFilter !== "Gender") {
        //   params.gender = genderFilter.toLowerCase()
        // }
        // if (skip !==0) {
        //   params.skip = skip
        // }

        // if (ageRangeFilter !== "Age Range") {
        //   const ageRange = ageRangeFilter.split("-")
        //   if (ageRange[0]) params.minAge = parseInt(ageRange[0])
        //   if (ageRange[1] && ageRange[1] !== "+") {
        //     params.maxAge = parseInt(ageRange[1])
        //   } else if (ageRange[1] === "+") {
        //     params.maxAge = 100
        //   }
        // }

        return params
    }, [searchTerm, currentPage, itemsPerPage])


    const { data: allReports, isLoading } = useGetAllReportsQuery(queryParams)

    const filteredReports = allReports?.data || []
    const totalItems = allReports?.meta.total
    console.log("totalItems", totalItems)
    // const totalPages = Math.ceil(totalItems / itemsPerPage)

    // Pagination logic
    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentReports = filteredReports?.slice(startIndex, endIndex);

    // Reset to first page when search term or items per page changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const getStatusBadge = (status: 'PENDING' | 'COMPLETED') => {
        if (status === 'PENDING') {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#FFF3D8] text-[#CF7106]">
                    Pending
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completed
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Bar */}
            {/* <div className="bg-primary text-white px-4 py-4 shadow-sm">
                <div className="max-w-10/12 mx-auto">
                    <div className="flex items-center justify-between">
                        <Link href={'/health-report'}>
                            <button

                                className="p-2 hover:bg-primary/80 rounded-lg transition-colors duration-200"
                            >
                                <LuArrowLeft size={20} />
                            </button>
                        </Link>
                        <h1 className="md:text-[32px] text-2xl text-white font-bold absolute left-1/2 transform -translate-x-1/2">Report History</h1>
                        <div className="w-10"></div> 
                    </div>
                </div>
            </div> */}

            {/* Main Content */}
            <div className="max-w-10/12 mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl ">
                    {/* Panel Header */}
                    <div className="px-6 py-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className='flex items-center'>
                                <Link href={'/health-report'}>
                                    <button

                                        className="p-2 hover:bg-primary/10 cursor-pointer rounded-lg transition-colors duration-200"
                                    >
                                        <LuArrowLeft size={20} />
                                    </button>
                                </Link>
                                <h2 className="text-2xl font-medium text-gray-900">Report History</h2>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                               
                            </div>
                        </div>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto p-8">
                        <table className="w-full border border-gray-200 rounded-xl">
                            {/* Table Header */}
                            <thead className="border-b border-gray-200 rounded-xl">
                                <tr>
                                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                                        Report Type
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-200">
                                {currentReports.map((report: any) => (
                                    <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 text-sm text-gray-900 text-center">
                                            {report.type}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 text-center">
                                            {new Date(report.date).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {getStatusBadge(report.status)}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {report.status === 'PENDING' ? (
                                                <button
                                                    disabled={true}
                                                    className="inline-flex items-center gap-2 text-sm transition-colors duration-200 text-gray-400 cursor-not-allowed opacity-50"
                                                >
                                                    <LuEye size={16} />
                                                    <span>View report</span>
                                                </button>
                                            ) : (
                                                <Link href={`/report-details/${report.id}`}>
                                                    <button
                                                        className="inline-flex items-center gap-2 text-sm transition-colors duration-200 text-gray-500 hover:text-primary cursor-pointer"
                                                    >
                                                        <LuEye size={16} />
                                                        <span>View report</span>
                                                    </button>
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {currentReports.map((report: any) => (
                            <div key={report.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-medium text-gray-900">{report.type}</h3>
                                    {getStatusBadge(report.status)}
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                    <span> {new Date(report.date).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}</span>
                                </div>
                                
                                {report.status === 'PENDING' ? (
                                    <button
                                        disabled={true}
                                        className="w-full inline-flex items-center justify-center gap-2 text-sm transition-colors duration-200 py-2 border rounded-lg text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
                                    >
                                        <LuEye size={16} />
                                        <span>View report</span>
                                    </button>
                                ) : (
                                    <Link href={`/report-details/${report.id}`}>
                                        <button
                                            className="w-full inline-flex items-center justify-center gap-2 text-sm transition-colors duration-200 py-2 border rounded-lg text-gray-7  00 border-gray-300 hover:text-primary hover:border-primary cursor-pointer"
                                        >
                                            <LuEye size={16} />
                                            <span>View report</span>
                                        </button>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {filteredReports.length > 0 && totalPages > 1 && (
                        <div className="px-6 py-6 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                {/* Results Info */}
                                <div className="text-sm text-gray-500">
                                    Showing {startIndex + 1} to {Math.min(endIndex, filteredReports.length)} of {filteredReports.length} results
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex items-center gap-2">
                                    {/* Previous Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                    >
                                        <LuChevronLeft size={16} />
                                        <span className="hidden sm:inline">Previous</span>
                                    </button>

                                    {/* Desktop Page Numbers */}
                                    <div className="hidden md:flex items-center gap-1">
                                        {getPageNumbers().map((page, index) => (
                                            <React.Fragment key={index}>
                                                {page === '...' ? (
                                                    <span className="px-3 py-2 text-sm text-gray-500">...</span>
                                                ) : (
                                                    <button
                                                        onClick={() => handlePageChange(page as number)}
                                                        className={`inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-lg transition-colors duration-200 ${currentPage === page
                                                            ? 'bg-primary text-white'
                                                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    {/* Mobile Page Indicator */}
                                    <div className="md:hidden flex items-center gap-2">
                                        <span className="text-sm text-gray-500">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                    >
                                        <span className="hidden sm:inline">Next</span>
                                        <LuChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Empty State (if no reports) */}
                    {filteredReports.length === 0 && (
                        <div className="px-6 py-12 text-center">
                            <div className="text-gray-400 mb-4">
                                <LuCalendar size={48} className="mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {searchTerm ? 'No reports found' : 'No reports found'}
                            </h3>
                            <p className="text-gray-500">
                                {searchTerm ? 'Try adjusting your search terms.' : 'You haven\'t submitted any reports yet.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportHistory;
