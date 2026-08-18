import React from "react";
import Link from "next/link";
import { Mail, MapPin, Send, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0b1626] text-gray-300 mt-12 pt-12 pb-6 border-t border-[#1a2b49]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-xs">
        {/* Brand */}
        <div className="space-y-3">
          <h4 className="text-white text-sm font-serif tracking-wider uppercase font-semibold">
            Studying in Yemen
          </h4>
          <p className="text-gray-400 leading-relaxed">
            Connecting seekers with authentic knowledge across Yemen.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h4 className="text-white uppercase font-medium tracking-wider text-[11px]">
            Quick Links
          </h4>
          <ul className="space-y-1.5 text-gray-400">
            <li>
              <Link
                href="/marakiz"
                className="hover:text-white transition-colors"
              >
                Marakiz & Masajid
              </Link>
            </li>
            <li>
              <Link href="/tips" className="hover:text-white transition-colors">
                Tips for Students
              </Link>
            </li>
            <li>
              <Link
                href="/apply"
                className="hover:text-white transition-colors"
              >
                How to Apply
              </Link>
            </li>
            <li>
              <Link
                href="/portal"
                className="hover:text-white transition-colors"
              >
                Student Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <h4 className="text-white uppercase font-medium tracking-wider text-[11px]">
            Contact
          </h4>
          <div className="space-y-1.5 text-gray-400">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              <span>info@studyinginyemen.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Yemen</span>
            </div>
          </div>
        </div>

        {/* Telegram */}
        <div className="space-y-2">
          <h4 className="text-white uppercase font-medium tracking-wider text-[11px]">
            Telegram
          </h4>
          <div className="space-y-1 text-gray-400">
            <div className="flex items-center gap-2 text-white">
              <Send className="w-3.5 h-3.5" />
              <Link
                href="https://t.me/studyinginyemen"
                target="_blank"
                className="hover:underline"
              >
                t.me/studyinginyemen
              </Link>
            </div>
            <p className="text-gray-400">Updates & Announcements</p>
          </div>
        </div>

        {/* Follow Us */}
        <div className="space-y-2">
          <h4 className="text-white uppercase font-medium tracking-wider text-[11px]">
            Follow Us
          </h4>
          <div className="space-y-1.5 text-gray-400">
            <div className="flex items-center gap-2">
              <Send className="w-3.5 h-3.5" />
              <Link
                href="https://t.me/studyinginyemen"
                target="_blank"
                className="hover:text-white"
              >
                t.me/studyinginyemen
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" />
              <Link
                href="https://studyinginyemen.com"
                className="hover:text-white"
              >
                studyinginyemen.com
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 gap-4">
        <p>© 2024 Studying in Yemen. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-gray-300">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-300">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
