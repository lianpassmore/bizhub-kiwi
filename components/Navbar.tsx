'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-night-950/90 backdrop-blur-md z-50 border-b border-white/10 selection:bg-neon-pink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* 1. LOGO */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="text-3xl font-black text-white tracking-tighter hover:scale-105 transition-transform">
              BizHub<span className="text-neon-yellow">.kiwi</span>
            </Link>
          </div>

          {/* 2. DESKTOP LINKS (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-gray-300 hover:text-neon-cyan font-bold text-sm uppercase tracking-widest transition">
              Search
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-neon-yellow font-bold text-sm uppercase tracking-widest transition">
              About
            </Link>
            <Link href="/community" className="text-gray-300 hover:text-neon-purple font-bold text-sm uppercase tracking-widest transition">
              Community
            </Link>
            <div className="h-6 w-px bg-white/10"></div> {/* Separator Line */}
            <Link href="/login" className="text-gray-300 hover:text-white font-bold text-sm uppercase tracking-widest transition">
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="bg-neon-pink text-white px-6 py-2.5 rounded-none -skew-x-12 border border-neon-pink hover:bg-transparent hover:text-neon-pink hover:shadow-[0_0_15px_rgba(255,0,153,0.5)] transition-all duration-300 font-black uppercase tracking-wider"
            >
              <span className="skew-x-12 inline-block">Get Listed</span>
            </Link>
          </div>

          {/* 3. MOBILE MENU BUTTON (Visible on Mobile) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="md:hidden bg-night-950 border-t border-white/10 absolute w-full left-0">
          <div className="px-4 pt-4 pb-8 space-y-4 flex flex-col items-center">
            <Link
              href="/search"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-gray-300 hover:text-neon-cyan font-bold uppercase tracking-widest hover:bg-white/5 rounded-lg transition"
            >
              Search Directory
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-gray-300 hover:text-neon-yellow font-bold uppercase tracking-widest hover:bg-white/5 rounded-lg transition"
            >
              About
            </Link>
            <Link
              href="/community"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-gray-300 hover:text-neon-purple font-bold uppercase tracking-widest hover:bg-white/5 rounded-lg transition"
            >
              Community
            </Link>
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-gray-300 hover:text-white font-bold uppercase tracking-widest hover:bg-white/5 rounded-lg transition"
            >
              Log In
            </Link>
            <Link 
              href="/signup" 
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-4 bg-neon-pink text-white font-black uppercase tracking-wider shadow-lg shadow-neon-pink/20 rounded-lg"
            >
              Get Listed Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}