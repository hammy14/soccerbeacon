// Structured Data (JSON-LD) generators for SEO

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pitch Passport',
  url: 'https://pitchpassport.com',
  logo: 'https://pitchpassport.com/logo.png',
  description: 'Global football coverage with news, standings, and analysis',
  sameAs: [
    'https://twitter.com/pitchpassport',
    'https://instagram.com/pitchpassport',
    'https://facebook.com/pitchpassport',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@pitchpassport.com',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Pitch Passport',
  url: 'https://pitchpassport.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://pitchpassport.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export const articleSchema = (article: {
  title: string;
  description: string;
  image?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  slug: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: article.title,
  description: article.description,
  image: article.image || 'https://pitchpassport.com/og-image.jpg',
  author: {
    '@type': 'Organization',
    name: article.author || 'Pitch Passport',
  },
  datePublished: article.publishedAt || new Date().toISOString(),
  dateModified: article.updatedAt || new Date().toISOString(),
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://pitchpassport.com/articles/${article.slug}`,
  },
});

export const leagueSchema = (league: {
  name: string;
  country: string;
  description?: string;
  logo?: string;
  id: number;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'SportsLeague',
  name: league.name,
  location: {
    '@type': 'Place',
    name: league.country,
  },
  description: league.description || `${league.name} - Professional football league`,
  image: league.logo || 'https://pitchpassport.com/og-image.jpg',
  url: `https://pitchpassport.com/leagues/${league.id}`,
});

export const teamSchema = (team: {
  name: string;
  city?: string;
  logo?: string;
  league: string;
  id: number;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'SportsTeam',
  name: team.name,
  location: {
    '@type': 'Place',
    name: team.city || 'Unknown',
  },
  image: team.logo || 'https://pitchpassport.com/og-image.jpg',
  sport: 'Football',
  league: team.league,
  url: `https://pitchpassport.com/teams/${team.id}`,
});

export const matchSchema = (match: {
  homeTeam: string;
  awayTeam: string;
  date: string;
  league: string;
  homeScore?: number;
  awayScore?: number;
  status: string;
  id: number;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: `${match.homeTeam} vs ${match.awayTeam}`,
  description: `${match.league} match between ${match.homeTeam} and ${match.awayTeam}`,
  startDate: match.date,
  endDate: match.date,
  eventStatus: match.status === 'finished' ? 'EventScheduled' : 'EventScheduled',
  location: {
    '@type': 'Place',
    name: match.league,
  },
  competitor: [
    {
      '@type': 'SportsTeam',
      name: match.homeTeam,
    },
    {
      '@type': 'SportsTeam',
      name: match.awayTeam,
    },
  ],
  result: match.status === 'finished' ? {
    '@type': 'SportsEventResult',
    winner: match.homeScore! > match.awayScore! ? match.homeTeam : match.awayTeam,
    loser: match.homeScore! < match.awayScore! ? match.homeTeam : match.awayTeam,
    homeTeamScore: match.homeScore,
    awayTeamScore: match.awayScore,
  } : undefined,
  url: `https://pitchpassport.com/matches/${match.id}`,
});

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
