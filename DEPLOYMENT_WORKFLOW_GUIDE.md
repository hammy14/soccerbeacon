# Deployment Workflow Guide - Your Questions Answered

**Date**: May 2, 2026

---

## Your Progress So Far ✅

1. ✅ **CardSparky DNS** - Done
2. ✅ **Denick DNS** - Done
3. ✅ **PitchPassport (SoccerBeacon)** - New domain, DNS done
4. ⏳ **Serial Killers** - Need to get domain
5. ✅ **CardVaultIndex** - New domain, DNS done
6. ✅ **Vercel Account** - Signed up via GitHub
7. ⏳ **DigitalOcean** - Need to sign up
8. ❓ **GitHub Workflow** - Questions about sandbox vs production

---

## Question 1: What Do I Sign Up For DigitalOcean?

### Go to DigitalOcean
**Website**: https://www.digitalocean.com

### Sign Up Steps

1. **Click "Sign Up"**
   - Or go to: https://cloud.digitalocean.com/registrations/new

2. **Choose Sign Up Method**
   - ✅ **Recommended**: Sign up with GitHub
   - Or: Sign up with email

3. **If Using GitHub**
   - Click "Sign up with GitHub"
   - Authorize DigitalOcean to access GitHub
   - Done!

4. **If Using Email**
   - Enter email
   - Create password
   - Verify email
   - Done!

5. **Add Payment Method**
   - Add credit card
   - DigitalOcean will charge $5-12/month
   - You get $200 credit for 60 days (new accounts)

6. **Create App Platform**
   - Go to: https://cloud.digitalocean.com
   - Click "Create" → "App"
   - Connect GitHub repository
   - Deploy Express backend

---

## Question 2: Is GitHub Your Sandbox?

### Short Answer
✅ **YES, GitHub is your sandbox/development environment**

### How It Works

```
Your Local Computer (Development)
    ↓ (git push)
GitHub Repository (Sandbox/Staging)
    ↓ (automatic deployment)
Vercel (Production Frontend)
DigitalOcean (Production Backend)
```

---

## Development Workflow

### Step 1: Develop Locally
```
1. Clone repository to your computer
2. Make changes to code
3. Test locally
4. Commit changes: git commit -m "message"
```

### Step 2: Push to GitHub (Sandbox)
```
1. Push to GitHub: git push
2. GitHub stores your code
3. Vercel/DigitalOcean see the changes
4. Automatic deployment starts
```

### Step 3: Automatic Deployment to Production
```
1. Vercel automatically deploys frontend
2. DigitalOcean automatically deploys backend
3. Your changes go live
4. Website updates automatically
```

### Step 4: Monitor Production
```
1. Visit your website
2. Test new features
3. Check for errors
4. Monitor performance
```

---

## GitHub Workflow Explained

### Your GitHub Setup

```
GitHub Repository
├─ main branch (Production)
│  └─ Automatically deploys to Vercel + DigitalOcean
│
├─ develop branch (Staging/Sandbox)
│  └─ For testing before production
│
└─ feature branches (Development)
   └─ For working on new features
```

### Recommended Workflow

#### Option 1: Simple (Recommended for Now)

```
1. Work on main branch locally
2. Make changes
3. Test locally
4. Push to GitHub (main)
5. Vercel/DigitalOcean auto-deploy
6. Changes go live
```

**Pros**: Simple, fast  
**Cons**: No staging environment

#### Option 2: Advanced (Recommended Later)

```
1. Create feature branch: git checkout -b feature/new-feature
2. Make changes
3. Test locally
4. Push to GitHub: git push origin feature/new-feature
5. Create Pull Request (PR)
6. Review changes
7. Merge to main
8. Vercel/DigitalOcean auto-deploy
9. Changes go live
```

**Pros**: Safe, reviewable, staging environment  
**Cons**: More steps

---

## Your 6 Sites Workflow

### Site 1: CardSparky
```
GitHub: cardsparky repository
    ↓
Vercel: cardsparky.com (frontend)
DigitalOcean: api.cardsparky.com (backend)
```

### Site 2: Denick
```
GitHub: denick repository
    ↓
Vercel: denick.com (frontend)
DigitalOcean: api.denick.com (backend)
```

