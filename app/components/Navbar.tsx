import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-20">
        <div className="text-xl sm:text-2xl text-[#1a2b49] font-display tracking-widest font-normal uppercase select-none">
          STUDYING IN YEMEN
        </div>
        <ul className="hidden md:flex items-center gap-x-8 font-sans text-[13px] font-lg text-gray-600 tracking-wide">
          <li className="cursor-pointer hover:text-black transition-colors">Marakiz & Masajid</li>
          <li className="cursor-pointer hover:text-black transition-colors">Tips for Students</li>
          <li className="cursor-pointer hover:text-black transition-colors">How to Apply</li>
          <li className="cursor-pointer hover:text-black transition-colors">Student Portal</li>
        </ul>
        <header className="flex items-center h-full">
          <Show when="signed-out">
            <div className="flex items-center gap-x-4">
              <SignInButton>
                <button className="font-sans text-xs font-semibold text-gray-700 hover:text-black cursor-pointer px-3 py-2 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-[#0c1d33] text-white font-sans text-xs uppercase font-medium tracking-widest h-10 px-6 hover:bg-[#152e52] transition-all cursor-pointer">
                  Contact
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
      </div>
    </nav>
  );
};

export default Navbar;
