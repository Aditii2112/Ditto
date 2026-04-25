"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#3B3A2F] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-2xl font-light tracking-[0.15em]"
        >
          DITTO
        </Link>

        <div className="hidden items-center gap-8 text-sm tracking-wide md:flex">
          <Link href="#" className="opacity-80 transition hover:opacity-100">
            SHOP
          </Link>
          <Link href="#" className="opacity-80 transition hover:opacity-100">
            INGREDIENTS
          </Link>
          <Link href="#" className="opacity-80 transition hover:opacity-100">
            OUR SCIENCE
          </Link>
          <Link
            href="/"
            className="border-b border-white/60 pb-0.5 opacity-100"
          >
            GIVE 20%, GET 20%
          </Link>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <button aria-label="Search" className="opacity-80 hover:opacity-100">
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button aria-label="Account" className="opacity-80 hover:opacity-100">
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button aria-label="Cart" className="opacity-80 hover:opacity-100">
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4 text-sm tracking-wide">
            <Link href="#">SHOP</Link>
            <Link href="#">INGREDIENTS</Link>
            <Link href="#">OUR SCIENCE</Link>
            <Link href="/" className="font-medium">
              GIVE 20%, GET 20%
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
