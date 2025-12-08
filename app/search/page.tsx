import Navbar from '@/components/Navbar';
import BusinessCard from '@/components/BusinessCard';
import { supabase } from '@/lib/supabase';
import { Search } from 'lucide-react';

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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {businesses?.length || 0} Results Found
          </h1>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Searching for:</span>
            {category && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-bold">{category}</span>}
            {location && <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-bold">{location}</span>}
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
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No businesses found</h3>
            <p className="text-gray-500">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}