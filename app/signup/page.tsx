'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Success! Send them to the onboarding (or Stripe)
      router.push('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-night-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-pink/20 blur-[120px] rounded-full z-0"></div>

      <div className="max-w-md w-full bg-night-900/50 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join BizHub<span className="text-neon-cyan">.kiwi</span></h1>
          <p className="text-gray-400">Create your neon digital profile today.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-neon-cyan uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-night-950 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-neon-pink focus:border-transparent outline-none transition"
              placeholder="sam@example.co.nz"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neon-cyan uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-night-950 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-neon-pink focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neon-pink hover:bg-transparent border border-neon-pink hover:text-neon-pink text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-neon-pink/20 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-neon-cyan hover:text-white transition font-bold">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}