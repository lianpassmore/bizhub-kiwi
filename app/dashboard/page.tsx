'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { ExternalLink, Edit, Eye, LogOut, Globe, Mail, Phone, Zap, X, Check } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      const { data: businessData } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', user.id)
        .single();
      setBusiness(businessData);
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const requestAddon = (subject: string) => {
    const body = `Hi Penny,%0D%0A%0D%0AI'm interested in the ${subject} for my business (${business.name}).%0D%0A%0D%0APlease let me know the details!`;
    window.location.href = `mailto:pennyrose.mackay@gmail.com?subject=Request: ${subject}&body=${body}`;
  };

  // Helper to safely parse services
  const getServices = () => {
    if (!business?.services) return [];
    try {
      return Array.isArray(business.services) ? business.services : JSON.parse(business.services);
    } catch (e) {
      return [];
    }
  };

  if (loading) return <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center text-slate-900 font-black text-xl">Loading HQ...</div>;

  if (!business) {
    router.push('/onboarding');
    return null;
  }

  const services = getServices();
  const isPro = business.subscription_tier === 'pro';

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-24 font-sans selection:bg-neon-pink selection:text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-24 md:pt-32">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="inline-block px-3 py-1 bg-green-100 border-2 border-black rounded-lg text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
              <span className="w-2 h-2 inline-block bg-green-500 rounded-full mr-2 animate-pulse"></span>
              System Online
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Mission Control
            </h1>
            <p className="text-slate-600 font-medium text-lg mt-2">
              Welcome back, {business.name}
            </p>
          </div>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-wider border-2 border-slate-200 px-6 py-3 rounded-xl hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all bg-white">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>

        {/* MAIN BUSINESS CARD */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-10 mb-12 shadow-pop relative overflow-hidden">
           {/* Decorative Top Strip */}
           <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan border-b-2 border-black"></div>

           <div className="flex flex-col md:flex-row gap-8 items-start relative z-10 pt-4">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border-2 border-black shadow-sm">
              {business.logo_url ? <img src={business.logo_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300 font-black text-4xl">?</div>}
            </div>

            {/* Info */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase leading-none">{business.name}</h2>
                {isPro && (
                  <div className="bg-green-500 border-2 border-black rounded-full p-1 shadow-sm" title="Verified Business">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-xs mb-6">
                {business.regions && Array.isArray(business.regions) && business.regions.length > 0 ? (
                  <>
                    {business.regions.map((region: string, idx: number) => (
                      <span key={idx} className="bg-slate-50 px-3 py-1 rounded-lg border-2 border-slate-100">{region}</span>
                    ))}
                  </>
                ) : business.region ? (
                  <span className="bg-slate-50 px-3 py-1 rounded-lg border-2 border-slate-100">{business.region}</span>
                ) : null}
                <span className="text-slate-300">•</span>
                <span className="bg-slate-50 px-3 py-1 rounded-lg border-2 border-slate-100">{business.category}</span>
              </div>

              {/* About Excerpt */}
              {business.about && (
                <p className="text-slate-600 font-medium mb-6 leading-relaxed max-w-2xl line-clamp-2">{business.about}</p>
              )}

              {/* Services Pills */}
              {services.length > 0 && (
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {services.map((service: string, idx: number) => (
                      <span key={idx} className="bg-white border-2 border-slate-200 px-3 py-1 rounded-lg text-xs font-bold text-slate-700 uppercase tracking-wide">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-8 p-4 bg-slate-50 rounded-xl border-2 border-slate-100">
                {business.contact_phone ? (
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-sm">
                    <div className="w-8 h-8 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center"><Phone className="w-4 h-4 text-slate-400" /></div>
                    <span>{business.contact_phone}</span>
                  </div>
                ) : <div className="text-slate-400 text-sm font-bold italic">No phone added</div>}
                
                {business.contact_email ? (
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-sm">
                    <div className="w-8 h-8 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center"><Mail className="w-4 h-4 text-slate-400" /></div>
                    <span className="truncate">{business.contact_email}</span>
                  </div>
                ) : <div className="text-slate-400 text-sm font-bold italic">No email added</div>}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href={`/business/${business.slug}`} className="bg-neon-cyan text-slate-900 border-2 border-black px-6 py-3 rounded-xl font-black uppercase tracking-wider flex items-center gap-2 hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all shadow-pop">
                  <Eye className="w-5 h-5"/> View Live
                </Link>
                <Link href="/dashboard/edit" className="bg-white text-slate-900 border-2 border-black px-6 py-3 rounded-xl font-black uppercase tracking-wider flex items-center gap-2 hover:bg-slate-50 hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all shadow-pop">
                  <Edit className="w-5 h-5"/> Edit Profile
                </Link>
              </div>
            </div>
           </div>
        </div>

        {/* UPGRADE TEASER (Only for Free Users) */}
        {!isPro && (
          <div className="mb-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-tight">
              <span className="text-3xl">🚀</span> Supercharge Your Page
            </h2>
            
            <div className="bg-slate-900 border-2 border-black rounded-2xl p-8 shadow-pop relative overflow-hidden group">
              {/* Glow Effect */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-neon-cyan/20 blur-[80px] rounded-full group-hover:bg-neon-cyan/30 transition-colors"></div>

              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div className="flex-1 text-white">
                  <div className="inline-block bg-neon-yellow text-slate-900 border-2 border-black px-3 py-1 rounded-lg text-xs font-black uppercase mb-4 shadow-sm">
                    Unlock Pro Features
                  </div>
                  <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">
                    Get Verified & Get Found.
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    <li className="flex items-center gap-3 font-bold text-sm text-slate-300"><Check className="w-5 h-5 text-neon-cyan" /> Verified Green Badge</li>
                    <li className="flex items-center gap-3 font-bold text-sm text-slate-300"><Check className="w-5 h-5 text-neon-cyan" /> Clickable Website Link</li>
                    <li className="flex items-center gap-3 font-bold text-sm text-slate-300"><Check className="w-5 h-5 text-neon-cyan" /> 10-Photo Gallery</li>
                    <li className="flex items-center gap-3 font-bold text-sm text-slate-300"><Check className="w-5 h-5 text-neon-cyan" /> One-Tap Mobile Calling</li>
                  </div>
                  
                  <Link
                    href="/subscribe"
                    className="inline-flex items-center gap-2 bg-neon-pink border-2 border-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-white hover:text-neon-pink"
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    Upgrade Now - $29/mo
                  </Link>
                </div>
                
                {/* Visual Graphic */}
                <div className="hidden md:block w-64">
                   <div className="bg-white border-2 border-black rounded-xl p-4 rotate-3 shadow-lg">
                      <div className="h-4 w-1/2 bg-slate-200 rounded mb-2"></div>
                      <div className="h-4 w-3/4 bg-slate-200 rounded mb-4"></div>
                      <div className="grid grid-cols-2 gap-2">
                         <div className="h-16 bg-slate-100 rounded border border-slate-200"></div>
                         <div className="h-16 bg-slate-100 rounded border border-slate-200"></div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PREMIUM ADD-ONS */}
        <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-tight">
          <span className="text-3xl">⚡</span> Concierge Services
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">

          {/* Domain Card */}
          <div className="bg-white border-2 border-black p-8 rounded-2xl hover:shadow-pop transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-100 border-l-2 border-b-2 border-black px-3 py-1 text-xs font-black uppercase text-slate-500">Optional</div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-blue-100 border-2 border-black rounded-xl text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Globe className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 uppercase">Custom Domain</h3>
            <p className="text-slate-600 font-medium mb-8">
              We'll buy and connect <span className="text-slate-900 font-black bg-slate-100 px-1 border border-slate-200 rounded">www.{business.slug.replace(/-/g, '')}.co.nz</span> for you.
            </p>
            <button
              onClick={() => requestAddon('Custom Domain (.co.nz)')}
              className="w-full py-4 border-2 border-black bg-white text-slate-900 font-black rounded-xl hover:bg-blue-600 hover:text-white transition uppercase tracking-wider text-sm shadow-sm"
            >
              Request Setup
            </button>
          </div>

          {/* Email Card */}
          <div className="bg-white border-2 border-black p-8 rounded-2xl hover:shadow-pop transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-100 border-l-2 border-b-2 border-black px-3 py-1 text-xs font-black uppercase text-slate-500">Optional</div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-green-100 border-2 border-black rounded-xl text-green-600 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-colors">
                <Mail className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 uppercase">Professional Email</h3>
            <p className="text-slate-600 font-medium mb-8">
              Look professional with <span className="text-slate-900 font-black bg-slate-100 px-1 border border-slate-200 rounded">hello@{business.slug.replace(/-/g, '')}.co.nz</span>.
            </p>
            <button
              onClick={() => requestAddon('Professional Email')}
              className="w-full py-4 border-2 border-black bg-white text-slate-900 font-black rounded-xl hover:bg-green-600 hover:text-white transition uppercase tracking-wider text-sm shadow-sm"
            >
              Request Setup
            </button>
          </div>

        </div>

      </div>

      {/* FLOATING PENNY WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
        <div className="flex flex-col gap-3 pointer-events-auto">
          <a
            href="tel:0212997881"
            className="w-16 h-16 bg-neon-cyan border-2 border-black rounded-full flex items-center justify-center text-slate-900 shadow-pop hover:scale-110 hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer group"
            title="Call Penny"
          >
            <Phone className="w-8 h-8 group-hover:animate-wiggle" />
          </a>
        </div>
      </div>

    </div>
  );
}