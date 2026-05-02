# DNS TTL Guide - What to Put in GoDaddy

**Simple Answer**: Use **3600** for all DNS records

---

## What is TTL?

**TTL** = "Time To Live"

It tells DNS servers how long to remember (cache) your DNS record before checking again.

### Simple Explanation

Think of it like a phone number:
- **High TTL (3600)**: "Remember this number for 1 hour, then check again"
- **Low TTL (300)**: "Remember this number for 5 minutes, then check again"

---

## TTL Values Explained

| TTL Value | Time | When to Use |
|-----------|------|------------|
| **300** | 5 minutes | Testing/troubleshooting (changes take effect quickly) |
| **900** | 15 minutes | Testing (faster than 3600) |
| **1800** | 30 minutes | Balanced |
| **3600** | 1 hour | ✅ **RECOMMENDED** (standard) |
| **7200** | 2 hours | Stable setup |
| **86400** | 24 hours | Very stable (rarely changes) |

---

## What to Use for Your Setup

### ✅ Use 3600 for All Records

**Why 3600?**
- ✅ Standard value
- ✅ Good balance between caching and updates
- ✅ Works perfectly for Vercel + DigitalOcean
- ✅ Most common value

---

## DNS Records to Add (with TTL)

### For Each Domain (e.g., pitchpassport.com)

#### Record 1: A Record (Root Domain)
```
Type:  A
Name:  @ (or leave blank)
Value: 76.76.19.132
TTL:   3600 ← USE THIS
```

#### Record 2: AAAA Record (IPv6)
```
Type:  AAAA
Name:  @ (or leave blank)
Value: 2610:28:3090:3001:0:0:0:0
TTL:   3600 ← USE THIS
```

#### Record 3: CNAME Record (www subdomain)
```
Type:  CNAME
Name:  www
Value: cname.vercel-dns.com
TTL:   3600 ← USE THIS
```

#### Record 4: CNAME Record (API subdomain)
```
Type:  CNAME
Name:  api
Value: your-app.ondigitalocean.app
TTL:   3600 ← USE THIS
```

---

## Step-by-Step: Adding DNS Records on GoDaddy

### Step 1: Go to GoDaddy DNS Manager
1. Go to: https://www.godaddy.com
2. Log in
3. Click "My Products"
4. Find your domain
5. Click "Manage DNS"

### Step 2: Add First Record (A Record)
1. Click "Add" or "Add Record"
2. Select Type: **A**
3. Name: **@** (or leave blank)
4. Value: **76.76.19.132**
5. TTL: **3600** ← HERE
6. Click "Save"

### Step 3: Add Second Record (AAAA Record)
1. Click "Add" or "Add Record"
2. Select Type: **AAAA**
3. Name: **@** (or leave blank)
4. Value: **2610:28:3090:3001:0:0:0:0**
5. TTL: **3600** ← HERE
6. Click "Save"

### Step 4: Add Third Record (CNAME for www)
1. Click "Add" or "Add Record"
2. Select Type: **CNAME**
3. Name: **www**
4. Value: **cname.vercel-dns.com**
5. TTL: **3600** ← HERE
6. Click "Save"

### Step 5: Add Fourth Record (CNAME for api)
1. Click "Add" or "Add Record"
2. Select Type: **CNAME**
3. Name: **api**
4. Value: **your-app.ondigitalocean.app**
5. TTL: **3600** ← HERE
6. Click "Save"

### Step 6: Repeat for Each Domain
- Repeat steps 1-5 for:
  - cardsparky.com
  - serielkillers.com
  - denick.com
  - Any new domains

---

## What Each TTL Value Means

### 300 (5 minutes)
- **Use when**: Testing/troubleshooting
- **Pros**: Changes take effect quickly
- **Cons**: More DNS queries, slightly slower
- **Example**: "I'm testing a new DNS record"

### 900 (15 minutes)
- **Use when**: Testing (faster than 3600)
- **Pros**: Good balance for testing
- **Cons**: More DNS queries than 3600
- **Example**: "I'm making frequent DNS changes"

### 1800 (30 minutes)
- **Use when**: Balanced setup
- **Pros**: Good middle ground
- **Cons**: Takes 30 minutes for changes to propagate
- **Example**: "I make occasional DNS changes"

### 3600 (1 hour) ✅ RECOMMENDED
- **Use when**: Normal setup
- **Pros**: Standard value, good caching, fast enough
- **Cons**: Takes up to 1 hour for changes to propagate
- **Example**: "I'm setting up production DNS"

