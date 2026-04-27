'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { isLoggedIn, logout, userId, username } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => setDropdownOpen(prev => !prev);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  return (
    <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm bg-black/80">
      <Link href="/" className="font-bold text-xl tracking-tight" style={{ fontFamily: 'JetBrains Mono' }}>
        {'<'}<span className="text-devjima-teal">Dev</span>{'>'}Jima
      </Link>

      <div className="flex items-center gap-4">
        {mounted && (isLoggedIn ? (
          <>
            <Link href="/" className="text-sm text-gray-500 no-underline hover:text-gray-300 transition-colors">Feed</Link>

            {/* Avatar dropdown */}
            <div className="relative" data-dropdown="true">
              <button onClick={handleClick}
                className="w-9 h-9 rounded-full bg-devjima-teal border-none cursor-pointer text-white text-sm font-semibold flex items-center justify-center">
                {(username ?? '?')[0].toUpperCase()}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-11 bg-[#111] border border-gray-800 rounded-lg p-1 min-w-[160px] z-50 flex flex-col gap-0.5"
                     style={{ animation: 'dropdownIn 0.15s ease forwards' }}>
                  <Link href={`/profile/${userId}`}
                    onClick={() => setDropdownOpen(false)}
                    className="px-3 py-2 rounded-md text-sm text-gray-300 no-underline block hover:bg-[#1a1a1a] transition-colors">
                    Profile
                  </Link>
                  <Link href={`/profile/${userId}/edit`}
                    onClick={() => setDropdownOpen(false)}
                    className="px-3 py-2 rounded-md text-sm text-gray-300 no-underline block hover:bg-[#1a1a1a] transition-colors">
                    Edit profile
                  </Link>
                  <div className="border-t border-gray-800 my-1" />
                  <button
                    onClick={() => { logout(); setDropdownOpen(false); }}
                    className="px-3 py-2 rounded-md text-sm text-pink-400 bg-transparent border-none cursor-pointer text-left w-full hover:bg-[#1a1a1a] transition-colors">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm px-4 py-1.5 border border-gray-700 rounded-full text-gray-300 no-underline hover:border-gray-500 transition-colors">Login</Link>
            <Link href="/register" className="text-sm px-4 py-1.5 bg-devjima-teal rounded-full text-white no-underline hover:bg-devjima-teal-hover transition-colors">Sign up</Link>
          </>
        ))}
      </div>
    </nav>
  );
}