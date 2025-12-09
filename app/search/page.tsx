import Navbar from '@/components/Navbar';
import BusinessCard from '@/components/BusinessCard';
import SearchBar from '@/components/SearchBar';
import { supabase } from '@/lib/supabase';
import { Search, X } from 'lucide-react';
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
    query = query.eq('region', location);
  }

  // 2. Fetch data
  const { data: businesses } = await query;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Search Header */}
      <div className="bg-white border-b pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <SearchBar />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-2xl font-bold text-slate-900">
              <span className="text-blue-600">{businesses?.length || 0}</span> Results Found
            </h1>

            <div className="flex items-center gap-3 flex-wrap">
              {(category || location) && (
                <span className="text-gray-500 text-sm">Active filters:</span>
              )}
              {category && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-xs font-bold">
                  {category}
                </span>
              )}
              {location && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-xs font-bold">
                  {location}
                </span>
              )}
              {(category || location) && (
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-bold"
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
          /* Empty State */
          <div className="text-center py-20">
            <div className="bg-white border w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No businesses found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search filters or browse all businesses.</p>
            <Link
              href="/search"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300"
            >
              View All Businesses
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}