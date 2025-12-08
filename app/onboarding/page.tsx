'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';
import { Loader2, ArrowRight } from 'lucide-react';

export default function Onboarding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');
  const [about, setAbout] = useState('');
  const [services, setServices] = useState(''); // Comma separated string
  const [logoUrl, setLogoUrl] = useState('');
  const [slug, setSlug] = useState('');

  // Check if user is logged in
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    };
    getUser();
  }, [router]);

  // Auto-generate slug from name
  useEffect(() => {
    const generatedSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with dashes
      .replace(/^-+|-+$/g, '');    // Remove leading/trailing dashes
    setSlug(generatedSlug);
  }, [name]);

  // Generate placeholder logo from business name
  const generatePlaceholder = (businessName: string): string => {
    const canvas = document.createElement('canvas');
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) return '';

    // Neon gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#7000FF'); // neon-purple
    gradient.addColorStop(0.5, '#FF0099'); // neon-pink
    gradient.addColorStop(1, '#00F0FF'); // neon-cyan
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Get initials (max 2 characters)
    const initials = businessName
      .split(' ')
      .map(word => word[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();

    // Draw text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 180px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials || '?', size / 2, size / 2);

    return canvas.toDataURL('image/png');
  };

  // Submit to Database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user) return;

    let finalLogoUrl = logoUrl;

    // Generate placeholder if no logo uploaded
    if (!logoUrl && name) {
      try {
        const placeholderDataUrl = generatePlaceholder(name);

        // Convert data URL to blob
        const response = await fetch(placeholderDataUrl);
        const blob = await response.blob();

        // Upload to Supabase Storage
        const fileName = `placeholder-${slug}-${Date.now()}.png`;
        const { error: uploadError } = await supabase.storage
          .from('bizhub-assets')
          .upload(fileName, blob);

        if (!uploadError) {
          const { data } = supabase.storage
            .from('bizhub-assets')
            .getPublicUrl(fileName);

          finalLogoUrl = data.publicUrl;
        }
      } catch (error) {
        console.error('Error generating placeholder:', error);
      }
    }

    // Convert comma string to JSON array
    const servicesArray = services.split(',').map(s => s.trim()).filter(s => s !== '');

    const { error } = await supabase.from('businesses').insert({
      owner_id: user.id,
      name,
      slug,
      category,
      region,
      about,
      services: JSON.stringify(servicesArray), // Store as JSON
      logo_url: finalLogoUrl,
      template: 'neon'
    });

    if (error) {
      alert('Error creating profile: ' + error.message);
      setLoading(false);
    } else {
      // Success! Go to their new dashboard
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-night-950 py-12 px-4 selection:bg-neon-pink">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block px-3 py-1 bg-neon-purple/20 border border-neon-purple text-neon-purple rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
            Step 1 of 1
          </span>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
            Build Your <span className="text-neon-cyan">Digital HQ</span>
          </h1>
          <p className="text-gray-400">Tell us about your business. We'll handle the rest.</p>
        </div>

        <div className="bg-night-900/50 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: The Basics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Business Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-night-950 border border-white/10 rounded-lg p-3 text-white focus:border-neon-pink outline-none transition"
                  placeholder="e.g. Sam's Painting"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Location</label>
                <select 
                  value={region} 
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-night-950 border border-white/10 rounded-lg p-3 text-white focus:border-neon-pink outline-none transition"
                  required
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
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-night-950 border border-white/10 rounded-lg p-3 text-white focus:border-neon-pink outline-none transition"
                  required
                >
                  <option value="">Select Category...</option>
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
              </div>
              
              {/* Auto-Slug Preview */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Website Link</label>
                <div className="w-full bg-night-950/50 border border-white/5 rounded-lg p-3 text-gray-500 font-mono text-sm truncate">
                  bizhub.kiwi/business/<span className="text-neon-cyan">{slug || 'your-name'}</span>
                </div>
              </div>
            </div>

            {/* Section 2: Details */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">About Business</label>
              <textarea
                rows={5}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full bg-night-950 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan outline-none transition resize-none"
                placeholder="Tell us your story..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Services (Comma Separated)</label>
              <input
                value={services}
                onChange={(e) => setServices(e.target.value)}
                className="w-full bg-night-950 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan outline-none transition"
                placeholder="Exterior Painting, Roof Restoration, Fence Painting"
              />
            </div>

            {/* Section 3: Visuals */}
            <ImageUpload label="Upload Business Logo" onUpload={setLogoUrl} businessName={name} />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neon-pink text-white font-black py-4 rounded-xl hover:bg-white hover:text-neon-pink hover:shadow-[0_0_20px_#FF0099] transition-all duration-300 flex items-center justify-center gap-2 mt-8"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  LAUNCH WEBSITE <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}