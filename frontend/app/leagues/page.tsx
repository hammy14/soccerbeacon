'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import LeagueCard from '@/components/LeagueCard';

interface League {
  id: number;
  name: string;
  country: string;
  logo_url?: string;
  description?: string;
}

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await api.get('/leagues');
        setLeagues(response.data);
      } catch (err) {
        console.error('Error fetching leagues:', err);
        setError('Failed to load leagues');
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">Loading leagues...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Football Leagues</h1>
          <p className="text-lg">
            Explore the world&apos;s top football leagues
          </p>
        </div>
      </section>

      {/* Leagues Grid */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {leagues.map((league) => (
            <LeagueCard key={league.id} league={league} />
          ))}
        </div>
      </section>
    </div>
  );
}
