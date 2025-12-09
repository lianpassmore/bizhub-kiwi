import Navbar from '@/components/Navbar';
import BusinessCard from '@/components/BusinessCard';
import SearchBar from '@/components/SearchBar';
import { supabase } from '@/lib/supabase';
import { Search, X, MapPin, Layers } from 'lucide-react';
import Link from 'next/link';

export default async function SearchPage(props: { searchParams: Promise<{ category?: string; location?: string }> }) {
  const searchParams = await props.searchParams;
  const category = searchParams.category || '';
  const location = searchParams.location || '';

  // 1. Build the database query
  let query = supabase.from('businesses').select('*');

  if (category && category !== 'Select Category...') {
    query = query.eq('category', category);
  }

  if (location && location !== 'Select Region...') {
    // Check if regions array contains the location
    query = query.contains('regions', [location]);
  }

  // 2. Fetch data
  const { data: businesses } = await query;

  return (
    <main className="min-h-screen bg-[#FFFDF9] text-slate-900 font-sans selection:bg-neon-pink selection:text-white">
      <Navbar />

      {/* Search Header */}
      <div className="bg-white border-b-2 border-black pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* NEW HEADING */}
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-none">
            Find Local <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple">Gems</span>
          </h1>

          <div className="mb-8">
            <SearchBar />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <span className="text-neon-pink">{businesses?.length || 0}</span> Results Found
            </h2>

            <div className="flex items-center gap-3 flex-wrap">
              {(category || location) && (
                <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Active filters:</span>
              )}
              
              {category && (
                <span className="bg-white border-2 border-black px-4 py-1 rounded-full text-xs font-black uppercase shadow-[2px_2px_0px_#000000] flex items-center gap-2">
                  <Layers className="w-3 h-3" /> {category}
                </span>
              )}
              
              {location && (
                <span className="bg-white border-2 border-black px-4 py-1 rounded-full text-xs font-black uppercase shadow-[2px_2px_0px_#000000] flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> {location}
                </span>
              )}
              
              {(category || location) && (
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-bold uppercase tracking-wider border-b-2 border-transparent hover:border-red-600 ml-2"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {businesses && businesses.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {businesses.map((biz) => (
              <BusinessCard key={biz.id} business={biz} />
            ))}
          </div>
        ) : (
          /* Empty State - Neo Pop Style */
          <div className="text-center py-20 bg-white border-2 border-black rounded-2xl shadow-pop max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-slate-100 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">No businesses found</h3>
            <p className="text-slate-600 font-medium mb-8 max-w-md mx-auto">
              We couldn't find anything matching your criteria. Try adjusting your filters or browsing all listings.
            </p>
            <Link
              href="/search"
              className="inline-block bg-neon-cyan border-2 border-black text-slate-900 font-black px-8 py-4 rounded-xl transition-all shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] uppercase tracking-wider"
            >
              Clear Filters
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}