// frontend/app/auth/signup/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { UserPlus, Loader, AlertCircle } from 'lucide-react';
import { PasswordInput } from '@/components/ui/password-input';
import { signup } from '@/lib/auth'; // Import signup from lib/auth

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    
    setLoading(true);

    const result = await signup({ // Use the imported signup function
      email, 
      password, 
      first_name: firstName, 
      last_name: lastName 
    });

    if (!result.success) {
      setError(result.error || "Signup failed");
      toast.error(result.error || "Signup failed");
    } else {
      toast.success('Account created! Redirecting...');
      router.push('/dashboard');
    }
    
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 opacity-60 bg-gradient-to-br from-teal-400/50 to-cyan-500/50 blur-3xl"></div>
      <div className="absolute inset-0 z-0 opacity-40 bg-gradient-to-tl from-purple-400/40 to-pink-500/40 blur-3xl"></div>
      <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-r from-cyan-300/30 to-teal-300/30 blur-2xl"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-teal-200/30 dark:border-teal-700/30 rounded-2xl shadow-2xl relative z-10"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-md">
            Create Your Account
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Join us and start organizing your tasks.</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center p-3 space-x-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg"
          >
            <AlertCircle size={20} />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Laiba"
                className="w-full p-3 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/90 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 dark:focus:border-teal-500 transition-all outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ashfaq"
                className="w-full p-3 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/90 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 dark:focus:border-teal-500 transition-all outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="laiba@example.com"
              className="w-full p-3 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/90 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 dark:focus:border-teal-500 transition-all outline-none"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/90 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 dark:focus:border-teal-500 transition-all outline-none"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-60 transition-all transform hover:scale-[1.02] duration-200"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" size={20} />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2" size={20} />
                  Sign Up
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="text-sm text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:underline transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}