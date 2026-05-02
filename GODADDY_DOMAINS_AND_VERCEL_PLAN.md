# GoDaddy Domains + Vercel Plan Guide

**Date**: May 2, 2026

---

## Question 1: What Do I Do With My Domains on GoDaddy?

### Short Answer
✅ **Keep your domains on GoDaddy** - they work perfectly with Vercel and DigitalOcean. You just need to update the DNS records to point to your new hosting.

---

## How Domains Work

### Current Setup
```
Your Domain (GoDaddy)
    ↓
GoDaddy Nameservers
    ↓
Points to: Your old hosting
```

### New Setup
```
Your Domain (GoDaddy) ← KEEP HERE
    ↓
GoDaddy Nameservers ← UPDATE DNS RECORDS
    ↓
Points to: Vercel (frontend) + DigitalOcean (backend)
```

---

## Step-by-Step: Update Your Domains

### Your Current Domains
Based on your projects, you likely have:
1. **pitchpassport.com** (Pitch Passport)
2. **cardsparky.com** (CardSparky)
3. **serielkillers.com** (Serial Killers)
4. **denick.com** (Denick)

Plus 2-3 more you're planning to add.

---

### Step 1: Update DNS for Frontend (Vercel)

**For each domain**, go to GoDaddy and update DNS:

#### Go to GoDaddy DNS Settings
1. Log in to GoDaddy: https://www.godaddy.com
2. Go to "My Products"
3. Find your domain
4. Click "Manage DNS"

#### Add Vercel DNS Records

**For pitchpassport.com**:

1. **Add CNAME Record**
   - Name: `www`
   - Type: `CNAME`
   - Value: `cname.vercel-dns.com`
   - TTL: 3600

2. **Add A Record** (for root domain)
   - Name: `@` (or leave blank)
   - Type: `A`
   - Value: `76.76.19.132`
   - TTL: 3600

3. **Add AAAA Record** (for IPv6)
   - Name: `@` (or leave blank)
   - Type: `AAAA`
   - Value: `2610:28:3090:3001:0:0:0:0`
   - TTL: 3600

**Repeat for each domain**:
- cardsparky.com
- serielkillers.com
- denick.com
- (and any new domains)

---

### Step 2: Update DNS for Backend (DigitalOcean)

**For API subdomains**, add these records:

**For api.pitchpassport.com**:

1. **Add CNAME Record**
   - Name: `api`
   - Type: `CNAME`
   - Value: `<your-digitalocean-app-domain>`
   - TTL: 3600

**Note**: DigitalOcean will give you a domain like `your-app-abc123.ondigitalocean.app`

---

### Step 3: Verify DNS Changes

**Wait 24-48 hours** for DNS to propagate, then:

1. **Check Vercel**
   - Go to Vercel dashboard
   - Your domain should show "Valid Configuration"

2. **Check DigitalOcean**
   - Go to DigitalOcean dashboard
   - Your API domain should be active

3. **Test in browser**
   - Visit: https://pitchpassport.com
   - Should load your Vercel frontend
   - Visit: https://api.pitchpassport.com
   - Should show API response

---

## What NOT to Do

❌ **Don't delete your domain from GoDaddy**
- You can keep it there forever
- No need to transfer it

❌ **Don't change domain registrar**
- GoDaddy is fine
- No need to move to Vercel or DigitalOcean

❌ **Don't use GoDaddy hosting**
- Just use GoDaddy for domain registration
- Use Vercel for frontend
- Use DigitalOcean for backend

---

## What TO Do

✅ **Keep domain on GoDaddy**
- Domains are cheap ($10-15/year)
- Easy to manage
- Works with any hosting

✅ **Update DNS records**
- Point to Vercel (frontend)
- Point to DigitalOcean (backend)
- Takes 5 minutes per domain

✅ **Use Vercel for frontend**
- Deploy Next.js sites
- Automatic SSL
- Global CDN

✅ **Use DigitalOcean for backend**
- Deploy Express.js API
- Automatic SSL
- Auto-scaling

---

## DNS Records Summary

### For Each Domain

| Record Type | Name | Value | Purpose |
|------------|------|-------|---------|
| A | @ | 76.76.19.132 | Root domain → Vercel |
| AAAA | @ | 2610:28:3090:3001:0:0:0:0 | IPv6 → Vercel |
| CNAME | www | cname.vercel-dns.com | www subdomain → Vercel |
| CNAME | api | your-app.ondigitalocean.app | API subdomain → DigitalOcean |

---

