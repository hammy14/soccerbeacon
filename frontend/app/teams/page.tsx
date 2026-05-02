'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

interface Team {
  id: number;
  name: string;
  league_id: number;
  league_name?: string;
  city?: string;
  stadium?: string;
  founded_year?: number;
  logo_url?: string;
}

interface League {
  id: number;
  name: string;
  country: string;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, leaguesRes] = await Promise.all([
          api.get('/teams'),
          api.get('/leagues'),
        ]);
        setTeams(teamsRes.data.teams || teamsRes.data);
        setLeagues(leaguesRes.data);
      } catch (err) {
        setError('Failed to load teams');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = selectedLeague
    ? teams.filter(t => String(t.league_id) === selectedLeague)
    : teams;

  if (loading) return <div className="container py-12 text-center">Loading teams...</div>;
  if (error) return <div className="container py-12 text-center text-red-600">{error}</div>;

  return (
    <div>
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Teams</h1>
          <p className="text-lg text-green-100">{teams.length} clubs across {leagues.length} leagues</p>
        </div>
      </section>

      <section className="container py-8">
        <div className="flex gap-3 flex-wrap mb-8">
          <button
            onClick={() => setSelectedLeague('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!selectedLeague ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            All Leagues
          </button>
          {leagues.map(l => (
            <button
              key={l.id}
              onClick={() => setSelectedLeague(String(l.id))}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedLeague === String(l.id) ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {l.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(team => (
            <Link key={team.id} href={`/teams/${team.id}`}>
              <div className="card p-5 cursor-pointer hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-lg">⚽</div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight">{team.name}</h3>
                    {team.city && <p className="text-xs text-gray-500">{team.city}</p>}
                  </div>
                </div>
                {team.stadium && <p className="text-xs text-gray-500 truncate">🏟 {team.stadium}</p>}
                {team.founded_year && <p className="text-xs text-gray-400 mt-1">Est. {team.founded_year}</p>}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-12">No teams found.</p>
        )}
      </section>
    </div>
  );
}
