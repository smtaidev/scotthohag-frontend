'use client';

import React, { useState, useRef } from 'react';
import { LuFileText, LuFiles, LuCalendar, LuUpload, LuChevronDown, LuX } from 'react-icons/lu';
import CustomInput from '@/ui/CustomeInput';
import { MdCloudUpload } from 'react-icons/md';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { z } from 'zod';

// Zod validation schema
const reportFormSchema = z.object({
  type: z.string().min(1, 'Report type is required'),
  title: z.string().min(1, 'Report title is required').min(3, 'Report title must be at least 3 characters'),
  date: z.string().min(1, 'Report date is required').refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of today
    return selectedDate <= today;
  }, 'Report date cannot be in the future'),
  files: z.array(z.any()).min(1, 'At least one PDF file is required')
});

interface ReportFormData {
  type: string;
  title: string;
  date: string;
  reportUrls: string[];
}

interface ValidationErrors {
  type?: string;
  title?: string;
  date?: string;
  files?: string;
}

interface SubmitReportProps {
  onReportSubmit?: (data: ReportFormData, onSuccess?: () => void) => void;
  onViewHistory?: () => void;
  isLoading: boolean;
}

const SubmitReport: React.FC<SubmitReportProps> = ({
  onReportSubmit,
  onViewHistory,
  isLoading
}) => {
  const [showReportTypeModal, setShowReportTypeModal] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedReportTitle, setSelectedReportTitle] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reportTypes = [
    'Complete Blood Count',
    'Lipid Panel',
    'Thyroid Panel',
    'Hormone Panel',
    'Vitamin & Mineral Panel',
    'Liver Function Test',
    'Kidney Function Test',
    'Blood Sugar',
    'Inflammatory Markers',
    'Electrolyte Panel',
    'Cardiac Risk Markers',
    'Specialty Tests'
  ];
  const reportTitles = [
    'Complete Blood Count',
    'Lipid Panel',
    'Thyroid Panel',
    'Hormone Panel',
    'Vitamin & Mineral Panel',
    'Liver Function Test',
    'Kidney Function Test',
    'Blood Sugar',
    'Inflammatory Markers',
    'Electrolyte Panel',
    'Cardiac Risk Markers',
    'Specialty Tests'
  ];

  // Validate if file is PDF
  // const isPDFFile = (file: File): boolean => {
  //   return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  // };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    // Filter only PDF files
    // const pdfFiles = files.filter(file => isPDFFile(file));
    // const nonPdfFiles = files.filter(file => !isPDFFile(file));

    // Show error if non-PDF files were selected
    // if (nonPdfFiles.length > 0) {
    //   setValidationErrors(prev => ({
    //     ...prev,
    //     files: `Only PDF files are allowed. Rejected: ${nonPdfFiles.map(f => f.name).join(', ')}`
    //   }));
    // } else {
    //   // Clear file validation error if only PDFs
    //   setValidationErrors(prev => {
    //     const newErrors = { ...prev };
    //     delete newErrors.files;
    //     return newErrors;
    //   });
    // }

    // if (pdfFiles.length > 0) {
    //   setUploadedFiles(prev => [...prev, ...pdfFiles]);
    // }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);

    setUploadedFiles(prev => [...prev, ...files]);

    // // Filter only PDF files
    // const pdfFiles = files.filter(file => isPDFFile(file));
    // const nonPdfFiles = files.filter(file => !isPDFFile(file));

    // // Show error if non-PDF files were dropped
    // if (nonPdfFiles.length > 0) {
    //   setValidationErrors(prev => ({
    //     ...prev,
    //     files: `Only PDF files are allowed. Rejected: ${nonPdfFiles.map(f => f.name).join(', ')}`
    //   }));
    // } else {
    //   // Clear file validation error if only PDFs
    //   setValidationErrors(prev => {
    //     const newErrors = { ...prev };
    //     delete newErrors.files;
    //     return newErrors;
    //   });
    // }

    // if (pdfFiles.length > 0) {
    //   setUploadedFiles(prev => [...prev, ...pdfFiles]);
    // }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));

    // Clear file validation error if no files remain
    if (uploadedFiles.length === 1) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.files;
        return newErrors;
      });
    }
  };

  // Clear individual field errors when user starts typing/selecting
  const clearFieldError = (field: keyof ValidationErrors) => {
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const token = Cookies.get("accessToken");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Prepare data for validation
    const formData = {
      type: selectedReportType,
      title: selectedReportTitle,
      date: reportDate,
      files: uploadedFiles
    };

    // Validate using Zod schema
    const validation = reportFormSchema.safeParse(formData);

    if (!validation.success) {
      // Extract and set validation errors
      const errors: ValidationErrors = {};
      validation.error.issues.forEach((error: any) => {
        if (error.path.length > 0) {
          const field = error.path[0] as keyof ValidationErrors;
          errors[field] = error.message;
        }
      });
      setValidationErrors(errors);
      return; // Stop form submission
    }

    // Clear validation errors if validation passes
    setValidationErrors({});

    const getSignedUrl = async (fileType: any, mimeType: any) => {
      const response: any = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/uploads?fileType=${encodeURIComponent(fileType)}&mimeType=${encodeURIComponent(mimeType)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to get signed URL');
      }

      const data = await response.json();
      return data.data.signedUrl;
    };

    const resultUrls: string[] = [];

    if (uploadedFiles?.length > 0) {
      await Promise.all(
        uploadedFiles.map(async (file: any) => {
          const fileType = file.name.split('.').pop();
          const mimeType = file.type;

          try {
            const signedUrl = await getSignedUrl(fileType, mimeType);

            const uploadResponse = await fetch(signedUrl, {
              method: 'PUT',
              headers: {
                'Content-Type': mimeType,
              },
              body: file,
            });

            if (!uploadResponse.ok) {
              throw new Error(`Upload failed for ${file.name}`);
            }

            const fileUrl = signedUrl.split('?')[0];
            resultUrls.push(fileUrl);
          } catch (error) {
            console.error('Error uploading', file.name, error);
          }
        })
      );
    }

    const resetForm = () => {
      setSelectedReportType('');
      setSelectedReportTitle('');
      setReportDate('');
      setUploadedFiles([]);
      setValidationErrors({});
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const submissionData = {
      type: selectedReportType,
      title: selectedReportTitle,
      date: reportDate,
      reportUrls: resultUrls
    };
    onReportSubmit?.(submissionData, resetForm);
  };

  return (
    <div className="max-w-10/12 mx-auto px-0 sm:px-6 lg:px-8 pb-8">
      <div className="bg-white rounded-xl p-8 mb-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-black">
            Submit Your Health Report
          </h2>
          <div className="flex border-b-2 border-gray-200">
            <button
              onClick={() => {/* Handle create report */ }}
              className="inline-flex items-center gap-2 px-4 py-2 cursor-pointer bg-primary text-white rounded-t-lg rounded-b-none hover:bg-primary/90 transition-colors duration-200 text-base font-medium"
            >
              <LuFileText size={16} />
              Create Report
            </button>
            <Link href={'/report-history'}>
              <button
                onClick={onViewHistory}
                className="inline-flex items-center gap-2 px-4 py-2 cursor-pointer text-gray-700 rounded-t-lg  transition-colors duration-200 text-sm font-medium"
              >
                <LuFiles size={16} />
                View History
              </button>
            </Link>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Report Type */}
          <div className="space-y-2">
            <label className="text-base font-medium text-gray-700 block">
              Report Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedReportType}
                onChange={(e) => {
                  setSelectedReportType(e.target.value);
                  clearFieldError('type');
                }}
                className={`w-full px-3 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-1 focus:ring-primary ${validationErrors.type ? 'border border-red-500' : ''
                  }`}
              >
                <option value="" className="text-gray-400">Select report type</option>
                {reportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {validationErrors.type && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.type}</p>
            )}
          </div>

          {/* Report Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Report Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={selectedReportTitle}
                onChange={(e) => {
                  setSelectedReportTitle(e.target.value);
                  clearFieldError('title');
                }}
                className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-gray-50 placeholder-gray-400 ${validationErrors.title ? 'border border-red-500' : ''
                  }`}
                placeholder="Write your report title here"
              />
            </div>
            {validationErrors.title && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
            )}
          </div>

          {/* Report Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Report Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                ref={(el) => { dateInputRef.current = el; }} // Add this ref
                type="date"
                value={reportDate}
                onChange={(e) => {
                  setReportDate(e.target.value);
                  clearFieldError('date');
                }}
                max={new Date().toISOString().split('T')[0]}
                className={`w-full px-3 py-2 rounded-md placeholder:text-gray-400 text-black focus:outline-none focus:ring-1 focus:ring-primary bg-gray-50 
        [&::-webkit-calendar-picker-indicator]:hidden
        ${validationErrors.date ? 'border border-red-500' : ''}`}
                placeholder="yyyy / mm / dd"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => dateInputRef.current?.showPicker?.()}
              >
                <LuCalendar size={16} className="text-gray-400" />
              </div>
            </div>
            {validationErrors.date && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.date}</p>
            )}
          </div>
          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Choose Report <span className="text-red-500">*</span>
            </label>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-gray-300 bg-gray-50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors duration-200 ${validationErrors.files ? 'border-red-500' : ''
                }`}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <MdCloudUpload size={40} className="text-black" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-black text-lg font-medium">
                    Drag & drop PDF files or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supported format: PDF only
                  </p>
                  <p className="text-sm text-gray-500">
                    Maximum size per file: 10MB
                  </p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple

                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            {validationErrors.files && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.files}</p>
            )}
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Uploaded Files
              </label>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700 truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <LuX size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-101 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90 cursor-pointer'
                }`}
            >
              {isLoading ? "Loading..." : "Submit Report"}
            </button>
          </div>
        </form>

        {/* Report Type Modal */}
        {showReportTypeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select your Report Type
                  </h3>
                  <button
                    onClick={() => setShowReportTypeModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <LuX size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-64">
                <div className="space-y-2">
                  {reportTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedReportType(type);
                        setShowReportTypeModal(false);
                        clearFieldError('type');
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-900 cursor-pointer"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitReport;