# Pitch Passport Build Roadmap - Implementation Tracker

**Project**: Pitch Passport - Global Football Coverage Site
**Tech Stack**: Next.js + Node.js/Express + MySQL + Strapi CMS
**Admin Portal**: `/Users/endimac/denick/`
**Target Launch**: 2-3 weeks (MVP)

---

## Project Structure

```
pitch-passport/
├── frontend/                 # Next.js app (public site)
│   ├── pages/
│   ├── components/
│   ├── styles/
│   ├── public/
│   └── package.json
├── backend/                  # Express API server
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── package.json
├── admin/                    # Admin portal (Strapi or custom)
│   └── (at /Users/endimac/denick/)
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── schema.sql
└── docs/
    └── API_DOCS.md
```

---

## Phase 1: Project Setup & Infrastructure (Days 1-3)

### 1.1 Initialize Project Structure
- [ ] Create main project directory: `pitch-passport/`
- [ ] Initialize Git repository
- [ ] Create `.gitignore` (Node, environment files)
- [ ] Create `README.md` with project overview
- [ ] Set up environment variables template (`.env.example`)

**Deliverable**: Git repo ready, folder structure created

---

### 1.2 Backend Setup (Express + MySQL)
- [ ] Initialize Express project: `npm init -y`
- [ ] Install dependencies:
  ```
  npm install express mysql2 dotenv cors body-parser nodemon
  npm install --save-dev nodemon
  ```
- [ ] Create `backend/` directory structure
- [ ] Set up `backend/server.js` entry point
- [ ] Configure MySQL connection pool in `backend/config/database.js`
- [ ] Create `.env` file with MySQL credentials
- [ ] Test database connection

**Deliverable**: Express server running, MySQL connected

---

### 1.3 Frontend Setup (Next.js)
- [ ] Create Next.js app: `npx create-next-app@latest frontend`
- [ ] Choose: TypeScript (yes), Tailwind (yes), ESLint (yes)
- [ ] Install additional dependencies:
  ```
  npm install axios swr zustand
  ```
- [ ] Configure API routes to connect to backend
- [ ] Set up `.env.local` with API endpoint
- [ ] Test Next.js dev server

**Deliverable**: Next.js app running on localhost:3000

---

### 1.4 Database Schema Setup
- [ ] Create MySQL database: `CREATE DATABASE pitch_passport;`
- [ ] Create tables:
  - [ ] `leagues` (id, name, country, logo_url, created_at)
  - [ ] `teams` (id, league_id, name, logo_url, founded_year, created_at)
  - [ ] `players` (id, team_id, name, position, number, nationality, created_at)
  - [ ] `matches` (id, league_id, home_team_id, away_team_id, date, status, home_score, away_score, created_at)
  - [ ] `standings` (id, league_id, team_id, played, won, drawn, lost, goals_for, goals_against, points, created_at)
  - [ ] `articles` (id, title, slug, content, author, league_id, featured_image, published_at, created_at)
  - [ ] `users` (id, email, password_hash, role, created_at)
- [ ] Create `database/schema.sql` with all table definitions
- [ ] Seed initial data (3 leagues, teams, sample matches)

**Deliverable**: MySQL database with schema and seed data

---

### 1.5 Admin Portal Setup
- [ ] Create admin directory at `/Users/endimac/denick/`
- [ ] Initialize as separate Next.js app or custom dashboard
- [ ] Set up authentication (JWT tokens)
- [ ] Create admin `.env` file with backend API endpoint
- [ ] Test admin connection to backend

**Deliverable**: Admin portal accessible, authenticated

---

## Phase 2: Core Backend API (Days 4-6)

### 2.1 League Routes & Controllers
- [ ] Create `backend/routes/leagues.js`
- [ ] Create `backend/controllers/leagueController.js`
- [ ] Implement endpoints:
  - [ ] `GET /api/leagues` - Get all leagues
  - [ ] `GET /api/leagues/:id` - Get league details
  - [ ] `POST /api/leagues` - Create league (admin only)
  - [ ] `PUT /api/leagues/:id` - Update league (admin only)
  - [ ] `DELETE /api/leagues/:id` - Delete league (admin only)
- [ ] Add error handling and validation
- [ ] Test all endpoints with Postman/Insomnia

**Deliverable**: League API fully functional

---

