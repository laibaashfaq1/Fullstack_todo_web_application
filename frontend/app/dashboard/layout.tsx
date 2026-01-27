// app/dashboard/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, getUserFromToken } from '../../lib/auth';
import { getUserInfo } from '../../lib/api';
import Sidebar from '../../components/Sidebar';
import { Sun, Moon, Menu, LogOut } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useLogout } from '@/lib/auth';


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const logout = useLogout();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/auth/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const userInfo = await getUserInfo(token);
        setUsername(userInfo.username || userInfo.email.split('@')[0]);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        const decodedUser = getUserFromToken();
        setUsername(decodedUser?.user_id ? `User ${decodedUser.user_id}` : 'Guest');
      }
    };
    fetchUser();
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-slate-800 font-sans">
      <div className="hidden md:block">
        <Sidebar isOpen={true} setIsOpen={() => {}} />
      </div>
       <div className="md:hidden">
         <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>


      <div className="flex-1 flex flex-col">
        <header className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-lg shadow-sm p-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-700 dark:text-gray-300 mr-4">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Hello, <span className="font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">{username || '...'}</span>!
            </h1>
          </div>
          <div className="flex items-center space-x-4">
             <button
              onClick={logout}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-colors block sm:hidden"
               aria-label="Logout"
            >
              <LogOut size={20}/>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md hidden sm:block"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 relative">
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'dark:bg-gray-700 dark:text-white',
            }}
          />
          {children}
        </main>
        {/* Footer */}
        <footer className="w-full mt-10 p-6 text-center">
             {/* subtle separator */}
             <div className="mx-auto mb-4 h-px  bg-blue-400/60 rounded-full" />
             <p className="text-sm text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} FocusBoard
                  </p>
                  <p className="text-xs mt-1 text-gray-400">
                    Built for productivity & clarity
                    </p>
          </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;