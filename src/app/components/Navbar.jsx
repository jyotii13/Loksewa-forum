"use client"
import Link from 'next/link';
import React, { useState } from 'react'

const Navbar = () => {

    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    return (

        <nav className="flex items-center justify-between px-30 py-2 bg-white shadow">
            <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="Loksewa Logo" className="w-14 h-14" />
            </div>

            <ul className="flex space-x-5">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/exam">Exam</Link>
                </li>
                <li>
                    <Link href="/gold-partner">GoldPartner</Link>
                </li>
                <li>
                    <Link href="/notice">Notice</Link>
                </li>
                <li>
                    <Link href="/blog">Blog</Link>
                </li>
                <li>
                    <Link href="/forum">Forum</Link>
                </li>
                <li>
                    <Link href="/pricing">Pricing</Link>
                </li>
                <li>
                    <Link href="/news">News</Link>
                </li>
            </ul>
        </nav>

    )
}

export default Navbar