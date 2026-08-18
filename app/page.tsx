import React from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  MosqueIcon, 
  FileText, 
  ClipboardCheck, 
  Laptop,
} from "lucide-react";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

export default function Home() {
  const quickCards = [
    {
      title: "Marakiz & Masajid",
      desc: "Browse marakiz and masajid throughout Yemen.",
      icon: MosqueIcon,
      href: "/marakiz",
    },
    {
      title: "Tips for Students",
      desc: "Practical guidance for students of knowledge.",
      icon: FileText,
      href: "/tips",
    },
    {
      title: "How to Apply",
      desc: "Step-by-step help for preparation and arrival.",
      icon: ClipboardCheck,
      href: "/apply",
    },
    {
      title: "Student Portal",
      desc: "Registration and student resources.",
      icon: Laptop,
      badge: "Coming Soon",
      href: "/portal",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1a2b49] font-sans antialiased flex flex-col justify-between">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <HeroSection />

      {/* --- QUICK ACTION CARDS --- */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link 
                key={index} 
                href={card.href}
                className="group relative bg-[#faf9f6] hover:bg-[#F2ECE0] rounded-2xl border border-[#E9E1D2] p-5 flex items-start justify-between transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 border border-[#d8ccb8] rounded bg-white/60 text-[#1a2b49] group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 stroke-[1.4]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-semibold text-[#1a2b49] tracking-tight">{card.title}</h2>
                      {card.badge && (
                        <span className="text-[10px] bg-[#9a7650] text-white px-2 py-0.5 rounded-full font-medium">
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all self-end mb-1" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* --- FEATURED VISUAL CARDS --- */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Life in Yemen */}
          <Link href="/life-in-yemen" className="group relative h-48 rounded-lg overflow-hidden shadow-sm">
            <Image 
              src="/life_in_yemen.jpg" 
              alt="Life in Yemen" 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <h3 className="font-serif text-lg font-medium">Life in Yemen</h3>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Married in Yemen */}
          <Link href="/married-in-yemen" className="group relative h-48 rounded-lg overflow-hidden shadow-sm">
            <Image 
              src="/married_in_yemen.png" 
              alt="Married in Yemen" 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <h3 className="font-serif text-lg font-medium">Married in Yemen</h3>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: ALHAJURI.ORG */}
          <Link href="https://alhajuri.org" target="_blank" className="group relative h-48 rounded-lg overflow-hidden shadow-sm bg-linear-to-tr from-[#3b434c] to-[#606b78] p-4 flex flex-col justify-between text-white border border-gray-600/30">
            <Image 
              src="/alhajuri_org.png" 
              alt="ALHAJURI.ORG" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <h3 className="font-serif text-lg font-medium">ALHAJURI.ORG</h3>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Scholars of Yemen */}
          <Link href="/scholars" className="group relative h-48 rounded-lg overflow-hidden shadow-sm">
            <Image 
              src="/scholars_of_yemen.png" 
              alt="Scholars of Yemen" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <h3 className="font-serif text-lg font-medium">Scholars of Yemen</h3>
                <p className="text-[11px] text-gray-300">Browse the scholars of Yemen.</p>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform mb-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}