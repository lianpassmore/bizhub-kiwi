import Link from 'next/link';
import { MapPin, Globe, CheckCircle, Facebook, Instagram, Linkedin, Phone, Mail, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';

export default function NeonTemplate({ business, gallery, socialLinks }: any) {
  return (
    <div className="min-h-screen bg-night-950 text-white selection:bg-neon-pink font-sans pb-24 md:pb-0">
      <Navbar />
      {/* Hero */}
      <div className="relative w-full min-h-[40vh] md:h-96 flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-night-900">
           <div className="absolute inset-0 bg-linear-to-br from-night-900 via-night-800 to-neon-purple/20"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
           <div className="absolute inset-0 bg-linear-to-t from-night-950 via-night-950/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-8 md:pb-12 w-full">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              {business.category}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-kiwi-900/50 border border-kiwi-500 text-kiwi-400 rounded-full text-xs font-bold uppercase tracking-wider">
              <CheckCircle className="w-3.5 h-3.5" /> Verified Kiwi
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-lg leading-tight">
            {business.name}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-300 font-medium">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-neon-pink" />
              <span>{business.is_mobile_business ? `Servicing ${business.region}` : business.region}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section className="bg-night-900/30 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-neon-yellow mb-6">About Us</h2>
            <div className="prose prose-invert prose-lg max-w-none text-gray-200 leading-relaxed whitespace-pre-wrap">
              {business.about}
            </div>
          </section>

          {/* Video Player */}
          {business.youtube_url && (
            <VideoPlayer url={business.youtube_url} />
          )}

          {/* Services */}
          <section>
            <h2 className="text-3xl font-bold text-neon-pink mb-6">Our Services</h2>
            <div className="flex flex-wrap gap-3">
              {business.services?.map((service: string, i: number) => (
                <div key={i} className="bg-night-800 border border-white/10 px-5 py-3 rounded-xl flex items-center gap-3">
                  <span className="w-2 h-2 bg-neon-cyan rounded-full"></span>
                  <span className="text-lg font-medium text-white">{service}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery */}
          {gallery.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-neon-cyan mb-6">Portfolio</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((url: string, i: number) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border border-white/10">
                    <img src={url} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}