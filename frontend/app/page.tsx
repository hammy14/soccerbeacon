'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import LeagueCard from '@/components/LeagueCard';
import ArticleCard from '@/components/ArticleCard';
import MatchCard from '@/components/MatchCard';
import StructuredData from '@/components/StructuredData';
import { organizationSchema, websiteSchema } from '@/lib/structured-data';

interface League {
  id: number;
  name: string;
  country: string;
  logo_url?: string;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  published_at: string;
}

interface Match {
  id: number;
  home_team_name: string;
  away_team_name: string;
  match_date: string;
  status: string;
  home_score?: number;
  away_score?: number;
}

export default function Home() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaguesRes, articlesRes, matchesRes] = await Promise.all([
          api.get('/leagues'),
          api.get('/articles?status=published&limit=6'),
          api.get('/matches/upcoming?limit=5'),
        ]);

        setLeagues(leaguesRes.data);
        setArticles(articlesRes.data.articles);
        setMatches(matchesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">⚽ Pitch Passport</h1>
          <p className="text-xl mb-8 text-green-100">
            Your passport to global soccer — news, standings, and analysis from the world&apos;s top leagues
          </p>
          <div className="flex gap-4">
            <Link href="/leagues" className="btn btn-primary bg-white text-green-800 hover:bg-green-50">
              Explore Leagues
            </Link>
            <Link href="/articles" className="btn border border-white text-white hover:bg-green-800">
              Latest Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Leagues Section */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Leagues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {leagues.map((league) => (
            <LeagueCard key={league.id} league={league} />
          ))}
        </div>
      </section>

      {/* Upcoming Matches Section */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Upcoming Matches</h2>
          {matches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No upcoming matches scheduled.</p>
          )}
          <div className="text-center mt-8">
            <Link href="/matches" className="btn btn-primary">
              View All Matches
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/articles" className="btn btn-primary">
            Read More Articles
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8">
            Subscribe to our newsletter for the latest soccer news and analysis
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900"
              required
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
