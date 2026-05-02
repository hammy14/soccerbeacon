'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  published_at: string;
  league_id?: number;
  league_name?: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/articles?status=published&limit=50');
        setArticles(response.data.articles || response.data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">Loading articles...</div>
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
          <h1 className="text-4xl font-bold mb-4">Football Articles</h1>
          <p className="text-lg">
            Read the latest news and analysis
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
