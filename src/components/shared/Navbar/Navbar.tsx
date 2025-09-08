'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaUser, FaTimes, FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Logo';
import { useGetMeQuery } from '@/redux/api/getMe/getMeApi';
import { div } from 'framer-motion/client';
import Cookies from 'js-cookie';
import { useLogoutMutation } from '@/redux/api/auth/authApi';
import { useRouter } from 'next/navigation';
import { useCreateSubscriptionMutation, useGetMyPlanQuery } from '@/redux/api/plan/planSlice';
import { toast } from 'sonner';

const navItems = [
    { name: 'Home', link: '/#' },
    { name: 'About', link: '/#about' },
    { name: 'Services', link: '/#services' },
    { name: 'Specialty', link: '/#specialty' },
    { name: 'Subscription', link: '/#subscription' },
    { name: 'Contact', link: '/#contact' },
];

const profile = [
    { name: 'Profile', link: '/health-report' },
    { name: 'Log Out', link: '/' },

];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("/");
    const [isScrolled, setIsScrolled] = useState(false);
    const main = useRef<HTMLDivElement>(null);
    const prof = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const { data: userInfo } = useGetMeQuery({});
    const [logout] = useLogoutMutation()
    const { data: planInfo, refetch } = useGetMyPlanQuery({});
    const { data: user } = useGetMeQuery({})
    console.log(planInfo)
    const [createSubs] = useCreateSubscriptionMutation()
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
                setMenuOpen(false);
            }
        };

        const handleClickOutside2 = (event: MouseEvent) => {
            if (prof.current && !prof.current.contains(event.target as Node)) {

                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("mousedown", handleClickOutside2);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("mousedown", handleClickOutside2);
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

    const handleItemClick = async (link: string) => {
        setActiveItem(link);
        setProfileOpen(false);
        setMenuOpen(false)

        if (link === "/") {
            const res = await logout({});
            Cookies.remove("accessToken", { path: "/" });
            console.log(res)


            window.location.reload();
            setTimeout(() => {

                window.location.href = "/";
            }, 1000)

        } else {
            router.push(link);
        }

        console.log("My link here", link);
    };

    const handleLogout = async () => {
        const res = await logout({});
        Cookies.remove("accessToken", { path: "/" });
        console.log(res)


        window.location.reload();
        setTimeout(() => {

            window.location.href = "/";
        }, 1000)
    }
    const handlePayment = async () => {

        if (!user?.data) {
            return toast.warning("Create login to subscribe")
        }
        if (user?.data.isPremium) {
            return toast.warning("You have already subscribed!")
        }
        try {
            const res = await createSubs({
                successCallbackUrl: "https://scoothag.code-commando.com/payment-success",
                cancelCallbackUrl: "https://scoothag.code-commando.com/payment-cancel"
            })
            if (res?.data) {
                console.log('Redirecting to:', res.data.data.approveUrl);
                window.open(res.data.data.approveUrl, '_blank');
            }
        } catch (error) {

        }


        // Handle PayPal payment logic here
        console.log('Processing payment...');
    }



    const handleRefetch = () => {
        refetch();

    }

    console.log(userInfo?.data)

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
                    {!userInfo?.data || !userInfo?.data.isPremium ?
                        <div className='flex items-center justify-center gap-2'>
                            {
                                (!userInfo?.data || !userInfo?.data.isPremium) && <button
                                    onClick={handlePayment}
                                    onMouseEnter={() => handleRefetch()}
                                    className="bg-secondary hover:bg-green-600 text-white px-4 py-2 rounded-md text-xs md:text-lg font-semibold transition-colors cursor-pointer"
                                >
                                    Subscribe
                                </button>
                            }
                            {
                                !userInfo?.data ?
                                    <Link href={"/signIn"} className="bg-secondary hover:bg-green-600 text-white px-4 py-2 rounded-md text-xs md:text-lg font-semibold transition-colors cursor-pointer">
                                        Sign In
                                    </Link> : userInfo?.data.role === "ADMIN" ? <>
                                        <div ref={prof} className='relative'>
                                            <div onClick={() => setProfileOpen(!profileOpen)} ref={prof} className='cursor-pointer hover:bg-gray-200/20 p-2 transition rounded-full flex items-center gap-2'>
                                                <p>Hi, {userInfo?.data.name}</p>
                                            </div>
                                            <div
                                                className={`absolute right-0 top-12 min-w-[160px] bg-white/50 backdrop-blur-2xl text-black shadow-lg rounded-md transition-all duration-300 transform z-50 ${profileOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                                    }`}
                                            >
                                                <div className="flex flex-col p-1 divide-y">

                                                    <button

                                                        onClick={() => {
                                                            handleItemClick("/");
                                                            // setDropdownOpen(false); // Close dropdown on link click
                                                        }}
                                                        className={`transition-all duration-200 py-2 px-3  hover:bg-gray-100/20  cursor-pointer
                                                }`}
                                                    >
                                                        Log Out
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </> :
                                        <div ref={prof} className='relative'>
                                            <div onClick={() => setProfileOpen(!profileOpen)} ref={prof} className='cursor-pointer hover:bg-gray-200/20 p-2 transition rounded-full flex items-center gap-2'>
                                                <FaUser className='size-6 ' /> <p>{userInfo?.data.name}</p>
                                            </div>
                                            <div
                                                className={`absolute right-0 top-12 min-w-[160px] bg-white/50 backdrop-blur-2xl text-black shadow-lg rounded-md transition-all duration-300 transform z-50 ${profileOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                                    }`}
                                            >
                                                <div className="flex flex-col p-3 divide-y">
                                                    {profile?.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.link}
                                                            onClick={() => {
                                                                handleItemClick(item.link);
                                                                // setDropdownOpen(false); // Close dropdown on link click
                                                            }}
                                                            className={`transition-all duration-200 py-2 px-3  hover:bg-gray-100/20  ${activeItem === item.link ? "text-secondary font-semibold" : ""
                                                                }`}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                            }

                        </div> : userInfo?.data.role === "ADMIN" ? <>
                            <div ref={prof} className='relative'>
                                <div onClick={() => setProfileOpen(!profileOpen)} ref={prof} className='cursor-pointer hover:bg-gray-200/20 p-2 transition rounded-full flex items-center gap-2'>
                                    <p>Hi, {userInfo?.data.name}</p>
                                </div>
                                <div
                                    className={`absolute right-0 top-12 min-w-[160px] bg-white/50 backdrop-blur-2xl text-black shadow-lg rounded-md transition-all duration-300 transform z-50 ${profileOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                        }`}
                                >
                                    <div className="flex flex-col p-1 divide-y">

                                        <button

                                            onClick={() => {
                                                handleItemClick("/");
                                                // setDropdownOpen(false); // Close dropdown on link click
                                            }}
                                            className={`transition-all duration-200 py-2 px-3  hover:bg-gray-100/20  cursor-pointer
                                                }`}
                                        >
                                            Log Out
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </> :
                            <div ref={prof} className='relative'>
                                <div onClick={() => setProfileOpen(!profileOpen)} ref={prof} className='cursor-pointer hover:bg-gray-200/20 p-2 transition rounded-full flex items-center gap-2'>
                                    <FaUser className='size-6 ' /> <p>{userInfo?.data.name}</p>
                                </div>
                                <div
                                    className={`absolute right-0 top-12 min-w-[160px] bg-white/50 backdrop-blur-2xl text-black shadow-lg rounded-md transition-all duration-300 transform z-50 ${profileOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                        }`}
                                >
                                    <div className="flex flex-col p-3 divide-y">
                                        {profile?.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.link}
                                                onClick={() => {
                                                    handleItemClick(item.link);
                                                    // setDropdownOpen(false); // Close dropdown on link click
                                                }}
                                                className={`transition-all duration-200 py-2 px-3  hover:bg-gray-100/20  ${activeItem === item.link ? "text-secondary font-semibold" : ""
                                                    }`}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}

                                    </div>
                                </div>
                            </div>
                    }
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
                        className="absolute top-full left-0 w-full bg-[#0A2540] text-white flex flex-col items-center py-4 lg:hidden z-30 shadow-lg"
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