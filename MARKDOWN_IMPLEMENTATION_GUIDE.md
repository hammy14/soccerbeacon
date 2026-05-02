# Markdown Storage Implementation Guide

## Quick Start

This guide provides step-by-step instructions to implement the centralized markdown storage system.

---

## Step 1: Create Directory Structure

```bash
# Create the main docs directory
mkdir -p /Users/endimac/docs

# Create subdirectories for each site
mkdir -p /Users/endimac/docs/cardsparky/{setup,features,guides,phases}
mkdir -p /Users/endimac/docs/pitch-passport/{setup,architecture,guides,phases,testing}
mkdir -p /Users/endimac/docs/serial-killers/{setup,features,guides,phases}
mkdir -p /Users/endimac/docs/denick/{admin-portal,mcp-server,guides}
mkdir -p /Users/endimac/docs/shared
```

---

## Step 2: Create README Files

### Master README
Create `/Users/endimac/docs/README.md`:

```markdown
# Documentation Hub

Central repository for all project documentation across CardSparky, Pitch Passport, Serial Killers, and Denick.

## Projects

- [CardSparky](./cardsparky/README.md) - Trading card platform
- [Pitch Passport](./pitch-passport/README.md) - Global soccer coverage site
- [Serial Killers](./serial-killers/README.md) - True crime database
- [Denick](./denick/README.md) - Admin portal and project management

## Shared Resources

- [Architecture Overview](./shared/architecture-overview.md)
- [Deployment Strategy](./shared/deployment-strategy.md)
- [Security Guidelines](./shared/security-guidelines.md)
- [API Consolidation](./shared/api-consolidation.md)
- [Database Standards](./shared/database-standards.md)
- [Development Workflow](./shared/development-workflow.md)

## Quick Links

- [Pitch Passport Phases](./pitch-passport/phases/)
- [CardSparky Features](./cardsparky/features/)
- [Denick Admin Portal](./denick/admin-portal/)
```

### Site-Specific READMEs

Create `/Users/endimac/docs/pitch-passport/README.md`:

```markdown
# Pitch Passport Documentation

Global soccer coverage site with Next.js frontend, Express API, and MySQL database.

## Quick Start

1. [Installation](./setup/installation.md)
2. [Database Setup](./setup/database-setup.md)
3. [Environment Configuration](./setup/environment-config.md)

## Architecture

- [Backend API](./architecture/backend-api.md)
- [Frontend Structure](./architecture/frontend-structure.md)
- [Database Schema](./architecture/database-schema.md)
- [Authentication](./architecture/authentication.md)

## Development Phases

- [Phase 1: Infrastructure](./phases/phase-1-infrastructure.md)
- [Phase 2: API](./phases/phase-2-api.md)
- [Phase 3: Frontend](./phases/phase-3-frontend.md)
- [Phase 4: Admin Portal](./phases/phase-4-admin-portal.md)
- [Phase 5: SEO & Performance](./phases/phase-5-seo-performance.md)
- [Phase 6: Launch](./phases/phase-6-launch.md)

## Guides

- [Content Strategy](./guides/content-strategy.md)
- [Article Management](./guides/article-management.md)
- [Newsletter Setup](./guides/newsletter-setup.md)
- [Deployment](./guides/deployment.md)

## Testing

- [Testing Checklist](./testing/testing-checklist.md)
- [QA Procedures](./testing/qa-procedures.md)
- [Performance Benchmarks](./testing/performance-benchmarks.md)
```

---

## Step 3: Migrate Pitch Passport Documentation

### Move Existing Files

```bash
# Move docs directory files to guides
cp /Users/endimac/pitchpassport/docs/*.md /Users/endimac/docs/pitch-passport/guides/

# Move phase files
cp /Users/endimac/pitchpassport/PHASE_*.md /Users/endimac/docs/pitch-passport/phases/
cp /Users/endimac/pitchpassport/*_COMPLETE.md /Users/endimac/docs/pitch-passport/phases/
cp /Users/endimac/pitchpassport/*_SUMMARY.md /Users/endimac/docs/pitch-passport/phases/

# Move implementation files
cp /Users/endimac/pitchpassport/IMPLEMENTATION_SUMMARY.md /Users/endimac/docs/pitch-passport/guides/
cp /Users/endimac/pitchpassport/DEPLOYMENT_GUIDE.md /Users/endimac/docs/pitch-passport/guides/
cp /Users/endimac/pitchpassport/TESTING_CHECKLIST.md /Users/endimac/docs/pitch-passport/testing/
```

### Rename Files for Consistency

