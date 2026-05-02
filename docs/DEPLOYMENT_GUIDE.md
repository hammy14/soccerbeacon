# Deployment Guide: Pitch Passport

## Overview

This guide covers deploying Pitch Passport to production on Vercel (frontend) and a hosting provider (backend).

---

## Pre-Deployment Checklist

- [ ] All testing complete
- [ ] All code committed to git
- [ ] Environment variables configured
- [ ] Database backups created
- [ ] SSL certificate obtained
- [ ] CDN configured (Cloudflare)
- [ ] Monitoring configured
- [ ] Error tracking configured (Sentry)
- [ ] Analytics configured (Google Analytics 4)
- [ ] Search Console verified

---

## Part 1: Frontend Deployment (Vercel)

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel
5. Complete account setup

### Step 2: Connect GitHub Repository

1. Go to Vercel Dashboard
2. Click "New Project"
3. Select GitHub repository: `pitch-passport`
4. Click "Import"

### Step 3: Configure Environment Variables

1. Go to Project Settings
2. Click "Environment Variables"
3. Add variables:
   ```
   NEXT_PUBLIC_API_URL=https://api.pitchpassport.com/api
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. Click "Save"

### Step 4: Configure Build Settings

1. Go to Project Settings
2. Click "Build & Development Settings"
3. Verify:
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
4. Click "Save"

### Step 5: Deploy

1. Go to Deployments
2. Click "Deploy"
3. Wait for build to complete
4. Verify deployment successful

### Step 6: Configure Custom Domain

1. Go to Project Settings
2. Click "Domains"
3. Add domain: `pitchpassport.com`
4. Follow DNS configuration steps
5. Wait for DNS propagation (up to 48 hours)

### Step 7: Enable SSL

1. Vercel automatically provides SSL
2. Verify HTTPS works: https://pitchpassport.com
3. Check certificate validity

### Step 8: Configure Redirects

1. Create `vercel.json` in root:
   ```json
   {
     "redirects": [
       {
         "source": "/soccer",
         "destination": "/",
         "permanent": true
       }
     ]
   }
   ```
2. Commit and push
3. Vercel will redeploy automatically

---

## Part 2: Backend Deployment

### Option A: DigitalOcean (Recommended)

#### Step 1: Create DigitalOcean Account

1. Go to https://www.digitalocean.com
2. Click "Sign Up"
3. Create account
4. Add payment method

#### Step 2: Create Droplet

1. Go to Dashboard
2. Click "Create" → "Droplets"
3. Choose:
   - **Image**: Ubuntu 22.04 LTS
   - **Size**: $6/month (2GB RAM, 1 vCPU)
   - **Region**: Closest to your users
   - **Authentication**: SSH Key
4. Click "Create Droplet"

#### Step 3: SSH into Droplet

```bash
ssh root@your_droplet_ip
```

#### Step 4: Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install MySQL client
apt install -y mysql-client

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx (reverse proxy)
apt install -y nginx
```

#### Step 5: Clone Repository

```bash
cd /var/www
git clone https://github.com/yourusername/pitch-passport.git
cd pitch-passport/backend
npm install
```

#### Step 6: Configure Environment

```bash
# Create .env file
nano .env

# Add:
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=PitchPassport
PORT=5001
NODE_ENV=production
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=https://pitchpassport.com
```

#### Step 7: Start Application with PM2

```bash
# Start application
pm2 start server.js --name "pitch-passport-api"

# Save PM2 configuration
pm2 save

# Enable PM2 startup
pm2 startup
```

#### Step 8: Configure Nginx

```bash
# Create Nginx config
nano /etc/nginx/sites-available/pitch-passport

# Add:
server {
    listen 80;
    server_name api.pitchpassport.com;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
ln -s /etc/nginx/sites-available/pitch-passport /etc/nginx/sites-enabled/

# Test Nginx
nginx -t

# Restart Nginx
systemctl restart nginx
```

#### Step 9: Install SSL Certificate

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificate
certbot certonly --nginx -d api.pitchpassport.com

# Auto-renew
systemctl enable certbot.timer
```

#### Step 10: Update Nginx for HTTPS

```bash
# Update Nginx config
nano /etc/nginx/sites-available/pitch-passport

# Add SSL configuration:
server {
    listen 443 ssl http2;
    server_name api.pitchpassport.com;

    ssl_certificate /etc/letsencrypt/live/api.pitchpassport.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.pitchpassport.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name api.pitchpassport.com;
    return 301 https://$server_name$request_uri;
}

# Restart Nginx
systemctl restart nginx
```

### Option B: AWS EC2

1. Create EC2 instance (t3.micro)
2. Configure security groups
3. SSH into instance
4. Follow same steps as DigitalOcean
5. Configure Route 53 for DNS

### Option C: Heroku

1. Create Heroku account
2. Install Heroku CLI
3. Create app: `heroku create pitch-passport-api`
4. Add MySQL add-on
5. Deploy: `git push heroku main`
6. Configure domain

---

## Part 3: Database Deployment

### Step 1: Choose Database Provider

**Options:**
- AWS RDS (managed MySQL)
- DigitalOcean Managed Database
- Self-hosted on same server
- Existing remote database

### Step 2: Create Database

```bash
# Create database
CREATE DATABASE pitch_passport;

# Create user
CREATE USER 'pitchpassport'@'%' IDENTIFIED BY 'strong_password';