### Site 3: SoccerBeacon (Pitch Passport)
```
GitHub: pitchpassport repository
    ↓
Vercel: soccerbeacon.com (frontend)
DigitalOcean: api.soccerbeacon.com (backend)
```

### Site 4: Serial Killers
```
GitHub: serielkillers repository
    ↓
Vercel: serielkillers.com (frontend)
DigitalOcean: api.serielkillers.com (backend)
```

### Site 5: CardVaultIndex
```
GitHub: cardvaultindex repository
    ↓
Vercel: cardvaultindex.com (frontend)
DigitalOcean: api.cardvaultindex.com (backend)
```

### Site 6: (Future Site)
```
GitHub: (future repository)
    ↓
Vercel: (future domain) (frontend)
DigitalOcean: api.(future domain) (backend)
```

---

## Development → Staging → Production

### Option 1: Simple (Current)
```
Local Development
    ↓ (git push)
GitHub (main branch)
    ↓ (auto-deploy)
Production (Vercel + DigitalOcean)
```

### Option 2: Advanced (Recommended)
```
Local Development
    ↓ (git push to feature branch)
GitHub (feature branch)
    ↓ (create PR)
Code Review
    ↓ (merge to main)
GitHub (main branch)
    ↓ (auto-deploy)
Production (Vercel + DigitalOcean)
```

### Option 3: With Staging
```
Local Development
    ↓ (git push to develop)
GitHub (develop branch)
    ↓ (auto-deploy)
Staging (Vercel + DigitalOcean)
    ↓ (test)
GitHub (merge to main)
    ↓ (auto-deploy)
Production (Vercel + DigitalOcean)
```

---

## How Vercel Auto-Deploys

### When You Push to GitHub

1. **You push code**: `git push`
2. **GitHub receives code**
3. **Vercel webhook triggers**
4. **Vercel pulls latest code**
5. **Vercel builds your Next.js app**
6. **Vercel deploys to production**
7. **Your website updates** (usually in 1-2 minutes)

### You Can See Deployment Status

1. Go to Vercel dashboard: https://vercel.com/dashboard
2. Click on your project
3. See deployment history
4. See build logs
5. See any errors

---

## How DigitalOcean Auto-Deploys

### When You Push to GitHub

1. **You push code**: `git push`
2. **GitHub receives code**
3. **DigitalOcean webhook triggers**
4. **DigitalOcean pulls latest code**
5. **DigitalOcean builds your Express app**
6. **DigitalOcean deploys to production**
7. **Your API updates** (usually in 2-5 minutes)

### You Can See Deployment Status

1. Go to DigitalOcean dashboard: https://cloud.digitalocean.com
2. Click on your app
3. See deployment history
4. See build logs
5. See any errors

---

## Workflow for Each Site

### Example: CardSparky

#### Step 1: Develop Locally
```bash
# Clone repository
git clone https://github.com/yourusername/cardsparky.git
cd cardsparky

# Create feature branch
git checkout -b feature/new-feature

# Make changes
# Edit files...

# Test locally
npm run dev
# Visit http://localhost:3000
```

#### Step 2: Commit Changes
```bash
# Stage changes
git add .

# Commit
git commit -m "Add new feature"
```

#### Step 3: Push to GitHub
```bash
# Push to GitHub
git push origin feature/new-feature
```

#### Step 4: Create Pull Request (Optional)
```
1. Go to GitHub
2. Click "Create Pull Request"
3. Review changes
4. Click "Merge Pull Request"
```

#### Step 5: Auto-Deploy to Production
```
1. Vercel automatically deploys frontend
2. DigitalOcean automatically deploys backend
3. Changes go live
4. Visit cardsparky.com to see changes
```

#### Step 6: Monitor Production
```
1. Visit cardsparky.com
2. Test new features
3. Check for errors
4. Monitor performance
```

---

## Git Commands You'll Use

### Basic Commands

```bash
# Clone repository
git clone https://github.com/yourusername/cardsparky.git

# Check status
git status

# Stage changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Merge branch
git merge feature/new-feature
```

---

## Your Next Steps

