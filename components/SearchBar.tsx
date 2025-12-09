'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, X, Layers } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (region) params.append('location', region);
    if (category) params.append('category', category);
    router.push(`/search?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchQuery('');
    setRegion('');
    setCategory('');
    router.push('/search');
  };

  const hasFilters = searchQuery || region || category;

  return (
    // UPDATED CONTAINER: Solid black border, pop shadow
    <div className="bg-white p-3 rounded-2xl border-2 border-black flex flex-col gap-3 shadow-pop hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000000] transition-all duration-300">

      {/* Top Row: Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search businesses, services..."
          className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl text-slate-900 font-bold outline-none transition-all"
        />
      </div>

      {/* Middle Row: Region and Category */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Region Dropdown */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <select
            onChange={(e) => setRegion(e.target.value)}
            value={region}
            className="w-full h-full p-4 pl-12 bg-slate-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl text-slate-900 font-bold outline-none appearance-none cursor-pointer transition-all"
          >
            <option value="">Select Region...</option>
            <option value="Northland">Northland</option>
            <option value="Auckland">Auckland</option>
            <option value="Waikato">Waikato</option>
            <option value="Hamilton">Hamilton</option>
            <option value="Bay of Plenty">Bay of Plenty</option>
            <option value="Tauranga">Tauranga</option>
            <option value="Rotorua">Rotorua</option>
            <option value="Gisborne">Gisborne</option>
            <option value="Hawke's Bay">Hawke&apos;s Bay</option>
            <option value="Napier">Napier</option>
            <option value="Taranaki">Taranaki</option>
            <option value="New Plymouth">New Plymouth</option>
            <option value="Manawatū-Whanganui">Manawatū-Whanganui</option>
            <option value="Palmerston North">Palmerston North</option>
            <option value="Wellington">Wellington</option>
            <option value="Tasman">Tasman</option>
            <option value="Nelson">Nelson</option>
            <option value="Marlborough">Marlborough</option>
            <option value="West Coast">West Coast</option>
            <option value="Canterbury">Canterbury</option>
            <option value="Christchurch">Christchurch</option>
            <option value="Timaru">Timaru</option>
            <option value="Otago">Otago</option>
            <option value="Dunedin">Dunedin</option>
            <option value="Queenstown">Queenstown</option>
            <option value="Southland">Southland</option>
            <option value="Invercargill">Invercargill</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="flex-1 relative">
          <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full h-full p-4 pl-12 bg-slate-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl text-slate-900 font-bold outline-none appearance-none cursor-pointer transition-all"
          >
            <option value="">Select Category...</option>
            <option value="Agriculture, Forestry & Fishing">Agriculture, Forestry &amp; Fishing</option>
            <option value="Mining & Resources">Mining &amp; Resources</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Construction & Trades">Construction &amp; Trades</option>
            <option value="Retail">Retail</option>
            <option value="Hospitality & Tourism">Hospitality &amp; Tourism</option>
            <option value="Transport & Logistics">Transport &amp; Logistics</option>
            <option value="Professional Services">Professional Services</option>
            <option value="Health & Wellness">Health &amp; Wellness</option>
            <option value="Education & Training">Education &amp; Training</option>
            <option value="Media & Creative Industries">Media &amp; Creative Industries</option>
            <option value="Technology & IT">Technology &amp; IT</option>
            <option value="Personal Services">Personal Services</option>
            <option value="Sports & Recreation">Sports &amp; Recreation</option>
            <option value="Community & Non-Profit">Community &amp; Non-Profit</option>
            <option value="Financial & Legal">Financial &amp; Legal</option>
            <option value="Automotive">Automotive</option>
            <option value="Real Estate & Property">Real Estate &amp; Property</option>
            <option value="Home & Lifestyle">Home &amp; Lifestyle</option>
          </select>
        </div>
      </div>

      {/* Bottom Row: Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleSearch}
          className="flex-1 bg-neon-pink text-white font-black uppercase tracking-wider py-4 px-10 rounded-xl hover:bg-pink-600 transition-colors shadow-sm"
        >
          Search
        </button>

        {hasFilters && (
          <button
            onClick={handleClear}
            className="bg-slate-100 border-2 border-transparent hover:border-black text-slate-700 font-black uppercase tracking-wider py-4 px-6 rounded-xl hover:bg-white transition-all flex items-center gap-2"
            title="Clear filters"
          >
            <X className="w-5 h-5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}