'use client';

import { motion, Variants } from 'framer-motion';
import { ArrowRight, Zap, BarChart3, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // ✅ IMAGE IMPORT

/* ---------------- VARIANTS ---------------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 14 },
  },
};

/* ---------------- FEATURES ---------------- */
const features = [
  {
    icon: <Zap className="w-10 h-10 text-cyan-400" />,
    title: 'Lightning Fast Task Management',
    description: 'Add, organize, and prioritize tasks in seconds with an intuitive interface.',
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-teal-400" />,
    title: 'Real-time Progress Insights',
    description: 'Track your productivity with beautiful analytics and visual progress.',
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-blue-400" />,
    title: 'Enterprise-Grade Security',
    description: 'Your data is fully encrypted and protected with top-tier security.',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-x-hidden relative">

      {/* Animated Background Glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.15),transparent_50%)] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(45,212,191,0.15),transparent_50%)] pointer-events-none"
      />

      {/* MAIN */}
      <motion.main
        className="flex-grow relative flex flex-col items-center px-6 py-24 md:py-32 max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* HERO */}
        <motion.div variants={itemVariants} className="text-center max-w-5xl">
          <div className="inline-block mb-6 px-6 py-2 bg-white/5 backdrop-blur-lg rounded-full border border-white/10">
            <span className="text-sm font-medium text-cyan-300">
              Smart productivity for modern achievers
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent leading-tight">
            Welcome to Focusboard
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            Organize your day, stay laser-focused, and achieve more with a task management experience built for clarity and momentum.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 text-lg font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-2xl shadow-cyan-500/30 overflow-hidden hover:shadow-cyan-500/60 transition"
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition" />
                <span className="relative flex items-center">
                  Go to Dashboard
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>
            </Link>

            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-10 py-5 text-lg font-semibold text-cyan-300 border border-cyan-500/50 rounded-xl hover:bg-cyan-500/10 transition"
              >
                Sign Up Free
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* FEATURES */}
        <motion.div variants={itemVariants} className="mt-32 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to stay focused</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Powerful tools designed to help you plan smarter, work faster, and achieve more every single day.
          </p>
        </motion.div>

        <div className="mt-16 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg hover:border-cyan-400/50 hover:shadow-cyan-500/20 transition"
            >
              <div className="mb-6 p-4 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl inline-block">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* STATS */}
        <motion.section variants={itemVariants} className="mt-32 w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10K+", label: "Active Users" },
            { number: "95%", label: "Productivity Boost" },
            { number: "1M+", label: "Tasks Completed" },
            { number: "24/7", label: "Cloud Access" },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-3xl md:text-4xl font-bold text-cyan-400">{stat.number}</h3>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.section>

        {/* APP PREVIEW WITH REAL IMAGE */}
        <motion.section variants={itemVariants} className="mt-32 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">A Clear View of Your Productivity</h2>
          <p className="text-gray-400 mb-12">
            FocusBoard gives you a distraction-free dashboard to track tasks, goals, and progress.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-4"
          >
            <Image
              src="/dashboard-preview.png"// ✅ USING A REAL IMAGE
              alt="FocusBoard Dashboard Preview"
              width={1400}
              height={900}
              className="rounded-xl w-full h-auto object-cover"
              priority
            />
          </motion.div>
        </motion.section>

        {/* TESTIMONIAL */}
        <motion.section variants={itemVariants} className="mt-32 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What Users Say</h2>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-lg text-gray-300 italic mb-6">
              “FocusBoard completely changed how I manage my daily work. The clarity and design help me stay focused without feeling overwhelmed.”
            </p>
            <span className="text-cyan-400 font-semibold">— Beta User</span>
          </div>
        </motion.section>
      </motion.main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full mt-20 p-8 text-center text-gray-400 text-sm border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>Trusted by 10,000+ users</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <span>Enterprise-grade security</span>
          </div>
        </div>

        <p>© {new Date().getFullYear()} FocusBoard</p>
        <p className="text-xs mt-1 text-gray-500">Built for productivity & clarity</p>
      </footer>
    </div>
  );
}
