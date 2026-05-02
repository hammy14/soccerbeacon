# Markdown Storage - Quick Reference Card

## 🎯 The Solution

**Centralized Documentation Repository** at `/Users/endimac/docs/` with site-specific subdirectories and integration with Denick Project Tracker.

---

## 📁 Directory Structure

```
/Users/endimac/docs/
├── cardsparky/          → CardSparky documentation
├── pitch-passport/      → Pitch Passport documentation
├── serial-killers/      → Serial Killers documentation
├── denick/              → Denick admin portal documentation
└── shared/              → Shared documentation (all projects)
```

---

## 🚀 Quick Start (5 Commands)

```bash
# 1. Create directory structure
mkdir -p /Users/endimac/docs/{cardsparky,pitch-passport,serial-killers,denick,shared}

# 2. Create subdirectories for Pitch Passport
mkdir -p /Users/endimac/docs/pitch-passport/{setup,architecture,guides,phases,testing}

# 3. Migrate Pitch Passport docs
cp /Users/endimac/pitchpassport/docs/*.md /Users/endimac/docs/pitch-passport/guides/
cp /Users/endimac/pitchpassport/PHASE_*.md /Users/endimac/docs/pitch-passport/phases/

# 4. Create symlink for easy access
ln -s /Users/endimac/docs/pitch-passport /Users/endimac/pitchpassport/docs-central

# 5. Initialize git
cd /Users/endimac/docs && git init && git add . && git commit -m "Initial docs"
```

---

## 📋 File Organization

### Pitch Passport Example
```
pitch-passport/
├── README.md                          # Overview
├── setup/
│   ├── installation.md
│   ├── database-setup.md
│   └── environment-config.md
├── architecture/
│   ├── backend-api.md
│   ├── frontend-structure.md
│   ├── database-schema.md
│   └── authentication.md
├── guides/
│   ├── content-strategy.md
│   ├── article-management.md
│   ├── newsletter-setup.md
│   └── deployment.md
├── phases/
│   ├── phase-1-infrastructure.md
│   ├── phase-2-api.md
│   ├── phase-3-frontend.md
│   ├── phase-4-admin-portal.md
│   ├── phase-5-seo-performance.md
│   └── phase-6-launch.md
└── testing/
    ├── testing-checklist.md
    ├── qa-procedures.md
    └── performance-benchmarks.md
```

---

## 🏷️ Naming Conventions

| Type | Format | Example |
|------|--------|---------|
| Files | kebab-case | `phase-1-setup.md` |
| Directories | lowercase | `setup/`, `guides/` |
| Collections | plural | `features/`, `guides/` |
| Specific items | singular | `architecture/`, `testing/` |

---

## 📝 Markdown Frontmatter Template

```yaml
---
title: "Your Document Title"
project: "pitch-passport"
category: "phases"
status: "complete"
last_updated: "2026-05-01"
related_tasks: [1, 2, 3]
tags: ["tag1", "tag2"]
---

# Your Document Title

Content here...
```

---

## 🔗 Integration with Project Tracker

### New API Endpoints
```
GET  /api/pt/projects/:id/docs        # Get project docs
GET  /api/pt/tasks/:id/docs           # Get task docs
POST /api/pt/tasks                    # Create task with docs
PUT  /api/pt/tasks/:id                # Link docs to task
```

### Admin Portal Features
- 📚 Documentation tab in project details
- 📖 Related docs section in task details
- 👁️ Markdown preview in portal
- 🔗 Drag-and-drop doc linking
- ✅ Documentation status tracking

---

## ✅ Implementation Checklist

### Phase 1: Setup (Week 1)
- [ ] Create `/Users/endimac/docs/` directory
- [ ] Create subdirectories for all 4 sites
- [ ] Create README.md files
- [ ] Create shared documentation directory

### Phase 2: Migration (Week 2-3)
- [ ] Migrate Pitch Passport docs
- [ ] Migrate CardSparky docs
- [ ] Migrate Serial Killers docs
- [ ] Organize Denick docs

### Phase 3: Integration (Week 4)
- [ ] Update Denick API
- [ ] Add UI components to admin portal
- [ ] Create documentation linking interface
- [ ] Test cross-project linking

### Phase 4: Maintenance (Ongoing)
- [ ] Establish documentation standards
- [ ] Create update workflow
- [ ] Set up automated validation
- [ ] Regular documentation audits

---

## 🛠️ Useful Commands

