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
  const [success, setSuccess] = useState(false);

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
      // Success! Show confirmation message
      setSuccess(true);
      setLoading(false);
    }
  };

  // If signup successful, show confirmation screen
  if (success) {
    return (
      <div className="min-h-screen bg-night-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-cyan/20 blur-[120px] rounded-full z-0"></div>

        <div className="max-w-md w-full bg-night-900/50 backdrop-blur-md border border-neon-cyan/50 p-8 rounded-2xl shadow-2xl relative z-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">Check Your Email! 📧</h1>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We've sent a confirmation link to <span className="text-neon-cyan font-bold">{email}</span>
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Click the link in the email to verify your account and complete your signup.
              <br />
              <span className="text-neon-yellow">Don't forget to check your spam folder!</span>
            </p>

            <Link
              href="/login"
              className="inline-block bg-neon-cyan text-night-950 font-bold py-3 px-8 rounded-lg hover:bg-white transition-all shadow-lg shadow-neon-cyan/20"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

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