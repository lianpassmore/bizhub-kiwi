import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import { MapPin, Star, Sparkles } from 'lucide-react';

export default function ElegantTemplate({ business, gallery }: any) {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#4a4a4a] font-serif">
      <Navbar />

      {/* Soft Header */}
      <div className="pt-40 pb-20 px-4 text-center">
        <div className="flex justify-center mb-6">
           <div className="w-px h-16 bg-[#d4af37]"></div>
        </div>
        <span className="text-[#d4af37] font-sans text-xs uppercase tracking-[0.3em] mb-4 block">
          {business.is_mobile_business ? `Servicing ${business.region}` : business.region} • {business.category}
        </span>
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 text-[#2a2a2a]">
          {business.name}
        </h1>
        <p className="max-w-2xl mx-auto text-xl leading-relaxed italic text-gray-500 font-light">
          {business.about}
        </p>
      </div>

      {/* Video Player */}
      {business.youtube_url && (
        <div className="max-w-4xl mx-auto px-6 mb-24">
          <VideoPlayer url={business.youtube_url} />
        </div>
      )}

      {/* Image Strip */}
      {gallery.length > 0 && (
        <div className="w-full overflow-hidden flex whitespace-nowrap mb-24">
          <div className="flex animate-scroll-left hover:pause">
             {/* Duplicate images to create infinite scroll feeling */}
             {[...gallery, ...gallery].slice(0, 8).map((url: string, i: number) => (
               <div key={i} className="w-64 h-80 shrink-0 px-2">
                  <img src={url} className="w-full h-full object-cover rounded-t-full" />
               </div>
             ))}
          </div>
        </div>
      )}

      {/* Services Menu */}
      <div className="max-w-3xl mx-auto px-6 pb-32">
        <div className="text-center mb-12">
          <Sparkles className="w-6 h-6 text-[#d4af37] mx-auto mb-4" />
          <h2 className="text-3xl font-medium">Our Offerings</h2>
        </div>

        <div className="space-y-6">
          {business.services?.map((service: string, i: number) => (
            <div key={i} className="flex items-baseline justify-between border-b border-[#e5e5e5] pb-4">
              <span className="text-lg font-medium text-[#2a2a2a]">{service}</span>
              <span className="text-xs font-sans text-gray-400 uppercase tracking-widest">Available</span>
            </div>
          ))}
        </div>

        {business.contact_phone && (
          <div className="mt-16 text-center">
            <a href={`tel:${business.contact_phone}`} className="inline-block border border-[#2a2a2a] text-[#2a2a2a] px-10 py-4 text-sm font-sans uppercase tracking-widest hover:bg-[#2a2a2a] hover:text-white transition duration-500">
              Book Appointment
            </a>
          </div>
        )}
      </div>
    </div>
  );
}