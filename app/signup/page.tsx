'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowLeft } from 'lucide-react';

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="max-w-md w-full bg-white border border-blue-200 p-8 rounded-2xl shadow-lg relative z-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-4">Check Your Email! 📧</h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We've sent a confirmation link to <span className="text-blue-600 font-bold">{email}</span>
            </p>
            <p className="text-gray-600 text-sm mb-8">
              Click the link in the email to verify your account and complete your signup.
              <br />
              <span className="text-amber-600 font-medium">Don't forget to check your spam folder!</span>
            </p>

            <Link
              href="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Join BizHub<span className="text-blue-600">.kiwi</span></h1>
          <p className="text-gray-600">Create your digital profile today.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
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
              minLength={6}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 transition font-bold">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}