# Grant privileges
GRANT ALL PRIVILEGES ON pitch_passport.* TO 'pitchpassport'@'%';
FLUSH PRIVILEGES;
```

### Step 3: Migrate Schema

```bash
# From local machine
mysql -h your_database_host -u pitchpassport -p pitch_passport < database/schema-fixed.sql
```

### Step 4: Seed Initial Data

```bash
# From backend server
node seed-leagues.js
node seed-articles.js
```

### Step 5: Configure Backups

```bash
# Create backup script
nano /usr/local/bin/backup-db.sh

#!/bin/bash
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME > /backups/pitch_passport_$(date +%Y%m%d_%H%M%S).sql

# Make executable
chmod +x /usr/local/bin/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e
0 2 * * * /usr/local/bin/backup-db.sh
```

---

## Part 4: CDN Configuration (Cloudflare)

### Step 1: Create Cloudflare Account

1. Go to https://www.cloudflare.com
2. Click "Sign Up"
3. Create account

### Step 2: Add Site

1. Click "Add a Site"
2. Enter domain: `pitchpassport.com`
3. Select plan (Free tier available)
4. Click "Continue"

### Step 3: Update Nameservers

1. Copy Cloudflare nameservers
2. Go to domain registrar
3. Update nameservers
4. Wait for propagation (up to 48 hours)

### Step 4: Configure SSL

1. Go to SSL/TLS
2. Select "Full" or "Full (strict)"
3. Enable "Always Use HTTPS"
4. Enable "Automatic HTTPS Rewrites"

### Step 5: Configure Caching

1. Go to Caching
2. Set cache level: "Cache Everything"
3. Set browser cache TTL: "1 month"
4. Enable "Minify" (CSS, JavaScript, HTML)

### Step 6: Configure Security

1. Go to Security
2. Set Security Level: "High"
3. Enable "Bot Fight Mode"
4. Enable "DDoS Protection"

---

## Part 5: Monitoring & Alerts

### Step 1: Set Up Error Tracking (Sentry)

1. Go to https://sentry.io
2. Create account
3. Create project (Next.js + Node.js)
4. Get DSN
5. Add to environment variables:
   ```
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
   ```

### Step 2: Set Up Uptime Monitoring

1. Go to https://uptimerobot.com
2. Create account
3. Add monitor:
   - URL: https://api.pitchpassport.com/api/health
   - Interval: 5 minutes
   - Alert email: your_email@example.com

### Step 3: Set Up Performance Monitoring

1. Go to https://newrelic.com
2. Create account
3. Install New Relic agent
4. Configure dashboards
5. Set up alerts

---

## Part 6: Post-Deployment

### Step 1: Verify Deployment

```bash
# Test frontend
curl https://pitchpassport.com

# Test backend
curl https://api.pitchpassport.com/api/health

# Test database
curl https://api.pitchpassport.com/api/leagues
```

### Step 2: Submit to Search Engines

1. Go to Google Search Console
2. Submit sitemap: https://pitchpassport.com/sitemap.xml
3. Request indexing for homepage
4. Monitor indexing status

### Step 3: Monitor Analytics

1. Go to Google Analytics 4
2. Check real-time data
3. Verify page tracking
4. Verify event tracking

### Step 4: Test Email

1. Send test newsletter
2. Verify email delivery
3. Verify links work
4. Verify formatting

### Step 5: Announce Launch

1. Post on social media
2. Send launch email
3. Notify subscribers
4. Share with community

---

## Troubleshooting

### Frontend Issues

**Build fails**
- Check Node.js version
- Clear cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**Deployment fails**
- Check environment variables
- Check build logs
- Verify all dependencies installed

**Site not loading**
- Check DNS propagation
- Check SSL certificate
- Check Vercel deployment status

### Backend Issues

**Server won't start**
- Check port availability
- Check environment variables
- Check database connection
- Check logs: `pm2 logs`

**Database connection fails**
- Check database host
- Check database credentials
- Check firewall rules
- Check network connectivity

**API endpoints not responding**
- Check server status
- Check Nginx configuration
- Check firewall rules
- Check logs

---

## Rollback Procedure

### Frontend Rollback

1. Go to Vercel Dashboard
2. Go to Deployments
3. Find previous deployment
4. Click "Promote to Production"

### Backend Rollback

```bash
# Stop current version
pm2 stop pitch-passport-api

# Checkout previous version
git checkout previous_commit

# Reinstall dependencies
npm install

# Start previous version
pm2 start server.js --name "pitch-passport-api"
```

---

## Maintenance

### Daily
- [ ] Monitor error logs
- [ ] Check uptime status
- [ ] Monitor performance metrics

### Weekly
- [ ] Review analytics
- [ ] Check database size
- [ ] Review security logs

### Monthly
- [ ] Database backup verification
- [ ] SSL certificate check
- [ ] Performance optimization
- [ ] Security updates

---

## Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to hosting
- [ ] Database configured
- [ ] CDN configured
- [ ] SSL certificates installed
- [ ] Monitoring configured
- [ ] Error tracking configured
- [ ] Analytics configured
- [ ] Backups configured
- [ ] DNS configured
- [ ] Email configured
- [ ] Search Console verified
- [ ] Launch announced

---

## Summary

**Deployment Complete!** ✅

Pitch Passport is now live at:
- **Frontend**: https://pitchpassport.com
- **Backend**: https://api.pitchpassport.com
- **API**: https://api.pitchpassport.com/api

**Next Steps:**
1. Monitor performance
2. Gather user feedback
3. Optimize based on data
4. Plan Phase 7 (Post-Launch)

Let's build! 🚀
