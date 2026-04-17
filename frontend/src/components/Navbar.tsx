'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { isLoggedIn, logout, userId } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
}, []);

  return (
    <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm bg-black/80">
      <Link href="/" className="font-bold text-xl tracking-tight" style={{fontFamily: 'JetBrains Mono'}}>
        <span className="text-devjima-teal">Dev</span>Jima
      </Link>
      <div className="flex items-center gap-4">
        {!mounted ? null : isLoggedIn ? (
          <>
            <Link href="/posts/new" className="text-sm text-gray-300 hover:text-white transition-colors">
              Write
            </Link>
            <Link href={`/profile/${userId}`} className="text-sm text-gray-300 hover:text-white transition-colors">
              Profile
            </Link>
            <button
              onClick={logout}
              className="text-sm bg-gray-800 text-gray-300 px-4 py-1.5 rounded-full hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm bg-devjima-teal text-white px-4 py-1.5 rounded-full hover:bg-devjima-teal-hover transition-colors"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}