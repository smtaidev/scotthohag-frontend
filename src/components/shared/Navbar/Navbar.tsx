'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaUser, FaTimes, FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Logo';
import { useGetMeQuery } from '@/redux/api/getMe/getMeApi';

const navItems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Services', link: '/services' },
    { name: 'Specialty', link: '/specialty' },
    { name: 'Subscription', link: '/subscription' },
    { name: 'Contact', link: '/contact' },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("/");
    const [isScrolled, setIsScrolled] = useState(false);
    const main = useRef<HTMLDivElement>(null);


    const { data: userInfo } = useGetMeQuery({});
    console.log(userInfo?.data)

    // Set active item based on current path
    useEffect(() => {
        const currentPath = window.location.pathname;
        const active = navItems.find(item => item.link === currentPath);
        if (active) {
            setActiveItem(active.link);
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (main.current && !main.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle scroll for navbar style
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleItemClick = (link: string) => {
        setActiveItem(link);
        setMenuOpen(false);
    };

    return (
        <div ref={main} className={`bg-primary py-3 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
            <nav className="text-white flex items-center justify-between max-w-10/12 mx-auto px-4">
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <Logo className='h-[74px] w-[89px]' />
                </div>

                {/* Navigation Links */}
                <ul className="hidden lg:flex gap-10 text-sm font-bold">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.link}
                                className={`transition-all duration-300 py-2 relative ${activeItem === item.link ? 'text-secondary font-bold' : 'hover:text-secondary'}`}
                                onClick={() => handleItemClick(item.link)}
                            >
                                <p className='text-[16px]'>{item.name}</p>

                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Side Buttons */}
                <div className="flex items-center gap-4">
                    {!userInfo?.data ?
                        <Link href={"/signIn"} className="bg-secondary hover:bg-green-600 text-white px-4 py-2 rounded-md text-xs md:text-lg font-semibold transition-colors cursor-pointer">
                            Sign Up
                        </Link> : <div className='cursor-pointer hover:bg-gray-200/20 p-2 transition rounded-full '>
                            <FaUser className='size-6 ' />
                        </div>}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden text-xl p-2"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                </div>

            </nav>

            {/* Mobile Menu with Animation */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="absolute top-full left-0 w-full bg-[#0A2540] text-white flex flex-col items-center py-4 lg:hidden z-50 shadow-lg"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.link}
                                className={`py-3 text-sm w-full text-center transition-all duration-200 ${activeItem === item.link ? 'text-secondary font-semibold bg-[#0d3456]' : 'hover:text-green-400'}`}
                                onClick={() => handleItemClick(item.link)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}