### Create Directory Structure
```bash
mkdir -p /Users/endimac/docs/{cardsparky,pitch-passport,serial-killers,denick,shared}
```

### Create Symlinks
```bash
ln -s /Users/endimac/docs/pitch-passport /Users/endimac/pitchpassport/docs-central
ln -s /Users/endimac/docs/cardsparky /Users/endimac/cardsparky/docs-central
ln -s /Users/endimac/docs/serial-killers /Users/endimac/serielkillers/docs-central
ln -s /Users/endimac/docs/denick /Users/endimac/denick/docs-central
```

### Migrate Files
```bash
# Pitch Passport
cp /Users/endimac/pitchpassport/docs/*.md /Users/endimac/docs/pitch-passport/guides/
cp /Users/endimac/pitchpassport/PHASE_*.md /Users/endimac/docs/pitch-passport/phases/

# CardSparky
cp /Users/endimac/cardsparky/*.md /Users/endimac/docs/cardsparky/
```

### Validate Markdown
```bash
npm install -g markdownlint-cli
markdownlint /Users/endimac/docs/**/*.md
```

### Initialize Git
```bash
cd /Users/endimac/docs
git init
git add .
git commit -m "Initial documentation structure"
```

---

## 📊 Benefits Summary

| Benefit | Impact |
|---------|--------|
| Single source of truth | Easier to maintain |
| Cross-project linking | Better documentation flow |
| Consistent organization | Faster to find docs |
| Scalable structure | Ready for future projects |
| Project Tracker integration | Docs linked to tasks |
| Automated validation | Quality assurance |
| Version control | Track documentation changes |

---

## 🎓 Documentation Standards

Each project should have:
1. ✅ README.md - Overview
2. ✅ Setup Guide - Installation
3. ✅ Architecture Docs - System design
4. ✅ Feature Guides - How-to guides
5. ✅ Phase Docs - Development phases
6. ✅ Testing Docs - QA procedures
7. ✅ Deployment Guide - Production
8. ✅ API Docs - API reference (if applicable)

---

## 🔍 Finding Documentation

### From Project Root
```bash
# Access via symlink
cat /Users/endimac/pitchpassport/docs-central/phases/phase-1-infrastructure.md

# Or directly
cat /Users/endimac/docs/pitch-passport/phases/phase-1-infrastructure.md
```

### From Admin Portal
1. Go to Project Tracker
2. Click on project
3. Click "Documentation" tab
4. Browse or search docs
5. Click to view or link to task

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Symlink not working | `rm` and recreate with full paths |
| Broken links after migration | Use `sed` to update relative paths |
| Frontmatter not parsing | Ensure `---` at start and end |
| Files not found | Check directory structure matches |
| Git not tracking files | Run `git add .` and `git commit` |

---

## 📞 Support Resources

1. **MARKDOWN_STORAGE_RECOMMENDATIONS.md** - Full analysis
2. **MARKDOWN_IMPLEMENTATION_GUIDE.md** - Step-by-step guide
3. **MARKDOWN_STORAGE_SUMMARY.md** - Executive summary
4. **MARKDOWN_QUICK_REFERENCE.md** - This document

---

## 🎯 Next Steps

1. ✅ Read this quick reference
2. ✅ Review the recommendations document
3. ✅ Follow the implementation guide
4. ✅ Execute the migration checklist
5. ✅ Integrate with Project Tracker
6. ✅ Train team on new system

---

## 📈 Success Metrics

After implementation:
- ✅ 100% of docs in centralized location
- ✅ All projects linked in Project Tracker
- ✅ Docs accessible from admin portal
- ✅ Consistent naming and organization
- ✅ Automated validation passing
- ✅ Team finds docs in < 30 seconds
- ✅ Cross-project linking working
- ✅ Documentation status tracked

---

**Quick Reference Version**: 1.0  
**Created**: May 1, 2026  
**Status**: Ready to Use  
**Recommendation**: Start with Phase 1 this week!

---

## 💡 Pro Tips

1. **Use symlinks** for quick access from project directories
2. **Add metadata** to every markdown file for better tracking
3. **Keep docs in sync** with code changes
4. **Link related docs** to improve navigation
5. **Use consistent naming** across all projects
6. **Validate regularly** with markdownlint
7. **Version control** all documentation changes
8. **Review quarterly** to keep docs current

---

**Ready to implement? Start with the Implementation Guide!**
