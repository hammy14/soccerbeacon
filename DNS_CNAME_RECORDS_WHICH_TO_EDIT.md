# DNS CNAME Records - Which Ones to Edit?

**Your Current CNAME Records**:
```
autodiscover → autodiscover.outlook.com (1 Hour)
cpanel → cardsparky.com (10800 seconds)
email → email.secureserver.net (1 Hour)
lyncdiscover → webdir.online.lync.com (1 Hour)
msoid → clientconfig.microsoftonline-p.net (1 Hour)
sip → sipdir.online.lync.com (1 Hour)
webdisk → cardsparky.com (10800 seconds)
webdisk.admin → cardsparky.com (10800 seconds)
whm → cardsparky.com (10800 seconds)
www → cardsparky.com (10800 seconds) ← EDIT THIS
www.admin → cardsparky.com (10800 seconds)
_domainconnect → domainconnect.gd.domaincontrol.com (1 Hour)
```

**Short Answer**: ✅ **YES, only change the www record**

---

## What Each CNAME Does

| Name | Points To | Purpose | Action |
|------|-----------|---------|--------|
| **www** | cardsparky.com | Website www subdomain | ✅ **EDIT THIS** |
| autodiscover | autodiscover.outlook.com | Outlook email | ❌ Leave alone |
| cpanel | cardsparky.com | GoDaddy cPanel | ❌ Leave alone |
| email | email.secureserver.net | GoDaddy email | ❌ Leave alone |
| lyncdiscover | webdir.online.lync.com | Skype/Teams | ❌ Leave alone |
| msoid | clientconfig.microsoftonline-p.net | Microsoft auth | ❌ Leave alone |
| sip | sipdir.online.lync.com | Skype/Teams | ❌ Leave alone |
| webdisk | cardsparky.com | GoDaddy webdisk | ❌ Leave alone |
| webdisk.admin | cardsparky.com | GoDaddy admin | ❌ Leave alone |
| whm | cardsparky.com | GoDaddy WHM | ❌ Leave alone |
| www.admin | cardsparky.com | GoDaddy admin | ❌ Leave alone |
| _domainconnect | domainconnect.gd.domaincontrol.com | Domain connect | ❌ Leave alone |

---

## What to Edit

### ✅ EDIT Only This One

**The www record**:
```
Name:  www
Value: cardsparky.com ← CHANGE THIS
TTL:   10800 ← CHANGE THIS TO 3600
```

**Change to**:
```
Name:  www
Value: cname.vercel-dns.com ← NEW VERCEL CNAME
TTL:   3600 ← NEW TTL
```

### ❌ DON'T Edit These

**Leave all others alone**:
```
autodiscover → autodiscover.outlook.com ← LEAVE
cpanel → cardsparky.com ← LEAVE
email → email.secureserver.net ← LEAVE
lyncdiscover → webdir.online.lync.com ← LEAVE
msoid → clientconfig.microsoftonline-p.net ← LEAVE
sip → sipdir.online.lync.com ← LEAVE
webdisk → cardsparky.com ← LEAVE
webdisk.admin → cardsparky.com ← LEAVE
whm → cardsparky.com ← LEAVE
www.admin → cardsparky.com ← LEAVE
_domainconnect → domainconnect.gd.domaincontrol.com ← LEAVE
```

---

## Why Only www?

### The www Record
- Points to your website's www subdomain
- www.cardsparky.com
- Currently points to GoDaddy hosting
- Needs to point to Vercel
- ✅ **EDIT THIS**

### All Other Records
- Point to GoDaddy services (email, admin, etc.)
- Used by GoDaddy for various services
- Don't interfere with your website
- ❌ **LEAVE THESE ALONE**

---

## What Each Record Is For

### Email Records (LEAVE ALONE)
```
autodiscover → Outlook email setup
email → GoDaddy email server
```

### Admin Records (LEAVE ALONE)
```
cpanel → GoDaddy cPanel
webdisk → GoDaddy webdisk
webdisk.admin → GoDaddy admin webdisk
whm → GoDaddy WHM (Web Host Manager)
www.admin → GoDaddy admin panel
```

