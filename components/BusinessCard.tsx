import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

interface Business {
  slug: string;
  name: string;
  category: string;
  region: string;
  about: string;
  logo_url?: string; // Optional
}

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image / Logo Area */}
      <div className="h-48 bg-slate-100 relative overflow-hidden">
        {business.logo_url ? (
          <img 
            src={business.logo_url} 
            alt={business.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300 font-bold text-3xl">
            {business.name.charAt(0)}
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide text-slate-800">
          {business.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{business.name}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          {business.region}
        </div>
        <p className="text-gray-600 text-sm line-clamp-3 mb-6 grow">
          {business.about}
        </p>

        <Link 
          href={`/business/${business.slug}`}
          className="w-full mt-auto bg-slate-900 text-white py-3 rounded-xl font-medium flex items-center justify-center group-hover:bg-blue-600 transition-colors"
        >
          View Profile <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}