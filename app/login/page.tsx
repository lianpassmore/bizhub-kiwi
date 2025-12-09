'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="max-w-md w-full bg-white border border-gray-200 p-8 rounded-2xl shadow-lg relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-wider">Back to Home</span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Access your BizHub dashboard.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="sam@example.co.nz"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wide py-3 px-4 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'LOG IN'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have a profile?{' '}
          <Link href="/signup" className="text-blue-600 hover:text-blue-700 transition font-bold">
            Get Listed
          </Link>
        </div>
      </div>
    </div>
  );
}