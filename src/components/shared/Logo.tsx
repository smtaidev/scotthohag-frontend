import React from 'react';
import logo from "@/assets/logo/logo.png"
import Image from 'next/image';
import Link from 'next/link';


const Logo = (
    { className = "w-[10rem] h-[6rem] object-contain " }
) => {
    return (
        <Link href={"/"}>
            <Image alt='' src={logo} width={200} height={200} className={`${className}`} />
        </Link>
    );
};

export default Logo;