'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO - Keep the pink dot as a subtle nod to Penny */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="text-3xl font-black text-slate-900 tracking-tighter">
              BizHub<span className="text-neon-pink">.kiwi</span>
            </Link>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-slate-600 hover:text-slate-900 font-bold text-sm uppercase tracking-widest transition">
              Search
            </Link>
            <Link href="/community" className="text-slate-600 hover:text-slate-900 font-bold text-sm uppercase tracking-widest transition">
              Community
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 font-bold text-sm uppercase tracking-widest transition">
              About
            </Link>
            <div className="h-6 w-px bg-slate-200"></div>
            <Link href="/login" className="text-slate-900 font-bold text-sm uppercase tracking-widest transition hover:opacity-70">
              Log in
            </Link>
            {/* BUTTON CHANGED: Pink -> Black (More neutral/masculine) */}
            <Link 
              href="/signup" 
              className="bg-slate-900 text-white px-6 py-3 rounded-lg border-2 border-slate-900 hover:bg-white hover:text-slate-900 transition-all duration-300 font-black uppercase tracking-wider shadow-md hover:shadow-lg"
            >
              Get Listed
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-xl">
          <div className="px-4 pt-4 pb-8 space-y-4 flex flex-col items-center">
            <Link href="/search" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 text-slate-600 font-bold uppercase tracking-widest">Search</Link>
            <Link href="/community" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 text-slate-600 font-bold uppercase tracking-widest">Community</Link>
            <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 text-slate-900 font-bold uppercase tracking-widest">Log In</Link>
            {/* MOBILE BUTTON CHANGED */}
            <Link href="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center py-4 bg-slate-900 text-white font-black uppercase tracking-wider rounded-lg">Get Listed Now</Link>
          </div>
        </div>
      )}
    </nav>
  );
}