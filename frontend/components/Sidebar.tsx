// components/Sidebar.tsx
"use client";

import Link from 'next/link';
import { ListTodo, Home, Settings, LogOut, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLogout } from '@/lib/auth';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const logout = useLogout();

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Overview' },
    { href: '/dashboard/tasks', icon: ListTodo, label: 'Tasks' },
    // { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const sidebarVariants = {
    closed: { x: "-100%" },
    open: { x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
          
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-2xl flex flex-col z-50 md:relative md:shadow-lg md:translate-x-0"
          >
            <div className="p-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                FocusBoard
              </h1>
              <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
                    ${pathname === item.href
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold'
                      : 'hover:bg-gray-700 text-gray-300'
                    }`}
                >
                  <item.icon size={22} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            
            <div className="px-4 py-4 border-t border-gray-700">
              <button
                onClick={logout}
                className="flex items-center space-x-3 p-3 w-full rounded-lg text-left transition-colors duration-200 hover:bg-red-500 text-red-400 hover:text-white"
              >
                <LogOut size={22} />
                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}