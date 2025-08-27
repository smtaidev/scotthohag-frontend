import Image from 'next/image';
import React from 'react';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-primary-text text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-10/12 mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Logo and Tagline */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            {/* Logo */}
                            <div className="w-40 h-30 mb-4">
                               <Image src="/images/logo.png" alt="logo" width={200} height={100} />
                            </div>
                        </div>
                        {/* Tagline */}
                        <p className="text-[#9CA3AF] text-sm leading-relaxed">
                            Understanding your blood,<br />
                            owning your health.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-[#9CA3AF] hover:text-white transition-colors duration-300">Home</a></li>
                            <li><a href="#" className="text-[#9CA3AF] hover:text-white transition-colors duration-300">Services</a></li>
                            <li><a href="#" className="text-[#9CA3AF] hover:text-white transition-colors duration-300">About</a></li>
                            <li><a href="#" className="text-[#9CA3AF] hover:text-white transition-colors duration-300">Contact</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="/release-and-waiver" className="text-[#9CA3AF] hover:text-white transition-colors duration-300">Disclaimer</a></li>
                            <li><a href="#" className="text-[#9CA3AF] hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                            <li><a href="/terms-and-conditions" className="text-[#9CA3AF] hover:text-white transition-colors duration-300">Terms of Use</a></li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                        <div className="flex items-center">
                            <a href="#" className="text-[#9CA3AF] hover:text-white transition-colors duration-300">
                                <FaInstagram className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="text-center">
                        <p className="text-[#9CA3AF] text-base">
                            © 2025 Peak Wellness by Scott. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;