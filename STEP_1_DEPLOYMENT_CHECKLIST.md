# Step 1: Launch Pitch Passport to Production - Deployment Checklist

**Status**: 🚀 IN PROGRESS  
**Date**: May 2, 2026  
**Estimated Time**: 12 hours  
**Owner**: Development Team  

---

## ✅ Pre-Deployment Checklist

### Frontend Configuration

- [x] **Build Test Successful**
  - ✅ `npm run build` completed successfully
  - ✅ 11 pages generated
  - ✅ Total size: ~124 kB (optimized)
  - ✅ No critical errors

- [ ] **Environment Variables**
  - [ ] Update `.env.production` with production API URL
  - [ ] Set Google Analytics 4 ID
  - [ ] Configure Sentry DSN
  - [ ] Verify all variables set

- [ ] **Production Build Test**
  - [ ] Run `npm run start` to test production build
  - [ ] Verify all pages load
  - [ ] Check API calls work
  - [ ] Test on mobile

- [ ] **Vercel Deployment**
  - [ ] Connect GitHub to Vercel
  - [ ] Set environment variables in Vercel
  - [ ] Deploy main branch
  - [ ] Verify deployment successful

---

### Backend Configuration

- [x] **Backend Ready**
  - ✅ 37 API endpoints configured
  - ✅ Express.js server ready
  - ✅ Database connection configured
  - ✅ JWT authentication ready

- [ ] **Environment Variables**
  - [ ] Update `.env.production` with production settings
  - [ ] Set NODE_ENV to 'production'
  - [ ] Update CORS_ORIGIN to production domain
  - [ ] Set secure JWT_SECRET
  - [ ] Configure Sentry DSN

- [ ] **Security Hardening**
  - [ ] Add security headers middleware
  - [ ] Enable rate limiting
  - [ ] Configure CORS properly
  - [ ] Enable HTTPS redirect
  - [ ] Add helmet.js for security

- [ ] **Process Management**
  - [ ] Install PM2 globally
  - [ ] Create PM2 ecosystem config
  - [ ] Test PM2 startup
  - [ ] Configure auto-restart

---

### Database Configuration

- [x] **Database Ready**
  - ✅ Remote MySQL at 72.167.125.133
  - ✅ 8 tables created
  - ✅ Data seeded (5 leagues, 50 teams, 20 articles)
  - ✅ Connection pooling configured

- [ ] **Production Verification**
  - [ ] Test connection to remote database
  - [ ] Verify all tables exist
  - [ ] Check data integrity
  - [ ] Test connection pooling
  - [ ] Verify indexes are present

- [ ] **Backup Configuration**
  - [ ] Create full database backup
  - [ ] Test backup restore
  - [ ] Set up automated daily backups
  - [ ] Store backups securely
  - [ ] Document backup procedure

---

### Monitoring Setup

- [ ] **Sentry Error Tracking**
  - [ ] Create Sentry project
  - [ ] Get Sentry DSN
  - [ ] Add to frontend `.env.production`
  - [ ] Add to backend `.env.production`
  - [ ] Test error reporting

- [ ] **UptimeRobot Monitoring**
  - [ ] Create UptimeRobot account
  - [ ] Add frontend monitoring
  - [ ] Add backend API monitoring
  - [ ] Set up alerts
  - [ ] Configure notification channels

- [ ] **Google Analytics 4**
  - [ ] Create GA4 property
  - [ ] Get tracking ID
  - [ ] Add to frontend
  - [ ] Verify data collection
  - [ ] Set up goals and events

- [ ] **Performance Monitoring**
  - [ ] Set up New Relic (optional)
  - [ ] Configure performance dashboards
  - [ ] Set up alerts for slow queries
  - [ ] Monitor API response times

---

### Security Hardening

- [ ] **HTTPS/SSL**
  - [ ] Verify SSL certificate
  - [ ] Configure auto-renewal
  - [ ] Test HTTPS connection
  - [ ] Redirect HTTP to HTTPS

- [ ] **Security Headers**
  - [ ] Add X-Content-Type-Options
  - [ ] Add X-Frame-Options
  - [ ] Add X-XSS-Protection
  - [ ] Add Strict-Transport-Security
  - [ ] Add Content-Security-Policy

- [ ] **Rate Limiting**
  - [ ] Configure rate limiter
  - [ ] Set limits per endpoint
  - [ ] Test rate limiting
  - [ ] Monitor for abuse

- [ ] **CORS Configuration**
  - [ ] Set CORS_ORIGIN to production domain
  - [ ] Enable credentials if needed
  - [ ] Test CORS headers
  - [ ] Verify cross-origin requests work

- [ ] **Environment Variables**
  - [ ] Never commit `.env` to git
  - [ ] Use `.env.example` for reference
  - [ ] Rotate secrets regularly
  - [ ] Use secure vaults for credentials

---

## 📋 Deployment Steps

### Phase 1: Frontend Deployment (Vercel)

**Estimated Time**: 2 hours

#### Step 1.1: Prepare Frontend
```bash
cd pitchpassport/frontend
npm run build
npm run start  # Test production build
```

