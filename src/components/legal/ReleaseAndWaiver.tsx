'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { LuArrowLeft } from 'react-icons/lu';

interface ReleaseAndWaiverProps {
    onBack?: () => void;
    onAgree?: () => void;
}

const ReleaseAndWaiver: React.FC<ReleaseAndWaiverProps> = ({
    onBack,
    onAgree
}) => {
    const [isAgreed, setIsAgreed] = useState(false);

    const handleAgree = () => {
        if (isAgreed) {
            onAgree?.();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Bar */}
            <div className="bg-primary text-white px-4 py-4 shadow-sm">
                <div className="max-w-10/12 mx-auto">
                    <div className="flex items-center justify-between py-14 md:py-12">

                        <h1 className="md:text-[32px] text-2xl text-white text-center font-bold absolute  md:left-1/2 md:transform md:-translate-x-1/2">
                            RELEASE AND WAIVER OF LIABILITY, DISCLAIMER, AND ASSUMPTION OF RISK AGREEMENT
                        </h1>
                        <div className="w-10"></div> {/* Spacer to balance the layout */}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-10/12 mx-auto px-0 py-6 sm:px-6 lg:px-8">
                <div className="">
                    <div className="md:px-6 px-0 py-8">
                        {/* Introductory Paragraph */}
                        <div className="text-base font-normal text-black mb-8">
                            <p>
                                This Agreement is entered into between wellness adviser Peak Wellness by Scott (“Adviser”) and the (“Client”) once this box is checked and the monthly subscription payment is made.  Adviser will be recommending supplement nutrition suggestions, bloodwork, peptides, among other wellness related recommendations. Adviser might also work with Client on exercises and personal training. This Agreement and waiver of liability shall apply to Peak Wellness by Scott and its owner Scott Hohag.
                            </p>
                        </div>

                        {/* Sections */}
                        <div className="space-y-8">
                            {/* Medical Disclaimer */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    Medical Disclaimer
                                </h3>
                                <div className="mb-8 text-base font-normal text-black space-y-4">
                                    <p>
                                        Adviser is not a doctor. The information Adviser provides is based on his personal experience, thorough research on nutrition and his experience as a wellness adviser. Any recommendations Adviser makes about weight training, nutrition, supplements, or lifestyle should be discussed between you and your doctor because such activities involves risks. <br />
                                        The information provided is not intended to be a substitute for professional medical advice, diagnosis or treatment. Never disregard professional medical advice, or delay in seeking it. <br /> Never rely on information through Adviser’s programs in place of seeking professional medical advice.
                                    </p>
                                    <p>
                                        Adviser is not responsible or liable for any advice, course of treatment, diagnosis or any other information, services, or products that you obtain through our programs. Client is encouraged to review the information carefully with their professional healthcare provider.
                                    </p>
                                </div>
                            </div>

                            {/* Peptide Therapy */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    Peptide Therapy
                                </h3>
                                <div className="mb-8 text-base font-normal text-black space-y-4">
                                    <p>
                                        Peptides are small chains of amino acids that can have biological activity. They are mostly naturally occurring. Some peptides are FDA approved for the treatment of certain diseases. Other peptides used clinically are prepared by duly registered compounding pharmacies complying with all state and federal laws. Peptides can be administered in various presentations, including but not limited to oral, intravenous, subcutaneous, intramuscular and intranasal routes. Understanding this, Client hereby acknowledges and consents to the following:
                                    </p>
                                    <div className="space-y-2">
                                        <ul className="list-disc list-inside space-y-2 ">
                                            <li>My physician or medical provider has discussed with me the possibility of integrating peptide therapy into my current treatment regime; or I have had the opportunity to seek such medical advice.</li>
                                            <li>Client understands that the use of peptides is not necessarily approved for Client's medical conditions.</li>
                                            <li>As with any other drug, peptide therapies can have side effects, including but not limited to: nausea, vomiting, fever, injection site reactions (pain, rash, bleeding), allergies. Additional side effects not listed may also occur.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Information */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    Medical Information
                                </h3>
                                <p className="mb-8 text-base font-normal text-black">
                                    Client hereby authorizes Adviser to use their medical information for the purpose of providing wellness recommendations. Failing to provide all information requested may invalidate this Authorization.
                                </p>
                            </div>

                            {/* Minimum Age */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    Minimum Age
                                </h3>
                                <p className="mb-8 text-base font-normal text-black">
                                    Client shall be at least 18 years of age.
                                </p>
                            </div>

                            {/* Release of Liability */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    Release of Liability and Covenant Not to Sue
                                </h3>
                                <div className="mb-8 text-base font-normal text-black space-y-4">
                                    <p>
                                        Client, for themselves and their personal representatives, heirs, next of kin and assigns, hereto release and discharge Adviser and its owner from any and all liabilities, losses, damages, costs, expenses (including, but not limited to attorneys’ fees), and waive their rights to any causes of action, suits and claims of any nature arising from, based upon or relating to the personal injury, death, damage to or loss of property of the Client, sustained in connection with the Client’s work with Adviser. Adviser shall have to liability and shall not accept responsibility for suggesting supplements, peptides, or drug sources
                                    </p>
                                    <p>
                                        Client further agrees that if, despite this Agreement, Client or anyone on behalf of Client, makes a claim against Adviser, Client will indemnify, save, and hold harmless Adviser from any loss, liability, damage, or cost including attorney fees which may be incurred as the result of such claim.
                                    </p>
                                </div>
                            </div>

                            {/* Arbitration Clause */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    Arbitration Clause
                                </h3>
                                <p className="mb-8 text-base font-normal text-black ">
                                    THESE TERMS AND CONDITIONS REQUIRE THE BINDING ARBITRATION OF DISPUTES ON AN INDIVIDUALIZED BASIS. EXCEPT AS HEREIN PROVIDED BY AGREEING TO THESE TERMS AND CONDITIONS, YOU HEREBY WAIVE YOUR RIGHTS TO: (A) SEEK RELIEF IN A COURT OF LAW (B) HAVE DISPUTES DECIDED BY JUDGE OR JURY; AND (C) PARTICIPATE IN A CLASS ACTION LAWSUIT AGAINST FUNCTION.
                                </p>
                            </div>

                            {/* Miscellaneous */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    Miscellaneous
                                </h3>
                                <div className="mb-8 text-base font-normal text-black space-y-4">
                                    <p>
                                        Client has read this Agreement and understands that Client has given up substantial rights by signing it. Client has signed it freely and without any inducement or assurance of any nature.  Client intends this to be a complete and unconditional release of all liability to the greatest extent allowed by law and Client agrees that if any portion of this Agreement is held to be invalid, the balance, notwithstanding, shall continue in full force and effect. This Agreement shall be governed by and construed in accordance with the laws of the State of Minnesota. This Agreement shall be binding on the Client, and Client’s successors, assigned, heirs, personal representative and invitees.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Agreement Checkbox */}

                        <div className='text-center mt-15 pt-8 '>
                            <p className='text-base font-normal text-black'>By clicking this box, you acknowledge that you have read, understood, and agree to the above.</p>
                        </div>
                        {/* <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    id="agree-checkbox"
                                    checked={isAgreed}
                                    onChange={(e) => setIsAgreed(e.target.checked)}
                                    className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                                />
                                <label htmlFor="agree-checkbox" className="mb-8 text-base font-normal text-black">
                                    By clicking this box, you acknowledge that you have read, understood, and agree to the above.
                                </label>
                            </div>

                            
                            <div className="mt-6 text-center">
                                <button
                                    onClick={handleAgree}
                                    disabled={!isAgreed}
                                    className={`px-8 py-3 rounded-lg font-medium transition-colors duration-200 ${isAgreed
                                        ? 'bg-primary text-white hover:bg-primary/90'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    I Agree
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReleaseAndWaiver;
