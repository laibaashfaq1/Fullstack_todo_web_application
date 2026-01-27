'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, animate } from 'framer-motion';
import { ArrowRight, CheckCircle, List, Clock } from 'lucide-react';
import { Task } from '../../components/TaskCard';
import { getTasks } from '../../lib/api';
import { getToken } from '@/lib/auth';

/* ---------------- Animated Counter ---------------- */
const AnimatedNumber = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 0.8,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{display}</span>;
};

/* ---------------- Stat Card ---------------- */
const StatCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) => (
  <motion.div
    whileHover={{ y: -6 }}
    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl shadow-lg flex items-center gap-4"
  >
    <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    <div>
      <p className="text-3xl font-bold text-gray-800 dark:text-white">
        <AnimatedNumber value={value} />
      </p>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  </motion.div>
);

/* ---------------- Dashboard ---------------- */
const DashboardOverviewPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const fetchedTasks = await getTasks(token);
        setTasks(fetchedTasks);
      } catch (err) {
        console.error('Failed to load tasks', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const recentTasks = tasks.slice(0, 3);

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  /* -------- Greeting -------- */
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? 'Good Morning ☀️'
      : hour < 18
      ? 'Good Afternoon 🌤️'
      : 'Good Evening 🌙';

  const focusMessage =
    pendingTasks === 0
      ? 'All tasks completed — amazing work! 🎉'
      : `You have ${pendingTasks} pending task${
          pendingTasks > 1 ? 's' : ''
        }. Stay focused 💪`;

  return (
    <div className="w-full space-y-12">

      {/* ================= HERO ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 p-8 text-white shadow-xl"
      >
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-4xl font-bold mb-2">{greeting}</h2>
          <p className="text-white/90 text-lg">{focusMessage}</p>

          <div className="flex items-center gap-6 mt-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-white/70">
                Completion Rate
              </p>
              <p className="text-3xl font-bold">{progress}%</p>
            </div>

            <Link href="/dashboard/tasks">
              <button className="bg-white text-teal-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
                View Tasks →
              </button>
            </Link>
          </div>
        </div>

        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
      </motion.div>

      {/* ================= STATS ================= */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Productivity Overview
        </h3>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-xl bg-gray-300 dark:bg-gray-700 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon={<List size={24} className="text-white" />}
              label="Total Tasks"
              value={totalTasks}
              color="bg-blue-500"
            />
            <StatCard
              icon={<CheckCircle size={24} className="text-white" />}
              label="Completed"
              value={completedTasks}
              color="bg-green-500"
            />
            <StatCard
              icon={<Clock size={24} className="text-white" />}
              label="Pending"
              value={pendingTasks}
              color="bg-yellow-500"
            />
          </div>
        )}
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/tasks">
          <div className="cursor-pointer bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg">📋 Manage Tasks</h4>
            <p className="text-sm text-gray-500 mt-1">
              View, edit or complete your tasks
            </p>
          </div>
        </Link>

        <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl shadow">
          <h4 className="font-semibold text-lg">⏱ Stay Consistent</h4>
          <p className="text-sm text-gray-500 mt-1">
            Small progress daily beats perfection
          </p>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl shadow">
          <h4 className="font-semibold text-lg">🚀 Growth Mindset</h4>
          <p className="text-sm text-gray-500 mt-1">
            Discipline turns goals into results
          </p>
        </div>
      </div>

{/* ================= RECENT TASKS ================= */}
<div>
  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
    Recent Tasks
  </h3>

  {recentTasks.length === 0 ? (
    <div className="text-gray-500 bg-white/30 dark:bg-gray-800/30 p-6 rounded-xl">
      No tasks yet. Start your productivity journey 🚀
    </div>
  ) : (
    <div className="space-y-4">
      {recentTasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm hover:shadow-md transition"
        >
          {/* LEFT SIDE */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              readOnly
              className="mt-1 accent-teal-500"
            />

            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                {task.title}
              </p>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              task.completed
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {task.completed ? 'COMPLETED' : 'PENDING'}
          </span>
        </div>
      ))}
    </div>
  )}
</div>

      {/* ================= FOOTER TIP ================= */}
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        💡 Tip: Consistency beats motivation — show up daily.
      </p>
    </div>
  );
};

export default DashboardOverviewPage;
