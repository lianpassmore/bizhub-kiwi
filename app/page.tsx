import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import { CheckCircle, Zap, Shield, MapPin } from 'lucide-react';

const MASONRY_IMAGES = [
  "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=500&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
  "https://images.unsplash.com/photo-1595475207225-428b62bda831?w=500&q=80",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80",
  "https://images.unsplash.com/photo-1521791136064-79858cfd7cdc?w=500&q=80",
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&q=80",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFDF9] text-slate-900 font-sans selection:bg-neon-pink selection:text-white">
      <Navbar />

      {/* BACKGROUND GRID PATTERN */}
      <div className="absolute inset-0 z-0 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)', 
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-purple-600">
                  LOCAL BIZ.
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium max-w-lg">
                The anti-corporate directory. <br/>
                No Ads. No Algorithms. Just <span className="font-black bg-neon-cyan/30 px-1 border-b-2 border-neon-cyan">10,000+ Kiwi Legends</span> doing their thing.
              </p>

              {/* SEARCH BAR ANCHOR */}
              <div className="relative z-20 transform md:-rotate-1 transition-transform hover:rotate-0 duration-300">
                <SearchBar />
              </div>
              
              {/* TRUST PILLS */}
              <div className="mt-12 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider text-slate-900">
                <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-full shadow-sm hover:-translate-y-1 transition-transform cursor-default">
                   <CheckCircle className="w-4 h-4 text-green-600" /> Verified Listings
                </div>
                <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-full shadow-sm hover:-translate-y-1 transition-transform cursor-default">
                   <Shield className="w-4 h-4 text-purple-600" /> Ad-Free Zone
                </div>
                <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-full shadow-sm hover:-translate-y-1 transition-transform cursor-default">
                   <MapPin className="w-4 h-4 text-red-600" /> 100% Kiwi
                </div>
              </div>
            </div>

            {/* RIGHT: MASONRY GRID (FIXED STYLE) */}
            <div className="hidden lg:flex gap-6 h-[650px] overflow-hidden relative -right-10">
              
              {/* Column 1 */}
              <div className="flex flex-col gap-6 animate-scroll-up w-1/2">
                {[...MASONRY_IMAGES, ...MASONRY_IMAGES].map((src, i) => (
                  <div key={i} className="w-full aspect-[4/5] bg-white rounded-xl overflow-hidden border-2 border-black shadow-pop">
                    <img src={src} alt="Business" className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500" />
                  </div>
                ))}
              </div>
              
              {/* Column 2 */}
              <div className="flex flex-col gap-6 animate-scroll-down mt-12 w-1/2">
                {[...MASONRY_IMAGES, ...MASONRY_IMAGES].reverse().map((src, i) => (
                  <div key={i} className="w-full aspect-[4/5] bg-white rounded-xl overflow-hidden border-2 border-black shadow-pop">
                    <img src={src} alt="Business" className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500" />
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