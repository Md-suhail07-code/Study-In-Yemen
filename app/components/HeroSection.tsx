import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-[#F7F5F2] overflow-hidden">
      {/* subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/islamic-pattern.svg')] bg-repeat" />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 lg:pt-10 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4 z-10">
            {/* Logo with horizontal lines */}
            <div className="flex items-center justify-center gap-3 w-full max-w-sm">
              <hr className="flex-1 border-t border-[#967850]/40" />
              <div className="w-12 h-12 flex items-center justify-center border-[#d6c7b2] rounded-full p-1.5 bg-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-7 h-7 text-[#1c2e4a]"
                >
                  <path
                    d="M4 19.5C4 18.8 5.3 18 12 18s8 0.8 8 1.5V20H4v-0.5z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 2L3 7v11c0 1.1 3.6 2 9 2s9 -0.9 9 -2V7L12 2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path d="M12 6v12" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <hr className="flex-1 border-t border-[#967850]/40" />
            </div>

            {/* Title */}
            <div className="pt-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-[0.2em] uppercase text-[#101f33] font-normal leading-tight">
                STUDYING
              </h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-[#967850] text-xs">◆</span>
                <p className="text-lg sm:text-xl text-[#967850] font-serif tracking-[0.25em] uppercase">
                  IN YEMEN
                </p>
                <span className="text-[#967850] text-xs">◆</span>
              </div>
            </div>

            {/* Horizontal strokes */}
            <div className="flex items-center justify-center">
              <hr className="w-20 flex-1 border-t border-[#967850]/40" />
              <span className="text-[#967850] text-xs">◆</span>
              <hr className="w-20 flex-1 border-t border-[#967850]/40" />
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed max-w-md pt-1">
              A trusted platform dedicated to authentic Islamic knowledge and
              supporting students on their journey.
            </p>

            <div className="flex items-center justify-center">
              <hr className="w-36 flex-1 border-t border-[#967850]/40" />
              <span className="text-[#967850] text-xs">◆</span>
              <hr className="w-36 flex-1 border-t border-[#967850]/40" />
            </div>

            {/* Arabic Quote */}
            <div className="pt-1">
              <p className="font-serif text-xl text-[#b8a07e] tracking-wide">
                طلب العلم فريضة على كل مسلم
              </p>
              <p className="text-[9px] tracking-[0.25em] text-[#9b8565] uppercase mt-0.5 font-semibold">
                Seeking knowledge is a duty upon every Muslim
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-3 w-full justify-center">
              <Link
                href="/apply"
                className="flex items-center justify-center gap-2 bg-[#0d1f35] text-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider hover:bg-[#183457] transition-all"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/learn-more"
                className="flex items-center justify-center gap-2 border border-[#d1c7b7] bg-white text-gray-800 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider hover:bg-gray-50 transition-all"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE - Breaks out of container */}
          <div className="hidden lg:block lg:col-span-7 absolute top-0 right-0 h-full w-[55%] lg:w-[58%]">
            {/* Curved container flush to edge */}
            <div className="absolute inset-0 rounded-l-[240px] lg:rounded-l-[300px] overflow-hidden">
              <Image
                src="/hero_image_2.png"
                alt="Architecture of Old Sana'a Yemen"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-l from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
