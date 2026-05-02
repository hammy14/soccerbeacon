# Phase 7: Production Launch - Step 1

**Status**: 🚀 IN PROGRESS  
**Date Started**: May 2, 2026  
**Estimated Duration**: 12 hours  
**Priority**: CRITICAL  

---

## Overview

Launch Pitch Passport to production with proper configuration, security hardening, and monitoring setup.

---

## Step 1: Launch Pitch Passport to Production

### 1.1 Pre-Deployment Checklist

#### Frontend Configuration
- [ ] Update `.env.local` with production API URL
- [ ] Set Google Analytics 4 ID
- [ ] Configure Sentry DSN for error tracking
- [ ] Verify build succeeds: `npm run build`
- [ ] Test production build locally: `npm run start`

#### Backend Configuration
- [ ] Set NODE_ENV to 'production'
- [ ] Update CORS_ORIGIN to production domain
- [ ] Move database credentials to environment variables
- [ ] Configure Sentry DSN
- [ ] Set up PM2 for process management
- [ ] Configure Nginx reverse proxy

#### Database Configuration
- [ ] Verify remote MySQL connection
- [ ] Backup production database
- [ ] Verify all tables and data
- [ ] Test connection pooling
- [ ] Set up automated backups

#### Security Hardening
- [ ] Enable HTTPS/SSL
- [ ] Configure security headers
- [ ] Set up rate limiting
- [ ] Enable CORS properly
- [ ] Validate all environment variables

#### Monitoring Setup
- [ ] Configure Sentry for error tracking
- [ ] Set up UptimeRobot for uptime monitoring
- [ ] Configure Google Analytics 4
- [ ] Set up New Relic for performance monitoring
- [ ] Create monitoring dashboard

---

### 1.2 Deployment Steps

#### Step 1: Frontend Deployment (Vercel)

**Estimated Time**: 2 hours

1. **Prepare Frontend**
   ```bash
   cd pitchpassport/frontend
   npm run build
   npm run start  # Test production build
   ```

2. **Deploy to Vercel**
   - Connect GitHub repository to Vercel
   - Set environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_API_URL` = production backend URL
     - `NEXT_PUBLIC_GA_ID` = Google Analytics ID
     - `NEXT_PUBLIC_SENTRY_DSN` = Sentry DSN
   - Deploy main branch
   - Verify deployment at production URL

3. **Configure Custom Domain**
   - Add custom domain in Vercel
   - Configure DNS records
   - Enable auto-renewal of SSL certificate

4. **Verify Frontend**
   - Test all pages load correctly
   - Verify API calls work
   - Check console for errors
   - Test on mobile devices

---

#### Step 2: Backend Deployment (DigitalOcean/AWS)

**Estimated Time**: 4 hours

1. **Prepare Backend**
   ```bash
   cd pitchpassport/backend
   npm install
   npm run build  # If applicable
   ```

2. **Configure Environment**
   - Update `.env` for production:
     ```
     NODE_ENV=production
     PORT=5001
     DB_HOST=72.167.125.133
     DB_USER=TexSparky
     DB_PASSWORD=<secure>
     DB_NAME=PitchPassport
     CORS_ORIGIN=https://pitchpassport.com
     JWT_SECRET=<secure>
     SENTRY_DSN=<sentry-dsn>
     ```

3. **Set Up PM2 Process Manager**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "pitch-passport-api"
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx Reverse Proxy**
   ```nginx
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
   ```

5. **Enable SSL with Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot certonly --nginx -d api.pitchpassport.com
   ```

6. **Deploy Backend**
   - Upload code to server
   - Install dependencies
   - Start PM2 process
   - Verify API is running

7. **Verify Backend**
   - Test health endpoint: `GET /api/health`
   - Test API endpoints
   - Check error logs
   - Monitor performance

---

#### Step 3: Database Verification

**Estimated Time**: 1 hour

1. **Verify Connection**
   ```bash
   mysql -h 72.167.125.133 -u TexSparky -p PitchPassport
   ```

2. **Check Data**
   ```sql
   SELECT COUNT(*) FROM leagues;
   SELECT COUNT(*) FROM teams;
   SELECT COUNT(*) FROM articles;
   SELECT COUNT(*) FROM users;
   ```

3. **Backup Database**
   ```bash
   mysqldump -h 72.167.125.133 -u TexSparky -p PitchPassport > backup.sql
   ```

4. **Set Up Automated Backups**
   - Configure daily backups
   - Store backups securely
   - Test restore procedure

---

#### Step 4: Monitoring Setup

**Estimated Time**: 2 hours

1. **Sentry Error Tracking**
   - Create Sentry project
   - Get DSN
   - Add to frontend and backend
   - Test error reporting

2. **UptimeRobot Monitoring**
   - Create monitoring for frontend
   - Create monitoring for backend API
   - Set up alerts
   - Configure notification channels

