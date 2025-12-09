import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

interface Business {
  slug: string;
  name: string;
  category: string;
  region?: string;
  regions?: string[];
  about: string;
  logo_url?: string; // Optional
}

// Category default images
const getCategoryImage = (category: string): string => {
  const categoryImages: { [key: string]: string } = {
    'Trades': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80&auto=format&fit=crop',
    'Hospitality': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80&auto=format&fit=crop',
    'Retail': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80&auto=format&fit=crop',
    'Professional Services': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80&auto=format&fit=crop',
    'Health & Beauty': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=80&auto=format&fit=crop',
    'Automotive': 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&q=80&auto=format&fit=crop',
    'Creative': 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500&q=80&auto=format&fit=crop',
  };
  return categoryImages[category] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80&auto=format&fit=crop';
};

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image / Logo Area */}
      <div className="h-48 bg-slate-100 relative overflow-hidden">
        <img
          src={business.logo_url || getCategoryImage(business.category)}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide text-slate-800">
          {business.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{business.name}</h3>
        <div className="flex items-center flex-wrap gap-1 text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          {business.regions && business.regions.length > 0
            ? business.regions.join(', ')
            : business.region || 'No region specified'}
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