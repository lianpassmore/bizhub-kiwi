'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ImageUpload from '@/components/ImageUpload';
import GalleryUpload from '@/components/GalleryUpload';
import TemplateSelector from '@/components/TemplateSelector';
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
    servicesString: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    tiktok: '',
    isMobile: false,
    logo_url: '',
    galleryUrls: [] as string[],
    tier: 'free',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (url: string) => {
    setFormData(prev => ({ ...prev, logo_url: url }));
  };

  const handleGalleryUpdate = (newUrls: string[]) => {
    setFormData(prev => ({ ...prev, galleryUrls: newUrls }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const servicesArray = formData.servicesString.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const socialLinks = {
      facebook: formData.facebook,
      instagram: formData.instagram,
      linkedin: formData.linkedin,
      tiktok: formData.tiktok
    };

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
        services: JSON.stringify(servicesArray),
        social_links: socialLinks,
        logo_url: formData.logo_url,
        gallery_urls: formData.galleryUrls,
        template: formData.template,
        is_mobile_business: formData.isMobile
      })
      .eq('owner_id', user.id);

    setSaving(false);
    if (!error) router.push('/dashboard');
  };

  if (loading) return <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center font-bold text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FFFDF9] selection:bg-neon-pink selection:text-white pb-32">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-24 md:pt-32">
        
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="p-3 bg-white border-2 border-black rounded-xl hover:shadow-pop transition-all">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
            Edit Profile
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Visuals */}
          <div className="bg-white border-2 border-black p-8 rounded-2xl shadow-sm">
            <h3 className="text-slate-900 font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-neon-cyan border-2 border-black rounded-full"></span> 
              Brand Visuals
            </h3>
            <div className="h-48 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 transition relative">
               <ImageUpload label="Update Logo" onUpload={handleLogoUpload} />
            </div>
          </div>

          {/* Section 2: Core Details */}
          <div className="bg-white border-2 border-black p-8 rounded-2xl shadow-sm space-y-6">
            <h3 className="text-slate-900 font-black uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
              <span className="w-3 h-3 bg-neon-pink border-2 border-black rounded-full"></span>
              The Basics
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Business Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-slate-900 font-bold focus:border-black focus:bg-white outline-none transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Region</label>
                <select name="region" value={formData.region} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-slate-900 font-bold focus:border-black focus:bg-white outline-none">
                  <option>Northland</option>
                  <option>Auckland</option>
                  <option>Waikato</option>
                  <option>Wellington</option>
                  <option>Christchurch</option>
                  <option>Dunedin</option>
                  {/* Add more as needed */}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-slate-900 font-bold focus:border-black focus:bg-white outline-none">
                  <option>Trades</option>
                  <option>Hospitality</option>
                  <option>Retail</option>
                  <option>Professional Services</option>
                  <option>Health & Beauty</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">About Us</label>
              <textarea
                name="about"
                rows={6}
                value={formData.about}
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-slate-900 font-medium focus:border-black focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Services (Comma Separated)</label>
              <input
                name="servicesString"
                value={formData.servicesString}
                onChange={handleChange}
                placeholder="e.g. Painting, Roof Repair, Decking"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-slate-900 font-bold focus:border-black focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* Section 3: Contact Info */}
          <div className="bg-white border-2 border-black p-8 rounded-2xl shadow-sm space-y-6">
            <h3 className="text-slate-900 font-black uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
              <span className="w-3 h-3 bg-neon-yellow border-2 border-black rounded-full"></span>
              Contact Info
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone Number</label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 pl-12 text-slate-900 font-bold focus:border-black focus:bg-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-slate-900 font-bold focus:border-black focus:bg-white outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Website</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 pl-12 text-slate-900 font-bold focus:border-black focus:bg-white outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 p-4 rounded-xl">
              <input
                type="checkbox"
                checked={formData.isMobile}
                onChange={(e) => setFormData({...formData, isMobile: e.target.checked})}
                className="w-6 h-6 accent-neon-pink rounded cursor-pointer"
              />
              <div>
                <span className="block text-slate-900 font-bold text-sm">I am a Mobile/Online Business</span>
                <span className="block text-slate-500 text-xs font-bold uppercase">Hide my exact address</span>
              </div>
            </div>
          </div>

          {/* Section 4: Social Links */}
          <div className="bg-white border-2 border-black p-8 rounded-2xl shadow-sm space-y-6">
             <h3 className="text-slate-900 font-black uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
              <span className="w-3 h-3 bg-neon-purple border-2 border-black rounded-full"></span>
              Social Links
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="facebook" value={formData.facebook} onChange={handleChange} placeholder="Facebook URL" className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-slate-900 font-bold focus:border-black outline-none" />
              <input name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Instagram URL" className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-slate-900 font-bold focus:border-black outline-none" />
            </div>
          </div>

          {/* Section 5: Templates */}
          <TemplateSelector currentTemplate={formData.template} isPro={formData.tier === 'pro'} onSelect={(t: string) => setFormData({ ...formData, template: t })} />

          {/* Section 6: Gallery */}
          <div className="bg-white border-2 border-black p-8 rounded-2xl shadow-sm">
            <h3 className="text-slate-900 font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-neon-cyan border-2 border-black rounded-full"></span>
              Portfolio Gallery
            </h3>
            {formData.tier === 'free' ? (
              <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl p-12 text-center">
                <Lock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h4 className="text-slate-900 font-bold mb-2">Gallery Locked</h4>
                <Link href="/subscribe" className="inline-block bg-neon-pink text-white border-2 border-black px-6 py-2 rounded-lg font-black uppercase tracking-wider shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-hover transition-all">Unlock Pro</Link>
              </div>
            ) : (
              <GalleryUpload images={formData.galleryUrls} onUpdate={handleGalleryUpdate} maxLimit={10} />
            )}
          </div>

          {/* Sticky Save Bar */}
          <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-xl border-t-2 border-black z-50 flex justify-center">
            <button
              type="submit"
              disabled={saving}
              className="w-full max-w-3xl bg-neon-cyan text-slate-900 border-2 border-black font-black py-4 rounded-xl hover:bg-neon-pink hover:text-white transition-all shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] flex items-center justify-center gap-2 uppercase tracking-wider text-lg"
            >
              {saving ? <Loader2 className="animate-spin" /> : <Save className="w-6 h-6" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}