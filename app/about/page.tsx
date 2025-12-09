import Navbar from '@/components/Navbar';
import { Heart, Zap, MessageCircle, MapPin, Users, Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-night-950 text-white selection:bg-neon-pink font-sans">
      <Navbar />

      {/* 1. HERO SECTION: The "Hype Woman" Intro */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Gradients (Hibiscus Pink & Frangipani Gold) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F2547D]/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FDBA74]/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F2547D]/10 border border-[#F2547D] text-[#F2547D] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Heart className="w-4 h-4" /> The Heart Behind the Hub
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-6">
              Kia Ora, <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#F2547D] to-[#FDBA74]">
                I'm Penny.
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8 border-l-4 border-[#FDBA74] pl-6">
              Founder, Storyteller, and your Chief Hype-Woman. I'm here to turn your 9pm notebook scribbles into a real digital presence.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="mailto:pennyrose.mackay@gmail.com" className="bg-[#F2547D] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-white hover:text-[#F2547D] transition shadow-lg shadow-[#F2547D]/25">
                Get in Touch
              </a>
              <Link href="/signup" className="border border-white/20 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-white/10 transition">
                Join the Village
              </Link>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
             <div className="aspect-4/5 bg-night-900 border-2 border-white/10 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-night-950/80 z-10"></div>
                <img
                  src="/penny-headshot.png"
                  alt="Penny Mackay"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700"
                />
                
                <div className="absolute bottom-6 left-6 z-20">
                   <h3 className="text-2xl font-black text-white uppercase">Penny Mackay</h3>
                   <div className="flex items-center gap-2 text-[#FDBA74] font-bold text-sm">
                     <MapPin className="w-4 h-4" /> Whangārei, Northland
                   </div>
                </div>
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FDBA74] rounded-full blur-2xl opacity-50"></div>
          </div>

        </div>
      </div>

      {/* 2. THE STORY: Pacific Roots & Storytelling */}
      <div className="bg-night-900/50 border-y border-white/5 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase">
            Building a Digital <span className="text-[#F2547D]">Village</span>
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Deeply connected to the values of the Pacific: hospitality, warmth, respect, and the concept of a village.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-night-950 p-8 rounded-2xl border border-white/10 hover:border-[#F2547D] transition group">
            <div className="w-12 h-12 bg-[#F2547D]/10 rounded-xl flex items-center justify-center text-[#F2547D] mb-6 group-hover:scale-110 transition">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">15 Years of Storytelling</h3>
            <p className="text-gray-400">
              I'm an expert at helping people find their voice. I've spent my career bridging gaps between people and helping them own their narrative.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-night-950 p-8 rounded-2xl border border-white/10 hover:border-[#FDBA74] transition group">
            <div className="w-12 h-12 bg-[#FDBA74]/10 rounded-xl flex items-center justify-center text-[#FDBA74] mb-6 group-hover:scale-110 transition">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Idea Validation</h3>
            <p className="text-gray-400">
              Got a crazy idea? I'm your sounding board. I don't shut ideas down; I help you map them out and see if they've got legs before you spend the cash.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-night-950 p-8 rounded-2xl border border-white/10 hover:border-neon-cyan transition group">
            <div className="w-12 h-12 bg-neon-cyan/10 rounded-xl flex items-center justify-center text-neon-cyan mb-6 group-hover:scale-110 transition">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">The Connector</h3>
            <p className="text-gray-400">
              I believe relationships matter more than transactions. BizHub isn't just a directory; it's a movement to stop business isolation.
            </p>
          </div>
        </div>
      </div>

      {/* 3. PERSONAL NOTE: The "Voice" of Penny */}
      <div className="py-24 px-4 relative">
        <div className="max-w-3xl mx-auto bg-linear-to-br from-[#F2547D] to-[#FDBA74] p-1 rounded-2xl transform rotate-1 hover:rotate-0 transition duration-500">
          <div className="bg-night-950 p-8 md:p-12 rounded-xl text-center">
            <div className="text-4xl mb-6">🌺</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              "I'm here for all the random ideas cos that's usually me hahaha."
            </h3>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Business can be lonely, eh? Hard out. That's why I wanted to build this. 
              A place where the mahi is shared, the vibes are sweet, and we can all suss out this business journey together.
            </p>
            <p className="font-bold text-[#FDBA74] uppercase tracking-widest text-sm">
              - Penny Mackay
            </p>
          </div>
        </div>
      </div>

      {/* 4. CONTACT: The "Suss It Out" Section */}
      <div className="max-w-7xl mx-auto px-4 pb-24 text-center">
        <h2 className="text-3xl font-bold text-white mb-12">Want to chat? Let's Connect.</h2>
        
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="tel:0212997881" className="flex items-center gap-4 bg-night-900 border border-white/10 px-8 py-6 rounded-2xl hover:border-[#F2547D] transition group text-left">
             <div className="w-12 h-12 bg-[#F2547D]/20 rounded-full flex items-center justify-center text-[#F2547D] group-hover:scale-110 transition">
               <Phone className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Mobile (Texts Welcome)</p>
               <p className="text-xl font-black text-white">021 299 7881</p>
             </div>
          </a>

          <a href="mailto:pennyrose.mackay@gmail.com" className="flex items-center gap-4 bg-night-900 border border-white/10 px-8 py-6 rounded-2xl hover:border-[#FDBA74] transition group text-left">
             <div className="w-12 h-12 bg-[#FDBA74]/20 rounded-full flex items-center justify-center text-[#FDBA74] group-hover:scale-110 transition">
               <MessageCircle className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email Me</p>
               <p className="text-xl font-black text-white">pennyrose.mackay@gmail.com</p>
             </div>
          </a>
        </div>
      </div>

    </div>
  );
}