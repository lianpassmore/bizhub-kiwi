import Navbar from '@/components/Navbar';
import { Calendar, Users, MessageSquare, MapPin, ArrowRight, Zap } from 'lucide-react';

export default function Community() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 font-sans selection:bg-neon-pink selection:text-white">
      <Navbar />

      {/* BACKGROUND DOT PATTERN */}
      <div className="absolute inset-0 z-0 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)', 
             backgroundSize: '24px 24px' 
           }}>
      </div>

      {/* Hero */}
      <div className="relative pt-32 pb-20 px-4 text-center overflow-hidden z-10">
        <div className="max-w-4xl mx-auto">
          
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-lg text-xs font-black uppercase tracking-widest mb-8 shadow-pop transform -rotate-2">
            <Zap className="w-4 h-4 text-black fill-black" /> 
            BizHub Network
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-[0.9]">
            Local Business <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-purple-600">
              Is A Team Sport
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Connect with other Kiwi business owners, attend local meetups, and grow your network. 
            No corporate jargon allowed.
          </p>
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <h2 className="text-4xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
            <Calendar className="w-10 h-10 text-black fill-neon-cyan" /> Upcoming Meetups
          </h2>
          <button className="text-slate-900 font-black uppercase text-sm hover:text-neon-pink transition border-b-2 border-black hover:border-neon-pink">
            View All Events →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Event Card 1 */}
          <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group">
            <div className="h-48 bg-slate-100 relative border-b-2 border-black">
              <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
              <div className="absolute top-4 left-4 bg-neon-pink text-white border-2 border-black font-black text-xs px-3 py-1 rounded uppercase shadow-sm">
                Auckland
              </div>
            </div>
            <div className="p-6">
              <div className="text-slate-500 text-xs font-bold mb-2 uppercase tracking-widest">Wed, Dec 15 • 7:00 PM</div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase leading-tight">Tradie Night</h3>
              <p className="text-slate-600 text-sm mb-6 font-medium">Meet other local tradies, share tips, and grab a beer at The Viaduct.</p>
              <button className="w-full py-3 bg-black text-white font-black text-sm uppercase tracking-wider hover:bg-neon-cyan hover:text-black transition border-2 border-transparent hover:border-black rounded-lg">
                RSVP Now
              </button>
            </div>
          </div>

          {/* Event Card 2 */}
          <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group">
            <div className="h-48 bg-slate-100 relative border-b-2 border-black">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
              <div className="absolute top-4 left-4 bg-neon-purple text-white border-2 border-black font-black text-xs px-3 py-1 rounded uppercase shadow-sm">
                Wellington
              </div>
            </div>
            <div className="p-6">
              <div className="text-slate-500 text-xs font-bold mb-2 uppercase tracking-widest">Fri, Dec 18 • 10:00 AM</div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase leading-tight">Coffee & Creators</h3>
              <p className="text-slate-600 text-sm mb-6 font-medium">Casual meetup for designers, writers, and makers at Flight Coffee.</p>
              <button className="w-full py-3 bg-black text-white font-black text-sm uppercase tracking-wider hover:bg-neon-purple hover:text-white transition border-2 border-transparent hover:border-black rounded-lg">
                RSVP Now
              </button>
            </div>
          </div>

           {/* Event Card 3 */}
           <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group">
            <div className="h-48 bg-slate-100 relative border-b-2 border-black">
              <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
              <div className="absolute top-4 left-4 bg-neon-yellow text-black border-2 border-black font-black text-xs px-3 py-1 rounded uppercase shadow-sm">
                Christchurch
              </div>
            </div>
            <div className="p-6">
              <div className="text-slate-500 text-xs font-bold mb-2 uppercase tracking-widest">Sat, Jan 10 • 9:00 AM</div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase leading-tight">Small Biz Workshop</h3>
              <p className="text-slate-600 text-sm mb-6 font-medium">Learn how to do your own taxes with guest speaker Mike form Xero.</p>
              <button className="w-full py-3 bg-black text-white font-black text-sm uppercase tracking-wider hover:bg-neon-yellow hover:text-black transition border-2 border-transparent hover:border-black rounded-lg">
                RSVP Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forum Teaser */}
      <div className="bg-white border-y-2 border-black py-20 mt-12 relative">
        {/* Decorative Background Strip */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan"></div>

        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">The Owners Lounge</h2>
          <p className="text-slate-600 mb-12 text-lg font-medium">Join the private discussion. Real talk, no sales pitches.</p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            
            {/* Forum Topic 1 */}
            <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200 hover:border-black hover:bg-white hover:shadow-pop transition-all cursor-pointer group flex items-start gap-4">
              <div className="p-3 bg-white border-2 border-black rounded-lg text-black group-hover:bg-neon-cyan transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg group-hover:text-black leading-tight mb-2">Advice needed: Best insurer for mobile vans?</h4>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  <span className="bg-slate-200 px-2 py-0.5 rounded">Insurance</span>
                  <span>• Posted by Jake</span>
                  <span>• 24 replies</span>
                </div>
              </div>
            </div>

            {/* Forum Topic 2 */}
            <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200 hover:border-black hover:bg-white hover:shadow-pop transition-all cursor-pointer group flex items-start gap-4">
              <div className="p-3 bg-white border-2 border-black rounded-lg text-black group-hover:bg-neon-pink transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg group-hover:text-black leading-tight mb-2">Who are we using for accounting? Hnry or Xero?</h4>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  <span className="bg-slate-200 px-2 py-0.5 rounded">Finance</span>
                  <span>• Posted by Sarah</span>
                  <span>• 112 replies</span>
                </div>
              </div>
            </div>

          </div>
          
          <button className="mt-12 inline-block font-black text-slate-900 border-b-4 border-neon-pink hover:bg-neon-pink hover:text-white hover:border-black transition-all px-2 py-1 text-lg">
            Log in to view all discussions →
          </button>
        </div>
      </div>

    </div>
  );
}