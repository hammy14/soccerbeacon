# Email Newsletter Setup Guide

## Overview

This guide covers setting up an email newsletter for Pitch Passport using Mailchimp (free tier) or Substack (recommended for simplicity).

---

## Option 1: Mailchimp (Recommended for Integration)

### Step 1: Create Mailchimp Account
1. Go to https://mailchimp.com
2. Click "Sign Up"
3. Enter email and create password
4. Verify email address
5. Complete account setup

### Step 2: Create Audience
1. Go to "Audience" in left menu
2. Click "Create Audience"
3. Fill in audience details:
   - **Audience name**: Pitch Passport Subscribers
   - **Default from email**: noreply@pitchpassport.com
   - **Default from name**: Pitch Passport
   - **Audience permission**: Explicit Opt-In
4. Click "Save"

### Step 3: Get API Key
1. Go to Account Settings (top right)
2. Click "Extras" → "API Keys"
3. Click "Create A Key"
4. Copy the API key
5. Add to backend `.env`:
   ```
   MAILCHIMP_API_KEY=your_api_key_here
   MAILCHIMP_AUDIENCE_ID=your_audience_id_here
   ```

### Step 4: Create Signup Form
1. Go to "Audience" → "Signup Forms"
2. Click "Embedded Forms"
3. Customize form design
4. Copy embed code
5. Add to frontend newsletter section

### Step 5: Create First Campaign
1. Go to "Campaigns"
2. Click "Create Campaign"
3. Select "Email"
4. Choose "Regular"
5. Select your audience
6. Fill in campaign details:
   - **Subject**: Pitch Passport Weekly - May 1, 2026
   - **Preview text**: Your weekly football roundup
7. Design email with content
8. Click "Send"

---

## Option 2: Substack (Recommended for Simplicity)

### Step 1: Create Substack Account
1. Go to https://substack.com
2. Click "Start writing"
3. Enter email and create password
4. Verify email
5. Choose publication name: "Pitch Passport"

### Step 2: Customize Publication
1. Go to Settings
2. Add publication description
3. Upload logo/image
4. Set publication URL
5. Configure email settings

### Step 3: Write First Newsletter
1. Click "New post"
2. Write newsletter content
3. Add title: "Pitch Passport Weekly - May 1, 2026"
4. Click "Publish"
5. Choose "Send as email"
6. Click "Send"

### Step 4: Share Signup Link
- Substack provides a signup link
- Add to website footer
- Share on social media
- Embed in articles

### Step 5: Set Publishing Schedule
1. Go to Settings
2. Set publication frequency
3. Configure email delivery time
4. Enable/disable comments

---

## Newsletter Content Strategy

### Weekly Newsletter Structure

**Subject Line** (50 characters max)
- "Pitch Passport Weekly - May 1, 2026"
- "Your Football Roundup: Premier League Drama"
- "Champions League Highlights & Analysis"

**Preview Text** (100 characters max)
- "Your weekly football roundup with top stories, analysis, and insights"
- "This week's biggest football moments and what they mean"

**Email Content**

1. **Header** (50 words)
   - Welcome message
   - Week overview
   - Call to action

2. **Top Stories** (3-5 articles)
   - Article title
   - 50-word summary
   - Link to full article
   - Featured image

3. **League Roundup** (by league)
   - Premier League highlights
   - La Liga updates
   - Serie A news
   - MLS coverage
   - Champions League updates

4. **Featured Analysis** (1 deep-dive article)
   - Tactical analysis
   - Player spotlight
   - Team preview
   - 200-word summary

5. **Upcoming Matches**
   - Next week's big matches
   - Predictions
   - Where to watch

6. **Social Media**
   - Follow us on Twitter
   - Follow us on Instagram
   - Join our Discord

7. **Footer**
   - Unsubscribe link
   - Contact info
   - Social links
   - Website link

---

## Newsletter Automation

### Mailchimp Automation

1. **Welcome Series**
   - Email 1: Welcome + Best Articles
   - Email 2: How to Use Pitch Passport
   - Email 3: Exclusive Content Preview

2. **Weekly Digest**
   - Automatic send every Monday at 9 AM
   - Includes top articles from past week
   - Personalized based on interests

3. **Abandoned Cart** (if selling)
   - Reminder email after 24 hours
   - Discount code
   - Product details

### Substack Automation

1. **Publication Schedule**
   - Set regular publishing day/time
   - Automatic email delivery
   - Archive management

2. **Subscriber Engagement**
   - Track open rates
   - Monitor click-through rates
   - Analyze subscriber growth

---

## Integration with Website

### Newsletter Signup Form

```html
<!-- Mailchimp Embed -->
<div id="mc_embed_signup">
  <form action="https://pitchpassport.us..." method="post">
    <input type="email" placeholder="Enter your email" required>
    <button type="submit">Subscribe</button>
  </form>
</div>

<!-- Substack Embed -->
<iframe src="https://pitchpassport.substack.com/embed" width="100%" height="320" style="border:1px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>
```

### Placement on Website

1. **Homepage**
   - Newsletter section above footer
   - Call-to-action button
   - Value proposition

2. **Article Pages**
   - Sidebar signup form
   - End-of-article signup
   - Related articles section