### Communication Records (LEAVE ALONE)
```
lyncdiscover → Skype/Teams
msoid → Microsoft authentication
sip → Skype/Teams
```

### Domain Management (LEAVE ALONE)
```
_domainconnect → Domain Connect service
```

### Website Records (EDIT THIS ONE)
```
www → Website www subdomain ← EDIT THIS
```

---

## Step-by-Step: Edit www Record

### Step 1: Find the www Record
In GoDaddy DNS Manager, look for:
```
Name:  www
Value: cardsparky.com
TTL:   10800
```

### Step 2: Click Edit
- Click the pencil icon
- Or click on the record

### Step 3: Change the Value
**From**:
```
Value: cardsparky.com
```

**To**:
```
Value: cname.vercel-dns.com
```

### Step 4: Change the TTL
**From**:
```
TTL: 10800 seconds (3 hours)
```

**To**:
```
TTL: 3600 seconds (1 hour)
```

### Step 5: Save
- Click "Save"
- Done!

---

## After You Edit

### Your CNAME Records Will Look Like

```
www → cname.vercel-dns.com (3600 seconds) ← CHANGED
autodiscover → autodiscover.outlook.com (1 Hour) ← UNCHANGED
cpanel → cardsparky.com (10800 seconds) ← UNCHANGED
email → email.secureserver.net (1 Hour) ← UNCHANGED
lyncdiscover → webdir.online.lync.com (1 Hour) ← UNCHANGED
msoid → clientconfig.microsoftonline-p.net (1 Hour) ← UNCHANGED
sip → sipdir.online.lync.com (1 Hour) ← UNCHANGED
webdisk → cardsparky.com (10800 seconds) ← UNCHANGED
webdisk.admin → cardsparky.com (10800 seconds) ← UNCHANGED
whm → cardsparky.com (10800 seconds) ← UNCHANGED
www.admin → cardsparky.com (10800 seconds) ← UNCHANGED
_domainconnect → domainconnect.gd.domaincontrol.com (1 Hour) ← UNCHANGED
```

---

## What Happens After

### Website Works ✅
```
www.cardsparky.com
    ↓
www CNAME points to cname.vercel-dns.com (Vercel)
    ↓
Vercel serves website
    ↓
Website loads ✅
```

### Email Still Works ✅
```
Outlook email setup
    ↓
autodiscover CNAME points to autodiscover.outlook.com
    ↓
Outlook email works ✅
```

### Admin Panel Still Works ✅
```
admin.cardsparky.com
    ↓
cpanel CNAME points to cardsparky.com (GoDaddy)
    ↓
GoDaddy admin panel works ✅
```

### Skype/Teams Still Works ✅
```
Skype/Teams setup
    ↓
lyncdiscover CNAME points to webdir.online.lync.com
    ↓
Skype/Teams works ✅
```

---

## Complete DNS Setup After All Changes

### A Records
| Name | Type | Value | TTL | Purpose |
|------|------|-------|-----|---------|
| @ | A | 76.76.19.132 | 3600 | Root domain (Vercel) |
| a | A | 72.167.125.133 | 10800 | GoDaddy service |
| admin | A | 72.167.125.133 | 10800 | GoDaddy service |
| mail | A | 72.167.125.133 | 10800 | GoDaddy email |

