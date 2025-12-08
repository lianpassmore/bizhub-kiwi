import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

export default function ClassicTemplate({ business, gallery }: any) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-serif">
      <Navbar />
      
      {/* Navy Header */}
      <div className="bg-[#1e3a8a] text-white pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans">{business.name}</h1>
            <div className="flex gap-4 text-blue-200">
               <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {business.is_mobile_business ? `Servicing ${business.region}` : business.region}</span>
               <span>|</span>
               <span>{business.category}</span>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
             {business.contact_phone && (
               <div className="bg-white text-[#1e3a8a] px-6 py-3 font-bold rounded shadow-lg">
                 Call: {business.contact_phone}
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 -mt-10 grid md:grid-cols-3 gap-8">
         {/* Main Content */}
         <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded shadow-sm border border-slate-200">
               <h2 className="text-2xl font-bold text-slate-900 mb-4 font-sans border-b pb-2">Our Story</h2>
               <p className="text-lg leading-relaxed text-slate-600 whitespace-pre-wrap">{business.about}</p>
            </div>

            {/* Video Player */}
            {business.youtube_url && (
              <VideoPlayer url={business.youtube_url} />
            )}

            <div className="bg-white p-8 rounded shadow-sm border border-slate-200">
               <h2 className="text-2xl font-bold text-slate-900 mb-4 font-sans border-b pb-2">Services</h2>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                 {business.services?.map((service: string, i: number) => (
                   <li key={i} className="flex items-center gap-2 text-slate-700">
                     <CheckCircle className="w-4 h-4 text-blue-600" /> {service}
                   </li>
                 ))}
               </ul>
            </div>

            {/* Gallery */}
            {gallery.length > 0 && (
               <div className="bg-white p-8 rounded shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 font-sans border-b pb-2">Our Work</h2>
                  <div className="grid grid-cols-3 gap-2">
                     {gallery.map((url: string, i: number) => (
                       <img key={i} src={url} className="w-full h-32 object-cover rounded" />
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}