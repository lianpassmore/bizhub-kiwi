import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import { ArrowRight, Globe } from 'lucide-react';

export default function BoldTemplate({ business, gallery, socialLinks }: any) {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Navbar />

      {/* MASSIVE HERO */}
      <div className="pt-32 px-4 md:px-12 pb-12 border-b-4 border-black">
        <h1 className="text-[12vw] leading-[0.85] font-black uppercase wrap-break-word">
          {business.name}
        </h1>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-12 gap-6">
           <div className="text-2xl font-bold max-w-xl">
             {business.about}
           </div>

           <div className="flex flex-col items-end text-right">
             <div className="bg-black text-white px-4 py-1 text-sm font-bold uppercase mb-2">
               {business.is_mobile_business ? `Servicing ${business.region}` : business.region}
             </div>
             <div className="text-xl font-bold underline decoration-4 decoration-black">
               {business.category}
             </div>
           </div>
        </div>
      </div>

      {/* Video Player */}
      {business.youtube_url && (
        <div className="px-4 md:px-12 py-12 border-b-4 border-black">
          <VideoPlayer url={business.youtube_url} />
        </div>
      )}

      <div className="grid md:grid-cols-2">
        {/* Left: Services Grid */}
        <div className="border-r-4 border-black p-4 md:p-12">
           <h3 className="text-4xl font-black uppercase mb-12">Expertise</h3>
           <div className="grid grid-cols-1 gap-0">
             {business.services?.map((service: string, i: number) => (
               <div key={i} className="border-t border-black py-6 flex items-center justify-between group cursor-pointer hover:bg-black hover:text-white transition px-4 -mx-4">
                 <span className="text-xl font-bold uppercase">{service}</span>
                 <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition" />
               </div>
             ))}
           </div>

           {/* Socials Text */}
           <div className="mt-20">
              {socialLinks.instagram && <a href={socialLinks.instagram} className="block text-xl font-bold hover:underline">Instagram ↗</a>}
              {socialLinks.facebook && <a href={socialLinks.facebook} className="block text-xl font-bold hover:underline">Facebook ↗</a>}
           </div>
        </div>

        {/* Right: Big Image Stack */}
        <div className="p-4 md:p-12 bg-gray-50">
           {gallery.length > 0 ? (
             <div className="space-y-12">
               {gallery.map((url: string, i: number) => (
                 <div key={i} className="w-full shadow-[20px_20px_0px_rgba(0,0,0,1)] border-4 border-black">
                   <img src={url} className="w-full h-auto grayscale hover:grayscale-0 transition duration-500" />
                 </div>
               ))}
             </div>
           ) : (
             <div className="h-full flex items-center justify-center border-4 border-dashed border-gray-300">
               <span className="font-bold text-gray-400 uppercase">No Images Uploaded</span>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}