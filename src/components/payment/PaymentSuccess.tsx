// pages/payment-success.tsx or .jsx

import Link from "next/link";



export default function PaymentSuccess2() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75L10 18.25L19.5 6.75" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for subscribing! Your transaction has been completed.
        </p>
        <Link href={'/health-report'}>
          <p className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition">
            Go to Profile
          </p>
        </Link>
 
      </div>
    </div>
  );
}
