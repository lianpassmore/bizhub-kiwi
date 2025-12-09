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
      password
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center p-4" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
      <div className="max-w-md w-full bg-white border-2 border-black p-8 rounded-2xl shadow-pop relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold uppercase tracking-wider mb-6 text-xs">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Log in to your BizHub account.</p>
        </div>
        {error && <div className="bg-red-50 border-2 border-red-100 text-red-600 p-3 rounded-xl mb-6 text-sm font-bold">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-bold focus:border-black outline-none" placeholder="sam@example.co.nz" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-bold focus:border-black outline-none" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-neon-cyan border-2 border-black text-slate-900 font-black py-4 rounded-xl shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider flex justify-center">
            {loading ? <Loader2 className="animate-spin" /> : 'Log In'}
          </button>
        </form>
        <div className="mt-8 text-center text-sm font-bold text-slate-500">
          Don&apos;t have an account? <Link href="/signup" className="text-slate-900 underline hover:text-neon-pink">Create one here</Link>
        </div>
      </div>
    </div>
  );
}