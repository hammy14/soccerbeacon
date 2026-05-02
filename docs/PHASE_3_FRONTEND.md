# Phase 3: Frontend Development - Implementation Guide

## Overview

Phase 3 creates a complete Next.js frontend with all pages and components needed to display soccer data from the backend API.

---

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles
│   ├── leagues/
│   │   ├── page.tsx            # All leagues
│   │   └── [id]/
│   │       └── page.tsx        # League details
│   ├── teams/
│   │   ├── page.tsx            # All teams
│   │   └── [id]/
│   │       └── page.tsx        # Team details
│   ├── matches/
│   │   ├── page.tsx            # All matches
│   │   └── [id]/
│   │       └── page.tsx        # Match details
│   ├── articles/
│   │   ├── page.tsx            # All articles
│   │   └── [slug]/
│   │       └── page.tsx        # Article details
│   ├── login/
│   │   └── page.tsx            # Login page
│   └── admin/
│       └── page.tsx            # Admin dashboard
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Footer
│   ├── LeagueCard.tsx          # League card component
│   ├── TeamCard.tsx            # Team card component
│   ├── MatchCard.tsx           # Match card component
│   ├── ArticleCard.tsx         # Article card component
│   ├── StandingsTable.tsx      # Standings table
│   └── LoadingSpinner.tsx      # Loading indicator
├── lib/
│   ├── api.ts                  # API client
│   └── store.ts                # Zustand store
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── .eslintrc.json
```

---

## Files Created in Phase 3

### Configuration Files (6)
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.json` - ESLint configuration

### Environment Files (1)
- `.env.local` - Environment variables

### Library Files (2)
- `lib/api.ts` - Axios API client with interceptors
- `lib/store.ts` - Zustand authentication store

### Layout & Styles (2)
- `app/layout.tsx` - Root layout with Header and Footer
- `app/globals.css` - Global Tailwind styles

### Pages (8)
- `app/page.tsx` - Homepage with featured content
- `app/leagues/page.tsx` - All leagues listing
- `app/leagues/[id]/page.tsx` - League details with standings
- `app/teams/page.tsx` - All teams listing
- `app/teams/[id]/page.tsx` - Team details with players
- `app/matches/page.tsx` - All matches listing
- `app/matches/[id]/page.tsx` - Match details
- `app/articles/page.tsx` - All articles listing
- `app/articles/[slug]/page.tsx` - Article details
- `app/login/page.tsx` - Login page
- `app/admin/page.tsx` - Admin dashboard

### Components (8)
- `components/Header.tsx` - Navigation header
- `components/Footer.tsx` - Footer with links
- `components/LeagueCard.tsx` - League card
- `components/TeamCard.tsx` - Team card
- `components/MatchCard.tsx` - Match card
- `components/ArticleCard.tsx` - Article card
- `components/StandingsTable.tsx` - Standings table
- `components/LoadingSpinner.tsx` - Loading indicator

---

## Setup Instructions

### 1. Install Dependencies

```bash
cd soccer-site/frontend
npm install
```

### 2. Configure Environment

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Key Features

### Authentication
- Login/logout functionality
- JWT token management
- Protected routes
- User state persistence

### Pages

#### Homepage
- Featured leagues
- Upcoming matches
- Latest articles
- Newsletter signup

#### Leagues
- List all leagues
- League details with standings
- Teams in league
- Recent matches

#### Teams
- List all teams
- Team details with players
- Recent matches
- Upcoming fixtures

#### Matches
- List all matches
- Filter by league and status
- Match details with stats
- Upcoming and recent matches

#### Articles
- List all articles
- Article details with content
- Related articles
- Search functionality

#### Admin
- Dashboard with stats
- Content management
- User management
- Settings

---

## API Integration

### API Client (`lib/api.ts`)

```typescript
import api from '@/lib/api';

// Get leagues
const response = await api.get('/leagues');

// Create match (with auth)
const response = await api.post('/matches', {
  league_id: 1,
  home_team_id: 1,
  away_team_id: 2,
  match_date: '2024-01-22T15:00:00Z',
});
```

### Authentication Store (`lib/store.ts`)

```typescript
import { useAuthStore } from '@/lib/store';

const { user, token, login, logout } = useAuthStore();
```

---

## Component Examples

### LeagueCard Component

```typescript
interface League {
  id: number;
  name: string;
  country: string;
  logo_url?: string;
}

export default function LeagueCard({ league }: { league: League }) {
  return (
    <Link href={`/leagues/${league.id}`}>
      <div className="card p-6 text-center cursor-pointer">
        {league.logo_url && (
          <img src={league.logo_url} alt={league.name} />
        )}
        <h3 className="font-bold text-lg mb-2">{league.name}</h3>
        <p className="text-gray-600 text-sm">{league.country}</p>
      </div>
    </Link>
  );
}
```

### MatchCard Component

```typescript
interface Match {
  id: number;
  home_team_name: string;
  away_team_name: string;
  match_date: string;
  status: string;
  home_score?: number;
  away_score?: number;
}

export default function MatchCard({ match }: { match: Match }) {
  const isFinished = match.status === 'finished';
  
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 text-right pr-4">
          <p className="font-bold">{match.home_team_name}</p>
        </div>
        <div className="text-center">
          {isFinished ? (
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
  );
}
```

---

## Pages Implementation

### Homepage (`app/page.tsx`)

Features:
- Featured leagues grid
- Upcoming matches section
- Latest articles grid
- Newsletter signup form
- Hero section with CTA