## Cost Breakdown

### Domains (GoDaddy)
- **pitchpassport.com**: $10-15/year
- **cardsparky.com**: $10-15/year
- **serielkillers.com**: $10-15/year
- **denick.com**: $10-15/year
- **New domains (2-3)**: $10-15/year each
- **TOTAL**: $50-90/year

### Hosting (Vercel + DigitalOcean)
- **Vercel**: FREE
- **DigitalOcean**: $5-12/month
- **TOTAL**: $60-144/year

### Grand Total
- **Domains + Hosting**: $110-234/year
- **Per month**: ~$9-20/month

---

## Timeline

### Day 1: Update DNS
- Update DNS records for all domains
- Takes 30 minutes

### Day 2-3: DNS Propagation
- Wait for DNS to propagate
- Usually 24-48 hours

### Day 3: Verify
- Check that domains work
- Test all sites

### Day 4: Go Live
- All sites live on Vercel + DigitalOcean
- Domains still on GoDaddy

---

## Troubleshooting

### Domain Not Working?

1. **Check DNS Records**
   - Go to GoDaddy DNS settings
   - Verify A, AAAA, CNAME records are correct

2. **Wait for Propagation**
   - DNS changes take 24-48 hours
   - Check status: https://www.whatsmydns.net

3. **Check Vercel**
   - Go to Vercel dashboard
   - Verify domain is added
   - Check for SSL certificate

4. **Check DigitalOcean**
   - Go to DigitalOcean dashboard
   - Verify API domain is configured
   - Check for SSL certificate

---

---

## Question 2: Vercel Hobby or Pro for 4-6 Sites?

### Short Answer
✅ **Start with Hobby (FREE)** - it's perfect for 4-6 sites

---

## Vercel Plans Explained

### Hobby Plan (FREE) ✅ RECOMMENDED

**Cost**: $0/month

**Includes**:
- ✅ Unlimited projects/sites
- ✅ Unlimited deployments
- ✅ Global CDN
- ✅ Free SSL/HTTPS
- ✅ 100 GB bandwidth/month
- ✅ 100 hours serverless functions/month
- ✅ 6,000 build minutes/month
- ✅ Web Application Firewall
- ✅ DDoS Mitigation

**Limits**:
- 100 GB bandwidth/month
- 100 hours serverless functions/month
- 6,000 build minutes/month

**Perfect for**:
- Personal projects
- Small business sites
- Your 4-6 sites

---

### Pro Plan

**Cost**: $20/month (per user)

**Includes**:
- Everything in Hobby +
- ✅ $20 monthly usage credits
- ✅ Priority support
- ✅ Advanced analytics
- ✅ Team collaboration

**When to upgrade**:
- If you exceed Hobby limits
- If you need team features
- If you need priority support

---

### Enterprise Plan

**Cost**: Custom pricing

**When to use**:
- Large-scale applications
- High traffic sites
- Custom requirements

---

## Will Hobby Work for Your 4-6 Sites?

### Your Sites
1. **Pitch Passport** (Next.js)
2. **CardSparky** (Next.js)
3. **Serial Killers** (Next.js)
4. **Denick** (Next.js)
5. **New Site 1** (Next.js)
6. **New Site 2** (Next.js)

### Bandwidth Calculation

**Per site estimate**:
- Average traffic: 1,000 visitors/month
- Average page size: 2 MB
- Bandwidth per site: ~2 GB/month

**For 6 sites**:
- Total bandwidth: ~12 GB/month
- Hobby limit: 100 GB/month
- **Usage**: 12% of limit ✅

### Build Minutes Calculation

**Per site estimate**:
- Deployments per month: 10
- Build time per deployment: 5 minutes
- Build minutes per site: 50 minutes/month

**For 6 sites**:
- Total build minutes: ~300 minutes/month
- Hobby limit: 6,000 minutes/month
- **Usage**: 5% of limit ✅

### Serverless Functions

**Per site estimate**:
- Function calls per month: 1,000
- Average execution time: 1 second
- Function hours per site: ~0.3 hours/month

**For 6 sites**:
- Total function hours: ~2 hours/month
- Hobby limit: 100 hours/month
- **Usage**: 2% of limit ✅

---

## Verdict: Hobby is Perfect

| Metric | Your Usage | Hobby Limit | % Used |
|--------|-----------|------------|--------|
| Bandwidth | 12 GB/month | 100 GB/month | 12% ✅ |
| Build Minutes | 300/month | 6,000/month | 5% ✅ |
| Function Hours | 2/month | 100/month | 2% ✅ |
| Projects | 6 | Unlimited | ✅ |
| Deployments | Unlimited | Unlimited | ✅ |
| SSL/HTTPS | ✅ | ✅ | ✅ |
| CDN | ✅ | ✅ | ✅ |

