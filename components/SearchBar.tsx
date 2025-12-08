'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (region) params.append('location', region);
    if (category) params.append('category', category);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-night-900/50 backdrop-blur-sm p-2 rounded-xl border border-neon-cyan/30 flex flex-col md:flex-row gap-2 shadow-neon-cyan/20 shadow-lg">
      {/* Search Input */}
      <div className="relative flex-1 md:flex-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search businesses, services..."
          className="w-full pl-11 pr-4 py-3 bg-night-950 rounded-lg text-white placeholder:text-gray-500 outline-none border border-white/10 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition"
        />
      </div>

      {/* Region Select */}
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="flex-1 p-3 bg-night-950 rounded-lg text-white outline-none border border-white/10 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition"
      >
        <option value="">All Regions</option>
        <option value="Northland">Northland</option>
        <option value="Auckland">Auckland</option>
        <option value="Waikato">Waikato</option>
        <option value="Hamilton">Hamilton</option>
        <option value="Bay of Plenty">Bay of Plenty</option>
        <option value="Tauranga">Tauranga</option>
        <option value="Rotorua">Rotorua</option>
        <option value="Gisborne">Gisborne</option>
        <option value="Hawke's Bay">Hawke's Bay</option>
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

      {/* Category Select */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="flex-1 p-3 bg-night-950 rounded-lg text-white outline-none border border-white/10 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition"
      >
        <option value="">All Categories</option>
        <option value="Agriculture, Forestry & Fishing">Agriculture, Forestry & Fishing</option>
        <option value="Mining & Resources">Mining & Resources</option>
        <option value="Manufacturing">Manufacturing</option>
        <option value="Construction & Trades">Construction & Trades</option>
        <option value="Retail">Retail</option>
        <option value="Hospitality & Tourism">Hospitality & Tourism</option>
        <option value="Transport & Logistics">Transport & Logistics</option>
        <option value="Professional Services">Professional Services</option>
        <option value="Health & Wellness">Health & Wellness</option>
        <option value="Education & Training">Education & Training</option>
        <option value="Media & Creative Industries">Media & Creative Industries</option>
        <option value="Technology & IT">Technology & IT</option>
        <option value="Personal Services">Personal Services</option>
        <option value="Sports & Recreation">Sports & Recreation</option>
        <option value="Community & Non-Profit">Community & Non-Profit</option>
        <option value="Financial & Legal">Financial & Legal</option>
        <option value="Automotive">Automotive</option>
        <option value="Real Estate & Property">Real Estate & Property</option>
        <option value="Home & Lifestyle">Home & Lifestyle</option>
      </select>

      {/* Search Button */}
      <button
        type="submit"
        className="bg-neon-cyan text-night-950 font-black uppercase tracking-wider py-3 px-8 rounded-lg hover:bg-white hover:shadow-neon-cyan transition-all duration-300 whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
}