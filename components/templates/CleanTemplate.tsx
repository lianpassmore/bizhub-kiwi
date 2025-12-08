import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import { MapPin, CheckCircle, Globe } from 'lucide-react';

export default function CleanTemplate({ business, gallery }: any) {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar /> 
      
      {/* Minimal Hero */}
      <div className="pt-32 pb-16 px-4 border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold uppercase tracking-wide text-slate-600 mb-6">
            <CheckCircle className="w-3 h-3 text-green-600" /> Verified Business
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
            {business.name}
          </h1>
          <div className="flex justify-center gap-6 text-slate-500 font-medium">
             <span>{business.category}</span>
             <span>•</span>
             <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {business.is_mobile_business ? `Servicing ${business.region}` : business.region}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* About */}
        <section className="mb-20 text-center">
           <p className="text-xl md:text-2xl leading-relaxed text-slate-600 font-light">
             {business.about}
           </p>
        </section>

        {/* Video Player */}
        {business.youtube_url && (
          <section className="mb-20">
            <VideoPlayer url={business.youtube_url} />
          </section>
        )}

        {/* Services Grid */}
        <section className="mb-20">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8 text-center">Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {business.services?.map((service: string, i: number) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl text-center font-medium text-slate-900 hover:bg-slate-100 transition">
                {service}
              </div>
            ))}
          </div>
        </section>

        {/* Big Gallery */}
        {gallery.length > 0 && (
          <section>
             <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8 text-center">Work</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {gallery.map((url: string, i: number) => (
                 <div key={i} className="aspect-4/3 bg-gray-100 rounded-none overflow-hidden">
                   <img src={url} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                 </div>
               ))}
             </div>
          </section>
        )}
      </div>
    </div>
  );
}