### Leagues Page (`app/leagues/page.tsx`)

Features:
- List all leagues
- Search and filter
- Pagination
- League cards with links

### League Details (`app/leagues/[id]/page.tsx`)

Features:
- League information
- Standings table
- Teams in league
- Recent matches
- Upcoming fixtures

### Teams Page (`app/teams/page.tsx`)

Features:
- List all teams
- Filter by league
- Pagination
- Team cards with links

### Team Details (`app/teams/[id]/page.tsx`)

Features:
- Team information
- Player roster
- Recent matches
- Upcoming fixtures
- Team statistics

### Matches Page (`app/matches/page.tsx`)

Features:
- List all matches
- Filter by league and status
- Pagination
- Match cards

### Match Details (`app/matches/[id]/page.tsx`)

Features:
- Match information
- Team lineups
- Match statistics
- Related articles

### Articles Page (`app/articles/page.tsx`)

Features:
- List all articles
- Search functionality
- Filter by league
- Pagination
- Article cards

### Article Details (`app/articles/[slug]/page.tsx`)

Features:
- Article content
- Author information
- Publication date
- Related articles
- Social sharing

### Login Page (`app/login/page.tsx`)

Features:
- Email input
- Password input
- Login button
- Error handling
- Redirect on success

### Admin Dashboard (`app/admin/page.tsx`)

Features:
- Protected route (requires admin role)
- Dashboard statistics
- Quick actions
- Recent activity
- Content management links

---

## Styling

### Tailwind CSS

Global styles defined in `app/globals.css`:

```css
.btn { /* Button styles */ }
.btn-primary { /* Primary button */ }
.btn-secondary { /* Secondary button */ }
.card { /* Card component */ }
.badge { /* Badge component */ }
```

### Color Scheme

- Primary: Blue (#3b82f6)
- Secondary: Gray (#6b7280)
- Accent: Green (#10b981)
- Background: Light gray (#f9fafb)

---

## Data Fetching

### Using SWR (Stale-While-Revalidate)

```typescript
import useSWR from 'swr';
import api from '@/lib/api';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function LeaguesPage() {
  const { data, error, isLoading } = useSWR('/leagues', fetcher);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading leagues</div>;
  
  return (
    <div>
      {data.map(league => (
        <LeagueCard key={league.id} league={league} />
      ))}
    </div>
  );
}
```

### Using useEffect

```typescript
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await api.get('/leagues');
      setLeagues(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  fetchData();
}, []);
```

---

## Authentication Flow

### Login

```typescript
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    
    useAuthStore.setState({
      token,
      user,
      isAuthenticated: true,
    });
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Protected Routes

```typescript
'use client';

import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
    }
  }, [user, router]);
  
  if (!user || user.role !== 'admin') {
    return <div>Loading...</div>;
  }
  
  return <div>Admin Dashboard</div>;
}
```

---

## Performance Optimization

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src={league.logo_url}
  alt={league.name}
  width={64}
  height={64}
  className="object-contain"
/>
```

### Code Splitting

Next.js automatically code-splits at the page level.

### Caching

- Static generation for pages without dynamic data
- ISR (Incremental Static Regeneration) for semi-dynamic pages
- Client-side caching with SWR

---

## SEO Optimization

### Metadata

```typescript
export const metadata: Metadata = {
  title: 'Global Soccer Coverage',
  description: 'Your source for soccer news and analysis',
  openGraph: {
    title: 'Global Soccer Coverage',
    description: 'Your source for soccer news and analysis',
    url: 'https://soccerhub.com',
    siteName: 'Soccer Hub',
  },
};
```

### Structured Data

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SportsEvent',
      name: match.home_team_name + ' vs ' + match.away_team_name,
      startDate: match.match_date,
    }),
  }}
/>
```

---

## Testing

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import LeagueCard from '@/components/LeagueCard';

describe('LeagueCard', () => {
  it('renders league name', () => {
    const league = { id: 1, name: 'Premier League', country: 'England' };
    render(<LeagueCard league={league} />);
    expect(screen.getByText('Premier League')).toBeInTheDocument();
  });
});
```

### E2E Tests

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle('Global Soccer Coverage');
});
```

---

## Deployment

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

```bash
vercel deploy
```

---

## Environment Variables

### Development

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Production

```
NEXT_PUBLIC_API_URL=https://api.soccerhub.com/api
```

---

## Troubleshooting

### API Connection Issues

- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` environment variable
- Check browser console for CORS errors

### Authentication Issues

- Clear localStorage and try again
- Check token expiration
- Verify backend is returning valid JWT

### Build Issues

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

---

## Next Steps

### Phase 4: Admin Portal Integration
- Connect admin portal to frontend APIs
- Create admin dashboard
- Implement content management

### Phase 5: SEO & Performance
- Optimize images
- Implement caching
- Add analytics

### Phase 6: Content & Launch
- Create initial content
- Set up social media
- Launch website

---

## Summary

Phase 3 creates a complete, production-ready Next.js frontend with:

✅ **11 Pages** - Homepage, leagues, teams, matches, articles, login, admin
✅ **8 Components** - Reusable UI components
✅ **API Integration** - Full backend connectivity
✅ **Authentication** - Login/logout with JWT
✅ **Responsive Design** - Mobile-friendly with Tailwind CSS
✅ **SEO Optimized** - Metadata and structured data
✅ **Performance** - Image optimization and code splitting

**Frontend is production-ready!**

Next: Phase 4 - Admin Portal Integration

Let's build! 🚀
