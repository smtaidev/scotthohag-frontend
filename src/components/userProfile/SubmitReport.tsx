'use client';

import React, { useState, useRef } from 'react';
import { LuFileText, LuFiles, LuCalendar, LuUpload, LuChevronDown, LuX } from 'react-icons/lu';
import CustomInput from '@/ui/CustomeInput';
import { MdCloudUpload } from 'react-icons/md';
import Link from 'next/link';

interface SubmitReportProps {
  onReportSubmit?: (data: any) => void;
  onViewHistory?: () => void;
}

const SubmitReport: React.FC<SubmitReportProps> = ({
  onReportSubmit,
  onViewHistory
}) => {
  const [showReportTypeModal, setShowReportTypeModal] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedReportTitle, setSelectedReportTitle] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      reportType: selectedReportType,
      reportTitle: selectedReportTitle,
      reportDate,
      files: uploadedFiles
    };
    onReportSubmit?.(formData);
  };

  return (
    <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8 pb-8">
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
                value={selectedReportTitle}
                onChange={(e) => setSelectedReportTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="" className="text-gray-400">Select report type</option>
                {reportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* Report Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Report Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedReportTitle}
                onChange={(e) => setSelectedReportTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="" className="text-gray-400">Select report title</option>
                {reportTitles.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Report Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Report Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-gray-100 placeholder-gray-400"
                placeholder="yyyy / mm / dd"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <LuCalendar size={16} className="text-gray-400" />
              </div>
            </div>
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
              className="border-2 border-gray-300 bg-gray-100 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors duration-200"
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <MdCloudUpload size={40} className="text-black" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-black text-lg font-medium">
                    Drag & drop files or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supported formats: PDF, JPG, PNG, DOC
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
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
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
                      className="text-red-500 hover:text-red-700"
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
              className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium cursor-pointer transition-all duration-300 transform hover:scale-101"
            >
              Submit Report
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
