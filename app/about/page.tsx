import Navbar from '@/components/Navbar';
import { Heart, Zap, MessageCircle, MapPin, Users, Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 font-sans selection:bg-[#F2547D] selection:text-white">
      <Navbar />

      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 z-0 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', 
             backgroundSize: '24px 24px' 
           }}>
      </div>

      {/* 1. HERO SECTION: The "Hype Woman" Intro */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden z-10">
        
        {/* Colorful Blurs (Adjusted for Light Mode) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F2547D]/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FDBA74]/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-lg text-xs font-black uppercase tracking-widest mb-6 shadow-pop transform -rotate-1">
              <Heart className="w-4 h-4 text-[#F2547D] fill-[#F2547D]" /> The Heart Behind the Hub
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] mb-6 text-slate-900">
              Kia Ora, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2547D] to-[#FDBA74]">
                I'm Penny.
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed mb-10 border-l-4 border-[#FDBA74] pl-6 font-medium">
              Founder, Storyteller, and your Chief Hype-Woman. I'm here to turn your 9pm notebook scribbles into a real digital presence.
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:pennyrose.mackay@gmail.com" 
                className="bg-[#F2547D] text-white border-2 border-black px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-white hover:text-[#F2547D] transition-all shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                Get in Touch
              </a>
              <Link 
                href="/signup" 
                className="bg-white text-slate-900 border-2 border-black px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-slate-50 transition-all shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                Join the Village
              </Link>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
             <div className="aspect-[4/5] bg-white border-2 border-black rounded-2xl relative overflow-hidden shadow-pop transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                <img
                  src="/penny-headshot.png" // Ensure this file exists in /public folder
                  alt="Penny Mackay"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                />
                
                <div className="absolute bottom-6 left-6 z-20">
                   <h3 className="text-2xl font-black text-white uppercase leading-none mb-1">Penny Mackay</h3>
                   <div className="flex items-center gap-2 text-[#FDBA74] font-bold text-sm bg-black/50 px-2 py-1 rounded w-fit backdrop-blur-sm">
                     <MapPin className="w-4 h-4" /> Whangārei, Northland
                   </div>
                </div>
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FDBA74] rounded-full blur-[60px] opacity-60 z-0"></div>
          </div>

        </div>
      </div>

      {/* 2. THE STORY: Pacific Roots & Storytelling */}
      <div className="bg-white border-y-2 border-black py-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tight">
            Building a Digital <span className="text-[#F2547D] underline decoration-4 decoration-[#FDBA74]">Village</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            Deeply connected to the values of the Pacific: hospitality, warmth, respect, and the concept of a village.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-slate-50 p-8 rounded-2xl border-2 border-black shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all group">
            <div className="w-14 h-14 bg-white border-2 border-black rounded-xl flex items-center justify-center text-[#F2547D] mb-6 group-hover:bg-[#F2547D] group-hover:text-white transition-colors">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 uppercase">15 Years of Storytelling</h3>
            <p className="text-slate-600 font-medium">
              I'm an expert at helping people find their voice. I've spent my career bridging gaps between people and helping them own their narrative.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 p-8 rounded-2xl border-2 border-black shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all group">
            <div className="w-14 h-14 bg-white border-2 border-black rounded-xl flex items-center justify-center text-[#FDBA74] mb-6 group-hover:bg-[#FDBA74] group-hover:text-white transition-colors">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 uppercase">Idea Validation</h3>
            <p className="text-slate-600 font-medium">
              Got a crazy idea? I'm your sounding board. I don't shut ideas down; I help you map them out and see if they've got legs before you spend the cash.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50 p-8 rounded-2xl border-2 border-black shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all group">
            <div className="w-14 h-14 bg-white border-2 border-black rounded-xl flex items-center justify-center text-neon-cyan mb-6 group-hover:bg-neon-cyan group-hover:text-black transition-colors">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 uppercase">The Connector</h3>
            <p className="text-slate-600 font-medium">
              I believe relationships matter more than transactions. BizHub isn't just a directory; it's a movement to stop business isolation.
            </p>
          </div>
        </div>
      </div>

      {/* 3. PERSONAL NOTE: The "Voice" of Penny */}
      <div className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#F2547D] to-[#FDBA74] p-[3px] rounded-2xl shadow-pop transform -rotate-1 hover:rotate-0 transition duration-500">
          <div className="bg-white p-8 md:p-12 rounded-xl text-center h-full relative">
            <div className="text-6xl mb-6">🌺</div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 italic">
              "I'm here for all the random ideas cos that's usually me hahaha."
            </h3>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed font-medium">
              Business can be lonely, eh? Hard out. That's why I wanted to build this. 
              A place where the mahi is shared, the vibes are sweet, and we can all suss out this business journey together.
            </p>
            <p className="font-black text-[#FDBA74] uppercase tracking-widest text-sm bg-slate-900 inline-block px-4 py-1 rounded text-white">
              - Penny Mackay
            </p>
          </div>
        </div>
      </div>

      {/* 4. CONTACT: The "Suss It Out" Section */}
      <div className="max-w-7xl mx-auto px-4 pb-24 text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-12 uppercase">Want to chat? Let's Connect.</h2>
        
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="tel:0212997881" className="flex items-center gap-4 bg-white border-2 border-black px-8 py-6 rounded-2xl shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all group text-left w-full md:w-auto">
             <div className="w-14 h-14 bg-[#F2547D]/10 rounded-full flex items-center justify-center text-[#F2547D] group-hover:bg-[#F2547D] group-hover:text-white transition-colors border-2 border-transparent group-hover:border-black">
               <Phone className="w-7 h-7" />
             </div>
             <div>
               <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Mobile (Texts Welcome)</p>
               <p className="text-2xl font-black text-slate-900">021 299 7881</p>
             </div>
          </a>

          <a href="mailto:pennyrose.mackay@gmail.com" className="flex items-center gap-4 bg-white border-2 border-black px-8 py-6 rounded-2xl shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all group text-left w-full md:w-auto">
             <div className="w-14 h-14 bg-[#FDBA74]/10 rounded-full flex items-center justify-center text-[#FDBA74] group-hover:bg-[#FDBA74] group-hover:text-white transition-colors border-2 border-transparent group-hover:border-black">
               <MessageCircle className="w-7 h-7" />
             </div>
             <div>
               <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Email Me</p>
               <p className="text-xl font-black text-slate-900">pennyrose.mackay@gmail.com</p>
             </div>
          </a>
        </div>
      </div>

    </div>
  );
}