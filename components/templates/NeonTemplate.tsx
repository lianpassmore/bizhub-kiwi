import Link from 'next/link';
import { MapPin, Globe, CheckCircle, Facebook, Instagram, Linkedin, Phone, Mail, Share2, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';

export default function NeonTemplate({ business, gallery, socialLinks, youtubeUrl, isPro }: any) {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-neon-pink font-sans pb-24 md:pb-0">
      <Navbar />
      
      {/* Hero */}
      <div className="relative w-full min-h-[40vh] md:h-96 flex flex-col justify-end overflow-hidden border-b-4 border-neon-cyan">
        <div className="absolute inset-0 bg-slate-900">
           <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#0f172a,#1e293b)]"></div>
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#00F0FF 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-8 md:pb-12 w-full">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_10px_rgba(0,240,255,0.4)]">
              {business.category}
            </span>
            
            {isPro && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500 text-green-400 rounded-full text-xs font-black uppercase tracking-widest">
                <CheckCircle className="w-3.5 h-3.5" /> Verified Kiwi
              </span>
            )}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-[4px_4px_0px_#000000] leading-tight uppercase">
            {business.name}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-slate-300 font-bold tracking-wide">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-neon-pink" />
              <span>{business.is_mobile_business ? `Servicing ${business.region}` : business.region}</span>
            </div>
            
            {/* Website Link Logic */}
            {business.website_url && (
              isPro ? (
                <a href={business.website_url.startsWith('http') ? business.website_url : `https://${business.website_url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neon-cyan transition text-white">
                  <Globe className="w-5 h-5 text-neon-cyan" />
                  <span className="underline decoration-neon-cyan underline-offset-4 decoration-2">Visit Website</span>
                </a>
              ) : (
                <div className="flex items-center gap-2 text-slate-500 cursor-not-allowed" title="Available on Pro Plan">
                  <Globe className="w-5 h-5" />
                  <span>{business.website_url.replace(/^https?:\/\//, '')}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* About Section */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-black text-neon-yellow mb-6 uppercase tracking-tight">About Us</h2>
            <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
              {business.about}
            </div>
          </section>

          {/* Video Player (Pro Only) */}
          {isPro && youtubeUrl && (
            <div className="rounded-xl overflow-hidden border-2 border-slate-700 shadow-[4px_4px_0px_0px_#000000]">
               <VideoPlayer url={youtubeUrl} />
            </div>
          )}

          {/* Social Links (Logic for Free vs Pro) */}
          <section>
             <h2 className="text-3xl font-black text-neon-purple mb-6 uppercase tracking-tight">Connect</h2>
             {isPro ? (
               <div className="flex flex-wrap gap-4">
                  {socialLinks.facebook && (
                    <a href={socialLinks.facebook} target="_blank" className="p-3 bg-[#1877F2] text-white rounded-xl hover:scale-105 transition shadow-[4px_4px_0px_0px_#000000] border-2 border-black"><Facebook className="w-6 h-6"/></a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" className="p-3 bg-[#E4405F] text-white rounded-xl hover:scale-105 transition shadow-[4px_4px_0px_0px_#000000] border-2 border-black"><Instagram className="w-6 h-6"/></a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" className="p-3 bg-[#0A66C2] text-white rounded-xl hover:scale-105 transition shadow-[4px_4px_0px_0px_#000000] border-2 border-black"><Linkedin className="w-6 h-6"/></a>
                  )}
                  {(!socialLinks.facebook && !socialLinks.instagram && !socialLinks.linkedin) && (
                    <p className="text-slate-500 italic">No social links added.</p>
                  )}
               </div>
             ) : (
               <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex items-center gap-4">
                 <div className="p-3 bg-slate-700 rounded-full text-slate-400"><Lock className="w-6 h-6" /></div>
                 <div>
                   <p className="text-white font-bold">Social Links are Locked</p>
                   <p className="text-slate-400 text-sm">Upgrade to Pro to see social profiles.</p>
                 </div>
               </div>
             )}
          </section>

          {/* Services */}
          <section>
            <h2 className="text-3xl font-black text-neon-pink mb-6 uppercase tracking-tight">Our Services</h2>
            <div className="flex flex-wrap gap-3">
              {business.services?.map((service: string, i: number) => (
                <div key={i} className="bg-slate-800 border border-slate-700 px-5 py-3 rounded-xl flex items-center gap-3 shadow-sm hover:border-neon-pink transition cursor-default">
                  <span className="w-2 h-2 bg-neon-cyan rounded-full"></span>
                  <span className="text-lg font-bold text-white">{service}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery (Pro Only) */}
          {isPro && gallery.length > 0 && (
            <section>
              <h2 className="text-3xl font-black text-neon-cyan mb-6 uppercase tracking-tight">Portfolio</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((url: string, i: number) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-slate-800 hover:border-neon-cyan transition group relative">
                    <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Desktop Sidebar (Contact Info) */}
        <div className="hidden lg:block space-y-6">
           <div className="bg-slate-800 border-2 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_#000000] sticky top-28">
              <h3 className="text-xl font-black text-white uppercase mb-6 border-b border-slate-600 pb-4">Contact</h3>
              
              {isPro ? (
                <div className="space-y-4">
                  {business.contact_phone && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-neon-yellow rounded-lg flex items-center justify-center text-black border-2 border-black"><Phone className="w-5 h-5" /></div>
                      <span className="font-bold text-white">{business.contact_phone}</span>
                    </div>
                  )}
                  {business.contact_email && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-neon-pink rounded-lg flex items-center justify-center text-white border-2 border-black"><Mail className="w-5 h-5" /></div>
                      <span className="font-bold text-white truncate w-40">{business.contact_email}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                   <Lock className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                   <p className="text-slate-400 font-bold">Contact Info Hidden</p>
                   <Link href="/subscribe" className="text-neon-cyan hover:underline text-sm">Upgrade to Reveal</Link>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Mobile Sticky Bar (Pro Only) */}
      {isPro && (
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-700 p-4 z-50 flex gap-3">
           {business.contact_phone && (
             <a href={`tel:${business.contact_phone}`} className="flex-1 bg-neon-yellow text-black border-2 border-black font-black py-3 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wide shadow-lg active:scale-95 transition">
               <Phone className="w-5 h-5" /> Call
             </a>
           )}
           {business.contact_email && (
             <a href={`mailto:${business.contact_email}`} className="flex-1 bg-white text-black border-2 border-black font-black py-3 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wide shadow-lg active:scale-95 transition">
               <Mail className="w-5 h-5" /> Email
             </a>
           )}
        </div>
      )}
    </div>
  );
}