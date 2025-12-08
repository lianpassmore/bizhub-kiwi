import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-night-950 flex flex-col items-center justify-center p-4 text-center selection:bg-neon-pink">
      
      {/* Glitch Effect Text */}
      <h1 className="text-[150px] font-black text-transparent bg-clip-text bg-linear-to-r from-neon-pink to-neon-purple leading-none select-none opacity-50">
        404
      </h1>
      
      <h2 className="text-4xl font-bold text-white mb-6 uppercase tracking-tight relative z-10 -mt-10">
        Lost in the Bush?
      </h2>
      
      <p className="text-xl text-gray-400 max-w-md mb-8">
        We couldn't find the page you were looking for. It might have gone surfing or grabbed a flat white.
      </p>

      <div className="flex gap-4">
        <Link 
          href="/"
          className="bg-neon-cyan text-night-950 font-black py-3 px-8 rounded-xl hover:bg-white transition shadow-lg shadow-neon-cyan/20"
        >
          GO HOME
        </Link>
        <Link 
          href="/search"
          className="border border-white/20 text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition"
        >
          SEARCH DIRECTORY
        </Link>
      </div>

      <div className="mt-20 opacity-20 animate-pulse">
        🥝
      </div>
    </div>
  );
}