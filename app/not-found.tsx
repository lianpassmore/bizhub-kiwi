import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col items-center justify-center p-4 text-center selection:bg-neon-pink selection:text-white relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', 
             backgroundSize: '24px 24px' 
           }}>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Massive 404 with Hard Shadow */}
        <h1 className="text-[120px] md:text-[180px] font-black text-slate-900 leading-none select-none drop-shadow-[6px_6px_0px_#FF0099] mb-[-40px] z-0">
          404
        </h1>
        
        {/* The Card Container */}
        <div className="bg-white border-2 border-black p-8 md:p-12 rounded-2xl shadow-pop relative z-10 max-w-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">
            Lost in the Bush?
          </h2>
          
          <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
            We couldn't find the page you were looking for. It might have gone surfing, grabbed a flat white, or is just stuck in traffic on the Southern Motorway.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="bg-neon-cyan text-slate-900 border-2 border-black font-black py-4 px-8 rounded-xl hover:bg-white hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all shadow-pop uppercase tracking-wider"
            >
              Go Home
            </Link>
            <Link 
              href="/search"
              className="bg-white text-slate-900 border-2 border-black font-black py-4 px-8 rounded-xl hover:bg-slate-50 hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all shadow-pop uppercase tracking-wider"
            >
              Search Directory
            </Link>
          </div>
        </div>

        <div className="mt-12 text-6xl animate-bounce cursor-default hover:scale-110 transition-transform">
          🥝
        </div>

      </div>
    </div>
  );
}