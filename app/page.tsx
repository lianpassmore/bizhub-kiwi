import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import { CheckCircle, Zap, Shield, MapPin } from 'lucide-react';

const MASONRY_IMAGES = [
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&q=80",
  "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=500&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80",
  "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=500&q=80",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFDF9] text-slate-900 font-sans selection:bg-neon-pink selection:text-white">
      <Navbar />

      {/* BACKGROUND GRID PATTERN (Subtle Texture) */}
      <div className="absolute inset-0 z-0 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', 
             backgroundSize: '24px 24px' 
           }}>
      </div>

      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT: CONTENT */}
            <div className="max-w-2xl relative">
              
              {/* Floating Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-yellow border-2 border-black rounded-lg text-xs font-black uppercase tracking-widest mb-8 shadow-pop transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
                <Zap className="w-4 h-4 text-black fill-black" /> 
                Powered by Locals
              </div>

<h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-slate-900">
                THE HUB FOR <br />
                {/* CHANGED: Gradient from Pink/Purple -> Cyan/Blue */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-600">
                  LOCAL BIZ.
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium max-w-lg">
                The anti-corporate directory. <br/>
                No Ads. No Algorithms. Just <span className="font-black bg-neon-cyan/30 px-1 border-b-2 border-neon-cyan">10,000+ Kiwi Legends</span> doing their thing.
              </p>

              {/* SEARCH BAR ANCHOR (Slight Rotation for Style) */}
              <div className="relative z-20 transform md:-rotate-1 transition-transform hover:rotate-0 duration-300">
                <SearchBar />
              </div>
              
              {/* TRUST PILLS (Tactile Style) */}
              <div className="mt-12 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider text-slate-900">
                <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-full shadow-sm hover:-translate-y-1 transition-transform cursor-default">
                   <CheckCircle className="w-4 h-4 text-green-600" /> Verified Listings
                </div>
                <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-full shadow-sm hover:-translate-y-1 transition-transform cursor-default">
                   <Shield className="w-4 h-4 text-purple-600" /> Ad-Free Zone
                </div>
                <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-full shadow-sm hover:-translate-y-1 transition-transform cursor-default">
                   <MapPin className="w-4 h-4 text-red-500" /> 100% Kiwi
                </div>
              </div>
            </div>

            {/* RIGHT: MASONRY GRID (Tactile/Card Style) */}
            <div className="hidden lg:flex gap-6 h-[650px] overflow-hidden relative -right-10">
              
              {/* Column 1 */}
              <div className="flex flex-col gap-6 animate-scroll-up w-1/2">
                {[...MASONRY_IMAGES, ...MASONRY_IMAGES].map((src, i) => (
                  <div key={i} className="w-full aspect-[4/5] bg-slate-100 rounded-xl overflow-hidden border-2 border-black shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                    <img
                      src={src}
                      alt="Local Business"
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
                    />
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-6 animate-scroll-down mt-12 w-1/2">
                {[...MASONRY_IMAGES, ...MASONRY_IMAGES].reverse().map((src, i) => (
                  <div key={i} className="w-full aspect-[4/5] bg-slate-100 rounded-xl overflow-hidden border-2 border-black shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                    <img
                      src={src}
                      alt="Local Business"
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
                    />
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