'use client';

import { useReportDetailsQuery } from '@/redux/api/reports/reportSlice';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { LuSend, LuPaperclip } from 'react-icons/lu';

export default function ReplySection() {
  const { id } = useParams();
  const { data: reports } = useReportDetailsQuery(id);
  const report = reports?.data;

  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleSend = () => {
    // TODO: handle sending message and file
    console.log('Message:', message);
    console.log('Attachment:', attachment);
    setMessage('');
    setAttachment(null);
  };

  return (
    <div>
      <div className="px-6 py-6 bg-white rounded-xl mt-8">
        <h3 className="text-xl font-bold text-primary-text">
          Report Preview
        </h3>

        <div className="bg-gray-50 rounded-xl p-6 mt-4">
          <h4 className="text-base font-medium text-primary-text mb-4">
            {report?.title}
          </h4>
          <div className="bg-white rounded-xl p-4 text-[#4B4B4B] text-base font-normal text-justify leading-relaxed space-y-4">
            {report?.result || 'No result available'}
          </div>
        </div>

        {/* Chat Section */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-primary-text mb-3">Send a Message</h4>
          <div className="flex flex-col gap-3">
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-primary hover:underline">
                <LuPaperclip size={18} />
                <span>{attachment ? attachment.name : 'Attach a file'}</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setAttachment(file);
                  }}
                />
              </label>

              <button
                onClick={handleSend}
                className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
              >
                <LuSend size={18} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