### 2.2 Team Routes & Controllers
- [ ] Create `backend/routes/teams.js`
- [ ] Create `backend/controllers/teamController.js`
- [ ] Implement endpoints:
  - [ ] `GET /api/teams` - Get all teams (with filtering by league)
  - [ ] `GET /api/teams/:id` - Get team details with players
  - [ ] `POST /api/teams` - Create team (admin only)
  - [ ] `PUT /api/teams/:id` - Update team (admin only)
  - [ ] `DELETE /api/teams/:id` - Delete team (admin only)
- [ ] Add error handling and validation
- [ ] Test all endpoints

**Deliverable**: Team API fully functional

---

### 2.3 Match Routes & Controllers
- [ ] Create `backend/routes/matches.js`
- [ ] Create `backend/controllers/matchController.js`
- [ ] Implement endpoints:
  - [ ] `GET /api/matches` - Get all matches (with filtering by league, date)
  - [ ] `GET /api/matches/:id` - Get match details
  - [ ] `POST /api/matches` - Create match (admin only)
  - [ ] `PUT /api/matches/:id` - Update match score (admin only)
  - [ ] `DELETE /api/matches/:id` - Delete match (admin only)
- [ ] Add error handling and validation
- [ ] Test all endpoints

**Deliverable**: Match API fully functional

---

### 2.4 Standings Routes & Controllers
- [ ] Create `backend/routes/standings.js`
- [ ] Create `backend/controllers/standingsController.js`
- [ ] Implement endpoints:
  - [ ] `GET /api/standings/:league_id` - Get league standings
  - [ ] `POST /api/standings/update/:league_id` - Recalculate standings (admin only)
- [ ] Create function to auto-calculate standings from matches
- [ ] Test all endpoints

**Deliverable**: Standings API fully functional

---

### 2.5 Articles Routes & Controllers
- [ ] Create `backend/routes/articles.js`
- [ ] Create `backend/controllers/articleController.js`
- [ ] Implement endpoints:
  - [ ] `GET /api/articles` - Get all articles (with pagination, filtering)
  - [ ] `GET /api/articles/:slug` - Get article by slug
  - [ ] `POST /api/articles` - Create article (admin only)
  - [ ] `PUT /api/articles/:id` - Update article (admin only)
  - [ ] `DELETE /api/articles/:id` - Delete article (admin only)
- [ ] Add slug generation from title
- [ ] Add error handling and validation
- [ ] Test all endpoints

**Deliverable**: Articles API fully functional

---

### 2.6 Authentication & Middleware
- [ ] Install JWT library: `npm install jsonwebtoken bcryptjs`
- [ ] Create `backend/middleware/auth.js` for JWT verification
- [ ] Create `backend/controllers/authController.js`
- [ ] Implement endpoints:
  - [ ] `POST /api/auth/login` - Admin login
  - [ ] `POST /api/auth/register` - Create admin user (protected)
  - [ ] `POST /api/auth/logout` - Logout
- [ ] Add password hashing with bcrypt
- [ ] Add JWT token generation and verification
- [ ] Test authentication flow

**Deliverable**: Authentication system working

---

## Phase 3: Frontend Pages & Components (Days 7-10)

### 3.1 Layout & Navigation
- [ ] Create `frontend/components/Header.tsx`
- [ ] Create `frontend/components/Navigation.tsx`
- [ ] Create `frontend/components/Footer.tsx`
- [ ] Create `frontend/components/Layout.tsx` (wrapper)
- [ ] Set up Tailwind CSS styling
- [ ] Add responsive design for mobile
- [ ] Create logo/branding assets

**Deliverable**: Consistent layout across all pages

---

### 3.2 Homepage
- [ ] Create `frontend/pages/index.tsx`
- [ ] Design hero section with site tagline
- [ ] Add featured leagues section
- [ ] Add latest articles section
- [ ] Add featured matches section
- [ ] Add call-to-action for newsletter signup
- [ ] Optimize for SEO (meta tags, structured data)

**Deliverable**: Homepage live and styled

---

### 3.3 League Pages
- [ ] Create `frontend/pages/leagues/index.tsx` - All leagues
- [ ] Create `frontend/pages/leagues/[id].tsx` - Individual league page
- [ ] Display league info (name, logo, description)
- [ ] Display current standings table
- [ ] Display upcoming fixtures
- [ ] Display recent results
- [ ] Add filtering and sorting options
- [ ] Optimize for SEO

