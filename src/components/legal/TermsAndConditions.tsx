'use client';

import Link from 'next/link';
import React from 'react';
import { LuArrowLeft } from 'react-icons/lu';

interface TermsAndConditionsProps {
    onBack?: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
    onBack
}) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Bar */}
            <div className="bg-primary text-white px-4 py-4 shadow-sm">
                <div className="max-w-10/12 mx-auto">
                    <div className="flex items-center justify-between py-6">
                        {/* <Link href={'/health-report'}>
                            <button
                                className="p-2 hover:bg-primary/80 rounded-lg transition-colors duration-200"
                            >
                                <LuArrowLeft size={20} />
                            </button>
                        </Link> */}
                        <h1 className="text-[32px] text-white font-bold absolute left-1/2 transform -translate-x-1/2">
                            TERMS AND CONDITIONS
                        </h1>
                        <div className="w-10"></div> {/* Spacer to balance the layout */}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-10/12 mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="">
                    <div className="px-6 py-8">
                        {/* Main Title */}
                        <h2 className="text-[32px] font-bold text-black mb-2">
                            Terms of Service
                        </h2>
                        <p className=" mb-8 text-base font-normal text-black">
                            Effective Date: [Insert Date]
                        </p>

                        {/* Introductory Paragraph */}
                        <div className="mb-8 text-base font-normal text-black">
                            <p>
                                These Terms of Service ("Terms") govern your access to and use of the services provided by Peak Wellness by Scott ("we," "our," or "us") through our website www.peakwellnessbyscott.com (the "Service"). By accessing or using the Service, you acknowledge, understand, and agree to be bound by these Terms. If you do not agree to these Terms, you may not use the Service.
                            </p>
                        </div>

                        {/* Numbered Sections */}
                        <div className="space-y-8">
                            {/* Section 1 */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    1. Acceptance of Terms
                                </h3>
                                <p className="mb-8 text-base font-normal text-black">
                                    By using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you must immediately discontinue your use of the Service.
                                </p>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    2. Changes to Terms
                                </h3>
                                <p className="mb-8 text-base font-normal text-black">
                                    We may update or modify these Terms at any time. Any changes will be posted on this page with an updated "Effective Date." Your continued use of the Service after such changes constitutes acceptance of the revised Terms.
                                </p>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    3. Use of the Service
                                </h3>
                                <p className=" text-base font-normal text-black mb-4">
                                    You agree to use the Service only for lawful purposes and in accordance with these Terms and all applicable laws and regulations. You agree not to:
                                </p>
                                <ul className="list-disc list-inside mb-8 text-base font-normal text-black space-y-2 ml-4">
                                    <li>Use the Service for any illegal, harmful, or fraudulent activity</li>
                                    <li>Violate any intellectual property rights or other rights of any third party</li>
                                    <li>Attempt to interfere with or disrupt the integrity or performance of the Service</li>
                                </ul>
                            </div>

                            {/* Section 4 */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    4. Account Registration
                                </h3>
                                <p className=" text-base font-normal text-black mb-4">
                                    When creating an account, you agree to:
                                </p>
                                <ul className="list-disc list-inside mb-8 text-base font-normal text-black space-y-2 ml-4">
                                    <li>Provide accurate, current, and complete information</li>
                                    <li>Maintain the confidentiality of your login credentials</li>
                                    <li>Promptly notify us of any unauthorized use of your account</li>
                                </ul>
                            </div>

                            {/* Section 5 */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    5. Fees and Payment
                                </h3>
                                <p className="mb-8 text-base font-normal text-black">
                                    You agree to pay all fees disclosed to you in connection with the Service. All payments must be made through authorized payment methods. Failure to make timely payments may result in suspension of your access to the Service.
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    6. Termination
                                </h3>
                                <p className=" text-base font-normal text-black mb-4">
                                    We reserve the right to suspend or terminate your access to the Service at any time, particularly for:
                                </p>
                                <ul className="list-disc list-inside mb-8 text-base font-normal text-black space-y-2 ml-4">
                                    <li>Violation of these Terms</li>
                                    <li>Abusive behavior (e.g., more than 5 messages per month)</li>
                                    <li>Any conduct that disrupts or negatively impacts the Service or other users</li>
                                </ul>
                            </div>

                            {/* Section 7 */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    7. Disclaimers
                                </h3>
                                <p className="mb-8 text-base font-normal text-black">
                                    The Service is provided "as is" and "as available" without any warranties of any kind. We make no guarantees regarding the reliability, accuracy, or availability of the Service.
                                </p>
                            </div>

                            {/* Section 8 */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    8. Limitation of Liability
                                </h3>
                                <p className="mb-8 text-base font-normal text-black">
                                    Peak Wellness by Scott and Scott Hohag shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Service.
                                </p>
                            </div>

                            {/* Section 9 */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    9. Indemnification
                                </h3>
                                <p className="mb-8 text-base font-normal text-black">
                                    You agree to indemnify and hold harmless Peak Wellness by Scott, its affiliates, employees, and agents from and against any claims, damages, liabilities, or expenses arising out of your use of the Service or breach of these Terms.
                                </p>
                            </div>

                            {/* Section 10 */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    10. Miscellaneous
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                            Severability
                                        </h4>
                                        <p className="mb-8 text-base font-normal text-black">
                                            If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                            Entire Agreement
                                        </h4>
                                        <p className="mb-8 text-base font-normal text-black">
                                            These Terms constitute the entire agreement between you and Peak Wellness by Scott regarding the Service.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Statement */}
                        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                            <p className="text-black text-base font-medium">
                                By using this Service, you acknowledge that you have read, understood, and agree to these Terms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
