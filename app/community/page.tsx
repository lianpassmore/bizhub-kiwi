import Navbar from '@/components/Navbar';
import { Calendar, Users, MessageSquare, MapPin, ArrowRight } from 'lucide-react';

export default function Community() {
  return (
    <div className="min-h-screen bg-night-950 selection:bg-neon-pink">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-neon-purple/20 blur-[120px] rounded-full z-0"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="px-3 py-1 bg-neon-yellow/10 border border-neon-yellow text-neon-yellow rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
            BizHub Network
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Local Business <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-neon-pink to-neon-purple">Is A Team Sport</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect with other Kiwi business owners, attend local meetups, and grow your network.
          </p>
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-neon-cyan" /> Upcoming Meetups
          </h2>
          <button className="text-neon-cyan font-bold uppercase text-sm hover:text-white transition">View All Events</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Event Card 1 */}
          <div className="bg-night-900 border border-white/10 rounded-2xl overflow-hidden group hover:border-neon-cyan transition">
            <div className="h-48 bg-gray-800 relative">
              <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition" />
              <div className="absolute top-4 left-4 bg-neon-pink text-white font-bold text-xs px-3 py-1 rounded uppercase">
                Auckland
              </div>
            </div>
            <div className="p-6">
              <div className="text-neon-cyan text-sm font-bold mb-2 uppercase">Wed, Dec 15 • 7:00 PM</div>
              <h3 className="text-xl font-bold text-white mb-2">Tradie Networking Night</h3>
              <p className="text-gray-400 text-sm mb-4">Meet other local tradies, share tips, and grab a beer at The Viaduct.</p>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white font-bold text-sm transition">RSVP Now</button>
            </div>
          </div>

          {/* Event Card 2 */}
          <div className="bg-night-900 border border-white/10 rounded-2xl overflow-hidden group hover:border-neon-pink transition">
            <div className="h-48 bg-gray-800 relative">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition" />
              <div className="absolute top-4 left-4 bg-neon-purple text-white font-bold text-xs px-3 py-1 rounded uppercase">
                Wellington
              </div>
            </div>
            <div className="p-6">
              <div className="text-neon-pink text-sm font-bold mb-2 uppercase">Fri, Dec 18 • 10:00 AM</div>
              <h3 className="text-xl font-bold text-white mb-2">Coffee & Creators</h3>
              <p className="text-gray-400 text-sm mb-4">Casual meetup for designers, writers, and makers at Flight Coffee.</p>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white font-bold text-sm transition">RSVP Now</button>
            </div>
          </div>

           {/* Event Card 3 */}
           <div className="bg-night-900 border border-white/10 rounded-2xl overflow-hidden group hover:border-neon-yellow transition">
            <div className="h-48 bg-gray-800 relative">
              <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition" />
              <div className="absolute top-4 left-4 bg-neon-yellow text-night-950 font-bold text-xs px-3 py-1 rounded uppercase">
                Christchurch
              </div>
            </div>
            <div className="p-6">
              <div className="text-neon-yellow text-sm font-bold mb-2 uppercase">Sat, Jan 10 • 9:00 AM</div>
              <h3 className="text-xl font-bold text-white mb-2">Small Biz Workshop</h3>
              <p className="text-gray-400 text-sm mb-4">Learn how to do your own taxes with guest speaker Mike form Xero.</p>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white font-bold text-sm transition">RSVP Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Forum Teaser */}
      <div className="bg-night-900/50 border-y border-white/5 py-20 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">The Owners Lounge</h2>
          <p className="text-gray-400 mb-8">Join the private discussion for members only.</p>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
            <div className="bg-night-950 p-4 rounded-xl border border-white/10 flex items-center gap-4 hover:border-neon-cyan transition cursor-pointer">
              <MessageSquare className="w-10 h-10 text-gray-600" />
              <div>
                <h4 className="font-bold text-white">Advice needed: Best insurer for mobile vans?</h4>
                <p className="text-xs text-gray-500">Posted by Jake • 24 replies</p>
              </div>
            </div>
            <div className="bg-night-950 p-4 rounded-xl border border-white/10 flex items-center gap-4 hover:border-neon-pink transition cursor-pointer">
              <MessageSquare className="w-10 h-10 text-gray-600" />
              <div>
                <h4 className="font-bold text-white">Who are we using for accounting? Hnry or Xero?</h4>
                <p className="text-xs text-gray-500">Posted by Sarah • 112 replies</p>
              </div>
            </div>
          </div>
          
          <button className="mt-8 text-white font-bold underline decoration-neon-pink underline-offset-4 hover:text-neon-pink transition">
            Log in to view all discussions
          </button>
        </div>
      </div>

    </div>
  );
}