### 7200 (2 hours)
- **Use when**: Very stable setup
- **Pros**: Excellent caching, fewer DNS queries
- **Cons**: Takes 2 hours for changes to propagate
- **Example**: "My DNS rarely changes"

### 86400 (24 hours)
- **Use when**: Never changes
- **Pros**: Maximum caching, minimal DNS queries
- **Cons**: Takes 24 hours for changes to propagate
- **Example**: "This DNS record is permanent"

---

## Common TTL Scenarios

### Scenario 1: First Time Setup (YOU)
- **TTL**: 3600
- **Why**: Standard value, good balance
- **Time to propagate**: Up to 1 hour

### Scenario 2: Testing DNS Changes
- **TTL**: 300
- **Why**: Changes take effect quickly
- **Time to propagate**: 5 minutes

### Scenario 3: Production Setup (After Testing)
- **TTL**: 3600
- **Why**: Standard value, good caching
- **Time to propagate**: Up to 1 hour

### Scenario 4: Very Stable Setup
- **TTL**: 86400
- **Why**: Maximum caching
- **Time to propagate**: 24 hours

---

## TTL and DNS Propagation

### How DNS Propagation Works

```
You update DNS record with TTL 3600
    ↓
GoDaddy updates immediately
    ↓
Other DNS servers cache the record
    ↓
After 3600 seconds (1 hour), they check again
    ↓
Your domain works everywhere
```

### Timeline

| Time | What Happens |
|------|-------------|
| 0 min | You update DNS record |
| 0-5 min | GoDaddy updates |
| 5-30 min | Most DNS servers update |
| 30-60 min | All DNS servers update |
| 60+ min | Everyone sees the new record |

---

## Checking DNS Propagation

### Check if DNS is Working

**Website**: https://www.whatsmydns.net

1. Go to: https://www.whatsmydns.net
2. Enter your domain: **pitchpassport.com**
3. Select record type: **A**
4. Click "Search"
5. See which DNS servers have updated

### What to Look For

- ✅ **Green checkmarks**: DNS updated
- ⏳ **Yellow/orange**: Still propagating
- ❌ **Red X**: Not updated yet

---

## Quick Reference Card

### For Your Setup

```
RECORD 1 (A Record)
Type:  A
Name:  @
Value: 76.76.19.132
TTL:   3600 ← USE THIS

RECORD 2 (AAAA Record)
Type:  AAAA
Name:  @
Value: 2610:28:3090:3001:0:0:0:0
TTL:   3600 ← USE THIS

RECORD 3 (CNAME for www)
Type:  CNAME
Name:  www
Value: cname.vercel-dns.com
TTL:   3600 ← USE THIS

RECORD 4 (CNAME for api)
Type:  CNAME
Name:  api
Value: your-app.ondigitalocean.app
TTL:   3600 ← USE THIS
```

---

## Troubleshooting

### Domain Not Working After 1 Hour?

1. **Check TTL**
   - Make sure you set TTL to 3600
   - If you set it to 86400, wait 24 hours

2. **Check DNS Records**
   - Go to: https://www.whatsmydns.net
   - Verify all records are correct

3. **Clear Browser Cache**
   - Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or use incognito/private window

4. **Wait Longer**
   - DNS propagation can take up to 48 hours
   - Most of the time it's 1 hour
   - Be patient

5. **Check Vercel**
   - Go to Vercel dashboard
   - Verify domain is added
   - Check for SSL certificate

6. **Check DigitalOcean**
   - Go to DigitalOcean dashboard
   - Verify API domain is configured
   - Check for SSL certificate

---

## Summary

### What to Put for TTL
✅ **Use 3600 for all DNS records**

### Why 3600?
- ✅ Standard value
- ✅ Good balance
- ✅ Works perfectly
- ✅ Most common

### Timeline
- **0 min**: You update DNS
- **5-30 min**: Most servers update
- **30-60 min**: All servers update
- **60+ min**: Domain works everywhere

### Next Steps
1. Go to GoDaddy DNS Manager
2. Add 4 DNS records (A, AAAA, CNAME, CNAME)
3. Set TTL to **3600** for each
4. Wait 1 hour for propagation
5. Verify domain works

---

**Ready to add DNS records?** Use TTL: **3600** for all records! 🚀