### Step 1: Sign Up for DigitalOcean ✅
1. Go to: https://www.digitalocean.com
2. Sign up with GitHub
3. Add payment method
4. Get $200 credit for 60 days

### Step 2: Create DigitalOcean App for CardSparky ✅
1. Go to DigitalOcean dashboard
2. Click "Create" → "App"
3. Connect GitHub repository (cardsparky)
4. Select Express backend repository
5. Configure environment variables
6. Click "Deploy"
7. Wait 5-10 minutes for deployment

### Step 3: Get DigitalOcean Domain ✅
1. After deployment, copy the domain
2. Example: `cardsparky-api-abc123.ondigitalocean.app`
3. Go to GoDaddy DNS Manager
4. Add CNAME record for "api"
5. Value: `cardsparky-api-abc123.ondigitalocean.app`
6. TTL: 3600

### Step 4: Repeat for Other Sites ✅
1. Create DigitalOcean app for Denick
2. Create DigitalOcean app for SoccerBeacon
3. Create DigitalOcean app for CardVaultIndex
4. Update DNS for each

### Step 5: Deploy Frontend to Vercel ✅
1. Go to Vercel dashboard
2. Click "Add New" → "Project"
3. Import GitHub repository (cardsparky)
4. Configure environment variables
5. Click "Deploy"
6. Wait 1-2 minutes for deployment

### Step 6: Repeat for Other Sites ✅
1. Deploy Denick to Vercel
2. Deploy SoccerBeacon to Vercel
3. Deploy CardVaultIndex to Vercel

### Step 7: Test Everything ✅
1. Visit cardsparky.com
2. Visit denick.com
3. Visit soccerbeacon.com
4. Visit cardvaultindex.com
5. Test API endpoints
6. Check for errors

---

## Serial Killers - Get Domain

### Steps to Get Domain

1. **Go to GoDaddy**: https://www.godaddy.com
2. **Search for domain**: serielkillers.com (or similar)
3. **Check availability**
4. **Add to cart**
5. **Checkout**
6. **Pay**
7. **Domain is yours!**

### After Getting Domain

1. Update DNS (same as CardSparky, Denick, etc.)
2. Create Vercel app
3. Create DigitalOcean app
4. Deploy

---

## Summary

| Question | Answer |
|----------|--------|
| What to sign up for DigitalOcean? | Go to https://www.digitalocean.com, sign up with GitHub |
| Is GitHub your sandbox? | ✅ YES, GitHub is your development/sandbox environment |
| How does deployment work? | Push to GitHub → Auto-deploy to Vercel + DigitalOcean |
| Can you push to prod? | ✅ YES, every push to main branch goes to production |
| Should you use branches? | ✅ YES, use feature branches for development |
| How many sites can you deploy? | ✅ All 6 sites (CardSparky, Denick, SoccerBeacon, Serial Killers, CardVaultIndex, + 1 more) |

---

## Your Deployment Architecture

```
Your Computer (Development)
    ↓ (git push)
GitHub (Sandbox/Repository)
    ├─ main branch (Production)
    ├─ develop branch (Staging)
    └─ feature branches (Development)
    ↓ (webhook triggers)
Vercel (Frontend Production)
├─ cardsparky.com
├─ denick.com
├─ soccerbeacon.com
├─ cardvaultindex.com
└─ serielkillers.com

DigitalOcean (Backend Production)
├─ api.cardsparky.com
├─ api.denick.com
├─ api.soccerbeacon.com
├─ api.cardvaultindex.com
└─ api.serielkillers.com

GoDaddy (Domain Registration + Email)
├─ cardsparky.com (email + DNS)
├─ denick.com (email + DNS)
├─ soccerbeacon.com (DNS)
├─ cardvaultindex.com (DNS)
└─ serielkillers.com (DNS - need to get)
```

---

## Next Steps

1. ✅ Sign up for DigitalOcean
2. ✅ Create DigitalOcean apps for each site
3. ✅ Update DNS for each site
4. ✅ Deploy frontends to Vercel
5. ✅ Test all sites
6. ✅ Get domain for Serial Killers
7. ✅ Deploy Serial Killers

---

**Ready to proceed?** Sign up for DigitalOcean and create your first app! 🚀

