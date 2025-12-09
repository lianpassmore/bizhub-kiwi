import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import { CheckCircle, Zap, Shield, Heart } from 'lucide-react';

const MASONRY_IMAGES = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80", // Business team meeting
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80", // Modern office
  "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=500&q=80", // Open office space
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80", // Business analytics
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80", // Team collaboration
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80", // People working
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-neon-yellow selection:text-black">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        
        {/* Subtle Background Pattern (Dot Grid) */}
        <div className="absolute inset-0 z-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text & Search */}
            <div className="max-w-2xl">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-widest mb-8 text-slate-600 shadow-sm">
                <Zap className="w-4 h-4 text-neon-yellow fill-neon-yellow" /> 
                Powered by Locals
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-slate-900">
                The Hub for <br />
                <span className="relative whitespace-nowrap">
                  <span className="absolute -inset-1 bg-neon-cyan/30 -skew-y-2 rounded-lg block"></span>
                  <span className="relative text-slate-900">Local Business</span>
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                Professional mini-websites for <span className="font-bold text-slate-900 bg-neon-yellow/30 px-1 rounded">10,000+ Kiwi Businesses</span>. 
                Fast, mobile-friendly, and searchable.
              </p>

              {/* Search Bar Container */}
              <div className="relative z-20">
                <SearchBar />
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center gap-6 text-sm font-bold text-slate-500">
                <span className="flex items-center gap-2">
                   <div className="p-1 bg-green-100 rounded-full text-green-600"><CheckCircle className="w-4 h-4" /></div>
                   Verified Listings
                </span>
                <span className="flex items-center gap-2">
                   <div className="p-1 bg-purple-100 rounded-full text-purple-600"><Shield className="w-4 h-4" /></div>
                   Ad-Free Zone
                </span>
                <span className="flex items-center gap-2">
                   <div className="p-1 bg-red-100 rounded-full text-red-600"><Heart className="w-4 h-4" /></div>
                   100% Kiwi Owned
                </span>
              </div>
            </div>

            {/* Right: Masonry Grid (Clean Cards) */}
            <div className="hidden lg:flex gap-4 h-[600px] overflow-hidden">
              {/* Column 1 */}
              <div className="flex flex-col gap-4 animate-scroll-up">
                {[...MASONRY_IMAGES, ...MASONRY_IMAGES].map((src, i) => (
                  <div key={i} className="w-48 h-64 rounded-2xl overflow-hidden border-4 border-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <img src={src} alt="Business" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              
              {/* Column 2 */}
              <div className="flex flex-col gap-4 animate-scroll-down mt-12">
                {[...MASONRY_IMAGES, ...MASONRY_IMAGES].reverse().map((src, i) => (
                  <div key={i} className="w-48 h-64 rounded-2xl overflow-hidden border-4 border-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <img src={src} alt="Business" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}