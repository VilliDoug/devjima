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
      <Link href="/" className="font-bold text-xl tracking-tight" style={{fontFamily: 'JetBrains Mono'}}>
        {'<'}<span className="text-devjima-teal">Dev</span>{'>'}Jima
      </Link>
      <div className="flex items-center gap-4">
        {mounted && (isLoggedIn ? (
  <>
    <Link href="/" style={{ fontSize: '14px', color: '#888', textDecoration: 'none' }}>Feed</Link>
    
    {/* Avatar dropdown */}
    <div style={{ position: 'relative' }} data-dropdown="true">
      <button
        onClick={handleClick}
        style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: '#2D7D6F', border: 'none', cursor: 'pointer',
          color: '#fff', fontSize: '14px', fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        {(username ?? '?')[0].toUpperCase()}
      </button>

      {dropdownOpen && (
        <div style={{
          position: 'absolute', right: 0, top: '44px',
          background: '#111', border: '1px solid #2a2a2a',
          borderRadius: '8px', padding: '4px', minWidth: '160px',
          zIndex: 50, display: 'flex', flexDirection: 'column', gap: '2px',
          animation: 'dropdownIn 0.15s ease forwards'}}>
          <Link href={`/profile/${userId}`}
            onClick={() => setDropdownOpen(false)}
            style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '13px', color: '#ccc', textDecoration: 'none', display: 'block' }}
            onMouseEnter={e => (e.currentTarget).style.background = '#1a1a1a'}
            onMouseLeave={e => (e.currentTarget).style.background = 'transparent'}
          >Profile</Link>
          <Link href={`/profile/${userId}/edit`}
            onClick={() => setDropdownOpen(false)}
            style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '13px', color: '#ccc', textDecoration: 'none', display: 'block' }}
            onMouseEnter={e => (e.currentTarget).style.background = '#1a1a1a'}
            onMouseLeave={e => (e.currentTarget).style.background = 'transparent'}
          >Edit profile</Link>
          <div style={{ borderTop: '1px solid #1a1a1a', margin: '4px 0' }} />
          <button
            onClick={() => { logout(); setDropdownOpen(false); }}
            style={{
              padding: '8px 12px', borderRadius: '6px', fontSize: '13px',
              color: '#D4537E', background: 'transparent', border: 'none',
              cursor: 'pointer', textAlign: 'left', width: '100%'
            }}
            onMouseEnter={e => (e.currentTarget).style.background = '#1a1a1a'}
            onMouseLeave={e => (e.currentTarget).style.background = 'transparent'}
          >Logout</button>
        </div>
      )}
    </div>
  </>
) : (
  <>
    <Link href="/login" style={{ fontSize: '13px', padding: '7px 16px', border: '1px solid #333', borderRadius: '20px', color: '#ccc', textDecoration: 'none' }}>Login</Link>
    <Link href="/register" style={{ fontSize: '13px', padding: '7px 16px', background: '#2D7D6F', borderRadius: '20px', color: '#fff', textDecoration: 'none' }}>Sign up</Link>
  </>
))}
      </div>
    </nav>
  );
}