**Deliverable**: League pages fully functional

---

### 3.4 Team Pages
- [ ] Create `frontend/pages/teams/[id].tsx` - Individual team page
- [ ] Display team info (name, logo, founded year)
- [ ] Display team roster (players list)
- [ ] Display recent matches
- [ ] Display upcoming fixtures
- [ ] Add team statistics
- [ ] Optimize for SEO

**Deliverable**: Team pages fully functional

---

### 3.5 Match Pages
- [ ] Create `frontend/pages/matches/[id].tsx` - Individual match page
- [ ] Display match details (teams, date, score)
- [ ] Display team lineups
- [ ] Display match statistics
- [ ] Display related articles
- [ ] Add match commentary section (if available)
- [ ] Optimize for SEO

**Deliverable**: Match pages fully functional

---

### 3.6 Articles Pages
- [ ] Create `frontend/pages/articles/index.tsx` - Articles list
- [ ] Create `frontend/pages/articles/[slug].tsx` - Individual article
- [ ] Display article content with formatting
- [ ] Add author and publish date
- [ ] Add related articles section
- [ ] Add social sharing buttons
- [ ] Add newsletter signup CTA
- [ ] Optimize for SEO

**Deliverable**: Articles pages fully functional

---

### 3.7 Reusable Components
- [ ] Create `frontend/components/StandingsTable.tsx`
- [ ] Create `frontend/components/MatchCard.tsx`
- [ ] Create `frontend/components/ArticleCard.tsx`
- [ ] Create `frontend/components/TeamCard.tsx`
- [ ] Create `frontend/components/LeagueCard.tsx`
- [ ] Create `frontend/components/NewsletterSignup.tsx`
- [ ] Add loading states and error handling
- [ ] Add animations/transitions

**Deliverable**: Reusable component library

---

## Phase 4: Admin Portal (Days 11-14)

### 4.1 Admin Dashboard
- [ ] Create admin dashboard at `/Users/endimac/denick/`
- [ ] Display key metrics (visitors, articles, matches)
- [ ] Add quick action buttons
- [ ] Add recent activity feed
- [ ] Add navigation menu

**Deliverable**: Admin dashboard accessible

---

### 4.2 Admin - League Management
- [ ] Create league list page with CRUD operations
- [ ] Create league form (create/edit)
- [ ] Add delete confirmation
- [ ] Add validation and error handling
- [ ] Add success notifications

**Deliverable**: League management fully functional

---

### 4.3 Admin - Team Management
- [ ] Create team list page with CRUD operations
- [ ] Create team form (create/edit)
- [ ] Add league filtering
- [ ] Add delete confirmation
- [ ] Add validation and error handling

**Deliverable**: Team management fully functional

---

### 4.4 Admin - Match Management
- [ ] Create match list page with CRUD operations
- [ ] Create match form (create/edit)
- [ ] Add score update functionality
- [ ] Add date/time picker
- [ ] Add team selection dropdowns
- [ ] Add delete confirmation

**Deliverable**: Match management fully functional

---

### 4.5 Admin - Article Management
- [ ] Create article list page with CRUD operations
- [ ] Create article editor (rich text editor)
- [ ] Add featured image upload
- [ ] Add league/category selection
- [ ] Add publish/draft status
- [ ] Add slug auto-generation
- [ ] Add delete confirmation

**Deliverable**: Article management fully functional

---

### 4.6 Admin - User Management
- [ ] Create user list page
- [ ] Create user form (create/edit)
- [ ] Add role assignment (admin, editor, viewer)
- [ ] Add password reset functionality
- [ ] Add delete confirmation

**Deliverable**: User management fully functional

---

### 4.7 Admin - Settings
- [ ] Create settings page
- [ ] Add site configuration options
- [ ] Add API key management
- [ ] Add backup/restore functionality
- [ ] Add analytics integration settings

**Deliverable**: Settings page functional

---

## Phase 5: SEO & Performance (Days 15-17)

### 5.1 SEO Optimization
- [ ] Add meta tags to all pages (title, description, keywords)
- [ ] Implement Open Graph tags for social sharing
- [ ] Add structured data (JSON-LD) for:
  - [ ] Articles
  - [ ] Matches
  - [ ] Teams
  - [ ] Leagues
