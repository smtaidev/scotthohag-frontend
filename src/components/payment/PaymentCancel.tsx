// pages/payment-cancel.tsx or .jsx

import Link from 'next/link';

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <svg className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your subscription payment was cancelled. If this was a mistake, you can try again below.
        </p>
        <Link href="/">
          <p className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition">
            Try Again
          </p>
        </Link>
      </div>
    </div>
  );
}