**Checklist**:
- [ ] Build completes without errors
- [ ] Production build starts successfully
- [ ] All pages load correctly
- [ ] API calls work
- [ ] No console errors

#### Step 1.2: Deploy to Vercel
1. [ ] Connect GitHub repository to Vercel
2. [ ] Set environment variables:
   - [ ] `NEXT_PUBLIC_API_URL` = `https://api.pitchpassport.com/api/pp`
   - [ ] `NEXT_PUBLIC_GA_ID` = Google Analytics ID
   - [ ] `NEXT_PUBLIC_SENTRY_DSN` = Sentry DSN
3. [ ] Deploy main branch
4. [ ] Verify deployment successful

#### Step 1.3: Configure Custom Domain
1. [ ] Add custom domain in Vercel
2. [ ] Configure DNS records
3. [ ] Enable auto-renewal of SSL certificate
4. [ ] Test domain access

#### Step 1.4: Verify Frontend
- [ ] Homepage loads at production URL
- [ ] All pages accessible
- [ ] API calls work
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Analytics tracking works

---

### Phase 2: Backend Deployment (DigitalOcean/AWS)

**Estimated Time**: 4 hours

#### Step 2.1: Prepare Backend
```bash
cd pitchpassport/backend
npm install
npm start  # Test backend
```

**Checklist**:
- [ ] Dependencies installed
- [ ] Backend starts successfully
- [ ] Health endpoint responds
- [ ] Database connection works
- [ ] No startup errors

#### Step 2.2: Configure Environment
1. [ ] Update `.env.production` with production settings
2. [ ] Set NODE_ENV to 'production'
3. [ ] Update CORS_ORIGIN to production domain
4. [ ] Set secure JWT_SECRET
5. [ ] Configure Sentry DSN
6. [ ] Verify all variables set

#### Step 2.3: Set Up PM2 Process Manager
```bash
npm install -g pm2
pm2 start server.js --name "pitch-passport-api"
pm2 save
pm2 startup
```

**Checklist**:
- [ ] PM2 installed globally
- [ ] Process started successfully
- [ ] Process saved
- [ ] Startup configured
- [ ] Process auto-restarts on reboot

#### Step 2.4: Configure Nginx Reverse Proxy
1. [ ] Create Nginx config file
2. [ ] Configure proxy to localhost:5001
3. [ ] Enable gzip compression
4. [ ] Set up SSL redirect
5. [ ] Test Nginx configuration

