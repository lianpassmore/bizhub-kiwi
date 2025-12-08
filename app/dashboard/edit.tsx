'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ImageUpload from '@/components/ImageUpload';
import GalleryUpload from '@/components/GalleryUpload';
import TemplateSelector from '@/components/templates/TemplateSelector';
import { ArrowLeft, Save, Loader2, Globe, Facebook, Instagram, Linkedin, Smartphone, Lock, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function EditProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    region: '',
    about: '',
    phone: '',
    email: '',
    website: '',
    youtube: '',
    servicesString: '', // We handle services as a comma-string in the UI
    facebook: '',
    instagram: '',
    linkedin: '',
    tiktok: '',
    isMobile: false,
    logo_url: '',
    galleryUrls: [] as string[],
    tier: 'free', // 'free' or 'pro'
    template: 'neon'
  });

  // Fetch Existing Data
  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: business } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', user.id)
        .single();

      if (business) {
        // Parse the JSON fields back into simple strings/arrays for the inputs
        const services = Array.isArray(business.services) ? business.services.join(', ') : '';
        const socials = business.social_links || {};
        const gallery = Array.isArray(business.gallery_urls) ? business.gallery_urls : [];

        setFormData({
          name: business.name || '',
          category: business.category || '',
          region: business.region || '',
          about: business.about || '',
          phone: business.contact_phone || '',
          email: business.contact_email || '',
          website: business.website_url || '',
          youtube: business.youtube_url || '',
          servicesString: services,
          facebook: socials.facebook || '',
          instagram: socials.instagram || '',
          linkedin: socials.linkedin || '',
          tiktok: socials.tiktok || '',
          isMobile: business.is_mobile_business || false,
          logo_url: business.logo_url || '',
          galleryUrls: gallery,
          tier: business.subscription_tier || 'free',
          template: business.template || 'neon'
        });
      }
      setLoading(false);
    };

    fetchData();
  }, [router]);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Logo Update
  const handleLogoUpload = (url: string) => {
    setFormData(prev => ({ ...prev, logo_url: url }));
  };

  // Handle Gallery Update
  const handleGalleryUpdate = (newUrls: string[]) => {
    setFormData(prev => ({ ...prev, galleryUrls: newUrls }));
  };

  // Save Changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Convert Services String -> Array
    const servicesArray = formData.servicesString
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // Pack Socials into JSON
    const socialLinks = {
      facebook: formData.facebook,
      instagram: formData.instagram,
      linkedin: formData.linkedin,
      tiktok: formData.tiktok
    };

    // Update DB
    const { error } = await supabase
      .from('businesses')
      .update({
        name: formData.name,
        category: formData.category,
        region: formData.region,
        about: formData.about,
        contact_phone: formData.phone,
        contact_email: formData.email,
        website_url: formData.website,
        youtube_url: formData.youtube,
        services: JSON.stringify(servicesArray), // Store as JSON
        social_links: socialLinks, // Store as JSON
        logo_url: formData.logo_url,
        gallery_urls: formData.galleryUrls, // Store as JSON
        template: formData.template,
        is_mobile_business: formData.isMobile
      })
      .eq('owner_id', user.id);

    setSaving(false);

    if (error) {
      alert('Error updating profile!');
    } else {
      router.push('/dashboard'); // Go back to dashboard on success
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-night-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-neon-cyan animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night-950 selection:bg-neon-pink pb-32">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-24 md:pt-32">
        
        {/* Navigation Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="p-2 bg-night-900 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            Edit Profile
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Visuals */}
          <div className="bg-night-900/50 backdrop-blur border border-white/10 p-6 rounded-2xl">
            <h3 className="text-neon-cyan font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-neon-cyan rounded-full"></span> 
              Brand Visuals
            </h3>
            <ImageUpload label="Update Logo" onUpload={handleLogoUpload} />
            {formData.logo_url && (
               <div className="mt-4 text-xs text-gray-500">Logo saved.</div>
            )}
          </div>

          {/* Section 2: Core Details */}
          <div className="bg-night-900/50 backdrop-blur border border-white/10 p-6 rounded-2xl space-y-6">
            <h3 className="text-neon-pink font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-neon-pink rounded-full"></span>
              The Basics
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Business Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-night-950 border border-white/10 rounded-xl p-4 text-white focus:border-neon-pink outline-none text-lg font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Region</label>
                <select 
                  name="region"
                  value={formData.region} 
                  onChange={handleChange}
                  className="w-full bg-night-950 border border-white/10 rounded-xl p-4 text-white focus:border-neon-pink outline-none"
                >
                  <option>Auckland</option>
                  <option>Wellington</option>
                  <option>Christchurch</option>
                  <option>Hamilton</option>
                  <option>Northland</option>
                  <option>Bay of Plenty</option>
                  <option>Otago</option>
                  <option>Queenstown</option>
                  <option>Napier</option>
                  <option>Tauranga</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Category</label>
                <select 
                  name="category"
                  value={formData.category} 
                  onChange={handleChange}
                  className="w-full bg-night-950 border border-white/10 rounded-xl p-4 text-white focus:border-neon-pink outline-none"
                >
                  <option>Painter</option>
                  <option>Plumber</option>
                  <option>Electrician</option>
                  <option>Builder</option>
                  <option>Handyman</option>
                  <option>Cafe</option>
                  <option>Photographer</option>
                  <option>Web Design</option>
                  <option>Hair Salon</option>
                  <option>Mechanic</option>
                  <option>Cleaner</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">About Us</label>
              <textarea
                name="about"
                rows={6}
                value={formData.about}
                onChange={handleChange}
                className="w-full bg-night-950 border border-white/10 rounded-xl p-4 text-gray-200 focus:border-neon-pink outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Services (Comma Separated)</label>
              <input
                name="servicesString"
                value={formData.servicesString}
                onChange={handleChange}
                placeholder="e.g. Painting, Roof Repair, Decking"
                className="w-full bg-night-950 border border-white/10 rounded-xl p-4 text-white focus:border-neon-pink outline-none"
              />
            </div>
          </div>

          {/* Section 3: Contact Info */}
          <div className="bg-night-900/50 backdrop-blur border border-white/10 p-6 rounded-2xl space-y-6">
            <h3 className="text-neon-yellow font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-neon-yellow rounded-full"></span>
              Contact Info
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Phone Number</label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="021 123 4567"
                  className="w-full bg-night-950 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-neon-yellow outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@business.co.nz"
                className="w-full bg-night-950 border border-white/10 rounded-xl p-4 text-white focus:border-neon-yellow outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Website (Optional)</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full bg-night-950 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-neon-yellow outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">YouTube Video (Optional)</label>
              <div className="relative">
                <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                <input
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleChange}
                  placeholder="https://youtu.be/..."
                  className="w-full bg-night-950 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-red-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 bg-night-900 border border-white/10 p-4 rounded-xl">
              <input
                type="checkbox"
                checked={formData.isMobile}
                onChange={(e) => setFormData({...formData, isMobile: e.target.checked})}
                className="w-5 h-5 accent-neon-pink rounded cursor-pointer"
              />
              <div>
                <span className="block text-white font-bold text-sm">I am a Mobile/Online Business</span>
                <span className="block text-gray-500 text-xs">Hide my exact address on the public map</span>
              </div>
            </div>
          </div>

          {/* Section 4: Social Links */}
          <div className="bg-night-900/50 backdrop-blur border border-white/10 p-6 rounded-2xl space-y-6">
             <h3 className="text-neon-purple font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-neon-purple rounded-full"></span>
              Social Links
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                <input
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="Facebook URL"
                  className="w-full bg-night-950 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-neon-purple outline-none"
                />
              </div>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
                <input
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="Instagram URL"
                  className="w-full bg-night-950 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-neon-purple outline-none"
                />
              </div>
              <div className="relative">
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn URL"
                  className="w-full bg-night-950 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-neon-purple outline-none"
                />
              </div>
               <div className="relative">
                {/* TikTok Placeholder Icon */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">TT</span>
                <input
                  name="tiktok"
                  value={formData.tiktok}
                  onChange={handleChange}
                  placeholder="TikTok URL"
                  className="w-full bg-night-950 border border-white/10 rounded-xl p-4 pl-12 text-white focus:border-neon-purple outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Template Selector */}
          <TemplateSelector
             currentTemplate={formData.template}
             isPro={formData.tier === 'pro'}
             onSelect={(t: string) => setFormData({ ...formData, template: t })}
          />

          {/* Section 6: Image Gallery */}
          <div className="bg-night-900/50 backdrop-blur border border-white/10 p-6 rounded-2xl space-y-6 relative overflow-hidden">
            <h3 className="text-neon-cyan font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-neon-cyan rounded-full"></span>
              Portfolio Gallery
            </h3>
            
            {formData.tier === 'free' ? (
              <div className="bg-night-950 border border-white/10 rounded-xl p-8 text-center relative">
                <div className="absolute inset-0 bg-night-900/50 blur-sm z-0"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 bg-night-800 rounded-full flex items-center justify-center text-gray-500 mb-4">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="text-white font-bold mb-2">Gallery Locked</h4>
                  <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                    Upgrade to BizHub Pro to showcase up to 10 photos of your work.
                  </p>
                  <Link href="/subscribe" className="bg-neon-pink text-white px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-neon-pink transition">
                    Unlock Gallery
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-500 text-sm mb-4">
                  Upload up to 10 high-quality images of your work.
                </p>
                <GalleryUpload 
                  images={formData.galleryUrls} 
                  onUpdate={handleGalleryUpdate} 
                  maxLimit={10}
                />
              </div>
            )}
          </div>

          {/* MOBILE STICKY SAVE BAR */}
          <div className="fixed bottom-0 left-0 w-full p-4 bg-night-950/80 backdrop-blur-xl border-t border-white/10 z-50 flex justify-center">
            <button
              type="submit"
              disabled={saving}
              className="w-full max-w-3xl bg-neon-cyan text-night-950 font-black py-4 rounded-xl hover:bg-white hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 uppercase tracking-wider text-lg"
            >
              {saving ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}