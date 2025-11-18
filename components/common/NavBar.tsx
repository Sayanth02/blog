"use client"
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Button from "./Button";

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: "All Articles", href: "/posts" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="w-full h-20 text-gray-50 flex justify-between items-center px-6 md:px-16 py-2  sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        {/* Left side - Nav links (desktop only) */}
        <ul className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-neutral-900 hover:text-neutral-900 transition-colors text-lg font-medium"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger menu (mobile only) */}
        <button
          className="md:hidden z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          type="button"
        >
          {isOpen ? (
            // <IoClose className="text-neutral-800 text-2xl" />
            <span>close</span>
          ) : (
            // <GiHamburgerMenu className="text-neutral-800 text-2xl" />
            <span>Menu</span>
          )}
        </button>

        {/* Center - Logo (truly centered) */}
        <Link
          href="/"
          className="absolute left-1/2 transform -translate-x-1/2 text-4xl text-neutral-800 font-bold logo"
        >
          <h1>The localhost</h1>
        </Link>

        <Button  label="Subscribe" />
      </nav>

      {/* Horizontal line - not full width */}
      <hr className="border-neutral-300 mx-auto w-[95%]" />

      {/* Mobile menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          {/* Menu */}
          <div className="fixed top-16 left-0 w-full bg-white shadow-md py-6 z-40 md:hidden animate-slideDown">
            <ul className="flex flex-col space-y-4 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-700 hover:text-neutral-900 transition-colors text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
