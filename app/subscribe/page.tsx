'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Check, Loader2 } from 'lucide-react';

export default function Subscribe() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    setLoading(true);
    // Redirect to Stripe Checkout
    const stripeUrl = billingCycle === 'yearly'
      ? 'https://buy.stripe.com/14A9AV5GN2Akb0UghH'
      : 'https://buy.stripe.com/14A5kFb170sc6KEd5v';
    window.location.href = stripeUrl;
  };

  return (
    <div className="min-h-screen bg-night-950 selection:bg-neon-pink">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
          Join the <span className="text-neon-cyan">Movement</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Get your verified digital profile, remove ads, and join a community of 10,000+ Kiwi business owners.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-night-900 border border-white/10 p-1 rounded-xl flex relative">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all z-10 ${
                billingCycle === 'monthly' ? 'text-night-950' : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all z-10 ${
                billingCycle === 'yearly' ? 'text-night-950' : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly <span className="text-[10px] bg-neon-pink text-white px-2 py-0.5 rounded-full ml-2">SAVE 20%</span>
            </button>
            
            {/* Sliding Background */}
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-neon-cyan rounded-lg transition-all duration-300 ${
                billingCycle === 'monthly' ? 'left-1' : 'left-[calc(50%+4px)]'
              }`}
            ></div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          
          {/* Free Tier (Comparison) */}
          <div className="bg-night-900/30 border border-white/5 rounded-2xl p-8 opacity-60 hover:opacity-100 transition">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-4">Social Only</h3>
            <div className="text-3xl font-black text-white mb-6">$0</div>
            <ul className="text-left space-y-4 text-gray-500 mb-8 text-sm">
              <li className="flex items-center gap-3"><span className="text-red-500">✕</span> No Website Link</li>
              <li className="flex items-center gap-3"><span className="text-red-500">✕</span> Hard to Google</li>
              <li className="flex items-center gap-3"><span className="text-red-500">✕</span> Lost in Feed</li>
            </ul>
          </div>

          {/* THE PRO TIER (Highlighted) */}
          <div className="bg-night-900 border border-neon-cyan p-8 rounded-3xl relative shadow-[0_0_40px_rgba(0,240,255,0.1)] transform scale-105">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-cyan text-night-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
              Most Popular
            </div>

            <h3 className="text-neon-cyan font-bold uppercase tracking-widest mb-2">BizHub Pro</h3>
            <div className="flex items-end justify-center gap-1 mb-6">
              <span className="text-5xl font-black text-white">
                ${billingCycle === 'monthly' ? '29' : '24'}
              </span>
              <span className="text-gray-500 mb-2">/mo</span>
            </div>
            <p className="text-sm text-gray-400 mb-8">Billed {billingCycle === 'monthly' ? 'monthly' : '$288 yearly'}</p>

            <button 
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-neon-cyan text-night-950 font-black py-4 rounded-xl hover:bg-white transition-all shadow-lg shadow-neon-cyan/20 mb-8 uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Get Verified Now'}
            </button>

            <ul className="text-left space-y-4 text-gray-300 text-sm">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-cyan" /> Verified Green Badge</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-cyan" /> SEO-Optimized Profile</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-cyan" /> Unlimited Gallery Images</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-cyan" /> No Ads on your page</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-cyan" /> Access Community Events</li>
            </ul>
          </div>

          {/* Enterprise (Comparison) */}
          <div className="bg-night-900/30 border border-white/5 rounded-2xl p-8 opacity-60 hover:opacity-100 transition">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-4">Website Agency</h3>
            <div className="text-3xl font-black text-white mb-6">$3,000+</div>
            <ul className="text-left space-y-4 text-gray-500 mb-8 text-sm">
              <li className="flex items-center gap-3"><Check className="w-4 h-4" /> Full Custom Website</li>
              <li className="flex items-center gap-3"><span className="text-orange-500">⚠</span> Expensive Upfront</li>
              <li className="flex items-center gap-3"><span className="text-orange-500">⚠</span> Monthly Maintenance Fees</li>
            </ul>
          </div>

        </div>

        <p className="mt-12 text-sm text-gray-500">
          Secure payment via Stripe. Cancel anytime from your dashboard.
        </p>

      </div>
    </div>
  );
}