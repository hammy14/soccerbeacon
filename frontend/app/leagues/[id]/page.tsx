'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

interface League {
  id: number;
  name: string;
  country: string;
  logo_url?: string;
  description?: string;
  founded_year?: number;
}

interface Team {
  id: number;
  name: string;
  country?: string;
  logo_url?: string;
}

interface Standing {
  id: number;
  team_id: number;
  team_name: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
}

export default function LeagueDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [league, setLeague] = useState<League | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leagueRes, teamsRes, standingsRes] = await Promise.all([
          api.get(`/leagues/${id}`),
          api.get(`/leagues/${id}/teams`),
          api.get(`/standings/league/${id}`),
        ]);

        setLeague(leagueRes.data.league || leagueRes.data);
        setTeams(teamsRes.data.teams || teamsRes.data);
        setStandings(standingsRes.data.standings || standingsRes.data);
      } catch (err) {
        console.error('Error fetching league details:', err);
        setError('Failed to load league details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">Loading league details...</div>
      </div>
    );
  }

  if (error || !league) {
    return (
      <div className="container py-12">
        <div className="text-center text-red-600">{error || 'League not found'}</div>
        <div className="text-center mt-4">
          <Link href="/leagues" className="btn btn-primary">
            Back to Leagues
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
          <Link href="/leagues" className="text-blue-200 hover:text-white mb-4 inline-block">
            ← Back to Leagues
          </Link>
          <h1 className="text-4xl font-bold mb-2">{league.name}</h1>
          <p className="text-lg">{league.country}</p>
          {league.founded_year && (
            <p className="text-blue-200">Founded: {league.founded_year}</p>
          )}
        </div>
      </section>

      {/* Standings Section */}
      {standings.length > 0 && (
        <section className="container py-16">
          <h2 className="text-3xl font-bold mb-8">Standings</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Position</th>
                  <th className="border p-3 text-left">Team</th>
                  <th className="border p-3 text-center">Played</th>
                  <th className="border p-3 text-center">Won</th>
                  <th className="border p-3 text-center">Drawn</th>
                  <th className="border p-3 text-center">Lost</th>
                  <th className="border p-3 text-center">GF</th>
                  <th className="border p-3 text-center">GA</th>
                  <th className="border p-3 text-center">GD</th>
                  <th className="border p-3 text-center font-bold">Points</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((standing) => (
                  <tr key={standing.id} className="border-b hover:bg-gray-50">
                    <td className="border p-3 font-bold">{standing.position}</td>
                    <td className="border p-3">
                      <Link href={`/teams/${standing.team_id}`} className="text-blue-600 hover:underline">
                        {standing.team_name}
                      </Link>
                    </td>
                    <td className="border p-3 text-center">{standing.played}</td>
                    <td className="border p-3 text-center text-green-600">{standing.won}</td>
                    <td className="border p-3 text-center text-yellow-600">{standing.drawn}</td>
                    <td className="border p-3 text-center text-red-600">{standing.lost}</td>
                    <td className="border p-3 text-center">{standing.goals_for}</td>
                    <td className="border p-3 text-center">{standing.goals_against}</td>
                    <td className="border p-3 text-center">{standing.goal_difference}</td>
                    <td className="border p-3 text-center font-bold bg-blue-50">{standing.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Teams Section */}
      {teams.length > 0 && (
        <section className="bg-gray-100 py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Teams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teams.map((team) => (
                <Link key={team.id} href={`/teams/${team.id}`}>
                  <div className="card p-6 text-center cursor-pointer hover:shadow-lg transition">
                    {team.logo_url && (
                      <img
                        src={team.logo_url}
                        alt={team.name}
                        className="w-16 h-16 mx-auto mb-4 object-contain"
                      />
                    )}
                    <h3 className="font-bold text-lg">{team.name}</h3>
                    {team.country && (
                      <p className="text-gray-600 text-sm">{team.country}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
