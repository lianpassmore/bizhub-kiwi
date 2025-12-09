'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Check, X, Loader2, Zap } from 'lucide-react';

export default function Subscribe() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    setLoading(true);
    // Stripe Logic
    const stripeUrl = billingCycle === 'yearly'
      ? 'https://buy.stripe.com/14A9AV5GN2Akb0UghH'
      : 'https://buy.stripe.com/14A5kFb170sc6KEd5v';
    window.location.href = stripeUrl;
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] selection:bg-neon-pink selection:text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
          Join the <span className="text-neon-cyan px-2 bg-slate-900 skew-x-[-10deg] inline-block">Movement</span>
        </h1>
        
        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-white border-2 border-black p-1 rounded-xl flex relative shadow-pop">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-lg text-sm font-black uppercase tracking-wider transition-all z-10 ${
                billingCycle === 'monthly' ? 'text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-lg text-sm font-black uppercase tracking-wider transition-all z-10 ${
                billingCycle === 'yearly' ? 'text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Yearly <span className="text-[10px] bg-neon-pink text-white border border-black px-2 py-0.5 rounded-full ml-2">SAVE 20%</span>
            </button>
            
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-slate-900 rounded-lg transition-all duration-300 ${
                billingCycle === 'monthly' ? 'left-1' : 'left-[calc(50%+4px)]'
              }`}
            ></div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          
          {/* FREE TIER */}
          <div className="bg-white border-2 border-black rounded-3xl p-8 relative top-8 shadow-sm">
            <h3 className="text-slate-500 font-black uppercase tracking-widest mb-4">Starter Listing</h3>
            <div className="text-6xl font-black text-slate-900 mb-2">$0</div>
            <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-8">Forever free</p>

            <button className="w-full bg-slate-100 border-2 border-slate-200 text-slate-400 font-black py-4 rounded-xl mb-8 uppercase tracking-wider cursor-not-allowed">
              Current Plan
            </button>

            <ul className="text-left space-y-4 text-slate-600 text-sm font-bold">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-slate-900" /> Basic Search Listing</li>
              <li className="flex items-center gap-3 opacity-50"><X className="w-5 h-5 text-red-500" /> No Clickable Website Link</li>
              <li className="flex items-center gap-3 opacity-50"><X className="w-5 h-5 text-red-500" /> No Image Gallery</li>
            </ul>
          </div>

          {/* PAID TIER */}
          <div className="bg-slate-900 border-2 border-black p-8 rounded-3xl relative shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all transform scale-105 z-10">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-neon-yellow border-2 border-black text-slate-900 px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-pop">
              Recommended
            </div>

            <h3 className="text-neon-cyan font-black uppercase tracking-widest mb-4">BizHub Pro</h3>
            <div className="flex items-end justify-center gap-1 mb-2">
              <span className="text-7xl font-black text-white">
                ${billingCycle === 'monthly' ? '29' : '24'}
              </span>
              <span className="text-slate-400 mb-2 font-bold">/mo</span>
            </div>
            <p className="text-sm text-slate-400 font-medium mb-8">
              Billed {billingCycle === 'monthly' ? 'monthly' : '$288 yearly'}
            </p>

            <button 
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-neon-pink border-2 border-black text-white font-black py-4 rounded-xl hover:bg-white hover:text-neon-pink transition-all shadow-pop mb-8 uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Get Verified Now'}
            </button>

            <ul className="text-left space-y-4 text-white text-sm font-bold">
              <li className="flex items-center gap-3"><Zap className="w-5 h-5 text-neon-yellow fill-neon-yellow" /> Verified Green Badge</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-cyan" /> Clickable Website & Socials</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-cyan" /> "One-Tap" Mobile Calling</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-cyan" /> Unlimited Image Gallery</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-cyan" /> No Ads on your page</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}