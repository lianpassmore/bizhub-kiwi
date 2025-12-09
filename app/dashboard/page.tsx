'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { ExternalLink, Edit, Eye, LogOut, Globe, Mail, Phone, Zap, X } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);

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

  // Helper for Concierge Requests
  const requestAddon = (subject: string) => {
    const body = `Hi Penny,%0D%0A%0D%0AI'm interested in the ${subject} for my business (${business.name}).%0D%0A%0D%0APlease let me know the details!`;
    window.location.href = `mailto:pennyrose.mackay@gmail.com?subject=Request: ${subject}&body=${body}`;
  };

  if (loading) return <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center text-slate-900 font-bold">Loading HQ...</div>;

  if (!business) {
    router.push('/onboarding');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-24 font-sans selection:bg-neon-pink selection:text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-24 md:pt-32">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="inline-block px-3 py-1 bg-green-100 border-2 border-black rounded-lg text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
              <span className="w-2 h-2 inline-block bg-green-500 rounded-full mr-2"></span>
              System Online
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Mission Control
            </h1>
            <p className="text-slate-600 font-medium text-lg mt-2">
              Welcome back, {business.name}
            </p>
          </div>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-wider border-2 border-slate-200 px-6 py-3 rounded-xl hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>

        {/* Upgrade Banner for Free Users */}
        {business.subscription_tier === 'free' && showUpgradeBanner && (
          <div className="bg-gradient-to-r from-neon-pink to-purple-600 border-2 border-black rounded-2xl p-6 md:p-8 mb-8 shadow-pop relative overflow-hidden">
            <button
              onClick={() => setShowUpgradeBanner(false)}
              className="absolute top-4 right-4 text-white hover:text-slate-900 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm border-2 border-white rounded-xl">
                <Zap className="w-10 h-10 text-neon-yellow fill-neon-yellow" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">
                  Unlock Premium Features
                </h3>
                <p className="text-white/90 font-medium mb-4">
                  Get verified badge, clickable links, unlimited gallery, and appear higher in search results
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/subscribe"
                    className="inline-flex items-center gap-2 bg-white text-slate-900 border-2 border-black px-6 py-3 rounded-xl font-black uppercase tracking-wider shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    <Zap className="w-5 h-5" />
                    Upgrade to Pro
                  </Link>
                  <span className="inline-flex items-center gap-2 text-white font-bold text-sm py-3">
                    Starting at $24/month
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Business Card */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-10 mb-12 shadow-pop relative overflow-hidden">
           {/* Decorative strip */}
           <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan border-b-2 border-black"></div>
           
           <div className="flex flex-col md:flex-row gap-8 items-start relative z-10 pt-4">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border-2 border-black shadow-sm">
              {business.logo_url ? <img src={business.logo_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400 font-black text-2xl">?</div>}
            </div>
            
            {/* Info */}
            <div className="flex-1 w-full">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 uppercase">{business.name}</h2>
              <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-sm mb-6">
                <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">{business.region}</span>
                <span>•</span>
                <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">{business.category}</span>
              </div>
              
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

        {/* UPGRADES - Only show for free users */}
        {business.subscription_tier === 'free' && (
          <>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3 uppercase tracking-tight">
              <span className="text-3xl">⚡</span> Upgrade Your Profile
            </h2>
            <p className="text-slate-600 font-medium mb-8">
              You're on the <span className="font-black text-slate-900">Free Plan</span>. Unlock these premium features to grow your business:
            </p>

            <div className="bg-slate-900 border-2 border-black rounded-2xl p-8 mb-12 shadow-pop">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="inline-block bg-neon-yellow border-2 border-black px-4 py-2 rounded-full text-xs font-black uppercase mb-4 shadow-sm">
                    Pro Features
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">
                    Everything You Need to Stand Out
                  </h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-3 text-white font-medium">
                      <Zap className="w-5 h-5 text-neon-yellow fill-neon-yellow" />
                      Verified Green Badge — Build Trust Instantly
                    </li>
                    <li className="flex items-center gap-3 text-white font-medium">
                      <Zap className="w-5 h-5 text-neon-yellow fill-neon-yellow" />
                      Clickable Website & Social Links
                    </li>
                    <li className="flex items-center gap-3 text-white font-medium">
                      <Zap className="w-5 h-5 text-neon-yellow fill-neon-yellow" />
                      One-Tap Mobile Calling Button
                    </li>
                    <li className="flex items-center gap-3 text-white font-medium">
                      <Zap className="w-5 h-5 text-neon-yellow fill-neon-yellow" />
                      Unlimited Image Gallery
                    </li>
                    <li className="flex items-center gap-3 text-white font-medium">
                      <Zap className="w-5 h-5 text-neon-yellow fill-neon-yellow" />
                      Premium Templates
                    </li>
                    <li className="flex items-center gap-3 text-white font-medium">
                      <Zap className="w-5 h-5 text-neon-yellow fill-neon-yellow" />
                      Higher Search Ranking
                    </li>
                  </ul>
                  <Link
                    href="/subscribe"
                    className="inline-flex items-center gap-2 bg-neon-pink border-2 border-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    <Zap className="w-5 h-5" />
                    Upgrade Now — From $24/mo
                  </Link>
                </div>
                <div className="bg-white border-2 border-black rounded-xl p-6 shadow-sm">
                  <div className="text-center">
                    <p className="text-xs font-black text-slate-500 uppercase mb-2">Starting at</p>
                    <div className="text-5xl font-black text-slate-900 mb-1">$24</div>
                    <p className="text-sm font-bold text-slate-600 mb-4">/month</p>
                    <p className="text-xs text-slate-500 font-medium">
                      Save 20% with annual billing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* PREMIUM ADD-ONS */}
        <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-tight">
          <span className="text-3xl">⚡</span> Premium Add-ons
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">

          {/* Domain Card */}
          <div className="bg-white border-2 border-black p-8 rounded-2xl hover:shadow-pop transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-100 border-l-2 border-b-2 border-black px-3 py-1 text-xs font-black uppercase">Optional</div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-blue-100 border-2 border-black rounded-xl text-blue-600 shadow-sm">
                <Globe className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 uppercase">Custom Domain Name</h3>
            <p className="text-slate-600 font-medium mb-8">
              Get a professional <span className="text-slate-900 font-black bg-slate-100 px-1">www.{business.slug.replace(/-/g, '')}.co.nz</span> address that forwards to your page.
            </p>
            <button
              onClick={() => requestAddon('Custom Domain (.co.nz)')}
              className="w-full py-4 border-2 border-black bg-slate-50 text-slate-900 font-black rounded-xl hover:bg-blue-500 hover:text-white transition uppercase tracking-wider text-sm shadow-sm"
            >
              Request Setup
            </button>
          </div>

          {/* Email Card */}
          <div className="bg-white border-2 border-black p-8 rounded-2xl hover:shadow-pop transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-100 border-l-2 border-b-2 border-black px-3 py-1 text-xs font-black uppercase">Optional</div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-green-100 border-2 border-black rounded-xl text-green-600 shadow-sm">
                <Mail className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 uppercase">Professional Email</h3>
            <p className="text-slate-600 font-medium mb-8">
              Look professional with <span className="text-slate-900 font-black bg-slate-100 px-1">hello@{business.slug.replace(/-/g, '')}.co.nz</span>. Includes setup.
            </p>
            <button
              onClick={() => requestAddon('Professional Email')}
              className="w-full py-4 border-2 border-black bg-slate-50 text-slate-900 font-black rounded-xl hover:bg-green-500 hover:text-white transition uppercase tracking-wider text-sm shadow-sm"
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
            className="w-16 h-16 bg-neon-cyan border-2 border-black rounded-full flex items-center justify-center text-slate-900 shadow-pop hover:scale-110 hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
            title="Call Penny"
          >
            <Phone className="w-8 h-8" />
          </a>
        </div>
      </div>

    </div>
  );
}