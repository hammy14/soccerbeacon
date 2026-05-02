'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function Header() {
  const { user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      useAuthStore.setState({
        token,
        user: JSON.parse(userStr),
        isAuthenticated: true,
      });
    }
  }, []);

  if (!mounted) return null;

  return (
    <header className="bg-white shadow-md">
      <div className="container py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ⚽ Pitch Passport
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link href="/leagues" className="hover:text-blue-600">
            Leagues
          </Link>
          <Link href="/teams" className="hover:text-blue-600">
            Teams
          </Link>
          <Link href="/matches" className="hover:text-blue-600">
            Matches
          </Link>
          <Link href="/articles" className="hover:text-blue-600">
            Articles
          </Link>
        </nav>

        <div className="flex gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.email}</span>
              <button
                onClick={logout}
                className="btn btn-secondary text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
