import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';

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
    <main className="min-h-screen relative bg-night-950 selection:bg-neon-pink selection:text-white">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0"></div>
      
      {/* Background Gradient Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-neon-purple opacity-20 blur-[120px] rounded-full z-0"></div>

      <Navbar />

      {/* HERO SECTION */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden z-10">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text & Search */}
            <div className="max-w-2xl relative">
              {/* Glowing Badge */}
              <div className="inline-block px-4 py-1 rounded-full border border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan font-bold text-sm mb-6 shadow-neon-cyan">
                ⚡ POWERED BY KIWIS
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
                THE HUB FOR <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-pink to-neon-cyan drop-shadow-lg">
                  LOCAL BUSINESS
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed border-l-4 border-neon-yellow pl-4">
                Professional mini-websites for <span className="text-neon-yellow font-bold">10,000+ Kiwi Businesses</span>. 
                Fast, mobile-friendly, and searchable.
              </p>

              {/* The New Dark Search Bar */}
              <SearchBar />
              
              <div className="mt-8 flex items-center gap-6 text-sm font-bold tracking-wide">
                <span className="flex items-center gap-2 text-neon-cyan">
                   🚀 INSTANT LAUNCH
                </span>
                <span className="flex items-center gap-2 text-neon-pink">
                   💎 NO ADS
                </span>
                <span className="flex items-center gap-2 text-neon-yellow">
                   🥝 100% KIWI
                </span>
              </div>
            </div>

            {/* Right: Masonry Grid (Now with Neon Borders) */}
            <div className="hidden lg:flex gap-4 h-[600px] overflow-hidden mask-image-gradient">
              {/* Column 1 */}
              <div className="flex flex-col gap-4 animate-scroll-up">
                {[...MASONRY_IMAGES, ...MASONRY_IMAGES].map((src, i) => (
                  <div key={i} className="w-48 h-64 rounded-xl overflow-hidden border-2 border-night-800 hover:border-neon-cyan transition-all duration-300 shadow-lg relative group">
                    <div className="absolute inset-0 bg-neon-purple/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src={src} alt="Business" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                ))}
              </div>
              
              {/* Column 2 */}
              <div className="flex flex-col gap-4 animate-scroll-down mt-12">
                {[...MASONRY_IMAGES, ...MASONRY_IMAGES].reverse().map((src, i) => (
                  <div key={i} className="w-48 h-64 rounded-xl overflow-hidden border-2 border-night-800 hover:border-neon-pink transition-all duration-300 shadow-lg relative group">
                    <div className="absolute inset-0 bg-neon-purple/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src={src} alt="Business" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
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