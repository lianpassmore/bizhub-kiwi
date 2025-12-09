'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { ExternalLink, Edit, Eye, LogOut, Share2, Activity, Layout, Check, CreditCard, HelpCircle, Globe, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

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

  const handleCopyLink = () => {
    if (!business) return;
    const url = `${window.location.origin}/business/${business.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper for Concierge Requests
  const requestAddon = (subject: string) => {
    const body = `Hi Penny,%0D%0A%0D%0AI'm interested in the ${subject} for my business (${business.name}).%0D%0A%0D%0APlease let me know the details!`;
    window.location.href = `mailto:pennyrose.mackay@gmail.com?subject=Request: ${subject}&body=${body}`;
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-blue-600">Loading...</div>;

  // If user doesn't have a business profile yet, redirect to onboarding
  if (!business) {
    router.push('/onboarding');
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-blue-600">Redirecting to onboarding...</div>;
  }

  const businessUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/business/${business.slug}`;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-24 md:pt-32">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 uppercase tracking-tight">Mission Control</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Welcome back, {business.name}
            </p>
          </div>
          <button onClick={handleSignOut} className="hidden md:flex items-center gap-2 text-gray-600 hover:text-slate-900 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Business Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-8 shadow-sm relative">
           <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-2xl overflow-hidden shrink-0 border border-gray-200 shadow-sm">
              {business.logo_url ? <img src={business.logo_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">?</div>}
            </div>
            <div className="flex-1 w-full">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{business.name}</h2>
              <p className="text-gray-600 mb-4">📍 {business.region}</p>
              <div className="flex gap-3">
                <Link href={`/business/${business.slug}`} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition"><Eye className="w-4 h-4"/> View Live</Link>
                <Link href="/dashboard/edit" className="border border-gray-300 text-slate-700 px-5 py-2.5 rounded-lg font-medium hover:border-blue-500 hover:text-blue-600 flex items-center gap-2 transition"><Edit className="w-4 h-4"/> Edit Profile</Link>
              </div>
            </div>
           </div>
        </div>

        {/* CONCIERGE UPGRADES */}
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span className="text-amber-500">⚡</span> Premium Add-ons
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          {/* Domain Card */}
          <div className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-blue-400 hover:shadow-md transition group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <Globe className="w-6 h-6" />
              </div>
              <span className="bg-gray-100 text-xs font-bold px-2 py-1 rounded text-gray-600 border border-gray-200">Add-on</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Custom Domain Name</h3>
            <p className="text-gray-600 text-sm mb-6">
              Get a professional <span className="text-slate-900 font-mono">www.{business.slug.replace(/-/g, '')}.co.nz</span> domain that forwards directly to your page.
            </p>
            <button
              onClick={() => requestAddon('Custom Domain (.co.nz)')}
              className="w-full py-3 border border-blue-500 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition uppercase tracking-wider text-sm"
            >
              Request Setup
            </button>
          </div>

          {/* Email Card */}
          <div className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-green-400 hover:shadow-md transition group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <Mail className="w-6 h-6" />
              </div>
              <span className="bg-gray-100 text-xs font-bold px-2 py-1 rounded text-gray-600 border border-gray-200">Add-on</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Professional Email</h3>
            <p className="text-gray-600 text-sm mb-6">
              Look professional with <span className="text-slate-900 font-mono">hello@{business.slug.replace(/-/g, '')}.co.nz</span>. Includes setup and forwarding.
            </p>
            <button
              onClick={() => requestAddon('Professional Email')}
              className="w-full py-3 border border-green-500 text-green-600 font-bold rounded-lg hover:bg-green-600 hover:text-white transition uppercase tracking-wider text-sm"
            >
              Request Setup
            </button>
          </div>

        </div>

      </div>

      {/* FLOATING HELP BUTTON (Penny Widget) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">

        {/* The Buttons */}
        <div className="flex flex-col gap-3 pointer-events-auto">
          <a
            href="tel:0212997881"
            className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 hover:bg-blue-700 transition cursor-pointer"
            title="Call Penny"
          >
            <Phone className="w-6 h-6" />
          </a>
          <a
            href="mailto:pennyrose.mackay@gmail.com"
            className="w-14 h-14 bg-white border border-gray-300 rounded-full flex items-center justify-center text-slate-700 shadow-lg hover:scale-110 transition cursor-pointer hover:bg-gray-50"
            title="Email Support"
          >
            <HelpCircle className="w-6 h-6" />
          </a>
        </div>
      </div>

    </div>
  );
}