**Conclusion**: Hobby plan is **MORE than enough** for your 6 sites

---

## When to Upgrade to Pro

You should upgrade to Pro ($20/month) if:

1. **Bandwidth exceeds 100 GB/month**
   - More than 50,000 visitors/month
   - Large file downloads

2. **Build minutes exceed 6,000/month**
   - More than 100 deployments/month
   - Very large projects

3. **Function hours exceed 100/month**
   - Heavy API usage
   - Complex serverless functions

4. **You need team features**
   - Multiple team members
   - Collaboration features

5. **You need priority support**
   - Business-critical sites
   - Need fast support response

---

## Cost Comparison: Hobby vs Pro

### Hobby Plan (FREE)
```
Vercel:        $0/month
DigitalOcean:  $5-12/month
Domains:       ~$5/month
─────────────────────────
TOTAL:         $10-17/month
ANNUAL:        $120-204/year
```

### Pro Plan ($20/month)
```
Vercel:        $20/month
DigitalOcean:  $5-12/month
Domains:       ~$5/month
─────────────────────────
TOTAL:         $30-37/month
ANNUAL:        $360-444/year
```

**Difference**: $240/year more for Pro

---

## Recommendation

### ✅ START WITH HOBBY (FREE)

**Why**:
1. ✅ Completely free
2. ✅ Perfect for 4-6 sites
3. ✅ Unlimited projects
4. ✅ Unlimited deployments
5. ✅ Global CDN
6. ✅ Free SSL/HTTPS
7. ✅ Easy to upgrade later

**Upgrade to Pro only if**:
- You exceed Hobby limits
- You need team features
- You need priority support

---

## How to Set Up Vercel with Multiple Sites

### Step 1: Create Vercel Account
1. Go to: https://vercel.com
2. Sign up with GitHub
3. Takes 5 minutes

### Step 2: Import First Project
1. Click "Add New" → "Project"
2. Select GitHub repository (Pitch Passport)
3. Configure environment variables
4. Click "Deploy"
5. Takes 30 minutes

### Step 3: Import Second Project
1. Click "Add New" → "Project"
2. Select GitHub repository (CardSparky)
3. Configure environment variables
4. Click "Deploy"
5. Takes 30 minutes

### Step 4: Repeat for All Projects
- Repeat steps 2-3 for each project
- All projects use same Hobby plan
- No additional cost

### Step 5: Add Custom Domains
1. For each project, go to "Settings" → "Domains"
2. Add your domain (e.g., pitchpassport.com)
3. Update DNS records on GoDaddy
4. Vercel will verify domain

---

## Summary

### Question 1: GoDaddy Domains
✅ **Keep domains on GoDaddy**
- Update DNS records to point to Vercel + DigitalOcean
- Takes 5 minutes per domain
- Works perfectly

### Question 2: Vercel Plan
✅ **Use Hobby Plan (FREE)**
- Perfect for 4-6 sites
- Unlimited projects
- Unlimited deployments
- Only 12% of bandwidth limit used
- Upgrade to Pro only if needed

---

## Next Steps

1. **Update DNS Records**
   - Go to GoDaddy
   - Update DNS for each domain
   - Takes 30 minutes

2. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Takes 5 minutes

3. **Import Projects to Vercel**
   - Import Pitch Passport
   - Import CardSparky
   - Import Serial Killers
   - Import Denick
   - Takes 2 hours

4. **Deploy to DigitalOcean**
   - Create DigitalOcean account
   - Deploy Express backend
   - Takes 2 hours

5. **Verify Everything Works**
   - Test all sites
   - Check API endpoints
   - Takes 1 hour

---

## Resources

### GoDaddy
- **DNS Management**: https://www.godaddy.com/help/manage-dns-680
- **Domain Settings**: https://www.godaddy.com/help/add-a-domain-4738

### Vercel
- **Pricing**: https://vercel.com/pricing
- **Docs**: https://vercel.com/docs
- **Add Domain**: https://vercel.com/docs/concepts/projects/domains

### DigitalOcean
- **App Platform**: https://www.digitalocean.com/products/app-platform
- **Pricing**: https://www.digitalocean.com/pricing/app-platform

---

**Ready to proceed?** Start with updating your DNS records on GoDaddy!

