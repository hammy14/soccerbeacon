# Centralized Markdown Storage & Project Tracker Integration

## Executive Summary

This document outlines a recommended architecture for storing markdown documentation in a single centralized location while maintaining site-specific organization and enabling seamless integration with the Denick Project Tracker admin portal.

---

## Current State Analysis

### Existing Markdown Distribution

**CardSparky** (`/Users/endimac/cardsparky/`)
- Minimal markdown files (mostly in root)
- No dedicated docs directory
- Documentation scattered across project root

**Pitch Passport** (`/Users/endimac/pitchpassport/`)
- 18+ markdown files in root directory
- 9 markdown files in `/docs` subdirectory
- Well-organized phase-based documentation
- Comprehensive guides and implementation summaries

**Serial Killers** (`/Users/endimac/serielkillers/`)
- Documentation structure to be determined
- Likely similar to CardSparky

**Denick** (`/Users/endimac/denick/`)
- Minimal markdown files
- Primarily README.md
- Admin portal for managing other sites

---

## Recommended Architecture

### Option 1: Centralized Repository (RECOMMENDED)

**Location**: `/Users/endimac/docs/` (new centralized directory)

**Structure**:
```
/Users/endimac/docs/
├── README.md                          # Index of all documentation
├── cardsparky/
│   ├── README.md                      # CardSparky overview
│   ├── setup/
│   │   ├── installation.md
│   │   ├── configuration.md
│   │   └── deployment.md
│   ├── features/
│   │   ├── affiliate-marketing.md
│   │   ├── card-collecting-101.md
│   │   ├── social-media.md
│   │   └── ebay-integration.md
│   ├── guides/
│   │   ├── user-guide.md
│   │   ├── admin-guide.md
│   │   └── developer-guide.md
│   └── phases/
│       ├── phase-1-setup.md
│       ├── phase-2-features.md
│       └── phase-3-launch.md
│
├── pitch-passport/
│   ├── README.md                      # Pitch Passport overview
│   ├── setup/
│   │   ├── installation.md
│   │   ├── database-setup.md
│   │   └── environment-config.md
│   ├── architecture/
│   │   ├── backend-api.md
│   │   ├── frontend-structure.md
│   │   ├── database-schema.md
│   │   └── authentication.md
│   ├── guides/
│   │   ├── content-strategy.md
│   │   ├── article-management.md
│   │   ├── newsletter-setup.md
│   │   └── deployment.md
│   ├── phases/
│   │   ├── phase-1-infrastructure.md
│   │   ├── phase-2-api.md
│   │   ├── phase-3-frontend.md
│   │   ├── phase-4-admin-portal.md
│   │   ├── phase-5-seo-performance.md
│   │   └── phase-6-launch.md
│   └── testing/
│       ├── testing-checklist.md
│       ├── qa-procedures.md
│       └── performance-benchmarks.md
│
├── serial-killers/
│   ├── README.md
│   ├── setup/
│   ├── features/
│   ├── guides/
│   └── phases/
│
├── denick/
│   ├── README.md
│   ├── admin-portal/
│   │   ├── project-tracker.md
│   │   ├── social-media-management.md
│   │   ├── content-management.md
│   │   └── user-management.md
│   ├── mcp-server/
│   │   ├── setup.md
│   │   ├── tools-reference.md
│   │   └── integration-guide.md
│   └── guides/
│
└── shared/
    ├── architecture-overview.md       # Multi-site architecture
    ├── deployment-strategy.md         # Shared deployment procedures
    ├── security-guidelines.md         # Security best practices
    ├── api-consolidation.md           # Shared API server info
    ├── database-standards.md          # Database conventions
    └── development-workflow.md        # Team workflow guidelines
```

**Advantages**:
- ✅ Single source of truth for all documentation
- ✅ Easy to search and navigate across projects
- ✅ Consistent naming and organization
- ✅ Shared documentation for common topics
- ✅ Version control friendly (single git repo)
- ✅ Easy to link between projects
- ✅ Scalable for future projects

**Disadvantages**:
- ❌ Requires migration of existing documentation
- ❌ Separate from project source code
- ❌ Need to maintain symlinks or references in project directories

---

### Option 2: Hybrid Approach (ALTERNATIVE)

Keep documentation in project directories but maintain a centralized index.

**Location**: `/Users/endimac/docs/` (index only)

