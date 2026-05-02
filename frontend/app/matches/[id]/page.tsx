'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

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
  league_id?: number;
  league_name?: string;
}

export default function MatchDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await api.get(`/matches/${id}`);
        setMatch(response.data);
      } catch (err) {
        console.error('Error fetching match details:', err);
        setError('Failed to load match details');
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">Loading match details...</div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="container py-12">
        <div className="text-center text-red-600">{error || 'Match not found'}</div>
        <div className="text-center mt-4">
          <Link href="/matches" className="btn btn-primary">
            Back to Matches
          </Link>
        </div>
      </div>
    );
  }

  const matchDate = new Date(match.match_date);
  const isFinished = match.status === 'finished';

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container">
          <Link href="/matches" className="text-blue-200 hover:text-white mb-4 inline-block">
            ← Back to Matches
          </Link>
          {match.league_name && (
            <p className="text-blue-200 mb-4">{match.league_name}</p>
          )}
          <div className="text-center">
            <p className="text-lg mb-4">
              {matchDate.toLocaleDateString()} at {matchDate.toLocaleTimeString()}
            </p>
            <div className="flex items-center justify-center gap-8">
              <div className="text-right">
                <h2 className="text-3xl font-bold">{match.home_team_name}</h2>
              </div>
              <div className="text-center">
                {isFinished ? (
                  <div className="text-5xl font-bold">
                    {match.home_score} - {match.away_score}
                  </div>
                ) : (
                  <div className="text-2xl">vs</div>
                )}
                <p className="text-blue-200 mt-2 capitalize">{match.status}</p>
              </div>
              <div className="text-left">
                <h2 className="text-3xl font-bold">{match.away_team_name}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Match Details */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Home Team */}
          <div className="card p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">{match.home_team_name}</h3>
            <Link href={`/teams/${match.home_team_id}`} className="btn btn-primary">
              View Team
            </Link>
          </div>

          {/* Match Info */}
          <div className="card p-8">
            <h3 className="text-xl font-bold mb-4">Match Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Date & Time</p>
                <p className="font-bold">
                  {matchDate.toLocaleDateString()} {matchDate.toLocaleTimeString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <p className="font-bold capitalize">{match.status}</p>
              </div>
              {isFinished && (
                <div>
                  <p className="text-gray-600">Final Score</p>
                  <p className="font-bold text-2xl">
                    {match.home_score} - {match.away_score}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Away Team */}
          <div className="card p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">{match.away_team_name}</h3>
            <Link href={`/teams/${match.away_team_id}`} className="btn btn-primary">
              View Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