#### Step 2.5: Enable SSL with Let's Encrypt
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d api.pitchpassport.com
```

**Checklist**:
- [ ] Certbot installed
- [ ] SSL certificate obtained
- [ ] Certificate auto-renewal configured
- [ ] HTTPS working
- [ ] HTTP redirects to HTTPS

#### Step 2.6: Deploy Backend
1. [ ] Upload code to server
2. [ ] Install dependencies
3. [ ] Start PM2 process
4. [ ] Verify API is running
5. [ ] Check logs for errors

#### Step 2.7: Verify Backend
- [ ] Health endpoint responds: `GET /api/health`
- [ ] All API endpoints work
- [ ] Database queries succeed
- [ ] Authentication works
- [ ] Error handling works
- [ ] No critical errors in logs

---

### Phase 3: Database Verification

**Estimated Time**: 1 hour

#### Step 3.1: Verify Connection
```bash
mysql -h 72.167.125.133 -u TexSparky -p PitchPassport
```

**Checklist**:
- [ ] Connection successful
- [ ] Database accessible
- [ ] No connection errors

#### Step 3.2: Check Data
```sql
SELECT COUNT(*) FROM leagues;
SELECT COUNT(*) FROM teams;
SELECT COUNT(*) FROM articles;
SELECT COUNT(*) FROM users;
```

**Checklist**:
- [ ] 5 leagues present
- [ ] 50 teams present
- [ ] 20 articles present
- [ ] Admin user present

#### Step 3.3: Backup Database
```bash
mysqldump -h 72.167.125.133 -u TexSparky -p PitchPassport > backup.sql
```

**Checklist**:
- [ ] Backup created successfully
- [ ] Backup file size reasonable
- [ ] Backup stored securely

#### Step 3.4: Set Up Automated Backups
1. [ ] Create backup script
2. [ ] Schedule daily backups
3. [ ] Store backups securely
4. [ ] Test restore procedure
5. [ ] Document backup process

---

### Phase 4: Monitoring Setup

**Estimated Time**: 2 hours

#### Step 4.1: Sentry Error Tracking
1. [ ] Create Sentry project
2. [ ] Get Sentry DSN
3. [ ] Add to frontend `.env.production`
4. [ ] Add to backend `.env.production`
5. [ ] Test error reporting

**Checklist**:
- [ ] Sentry project created
- [ ] DSN obtained
- [ ] Frontend configured
- [ ] Backend configured
- [ ] Test error appears in Sentry

#### Step 4.2: UptimeRobot Monitoring
1. [ ] Create UptimeRobot account
2. [ ] Add frontend monitoring
3. [ ] Add backend API monitoring
4. [ ] Set up alerts
5. [ ] Configure notification channels

**Checklist**:
- [ ] Frontend monitored
- [ ] Backend API monitored
- [ ] Alerts configured
- [ ] Notifications working

#### Step 4.3: Google Analytics 4
1. [ ] Create GA4 property
2. [ ] Get tracking ID
3. [ ] Add to frontend
4. [ ] Verify data collection
5. [ ] Set up goals and events

**Checklist**:
- [ ] GA4 property created
- [ ] Tracking ID obtained
- [ ] Frontend configured
- [ ] Data collection verified
- [ ] Goals configured

#### Step 4.4: Performance Monitoring
1. [ ] Set up New Relic (optional)
2. [ ] Configure dashboards
3. [ ] Set up alerts
4. [ ] Monitor API response times

**Checklist**:
- [ ] Performance monitoring active
- [ ] Dashboards configured
- [ ] Alerts set up

---

### Phase 5: Security Hardening

**Estimated Time**: 2 hours

#### Step 5.1: Enable HTTPS
- [ ] Verify SSL certificate installed
- [ ] Redirect HTTP to HTTPS
- [ ] Test SSL configuration
- [ ] Verify certificate validity

#### Step 5.2: Security Headers
- [ ] Add X-Content-Type-Options: nosniff
- [ ] Add X-Frame-Options: DENY
- [ ] Add X-XSS-Protection: 1; mode=block
- [ ] Add Strict-Transport-Security
- [ ] Test headers present

#### Step 5.3: Rate Limiting
- [ ] Configure rate limiter
- [ ] Set limits per endpoint
- [ ] Test rate limiting
- [ ] Monitor for abuse

#### Step 5.4: CORS Configuration
- [ ] Set CORS_ORIGIN to production domain
- [ ] Enable credentials if needed
- [ ] Test CORS headers
- [ ] Verify cross-origin requests work

#### Step 5.5: Environment Variables
- [ ] Verify `.env` not committed to git
- [ ] Use `.env.example` for reference
- [ ] Rotate secrets regularly
- [ ] Use secure vaults for credentials

---

## ✅ Post-Deployment Verification

**Estimated Time**: 1 hour

### Frontend Verification
- [ ] Homepage loads at production URL
- [ ] All pages accessible
- [ ] API calls work
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Analytics tracking works
- [ ] Error tracking works

### Backend Verification
- [ ] Health endpoint responds
- [ ] All API endpoints work
- [ ] Database queries succeed
- [ ] Authentication works
- [ ] Error handling works
- [ ] Rate limiting active
- [ ] Security headers present
- [ ] HTTPS working

### Database Verification
- [ ] Data accessible
- [ ] Queries performant
- [ ] Backups working
- [ ] Connection pooling active
- [ ] No connection errors

### Monitoring Verification
- [ ] Sentry receiving errors
- [ ] UptimeRobot monitoring
- [ ] Google Analytics tracking
- [ ] New Relic collecting data
- [ ] Alerts configured

### Security Verification
- [ ] HTTPS working
- [ ] Security headers present
- [ ] Rate limiting active
- [ ] CORS configured correctly
- [ ] No sensitive data exposed

---

## 🚀 Launch Announcement

**Estimated Time**: 1 hour

### Update Status
- [ ] Update website status page
- [ ] Post launch announcement
- [ ] Send email to subscribers

### Social Media
- [ ] Post on Twitter/X
- [ ] Post on LinkedIn
- [ ] Post on Facebook
- [ ] Post on Instagram

### Documentation
- [ ] Update README
- [ ] Create launch blog post
- [ ] Update API documentation
- [ ] Create user guide

---

## 📊 Current Progress

| Phase | Status | Completion |
|-------|--------|-----------|
| Pre-Deployment | 🔄 In Progress | 30% |
| Frontend Deployment | ⏳ Pending | 0% |
| Backend Deployment | ⏳ Pending | 0% |
| Database Verification | ⏳ Pending | 0% |
| Monitoring Setup | ⏳ Pending | 0% |
| Security Hardening | ⏳ Pending | 0% |
| Post-Deployment Verification | ⏳ Pending | 0% |
| Launch Announcement | ⏳ Pending | 0% |
| **TOTAL** | **🔄 In Progress** | **4%** |

---

## 🎯 Success Criteria

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

## 📞 Support & Rollback

### If Deployment Fails
1. Revert frontend to previous Vercel deployment
2. Stop backend and restore from backup
3. Restore database from backup
4. Notify team of issue
5. Investigate root cause
6. Fix and redeploy

### Contact
- **Frontend Issues**: Vercel Support
- **Backend Issues**: DigitalOcean/AWS Support
- **Database Issues**: MySQL Support
- **Monitoring Issues**: Sentry/UptimeRobot Support

---

## 📝 Notes

- Keep this checklist updated as you progress
- Mark items as complete with [x]
- Document any issues encountered
- Update timestamps as you work
- Share progress with team

---

**Next Step**: Complete pre-deployment checklist and begin frontend deployment

**Estimated Completion**: May 2, 2026 (12 hours from start)