**Structure**:
```
/Users/endimac/docs/
├── README.md                          # Master index
├── index.json                         # Machine-readable index
└── links/
    ├── cardsparky.md                  # Links to CardSparky docs
    ├── pitch-passport.md              # Links to Pitch Passport docs
    ├── serial-killers.md              # Links to Serial Killers docs
    └── denick.md                      # Links to Denick docs
```

**Advantages**:
- ✅ Documentation stays with project code
- ✅ Minimal migration effort
- ✅ Easier to keep docs in sync with code

**Disadvantages**:
- ❌ Fragmented documentation
- ❌ Harder to search across projects
- ❌ Inconsistent organization
- ❌ Difficult to share common documentation

---

## Integration with Denick Project Tracker

### API Enhancement Requirements

The Denick admin portal needs to support markdown file references in projects and tasks.

**Proposed API Endpoints**:

```javascript
// Get project documentation
GET /api/pt/projects/:id/docs
Response: {
  project_id: 20,
  docs: [
    {
      title: "Phase 1 Infrastructure",
      path: "pitch-passport/phases/phase-1-infrastructure.md",
      url: "/docs/pitch-passport/phases/phase-1-infrastructure.md",
      type: "phase"
    },
    {
      title: "Deployment Guide",
      path: "pitch-passport/guides/deployment.md",
      url: "/docs/pitch-passport/guides/deployment.md",
      type: "guide"
    }
  ]
}

// Get task documentation
GET /api/pt/tasks/:id/docs
Response: {
  task_id: 123,
  docs: [
    {
      title: "Backend API Setup",
      path: "pitch-passport/setup/installation.md",
      url: "/docs/pitch-passport/setup/installation.md"
    }
  ]
}

// Create/update task with documentation reference
POST /api/pt/tasks
Body: {
  project_id: 20,
  title: "Setup Database",
  description: "Configure MySQL database",
  doc_references: [
    "pitch-passport/setup/database-setup.md"
  ]
}
```

### Frontend UI Components

**Project Tracker Enhancement**:
- Add "Documentation" tab to project details
- Display linked markdown files with preview
- Allow drag-and-drop to link documentation
- Show documentation status (up-to-date, needs review, etc.)

**Task Details Enhancement**:
- Add "Related Documentation" section
- Display linked markdown files inline
- Allow quick navigation to documentation
- Show documentation last updated date

---

## Implementation Plan

### Phase 1: Setup (Week 1)
1. Create centralized `/Users/endimac/docs/` directory
2. Create directory structure for all 4 sites
3. Create README.md files for each site
4. Create shared documentation directory

### Phase 2: Migration (Week 2-3)
1. Migrate Pitch Passport documentation
   - Move `/Users/endimac/pitchpassport/docs/*.md` → `/Users/endimac/docs/pitch-passport/guides/`
   - Move root markdown files → `/Users/endimac/docs/pitch-passport/phases/`
   - Reorganize by category (setup, architecture, guides, phases, testing)

2. Migrate CardSparky documentation
   - Consolidate scattered markdown files
   - Organize by feature and phase

3. Migrate Serial Killers documentation
   - Consolidate existing documentation
   - Organize by feature and phase

4. Organize Denick documentation
   - Admin portal guides
   - MCP server documentation
   - Integration guides

### Phase 3: Integration (Week 4)
1. Update Denick admin portal API to support doc references
2. Add documentation UI components to project tracker
3. Create documentation linking interface
4. Test cross-project documentation linking

### Phase 4: Maintenance (Ongoing)
1. Establish documentation standards
2. Create documentation update workflow
3. Set up automated documentation validation
4. Regular documentation audits

---

## File Naming Conventions

### Markdown Files
- Use kebab-case for file names: `phase-1-setup.md`
- Use descriptive names: `database-schema.md` not `db.md`
- Prefix with category: `setup-installation.md`, `guide-deployment.md`

### Directory Names
- Use lowercase: `setup/`, `guides/`, `phases/`
- Use plural for collections: `features/`, `guides/`, `phases/`
- Use singular for specific items: `architecture/`, `testing/`

### Metadata in Markdown
Add frontmatter to each markdown file:

```markdown
---
title: "Phase 1: Infrastructure Setup"
project: "pitch-passport"
category: "phases"
status: "complete"
last_updated: "2026-05-01"
related_tasks: [1, 2, 3]
tags: ["setup", "infrastructure", "backend"]
---

# Phase 1: Infrastructure Setup

Content here...
```

---

## Documentation Standards

### Each Project Should Have