```bash
# Rename phase files to use consistent naming
cd /Users/endimac/docs/pitch-passport/phases/

mv PHASE_1_SUMMARY.txt phase-1-infrastructure.md
mv PHASE_2_SUMMARY.md phase-2-api.md
mv PHASE_3_COMPLETE.md phase-3-frontend.md
mv PHASE_4_IMPLEMENTATION.md phase-4-admin-portal.md
mv PHASE_5_COMPLETE.md phase-5-seo-performance.md
mv PHASE_6_COMPLETE.md phase-6-launch.md
```

---

## Step 4: Create Symlinks in Project Directories

Create symlinks so developers can still access docs from project root:

```bash
# Pitch Passport
ln -s /Users/endimac/docs/pitch-passport /Users/endimac/pitchpassport/docs-central

# CardSparky
ln -s /Users/endimac/docs/cardsparky /Users/endimac/cardsparky/docs-central

# Serial Killers
ln -s /Users/endimac/docs/serial-killers /Users/endimac/serielkillers/docs-central

# Denick
ln -s /Users/endimac/docs/denick /Users/endimac/denick/docs-central
```

---

## Step 5: Update Internal Links

### Find and Replace Pattern

Search for links like:
- `../PHASE_1_SUMMARY.md` → `../../docs/pitch-passport/phases/phase-1-infrastructure.md`
- `./docs/DEPLOYMENT_GUIDE.md` → `../../docs/pitch-passport/guides/deployment.md`

### Using sed (macOS)

```bash
# Update links in markdown files
find /Users/endimac/docs -name "*.md" -type f -exec sed -i '' \
  's|../PHASE_|../../docs/pitch-passport/phases/phase-|g' {} \;

find /Users/endimac/docs -name "*.md" -type f -exec sed -i '' \
  's|./docs/|../../docs/pitch-passport/guides/|g' {} \;
```

---

## Step 6: Add Metadata to Markdown Files

Add frontmatter to each markdown file:

```bash
# Create a script to add frontmatter
cat > /tmp/add-frontmatter.sh << 'EOF'
#!/bin/bash

FILE=$1
PROJECT=$2
CATEGORY=$3

# Extract title from first heading
TITLE=$(grep -m1 "^#" "$FILE" | sed 's/^# //')

# Create temp file with frontmatter
cat > "$FILE.tmp" << FRONTMATTER
---
title: "$TITLE"
project: "$PROJECT"
category: "$CATEGORY"
status: "complete"
last_updated: "$(date +%Y-%m-%d)"
tags: []
---

FRONTMATTER

# Append original content
tail -n +1 "$FILE" >> "$FILE.tmp"
mv "$FILE.tmp" "$FILE"
EOF

chmod +x /tmp/add-frontmatter.sh

# Add frontmatter to Pitch Passport files
for file in /Users/endimac/docs/pitch-passport/phases/*.md; do
  /tmp/add-frontmatter.sh "$file" "pitch-passport" "phases"
done

for file in /Users/endimac/docs/pitch-passport/guides/*.md; do
  /tmp/add-frontmatter.sh "$file" "pitch-passport" "guides"
done
```

---

## Step 7: Create Documentation Index

Create `/Users/endimac/docs/index.json`:

```json
{
  "projects": [
    {
      "id": 1,
      "name": "cardsparky",
      "title": "CardSparky",
      "description": "Trading card platform",
      "path": "cardsparky",
      "docs": [
        {
          "title": "Setup",
          "path": "cardsparky/setup",
          "files": ["installation.md", "configuration.md", "deployment.md"]
        },
        {
          "title": "Features",
          "path": "cardsparky/features",
          "files": ["affiliate-marketing.md", "card-collecting-101.md"]
        }
      ]
    },
    {
      "id": 4,
      "name": "pitch-passport",
      "title": "Pitch Passport",
      "description": "Global soccer coverage site",
      "path": "pitch-passport",
      "docs": [
        {
          "title": "Setup",
          "path": "pitch-passport/setup",
          "files": ["installation.md", "database-setup.md", "environment-config.md"]
        },
        {
          "title": "Phases",
          "path": "pitch-passport/phases",
          "files": [
            "phase-1-infrastructure.md",
            "phase-2-api.md",
            "phase-3-frontend.md",
            "phase-4-admin-portal.md",
            "phase-5-seo-performance.md",
            "phase-6-launch.md"
          ]
        }
      ]
    }
  ],
  "shared": [
    {
      "title": "Architecture Overview",
      "path": "shared/architecture-overview.md"
    },
    {
      "title": "Deployment Strategy",
      "path": "shared/deployment-strategy.md"
    }
  ]
}
```

---

## Step 8: Integrate with Denick Project Tracker

### Update Denick API

Add documentation endpoints to `/Users/endimac/denick/mcp-server/index.js`:

