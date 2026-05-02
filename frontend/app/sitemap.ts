import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pitchpassport.com';
  const currentDate = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/leagues`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/teams`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/matches`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // League pages
  const leagues = [
    { id: 1, slug: 'premier-league' },
    { id: 2, slug: 'la-liga' },
    { id: 3, slug: 'serie-a' },
    { id: 4, slug: 'mls' },
    { id: 5, slug: 'champions-league' },
  ];

  const leaguePages: MetadataRoute.Sitemap = leagues.map((league) => ({
    url: `${baseUrl}/leagues/${league.id}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Team pages (example - in production, fetch from API)
  const teamPages: MetadataRoute.Sitemap = Array.from({ length: 50 }, (_, i) => ({
    url: `${baseUrl}/teams/${i + 1}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Article pages (example - in production, fetch from API)
  const articlePages: MetadataRoute.Sitemap = Array.from({ length: 20 }, (_, i) => ({
    url: `${baseUrl}/articles/${i + 1}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...leaguePages, ...teamPages, ...articlePages];
}