1. **README.md** - Project overview, quick start
2. **Setup Guide** - Installation and configuration
3. **Architecture Documentation** - System design and structure
4. **Feature Guides** - How to use each feature
5. **Phase Documentation** - Development phases and milestones
6. **Testing Documentation** - QA procedures and checklists
7. **Deployment Guide** - How to deploy to production
8. **API Documentation** - API endpoints and usage (if applicable)

### Documentation Quality Checklist

- [ ] Clear, concise language
- [ ] Code examples where applicable
- [ ] Screenshots/diagrams for complex features
- [ ] Table of contents for long documents
- [ ] Links to related documentation
- [ ] Last updated date
- [ ] Author/maintainer information
- [ ] Status (draft, review, complete, deprecated)

---

## Tools & Automation

### Markdown Validation
```bash
# Install markdownlint
npm install -g markdownlint-cli

# Validate all markdown files
markdownlint /Users/endimac/docs/**/*.md
```

### Documentation Generation
```bash
# Generate documentation index
node scripts/generate-docs-index.js

# Generate table of contents
node scripts/generate-toc.js
```

### Git Integration
```bash
# Add pre-commit hook to validate markdown
# Add documentation changes to commit messages
```

---

## Migration Checklist

### Pitch Passport
- [ ] Move `/docs/*.md` to `/Users/endimac/docs/pitch-passport/guides/`
- [ ] Move root `PHASE_*.md` to `/Users/endimac/docs/pitch-passport/phases/`
- [ ] Move root `*_SUMMARY.md` to `/Users/endimac/docs/pitch-passport/phases/`
- [ ] Move root `*_COMPLETE.md` to `/Users/endimac/docs/pitch-passport/phases/`
- [ ] Move `IMPLEMENTATION_SUMMARY.md` to `/Users/endimac/docs/pitch-passport/guides/`
- [ ] Move `DEPLOYMENT_GUIDE.md` to `/Users/endimac/docs/pitch-passport/guides/`
- [ ] Move `TESTING_CHECKLIST.md` to `/Users/endimac/docs/pitch-passport/testing/`
- [ ] Create symlinks in project root for quick access
- [ ] Update all internal links in markdown files

### CardSparky
- [ ] Consolidate existing markdown files
- [ ] Organize by feature
- [ ] Create phase documentation
- [ ] Create setup guides

### Serial Killers
- [ ] Consolidate existing markdown files
- [ ] Organize by feature
- [ ] Create phase documentation
- [ ] Create setup guides

### Denick
- [ ] Create admin portal documentation
- [ ] Create MCP server documentation
- [ ] Create integration guides
- [ ] Create API reference

---

## Recommended Next Steps

1. **Immediate** (This Week)
   - Create `/Users/endimac/docs/` directory structure
   - Create README.md files for each site
   - Create shared documentation directory

2. **Short Term** (Next 2 Weeks)
   - Migrate Pitch Passport documentation
   - Migrate CardSparky documentation
   - Establish naming conventions and standards

3. **Medium Term** (Next Month)
   - Integrate with Denick Project Tracker
   - Add documentation UI to admin portal
   - Create documentation linking interface

4. **Long Term** (Ongoing)
   - Maintain documentation standards
   - Regular documentation audits
   - Expand documentation as projects grow

---

## Conclusion

**Recommendation**: Implement **Option 1: Centralized Repository** with the proposed directory structure.

**Rationale**:
- Provides single source of truth for all documentation
- Enables easy cross-project linking and reference
- Scales well as you add more projects
- Integrates seamlessly with Denick Project Tracker
- Maintains consistent organization and standards
- Simplifies documentation search and discovery

This approach will significantly improve documentation management, team collaboration, and project tracking efficiency across all four sites.

---

## Questions & Clarifications

1. **Version Control**: Should the docs directory be in a separate git repo or part of each project repo?
   - **Recommendation**: Separate git repo for easier management and sharing

2. **Access Control**: Should documentation be accessible from the Denick admin portal?
   - **Recommendation**: Yes, with read-only access for team members

3. **Documentation Updates**: Who is responsible for keeping documentation up-to-date?
   - **Recommendation**: Project leads with automated reminders for stale documentation

4. **Markdown Rendering**: Should markdown be rendered in the admin portal or linked externally?
   - **Recommendation**: Render in admin portal with option to view source

---

**Document Version**: 1.0  
**Created**: May 1, 2026  
**Last Updated**: May 1, 2026  
**Status**: Complete  
**Author**: Kiro AI Assistant
