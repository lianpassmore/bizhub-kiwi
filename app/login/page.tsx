'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-night-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-cyan/20 blur-[120px] rounded-full z-0"></div>

      <div className="max-w-md w-full bg-night-900/50 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Access your BizHub dashboard.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-neon-pink uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-night-950 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none transition"
              placeholder="sam@example.co.nz"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neon-pink uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-night-950 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neon-cyan hover:bg-white border border-neon-cyan hover:text-black text-night-950 font-black tracking-wide py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-neon-cyan/20 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'LOG IN'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Don't have a profile?{' '}
          <Link href="/signup" className="text-neon-pink hover:text-white transition font-bold">
            Get Listed
          </Link>
        </div>
      </div>
    </div>
  );
}