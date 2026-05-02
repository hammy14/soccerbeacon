'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

interface Team {
  id: number;
  name: string;
  country?: string;
  logo_url?: string;
  founded_year?: number;
  league_id?: number;
}

interface Match {
  id: number;
  home_team_id: number;
  away_team_id: number;
  home_team_name: string;
  away_team_name: string;
  match_date: string;
  status: string;
  home_score?: number;
  away_score?: number;
}

export default function TeamDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [team, setTeam] = useState<Team | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamRes, matchesRes] = await Promise.all([
          api.get(`/teams/${id}`),
          api.get(`/matches?limit=10`),
        ]);

        setTeam(teamRes.data.team || teamRes.data);
        const allMatches = matchesRes.data.matches || matchesRes.data;
        setMatches(allMatches.filter((m: Match) => m.home_team_id === Number(id) || m.away_team_id === Number(id)));
      } catch (err) {
        console.error('Error fetching team details:', err);
        setError('Failed to load team details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">Loading team details...</div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="container py-12">
        <div className="text-center text-red-600">{error || 'Team not found'}</div>
        <div className="text-center mt-4">
          <Link href="/teams" className="btn btn-primary">
            Back to Teams
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container">
          <Link href="/teams" className="text-blue-200 hover:text-white mb-4 inline-block">
            ← Back to Teams
          </Link>
          <div className="flex items-center gap-6">
            {team.logo_url && (
              <img
                src={team.logo_url}
                alt={team.name}
                className="w-24 h-24 object-contain"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">{team.name}</h1>
              {team.country && (
                <p className="text-lg">{team.country}</p>
              )}
              {team.founded_year && (
                <p className="text-blue-200">Founded: {team.founded_year}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Matches Section */}
      {matches.length > 0 && (
        <section className="container py-16">
          <h2 className="text-3xl font-bold mb-8">Recent Matches</h2>
          <div className="space-y-4">
            {matches.map((match) => (
              <Link key={match.id} href={`/matches/${match.id}`}>
                <div className="card p-6 hover:shadow-lg transition cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2">
                        {new Date(match.match_date).toLocaleDateString()}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 text-right pr-4">
                          <p className="font-bold">{match.home_team_name}</p>
                        </div>
                        <div className="text-center px-4">
                          {match.status === 'finished' ? (
                            <div className="text-2xl font-bold">
                              {match.home_score} - {match.away_score}
                            </div>
                          ) : (
                            <div className="text-gray-600">vs</div>
                          )}
                        </div>
                        <div className="flex-1 text-left pl-4">
                          <p className="font-bold">{match.away_team_name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className="badge badge-primary">
                        {match.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
