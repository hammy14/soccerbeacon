# How to Push Denick and Pitch Passport to GitHub

**Date**: May 2, 2026

---

## Prerequisites

Make sure you have:
- Git installed on your computer
- GitHub account (hammy14)
- Terminal/Command Prompt access

---

## Step 1: Create Repository on GitHub

### For Denick

1. Go to: https://github.com/new
2. Fill in the form:
   - **Repository name**: `denick`
   - **Description**: `Denick - Project Management & Admin Dashboard`
   - **Visibility**: Public (or Private if you prefer)
   - **Initialize with**: Leave unchecked (we'll push existing code)
3. Click **Create repository**
4. Copy the repository URL (should be: `https://github.com/hammy14/denick.git`)

### For Pitch Passport

1. Go to: https://github.com/new
2. Fill in the form:
   - **Repository name**: `soccerbeacon` (or keep as `pitchpassport` for now)
   - **Description**: `SoccerBeacon - Pitch Passport Sports Management Platform`
   - **Visibility**: Public (or Private if you prefer)
   - **Initialize with**: Leave unchecked (we'll push existing code)
3. Click **Create repository**
4. Copy the repository URL (should be: `https://github.com/hammy14/soccerbeacon.git`)

---

## Step 2: Push Denick to GitHub

### Open Terminal/Command Prompt

```bash
# Navigate to denick folder
cd denick
```

### Initialize Git (if not already initialized)

```bash
# Check if git is already initialized
git status

# If you get "fatal: not a git repository", run:
git init
```

### Add Remote Repository

```bash
# Add the GitHub repository as "origin"
git remote add origin https://github.com/hammy14/denick.git

# Verify it was added
git remote -v
```

### Stage All Files

```bash
# Stage all files
git add .

# Verify files are staged
git status
```

### Create Initial Commit

```bash
# Create first commit
git commit -m "Initial commit: Denick project management dashboard"
```

### Push to GitHub

```bash
# Push to GitHub (main branch)
git branch -M main
git push -u origin main
```

**Wait for it to complete** - you may be asked to authenticate with GitHub.

### Verify on GitHub

1. Go to: https://github.com/hammy14/denick
2. You should see all your files uploaded
3. ✅ Denick is now on GitHub!

---

## Step 3: Push Pitch Passport to GitHub

### Open Terminal/Command Prompt

```bash
# Navigate to pitchpassport folder
cd pitchpassport
```

### Initialize Git (if not already initialized)

```bash
# Check if git is already initialized
git status

# If you get "fatal: not a git repository", run:
git init
```

### Add Remote Repository

```bash
# Add the GitHub repository as "origin"
git remote add origin https://github.com/hammy14/soccerbeacon.git

# Verify it was added
git remote -v
```

### Stage All Files

```bash
# Stage all files
git add .

# Verify files are staged
git status
```

### Create Initial Commit

```bash
# Create first commit
git commit -m "Initial commit: SoccerBeacon - Pitch Passport sports management platform"
```

### Push to GitHub

```bash
# Push to GitHub (main branch)
git branch -M main
git push -u origin main
```

**Wait for it to complete** - you may be asked to authenticate with GitHub.

### Verify on GitHub

1. Go to: https://github.com/hammy14/soccerbeacon
2. You should see all your files uploaded
3. ✅ Pitch Passport is now on GitHub!

---

## Step 4: Verify Both Repositories

### Check Denick
- Go to: https://github.com/hammy14/denick
- You should see all files
- Check that it shows "main" branch

### Check Pitch Passport
- Go to: https://github.com/hammy14/soccerbeacon
- You should see all files
- Check that it shows "main" branch

---

## Step 5: Update DigitalOcean

Now that both repositories are on GitHub:

1. Go to DigitalOcean: https://cloud.digitalocean.com
2. Click **Create** → **App**
3. You should now see:
   - ✅ cardsparky
   - ✅ denick (NEW!)
   - ✅ soccerbeacon (NEW!)
   - ✅ serielkillers
   - ✅ cardvaultindex (if you pushed it)

---

## Troubleshooting

### Error: "fatal: not a git repository"

**Solution**: Run `git init` first

```bash
git init
git remote add origin https://github.com/hammy14/denick.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

### Error: "remote origin already exists"

**Solution**: Remove the old remote and add the new one

```bash
git remote remove origin
git remote add origin https://github.com/hammy14/denick.git
git push -u origin main
```

### Error: "Authentication failed"

**Solution**: Use GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **Generate new token**
3. Select scopes: `repo`, `workflow`
4. Copy the token
5. When prompted for password, paste the token instead

### Error: "branch 'main' set up to track 'origin/main'"

**This is normal!** It means the push was successful.

---

## Quick Reference Commands

```bash
# Check git status
git status

# View remote repositories
git remote -v

# Stage all files
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

## Your GitHub Repositories

After completing these steps, you should have:

| Repository | URL | Status |
|------------|-----|--------|
| cardsparky | https://github.com/hammy14/cardsparky | ✅ Already on GitHub |
| denick | https://github.com/hammy14/denick | ⏳ Push now |
| soccerbeacon | https://github.com/hammy14/soccerbeacon | ⏳ Push now |
| serielkillers | https://github.com/hammy14/serielkillers | ✅ Already on GitHub |
| cardvaultindex | https://github.com/hammy14/cardvaultindex | ⏳ Push if not already there |

---

## Next Steps

1. ✅ Push Denick to GitHub
2. ✅ Push Pitch Passport to GitHub
3. ✅ Verify both on GitHub
4. ✅ Go back to DigitalOcean
5. ✅ Create apps for Denick and Soccerbeacon
6. ✅ Deploy to DigitalOcean

---

**Ready to push?** Follow the steps above and let me know when you're done! 🚀