- [ ] Create `robots.txt`
- [ ] Create `sitemap.xml` (dynamic)
- [ ] Add canonical tags
- [ ] Test with Google Search Console

**Deliverable**: SEO fully optimized

---

### 5.2 Performance Optimization
- [ ] Optimize images (compression, lazy loading)
- [ ] Implement caching strategy (Redis for API responses)
- [ ] Minify CSS and JavaScript
- [ ] Enable gzip compression
- [ ] Optimize database queries (add indexes)
- [ ] Test Core Web Vitals
- [ ] Set up CDN (Cloudflare)

**Deliverable**: Site performance optimized

---

### 5.3 Analytics Setup
- [ ] Install Google Analytics 4
- [ ] Add tracking code to all pages
- [ ] Set up conversion tracking
- [ ] Create custom events (article views, newsletter signups)
- [ ] Set up Google Search Console
- [ ] Monitor initial traffic

**Deliverable**: Analytics tracking live

---

## Phase 6: Content & Launch Prep (Days 18-21)

### 6.1 Initial Content Creation
- [ ] Write 15-20 initial articles:
  - [ ] 5 league explainers
  - [ ] 5 team profiles
  - [ ] 5 player spotlights
  - [ ] 5 tactical analysis pieces
- [ ] Add featured images to all articles
- [ ] Publish articles through admin portal
- [ ] Add internal links between articles

**Deliverable**: Content library ready

---

### 6.2 Social Media Setup
- [ ] Create Twitter/X account
- [ ] Create Instagram account
- [ ] Create TikTok account (optional)
- [ ] Create Discord server (optional)
- [ ] Add social links to website footer
- [ ] Create social media content calendar

**Deliverable**: Social media accounts created

---

### 6.3 Email Newsletter Setup
- [ ] Set up Substack or Mailchimp account
- [ ] Create newsletter signup form
- [ ] Add newsletter CTA to website
- [ ] Write first newsletter
- [ ] Set up automation (welcome email, etc.)

**Deliverable**: Newsletter system ready

---

### 6.4 Testing & QA
- [ ] Test all pages on desktop and mobile
- [ ] Test all API endpoints
- [ ] Test admin portal functionality
- [ ] Test authentication flow
- [ ] Test database operations
- [ ] Check for broken links
- [ ] Test form submissions
- [ ] Performance testing

**Deliverable**: All systems tested and working

---

### 6.5 Deployment Preparation
- [ ] Set up production environment
- [ ] Configure environment variables for production
- [ ] Set up database backups
- [ ] Configure SSL certificate
- [ ] Set up monitoring and alerts
- [ ] Create deployment documentation

**Deliverable**: Production environment ready

---

### 6.6 Launch
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to hosting (AWS, DigitalOcean, etc.)
- [ ] Verify all systems working in production
- [ ] Submit sitemap to Google Search Console
- [ ] Announce on social media
- [ ] Send launch email to newsletter

**Deliverable**: Site live!

---

## Phase 7: Post-Launch (Ongoing)

### 7.1 Monitoring & Maintenance
- [ ] Monitor site performance and uptime
- [ ] Monitor error logs
- [ ] Monitor database performance
- [ ] Regular backups
- [ ] Security updates

**Deliverable**: Site stable and secure

---

### 7.2 Content Publishing
- [ ] Publish 3-4 articles per day
- [ ] Update standings and fixtures daily
- [ ] Share content on social media
- [ ] Engage with community comments
- [ ] Monitor analytics

**Deliverable**: Consistent content flow

---

### 7.3 Monetization Setup
- [ ] Set up Google AdSense
- [ ] Add ad placements to site
- [ ] Set up affiliate links
- [ ] Create sponsorship media kit
- [ ] Reach out to potential sponsors

**Deliverable**: Revenue streams activated

---

### 7.4 Growth & Optimization
- [ ] Analyze traffic patterns
- [ ] Optimize underperforming pages
- [ ] A/B test headlines and CTAs
- [ ] Build backlinks
- [ ] Expand content coverage
- [ ] Grow social media following

**Deliverable**: Continuous improvement

---

## Summary Checklist

### Phase 1: Setup (Days 1-3)
- [x] Project structure created
- [ ] Git repo initialized
- [x] Express backend running (ready)
- [ ] Next.js frontend running
- [ ] MySQL database connected
- [x] Admin portal initialized (existing setup)