### CNAME Records
| Name | Type | Value | TTL | Purpose |
|------|------|-------|-----|---------|
| www | CNAME | cname.vercel-dns.com | 3600 | Website www (Vercel) |
| api | CNAME | your-app-abc123.ondigitalocean.app | 3600 | API (DigitalOcean) |
| autodiscover | CNAME | autodiscover.outlook.com | 3600 | Outlook email |
| cpanel | CNAME | cardsparky.com | 10800 | GoDaddy cPanel |
| email | CNAME | email.secureserver.net | 3600 | GoDaddy email |
| lyncdiscover | CNAME | webdir.online.lync.com | 3600 | Skype/Teams |
| msoid | CNAME | clientconfig.microsoftonline-p.net | 3600 | Microsoft auth |
| sip | CNAME | sipdir.online.lync.com | 3600 | Skype/Teams |
| webdisk | CNAME | cardsparky.com | 10800 | GoDaddy webdisk |
| webdisk.admin | CNAME | cardsparky.com | 10800 | GoDaddy admin |
| whm | CNAME | cardsparky.com | 10800 | GoDaddy WHM |
| www.admin | CNAME | cardsparky.com | 10800 | GoDaddy admin |
| _domainconnect | CNAME | domainconnect.gd.domaincontrol.com | 3600 | Domain connect |

### AAAA Records
| Name | Type | Value | TTL | Purpose |
|------|------|-------|-----|---------|
| @ | AAAA | 2610:28:3090:3001:0:0:0:0 | 3600 | Root domain IPv6 (Vercel) |

### MX Records
| Name | Type | Value | TTL | Purpose |
|------|------|-------|-----|---------|
| @ | MX | [GoDaddy MX] | 3600 | Email routing |

---

## Important Notes

### ⚠️ Important

1. **Only edit the www CNAME record**
   - Don't edit any other CNAME records
   - They're for GoDaddy services
   - Leave them alone

2. **Keep all other records**
   - They don't interfere with your website
   - They're needed for GoDaddy services
   - Email, admin, Skype/Teams depend on them

3. **Add new records**
   - Add AAAA record for IPv6
   - Add CNAME for api (DigitalOcean)
   - Don't delete old records

4. **Wait for propagation**
   - DNS takes 1 hour
   - Check: https://www.whatsmydns.net
   - Be patient

---

## Troubleshooting

### Website Not Working?

1. **Check www CNAME**
   - Value should be: cname.vercel-dns.com
   - TTL should be: 3600
   - If wrong, edit it

2. **Check @ A record**
   - Value should be: 76.76.19.132
   - TTL should be: 3600
   - If wrong, edit it

3. **Check Vercel**
   - Go to Vercel dashboard
   - Verify domain is added
   - Check for SSL certificate

4. **Wait for propagation**
   - DNS takes 1 hour
   - Check: https://www.whatsmydns.net

### Email Not Working?

1. **Check email CNAME**
   - Value should be: email.secureserver.net
   - TTL should be: 3600
   - If wrong, edit it

2. **Check autodiscover CNAME**
   - Value should be: autodiscover.outlook.com
   - TTL should be: 3600
   - If wrong, edit it

3. **Check MX records**
   - Should still exist
   - Should point to GoDaddy
   - If missing, add them back

### Admin Panel Not Working?

1. **Check cpanel CNAME**
   - Value should be: cardsparky.com
   - TTL should be: 10800
   - If wrong, edit it

2. **Check GoDaddy**
   - Admin panel should be accessible
   - Check GoDaddy dashboard

---

## Summary

| Record | Action | New Value | New TTL |
|--------|--------|-----------|---------|
| www | ✅ EDIT | cname.vercel-dns.com | 3600 |
| api | ✅ ADD | your-app-abc123.ondigitalocean.app | 3600 |
| All others | ❌ LEAVE | (unchanged) | (unchanged) |

---

## Next Steps

1. **Edit www CNAME**
   - Value: cname.vercel-dns.com
   - TTL: 3600
   - Save

2. **Add api CNAME**
   - Name: api
   - Value: your-app-abc123.ondigitalocean.app
   - TTL: 3600

3. **Add AAAA record**
   - Name: @
   - Value: 2610:28:3090:3001:0:0:0:0
   - TTL: 3600

4. **Wait 1 hour**
   - DNS propagation
   - Check: https://www.whatsmydns.net

5. **Verify**
   - Visit www.cardsparky.com
   - Check email works
   - Check admin panel works

---

**Ready to edit?** Edit only the www CNAME record! 🚀