```javascript
// Get project documentation
server.tool('get_project_docs', 'Get documentation for a project', {
  project_id: z.number().describe('Project ID'),
}, async ({ project_id }) => {
  const docsIndex = require('/Users/endimac/docs/index.json');
  const project = docsIndex.projects.find(p => p.id === project_id);
  
  if (!project) {
    return { content: [{ type: 'text', text: 'Project not found' }] };
  }
  
  const docs = project.docs.map(doc => ({
    title: doc.title,
    path: doc.path,
    files: doc.files
  }));
  
  return { 
    content: [{ 
      type: 'text', 
      text: JSON.stringify(docs, null, 2) 
    }] 
  };
});

// Link documentation to task
server.tool('link_task_docs', 'Link documentation to a task', {
  task_id: z.number().describe('Task ID'),
  doc_path: z.string().describe('Documentation file path'),
}, async ({ task_id, doc_path }) => {
  const data = await api(`/pt/tasks/${task_id}`, {
    method: 'PUT',
    body: JSON.stringify({ doc_references: [doc_path] })
  });
  
  return { 
    content: [{ 
      type: 'text', 
      text: data.ok ? `✅ Documentation linked` : `❌ ${data.error}` 
    }] 
  };
});
```

---

## Step 9: Create Documentation Validation Script

Create `/Users/endimac/docs/validate.js`:

```javascript
const fs = require('fs');
const path = require('path');

const DOCS_DIR = __dirname;
const REQUIRED_FRONTMATTER = ['title', 'project', 'category', 'status'];

function validateMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Check for frontmatter
  if (!lines[0].includes('---')) {
    console.warn(`⚠️  Missing frontmatter: ${filePath}`);
    return false;
  }
  
  // Extract frontmatter
  let frontmatterEnd = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].includes('---')) {
      frontmatterEnd = i;
      break;
    }
  }
  
  if (frontmatterEnd === -1) {
    console.warn(`⚠️  Invalid frontmatter: ${filePath}`);
    return false;
  }
  
  const frontmatter = lines.slice(1, frontmatterEnd).join('\n');
  
  // Check required fields
  for (const field of REQUIRED_FRONTMATTER) {
    if (!frontmatter.includes(field)) {
      console.warn(`⚠️  Missing field "${field}": ${filePath}`);
      return false;
    }
  }
  
  console.log(`✅ Valid: ${filePath}`);
  return true;
}

function validateDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      validateDirectory(filePath);
    } else if (file.endsWith('.md')) {
      validateMarkdownFile(filePath);
    }
  }
}

console.log('Validating markdown files...\n');
validateDirectory(DOCS_DIR);
console.log('\nValidation complete!');
```

Run validation:
```bash
node /Users/endimac/docs/validate.js
```

---

## Step 10: Set Up Git Repository

```bash
# Initialize git repo for docs
cd /Users/endimac/docs
git init
git add .
git commit -m "Initial documentation structure"

# Add remote (optional)
# git remote add origin <your-repo-url>
# git push -u origin main
```

---

## Verification Checklist

- [ ] `/Users/endimac/docs/` directory created
- [ ] All subdirectories created for each site
- [ ] README.md files created for each site
- [ ] Pitch Passport documentation migrated
- [ ] Symlinks created in project directories
- [ ] Internal links updated
- [ ] Metadata/frontmatter added to files
- [ ] Documentation index created
- [ ] Denick API updated with doc endpoints
- [ ] Validation script runs successfully
- [ ] Git repository initialized

---

## Next Steps

1. **Migrate remaining projects** (CardSparky, Serial Killers)
2. **Update Denick admin portal UI** to display documentation
3. **Create documentation linking interface** in project tracker
4. **Set up automated documentation validation** in CI/CD
5. **Establish documentation update workflow** with team

---

## Troubleshooting

### Symlinks not working
```bash
# Check if symlink exists
ls -la /Users/endimac/pitchpassport/docs-central

# Recreate if needed
rm /Users/endimac/pitchpassport/docs-central
ln -s /Users/endimac/docs/pitch-passport /Users/endimac/pitchpassport/docs-central
```

### Links broken after migration
```bash
# Find broken links
grep -r "\.\./" /Users/endimac/docs --include="*.md"

# Update links manually or use sed
find /Users/endimac/docs -name "*.md" -type f -exec sed -i '' \
  's|../docs/|../../docs/|g' {} \;
```

### Frontmatter not parsing
```bash
# Check frontmatter format
head -20 /Users/endimac/docs/pitch-passport/phases/phase-1-infrastructure.md

# Ensure it starts and ends with ---
```

---

**Implementation Version**: 1.0  
**Created**: May 1, 2026  
**Status**: Ready to implement