### Phase 2: Backend API (Days 4-6) ✅ COMPLETE
- [x] Leagues API complete
- [x] Teams API complete
- [x] Matches API complete
- [x] Standings API complete
- [x] Articles API complete
- [x] Authentication complete

### Phase 3: Frontend (Days 7-10)
- [ ] Layout and navigation complete
- [ ] Homepage complete
- [ ] League pages complete
- [ ] Team pages complete
- [ ] Match pages complete
- [ ] Articles pages complete
- [ ] Components library complete

### Phase 4: Admin Portal (Days 11-14)
- [ ] Dashboard complete
- [ ] League management complete
- [ ] Team management complete
- [ ] Match management complete
- [ ] Article management complete
- [ ] User management complete
- [ ] Settings complete

### Phase 5: SEO & Performance (Days 15-17)
- [ ] SEO optimization complete
- [ ] Performance optimization complete
- [ ] Analytics setup complete

### Phase 6: Content & Launch (Days 18-21)
- [ ] Initial content created
- [ ] Social media setup complete
- [ ] Newsletter setup complete
- [ ] Testing complete
- [ ] Deployment ready
- [ ] Site launched

### Phase 7: Post-Launch (Ongoing)
- [ ] Monitoring active
- [ ] Content publishing ongoing
- [ ] Monetization activated
- [ ] Growth optimization ongoing

---

## Key Milestones

| Milestone | Target Date | Status |
|-----------|------------|--------|
| Project Setup Complete | Day 3 | ⬜ |
| Backend API Complete | Day 6 | ⬜ |
| Frontend Pages Complete | Day 10 | ⬜ |
| Admin Portal Complete | Day 14 | ⬜ |
| SEO & Performance Complete | Day 17 | ⬜ |
| Content & Launch Ready | Day 21 | ⬜ |
| Site Live | Day 21 | ⬜ |

---

## Notes & Recommendations

### Database Optimization
- Add indexes on frequently queried columns (league_id, team_id, date)
- Use connection pooling for MySQL
- Implement query caching with Redis

### API Best Practices
- Use pagination for list endpoints (limit, offset)
- Add rate limiting to prevent abuse
- Use proper HTTP status codes
- Add request validation
- Log all API requests

### Frontend Best Practices
- Use Next.js Image component for optimization
- Implement error boundaries
- Add loading states
- Use SWR for data fetching with caching
- Implement proper error handling

### Admin Portal Security
- Implement JWT token refresh
- Add CSRF protection
- Validate all inputs
- Use HTTPS only
- Add rate limiting on login

### Deployment Strategy
- Use environment variables for configuration
- Set up CI/CD pipeline (GitHub Actions)
- Automated testing before deployment
- Blue-green deployment for zero downtime
- Regular backups

---

## Resources & Tools

### Development
- **Code Editor**: VS Code
- **API Testing**: Postman or Insomnia
- **Database GUI**: MySQL Workbench or DBeaver
- **Version Control**: Git + GitHub

### Hosting & Deployment
- **Frontend**: Vercel (Next.js optimized)
- **Backend**: AWS EC2, DigitalOcean, or Heroku
- **Database**: AWS RDS or managed MySQL hosting
- **CDN**: Cloudflare

### Monitoring & Analytics
- **Uptime Monitoring**: Uptime Robot
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics 4
- **Performance**: New Relic or DataDog

---

## Questions & Decisions Needed

1. **Hosting Provider**: Where should backend be deployed? (AWS, DigitalOcean, Heroku, etc.)
2. **Database Hosting**: Should MySQL be self-hosted or managed service?
3. **Admin Portal Location**: Should it be at `/Users/endimac/denick/` locally or deployed separately?
4. **Initial Leagues**: Which 3 leagues to start with? (Recommended: Premier League, La Liga, Champions League)
5. **Content Strategy**: Who will write initial articles? (You, AI, freelancers?)
6. **Monetization Timeline**: When to start adding ads/affiliates? (After launch or during development?)

---

## Next Steps

1. **Confirm tech stack and hosting decisions**
2. **Set up project directory structure**
3. **Initialize Git repository**
4. **Begin Phase 1: Project Setup**
5. **Track progress in this document**

Let's build! 🚀
