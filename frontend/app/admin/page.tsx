'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import api from '@/lib/api';

interface Stats {
  totalLeagues: number;
  totalTeams: number;
  totalMatches: number;
  totalArticles: number;
}

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const [leaguesRes, teamsRes, matchesRes, articlesRes] = await Promise.all([
          api.get('/leagues'),
          api.get('/teams'),
          api.get('/matches?limit=1'),
          api.get('/articles?limit=1'),
        ]);

        setStats({
          totalLeagues: leaguesRes.data.length,
          totalTeams: teamsRes.data.length,
          totalMatches: matchesRes.data.length || 0,
          totalArticles: articlesRes.data.articles?.length || 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="container py-12">
        <div className="text-center text-red-600">
          You do not have permission to access this page.
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-blue-200">Welcome, {user.email}</p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="container py-16">
        {loading ? (
          <div className="text-center">Loading dashboard...</div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="card p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats?.totalLeagues || 0}
                </div>
                <p className="text-gray-600">Leagues</p>
              </div>
              <div className="card p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats?.totalTeams || 0}
                </div>
                <p className="text-gray-600">Teams</p>
              </div>
              <div className="card p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats?.totalMatches || 0}
                </div>
                <p className="text-gray-600">Matches</p>
              </div>
              <div className="card p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats?.totalArticles || 0}
                </div>
                <p className="text-gray-600">Articles</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/leagues" className="btn btn-primary">
                  View Leagues
                </Link>
                <Link href="/teams" className="btn btn-primary">
                  View Teams
                </Link>
                <Link href="/matches" className="btn btn-primary">
                  View Matches
                </Link>
                <Link href="/articles" className="btn btn-primary">
                  View Articles
                </Link>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
