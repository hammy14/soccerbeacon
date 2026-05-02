'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  published_at: string;
  author?: string;
  league_id?: number;
  league_name?: string;
}

export default function ArticleDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/articles/${slug}`);
        setArticle(response.data.article || response.data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">Loading article...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container py-12">
        <div className="text-center text-red-600">{error || 'Article not found'}</div>
        <div className="text-center mt-4">
          <Link href="/articles" className="btn btn-primary">
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const publishDate = new Date(article.published_at);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container">
          <Link href="/articles" className="text-blue-200 hover:text-white mb-4 inline-block">
            ← Back to Articles
          </Link>
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-blue-200">
            {article.author && (
              <span>By {article.author}</span>
            )}
            <span>{publishDate.toLocaleDateString()}</span>
            {article.league_name && (
              <span className="badge badge-light">{article.league_name}</span>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto">
          {article.featured_image && (
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">{article.excerpt}</p>
            <div
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Article Meta */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <div>
                {article.author && (
                  <p className="text-gray-600">
                    Written by <span className="font-bold">{article.author}</span>
                  </p>
                )}
                <p className="text-gray-600">
                  Published on {publishDate.toLocaleDateString()}
                </p>
              </div>
              <Link href="/articles" className="btn btn-primary">
                Read More Articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
