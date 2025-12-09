'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowLeft, Check, Zap, X } from 'lucide-react';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('free');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Business profile fields
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Trades');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [address, setAddress] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // If they selected Pro, redirect to Stripe checkout after signup
    if (selectedPlan === 'pro') {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        // Redirect to Stripe with plan info
        const stripeUrl = billingCycle === 'yearly'
          ? 'https://buy.stripe.com/14A9AV5GN2Akb0UghH2wU00'
          : 'https://buy.stripe.com/14A5kFb170sc6KEd5v2wU01';
        window.location.href = stripeUrl;
      }
    } else {
      // Free plan - create account and business profile
      const { error, data } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (data.user) {
        // Create business profile
        const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const { error: bizError } = await supabase.from('businesses').insert({
          owner_id: data.user.id,
          name: businessName,
          category: category,
          regions: selectedRegions,
          address: address,
          slug: slug,
          subscription_tier: 'free'
        });

        if (bizError) {
          setError('Account created but business profile failed. Please complete your profile in the dashboard.');
        }

        setSuccess(true);
        setLoading(false);
      }
    }
  };

  if (success) return (
    <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center p-4">
       <div className="max-w-md w-full bg-white border-2 border-black p-8 rounded-2xl shadow-pop text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">Check Your Email! 📧</h1>
          <p className="text-slate-600 mb-6 font-medium">Link sent to <span className="font-bold text-slate-900">{email}</span></p>
          <Link href="/login" className="inline-block bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-700 transition">Back to Login</Link>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center p-4 py-12" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
      <div className="max-w-4xl w-full bg-white border-2 border-black p-8 md:p-12 rounded-2xl shadow-pop relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold uppercase tracking-wider mb-6 text-xs">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">Join BizHub</h1>
          <p className="text-slate-500 font-medium">Choose your plan and create your account</p>
        </div>

        {error && <div className="bg-red-50 border-2 border-red-100 text-red-600 p-3 rounded-xl mb-6 text-sm font-bold">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-8">

          {/* Plan Selection */}
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-tight">Select Your Plan</h3>
            <div className="grid md:grid-cols-2 gap-4">

              {/* Free Plan */}
              <div
                onClick={() => setSelectedPlan('free')}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  selectedPlan === 'free'
                    ? 'border-neon-pink bg-pink-50 shadow-pop'
                    : 'border-slate-200 hover:border-black'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-black text-slate-900 text-xl mb-1">Free</h4>
                    <div className="text-3xl font-black text-slate-900">$0</div>
                    <p className="text-xs text-slate-500 font-bold uppercase mt-1">Forever</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === 'free' ? 'border-neon-pink bg-neon-pink' : 'border-slate-300'
                  }`}>
                    {selectedPlan === 'free' && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <ul className="space-y-2 text-sm font-medium">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-900" /> Basic Search Listing</li>
                  <li className="flex items-center gap-2 text-slate-400"><X className="w-4 h-4" /> No Clickable Links</li>
                  <li className="flex items-center gap-2 text-slate-400"><X className="w-4 h-4" /> No Image Gallery</li>
                </ul>
              </div>

              {/* Pro Plan */}
              <div
                onClick={() => setSelectedPlan('pro')}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all relative ${
                  selectedPlan === 'pro'
                    ? 'border-neon-pink bg-pink-50 shadow-pop'
                    : 'border-slate-200 hover:border-black'
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-yellow border-2 border-black px-4 py-1 rounded-full text-xs font-black uppercase shadow-sm">
                  Recommended
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-black text-slate-900 text-xl mb-1">Pro</h4>
                    <div className="text-3xl font-black text-slate-900">$29/mo</div>
                    <p className="text-xs text-slate-500 font-bold uppercase mt-1">
                      Billed {billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === 'pro' ? 'border-neon-pink bg-neon-pink' : 'border-slate-300'
                  }`}>
                    {selectedPlan === 'pro' && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <ul className="space-y-2 text-sm font-medium mb-4">
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-neon-yellow fill-neon-yellow" /> Verified Badge</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-900" /> Clickable Website & Socials</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-900" /> One-Tap Mobile Calling</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-900" /> 10 Photo Gallery</li>
                </ul>

                {/* Billing Toggle (only visible when Pro is selected) */}
                {selectedPlan === 'pro' && (
                  <div className="mt-4 pt-4 border-t-2 border-slate-200">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setBillingCycle('monthly'); }}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-black uppercase transition-all ${
                          billingCycle === 'monthly'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setBillingCycle('yearly'); }}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-black uppercase transition-all ${
                          billingCycle === 'yearly'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Yearly <span className="text-[9px] text-neon-pink">SAVE 20%</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Account Details */}
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-tight">Account Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-bold focus:border-black outline-none" placeholder="sam@example.co.nz" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-bold focus:border-black outline-none" placeholder="••••••••" />
              </div>
            </div>
          </div>

          {/* Business Profile (only for free plan) */}
          {selectedPlan === 'free' && (
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-tight">Business Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Business Name</label>
                  <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-bold focus:border-black outline-none" placeholder="Joe's Cafe" />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-bold focus:border-black outline-none cursor-pointer">
                    <option>Trades</option>
                    <option>Hospitality</option>
                    <option>Retail</option>
                    <option>Professional Services</option>
                    <option>Health & Beauty</option>
                    <option>Automotive</option>
                    <option>Creative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Business Address</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-bold focus:border-black outline-none" placeholder="123 Main Street, Auckland" />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Regions (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['Northland', 'Auckland', 'Waikato', 'Wellington', 'Christchurch', 'Dunedin', 'Queenstown', 'Tauranga', 'Hamilton'].map((region) => (
                      <label key={region} className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 rounded-lg p-2 cursor-pointer hover:border-black transition-all">
                        <input
                          type="checkbox"
                          checked={selectedRegions.includes(region)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRegions([...selectedRegions, region]);
                            } else {
                              setSelectedRegions(selectedRegions.filter(r => r !== region));
                            }
                          }}
                          className="w-4 h-4 accent-neon-pink rounded cursor-pointer"
                        />
                        <span className="text-slate-900 font-bold text-xs">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-neon-cyan border-2 border-black text-slate-900 font-black py-4 rounded-xl shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : (
              selectedPlan === 'pro' ? 'Continue to Payment' : 'Create Free Account'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-bold text-slate-500">
          Already have an account? <Link href="/login" className="text-slate-900 underline hover:text-neon-pink">Log in here</Link>
        </div>
      </div>
    </div>
  );
}