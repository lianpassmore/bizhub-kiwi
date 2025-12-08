import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import { Phone, MapPin, Wrench, CheckSquare, Facebook, Instagram } from 'lucide-react';

export default function IndustrialTemplate({ business, gallery, socialLinks }: any) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <Navbar />

      {/* Heavy Header */}
      <div className="bg-slate-900 text-white pt-32 pb-16 px-4 border-b-8 border-yellow-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-block bg-yellow-400 text-black font-black uppercase px-3 py-1 text-sm tracking-tighter mb-4 transform -skew-x-12">
              Verified Contractor
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-4">
              {business.name}
            </h1>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-sm">
              <MapPin className="w-4 h-4 text-yellow-400" />
              {business.is_mobile_business ? `SERVICING ${business.region.toUpperCase()}` : business.region.toUpperCase()} • {business.category.toUpperCase()}
            </div>
          </div>
          
          {/* Big CTA Button */}
          {business.contact_phone && (
            <a href={`tel:${business.contact_phone}`} className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xl px-8 py-4 rounded-sm uppercase tracking-wide flex items-center gap-3 shadow-[4px_4px_0px_rgba(255,255,255,0.2)] transition active:translate-y-1 active:shadow-none">
              <Phone className="w-6 h-6" /> Call Now
            </a>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-12">
        
        {/* Left: Services List */}
        <div className="bg-white p-8 shadow-xl border border-slate-200 h-fit">
          <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-2 border-b-4 border-slate-100 pb-4">
            <Wrench className="w-6 h-6 text-yellow-500" /> Services
          </h3>
          <ul className="space-y-4">
            {business.services?.map((service: string, i: number) => (
              <li key={i} className="flex items-start gap-3 font-bold text-slate-700">
                <CheckSquare className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Content & Gallery */}
        <div className="md:col-span-2 space-y-12">
          <section>
            <h3 className="text-2xl font-black uppercase mb-4 text-slate-400">Company Profile</h3>
            <p className="text-lg leading-relaxed font-medium text-slate-600">
              {business.about}
            </p>
          </section>

          {/* Video Player */}
          {business.youtube_url && (
            <VideoPlayer url={business.youtube_url} />
          )}

          {/* Socials Banner */}
          {(socialLinks.facebook || socialLinks.instagram) && (
            <div className="bg-slate-900 text-white p-6 flex flex-wrap gap-4 items-center">
               <span className="font-bold uppercase mr-4">Follow us on site:</span>
               {socialLinks.facebook && <a href={socialLinks.facebook} className="flex items-center gap-2 hover:text-yellow-400"><Facebook className="w-5 h-5" /> Facebook</a>}
               {socialLinks.instagram && <a href={socialLinks.instagram} className="flex items-center gap-2 hover:text-yellow-400"><Instagram className="w-5 h-5" /> Instagram</a>}
            </div>
          )}

          {gallery.length > 0 && (
            <section>
              <h3 className="text-2xl font-black uppercase mb-6 text-slate-400">Project Gallery</h3>
              <div className="grid grid-cols-2 gap-4">
                {gallery.map((url: string, i: number) => (
                  <div key={i} className="aspect-video bg-slate-200 border-4 border-white shadow-md group overflow-hidden">
                    <img src={url} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 grayscale group-hover:grayscale-0" />
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