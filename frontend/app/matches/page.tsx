'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

interface Match {
  id: number;
  home_team_name: string;
  away_team_name: string;
  match_date: string;
  status: string;
  home_score?: number;
  away_score?: number;
  league_name?: string;
  league_id?: number;
}

interface League {
  id: number;
  name: string;
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [tab, setTab] = useState<'all' | 'scheduled' | 'finished'>('all');
  const [leagueFilter, setLeagueFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params: Record<string, string> = { limit: '50' };
        if (tab !== 'all') params.status = tab;
        if (leagueFilter) params.league_id = leagueFilter;
        const [matchRes, leagueRes] = await Promise.all([
          api.get('/matches', { params }),
          api.get('/leagues'),
        ]);
        setMatches(matchRes.data.matches || matchRes.data);
        setLeagues(leagueRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tab, leagueFilter]);

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Matches</h1>
          <p className="text-lg text-blue-100">Fixtures, results and live scores</p>
        </div>
      </section>

      <section className="container py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          {(['all', 'scheduled', 'finished'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {t === 'all' ? 'All' : t === 'scheduled' ? 'Upcoming' : 'Results'}
            </button>
          ))}
        </div>

        {/* League filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button onClick={() => setLeagueFilter('')} className={`px-3 py-1 rounded-full text-xs font-medium ${!leagueFilter ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All</button>
          {leagues.map(l => (
            <button key={l.id} onClick={() => setLeagueFilter(String(l.id))} className={`px-3 py-1 rounded-full text-xs font-medium ${leagueFilter === String(l.id) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{l.name}</button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading matches...</div>
        ) : matches.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No matches found.</div>
        ) : (
          <div className="space-y-3">
            {matches.map(match => {
              const isFinished = match.status === 'finished';
              const isLive = match.status === 'live';
              return (
                <Link key={match.id} href={`/matches/${match.id}`}>
                  <div className="card p-4 cursor-pointer hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {match.league_name && <span className="text-xs text-gray-400">{match.league_name}</span>}
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isLive ? 'bg-red-100 text-red-700' : isFinished ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                            {isLive ? '🔴 LIVE' : isFinished ? 'FT' : new Date(match.match_date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex-1 text-right font-semibold">{match.home_team_name}</span>
                          <span className="text-lg font-bold w-16 text-center">
                            {isFinished || isLive ? `${match.home_score} - ${match.away_score}` : 'vs'}
                          </span>
                          <span className="flex-1 font-semibold">{match.away_team_name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