3. **Google Analytics 4**
   - Create GA4 property
   - Add tracking code to frontend
   - Verify data collection
   - Set up goals and events

4. **New Relic Performance Monitoring**
   - Install New Relic agent
   - Configure for Node.js backend
   - Set up dashboards
   - Configure alerts

---

#### Step 5: Security Hardening

**Estimated Time**: 2 hours

1. **Enable HTTPS**
   - Verify SSL certificate installed
   - Redirect HTTP to HTTPS
   - Test SSL configuration

2. **Security Headers**
   ```javascript
   // Add to Express middleware
   app.use((req, res, next) => {
     res.setHeader('X-Content-Type-Options', 'nosniff');
     res.setHeader('X-Frame-Options', 'DENY');
     res.setHeader('X-XSS-Protection', '1; mode=block');
     res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
     next();
   });
   ```

3. **Rate Limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   });
   app.use('/api/', limiter);
   ```

4. **CORS Configuration**
   ```javascript
   app.use(cors({
     origin: 'https://pitchpassport.com',
     credentials: true
   }));
   ```

5. **Environment Variables**
   - Never commit `.env` to git
   - Use `.env.example` for reference
   - Rotate secrets regularly
   - Use secure vaults for credentials

---

### 1.3 Post-Deployment Verification

**Estimated Time**: 1 hour

1. **Frontend Verification**
   - [ ] Homepage loads
   - [ ] All pages accessible
   - [ ] API calls work
   - [ ] Images load correctly
   - [ ] Mobile responsive
   - [ ] No console errors

2. **Backend Verification**
   - [ ] Health endpoint responds
   - [ ] All API endpoints work
   - [ ] Database queries succeed
   - [ ] Authentication works
   - [ ] Error handling works

3. **Database Verification**
   - [ ] Data accessible
   - [ ] Queries performant
   - [ ] Backups working
   - [ ] Connection pooling active

4. **Monitoring Verification**
   - [ ] Sentry receiving errors
   - [ ] UptimeRobot monitoring
   - [ ] Google Analytics tracking
   - [ ] New Relic collecting data

5. **Security Verification**
   - [ ] HTTPS working
   - [ ] Security headers present
   - [ ] Rate limiting active
   - [ ] CORS configured correctly

---

### 1.4 Launch Announcement

**Estimated Time**: 1 hour

1. **Update Status**
   - Update website status page
   - Post launch announcement
   - Send email to subscribers

2. **Social Media**
   - Post on Twitter/X
   - Post on LinkedIn
   - Post on Facebook
   - Post on Instagram

3. **Documentation**
   - Update README
   - Create launch blog post
   - Update API documentation
   - Create user guide

---

## Current Status

### ✅ Completed
- [x] Code development (100%)
- [x] Testing procedures documented
- [x] Deployment guide created
- [x] Database schema ready
- [x] Environment configuration prepared

### 🔄 In Progress
- [ ] Pre-deployment checklist
- [ ] Frontend deployment
- [ ] Backend deployment
- [ ] Monitoring setup
- [ ] Security hardening

### ⏳ Pending
- [ ] Post-deployment verification
- [ ] Launch announcement
- [ ] Performance optimization
- [ ] User feedback collection

---

## Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Pre-Deployment | 1 hour | ⏳ Pending |
| Frontend Deployment | 2 hours | ⏳ Pending |
| Backend Deployment | 4 hours | ⏳ Pending |
| Database Verification | 1 hour | ⏳ Pending |
| Monitoring Setup | 2 hours | ⏳ Pending |
| Security Hardening | 2 hours | ⏳ Pending |
| Post-Deployment Verification | 1 hour | ⏳ Pending |
| Launch Announcement | 1 hour | ⏳ Pending |
| **TOTAL** | **14 hours** | **⏳ Pending** |

---

## Success Criteria

✅ **Deployment Successful When:**
1. Frontend accessible at production URL
2. Backend API responding to requests
3. Database connected and data accessible
4. All monitoring systems active
5. Security headers present
6. SSL certificate valid
7. No critical errors in logs
8. Performance metrics acceptable
9. Analytics tracking working
10. Team notified of launch

---

## Rollback Plan

If deployment fails:
1. Revert frontend to previous Vercel deployment
2. Stop backend and restore from backup
3. Restore database from backup
4. Notify team of issue
5. Investigate root cause
6. Fix and redeploy

---

## Next Steps

1. ✅ Complete pre-deployment checklist
2. ✅ Deploy frontend to Vercel
3. ✅ Deploy backend to DigitalOcean/AWS
4. ✅ Verify all systems working
5. ✅ Announce launch

---

**Status**: 🚀 READY TO LAUNCH  
**Estimated Completion**: May 2, 2026 (12 hours)  
**Owner**: Development Team  

