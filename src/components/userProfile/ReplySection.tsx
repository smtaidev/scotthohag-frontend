"use client";

import {
  useGetReportRepliesQuery,
  useReportDetailsQuery,
  useSendReportReplyMutation,
} from "@/redux/api/reports/reportSlice";
import { useParams } from "next/navigation";
import { title } from "process";
import React, { useState } from "react";
import { LuSend, LuPaperclip } from "react-icons/lu";

export default function ReplySection() {
  const { id } = useParams();
  const { data: reports, refetch } = useGetReportRepliesQuery({ id });
  const report = reports?.data;

  const [sendReply] = useSendReportReplyMutation();
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleSend = async () => {
    try {
      const res = await sendReply({
        reportId: id,
        reply: message,
      });
      console.log(res);
    } catch (error) {}
    setMessage("");
    setAttachment(null);
    setTimeout(() => {
      refetch();
    }, 3000);
  };

  // Get replies from the report data
  const replies = Array.isArray(report) ? report : [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  console.log("This is the replies", report);

  return (
    <div>
      <div className="px-6 py-6 bg-white rounded-xl mt-8">
        <h3 className="text-xl font-bold text-primary-text">Report Preview</h3>

        <div className="bg-gray-50 rounded-xl p-6 mt-4">
          <h4 className="text-base font-medium text-primary-text mb-4">
            {replies[0]?.reportId || "Report Title"}
          </h4>
          <div className="bg-white rounded-xl p-4 text-[#4B4B4B] text-base font-normal text-justify leading-relaxed space-y-4">
            No result available
          </div>
        </div>

        {/* Replies Section */}
        {replies.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-primary-text mb-3">
              Previous Messages
            </h4>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {replies.map((reply) => (
                <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {reply.user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary-text">
                          {reply.user?.name || "Unknown User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(reply.createdAt)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {reply.user?.role || "USER"}
                    </span>
                  </div>

                  <div className="bg-white rounded-lg p-3 ml-10">
                    <p className="text-sm text-gray-700">{reply.reply}</p>

                    {/* Show attachments if any */}
                    {reply.files && reply.files.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">
                          Attachments:
                        </p>
                        {[...reply.files]
                          .reverse()
                          .map((file: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 text-xs text-blue-600"
                            >
                              <LuPaperclip size={12} />
                              <span>
                                {file.name || `Attachment ${index + 1}`}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Section */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-primary-text mb-3">
            Send a Message
          </h4>
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
                <span>{attachment ? attachment.name : "Attach a file"}</span>
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
                disabled={!message.trim()}
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