3. **Footer**
   - Email signup field
   - Subscribe button
   - Privacy policy link

---

## Email Templates

### Welcome Email

```
Subject: Welcome to Pitch Passport! 🎉

Hi [Subscriber Name],

Welcome to Pitch Passport - your source for global football coverage, analysis, and insights!

Every week, we deliver:
✓ Top football stories from around the world
✓ In-depth tactical analysis
✓ League standings and match previews
✓ Player spotlights and interviews
✓ Exclusive content and insights

This week's highlights:
- Manchester United's 2024-25 Season Preview
- Liverpool's Midfield Mastery: Tactical Analysis
- Champions League: Europe's Elite Battle

[Read More]

Looking forward to sharing football with you!

Best regards,
Pitch Passport Team
```

### Weekly Newsletter

```
Subject: Pitch Passport Weekly - May 1, 2026

Hi [Subscriber Name],

This week in football...

TOP STORIES
1. Manchester United's Path to Glory
2. Liverpool's Midfield Mastery
3. Real Madrid's Champions League Dominance

LEAGUE ROUNDUP
Premier League: 5 key stories
La Liga: 3 key stories
Serie A: 3 key stories
MLS: 2 key stories
Champions League: 2 key stories

FEATURED ANALYSIS
Tactical Evolution in Modern Football

UPCOMING MATCHES
Next week's biggest matches and predictions

[Read Full Newsletter]

Follow us:
Twitter | Instagram | Facebook | Discord

Pitch Passport Team
```

---

## Best Practices

### Content
- ✅ Keep emails concise (under 2000 words)
- ✅ Use clear subject lines
- ✅ Include images and formatting
- ✅ Add clear call-to-action buttons
- ✅ Personalize with subscriber name

### Frequency
- ✅ Weekly newsletter (consistent schedule)
- ✅ Send on same day/time each week
- ✅ Avoid sending too frequently
- ✅ Allow subscribers to choose frequency

### Engagement
- ✅ Monitor open rates (target: 25%+)
- ✅ Track click-through rates (target: 5%+)
- ✅ Segment subscribers by interests
- ✅ A/B test subject lines
- ✅ Respond to subscriber feedback

### Compliance
- ✅ Include unsubscribe link
- ✅ Include physical address
- ✅ Honor unsubscribe requests
- ✅ Comply with CAN-SPAM Act
- ✅ Comply with GDPR (if EU subscribers)

---

## Metrics to Track

### Mailchimp Metrics
- **Subscribers**: Total list size
- **Open Rate**: % who open email
- **Click Rate**: % who click links
- **Bounce Rate**: % of failed deliveries
- **Unsubscribe Rate**: % who unsubscribe

### Substack Metrics
- **Subscribers**: Total list size
- **Open Rate**: % who open email
- **Click Rate**: % who click links
- **Paid Subscribers**: Revenue (if applicable)
- **Growth Rate**: New subscribers per week

### Goals
- **Month 1**: 100 subscribers
- **Month 3**: 500 subscribers
- **Month 6**: 2,000 subscribers
- **Month 12**: 10,000 subscribers

---

## Monetization Options

### Mailchimp
- Free tier: Up to 500 contacts
- Paid tier: $20+/month for more contacts
- No built-in monetization

### Substack
- Free: Unlimited subscribers
- Paid: Optional paid tier (Substack takes 10%)
- Revenue sharing: You keep 90% of paid subscriptions

### Other Options
- **Patreon**: Recurring donations
- **Ko-fi**: One-time tips
- **Sponsorships**: Brands pay to be featured
- **Affiliate Links**: Earn commission on products

---

## Launch Checklist

- [ ] Create email service account (Mailchimp or Substack)
- [ ] Set up audience/publication
- [ ] Create welcome email
- [ ] Write first newsletter
- [ ] Add signup form to website
- [ ] Add signup form to footer
- [ ] Add signup form to articles
- [ ] Create email templates
- [ ] Set publishing schedule
- [ ] Test email delivery
- [ ] Send first newsletter
- [ ] Monitor metrics
- [ ] Optimize based on data

---

## Resources

### Email Service Providers
- [Mailchimp](https://mailchimp.com) - Free tier available
- [Substack](https://substack.com) - Free with optional paid tier
- [ConvertKit](https://convertkit.com) - Creator-focused
- [Brevo](https://www.brevo.com) - Free tier available

### Email Design Tools
- [Stripo](https://stripo.email) - Email template builder
- [Dyspatch](https://dyspatch.io) - Email design platform
- [Mailmodo](https://mailmodo.com) - Interactive emails

### Analytics Tools
- [Google Analytics](https://analytics.google.com) - Track clicks
- [Litmus](https://www.litmus.com) - Email testing
- [Email on Acid](https://www.emailonacid.com) - Email testing

---

## Summary

**Newsletter Setup Complete!**

You now have:
- ✅ Email service provider configured
- ✅ Audience/subscribers list created
- ✅ Welcome email ready
- ✅ First newsletter written
- ✅ Signup forms on website
- ✅ Publishing schedule set

**Next Steps:**
1. Send first newsletter
2. Monitor metrics
3. Optimize based on data
4. Grow subscriber list
5. Monetize (optional)

Let's build! 🚀
