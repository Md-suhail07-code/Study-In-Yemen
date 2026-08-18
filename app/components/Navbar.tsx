"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Marakiz & Masajid", href: "/marakiz" },
  { name: "Tips for Students", href: "/tips" },
  { name: "How to Apply", href: "/apply" },
  { name: "Student Portal", href: "/portal" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16 lg:h-20">

        {/* Logo */}
        <Link href="/" className="text-lg sm:text-xl lg:text-2xl text-[#1a2b49] font-display tracking-widest font-normal uppercase select-none">
          STUDYING IN YEMEN
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-x-8 font-sans text-[13px] font-medium text-gray-600 tracking-wide">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="cursor-pointer hover:text-black transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side: Auth + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Desktop Auth */}
          <header className="hidden lg:flex items-center h-full">
            <Show when="signed-out">
              <div className="flex items-center gap-x-4">
                <SignInButton mode="redirect">
                  <button className="font-sans text-xs font-semibold text-gray-700 hover:text-black cursor-pointer px-3 py-2 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="redirect">
                  <button className="bg-[#0c1d33] text-white font-sans text-[11px] uppercase font-medium tracking-widest h-10 px-6 hover:bg-[#152e52] transition-all cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </Show>

            <Show when="signed-in">
              <div className="flex items-center pl-4 border-l border-gray-200">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8"
                    }
                  }}
                />
              </div>
            </Show>
          </header>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-black"
            aria-label="Toggle menu"
          >
            {isOpen? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <ul className="flex flex-col px-4 py-4 space-y-1 font-sans text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-2 rounded-md hover:bg-gray-50 hover:text-black transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Auth */}
          <div className="border-t border-gray-100 px-4 py-4">
            <Show when="signed-out">
              <div className="flex flex-col gap-3">
                <SignInButton mode="redirect">
                  <button className="w-full text-center font-sans text-sm font-semibold text-gray-700 border border-gray-300 rounded-md py-2 hover:bg-gray-50">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="redirect">
                  <button className="w-full bg-[#0c1d33] text-white font-sans text-sm uppercase font-medium tracking-widest rounded-md py-2.5 hover:bg-[#152e52]">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </Show>

            <Show when="signed-in">
              <div className="flex items-center gap-3">
                <UserButton />
                <span className="text-sm text-gray-600">Account</span>
              </div>
            </Show>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;