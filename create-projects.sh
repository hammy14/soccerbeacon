#!/bin/bash

# Denick Project Tracker - Create Markdown Storage Projects
# This script creates all 4 projects with 32 tasks

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwibmFtZSI6Ik1DUCIsImlhdCI6MTc3NzI0ODM1OCwiZXhwIjoxODA4Nzg0MzU4fQ.Wmym8ZoxeqD0B8o6xHGKNr2X6vvAGwSQVIEDpvHTaJY"
API="http://localhost:3001/api"

echo "🚀 Creating Markdown Storage Projects in Denick Project Tracker..."
echo ""

# ============================================================================
# PROJECT 1: Setup & Infrastructure
# ============================================================================

echo "📦 Creating Project 1: Setup & Infrastructure..."
P1=$(curl -s -X POST "$API/pt/projects" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Markdown Storage - Setup & Infrastructure",
    "description": "Create centralized documentation repository structure at /Users/endimac/docs/ with directory organization for all 4 sites (CardSparky, Pitch Passport, Serial Killers, Denick) and shared documentation",
    "status": "Backlog",
    "shirt_size": "M",
    "site_id": 3,
    "priority": "High"
  }' | jq -r '.id')

echo "✅ Project 1 created (ID: $P1)"

# Project 1 Tasks
curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P1',"title":"Create root directory structure at /Users/endimac/docs/","description":"Create main /Users/endimac/docs/ directory and subdirectories for cardsparky, pitch-passport, serial-killers, denick, and shared","type":"Enhancement","status":"Backlog","priority":"Critical","size":"XS","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":0.5,"actual_hours":0,"plan":"Execute bash commands to create directory structure"}' > /dev/null && echo "  ✅ Task 1.1"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P1',"title":"Create master README.md for documentation hub","description":"Create comprehensive README.md at /Users/endimac/docs/README.md with index of all projects and shared resources","type":"Enhancement","status":"Backlog","priority":"High","size":"S","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":1,"actual_hours":0,"plan":"Write markdown with project links and navigation"}' > /dev/null && echo "  ✅ Task 1.2"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P1',"title":"Create CardSparky documentation directory structure","description":"Create subdirectories (setup, features, guides, phases) and README.md for CardSparky project","type":"Enhancement","status":"Backlog","priority":"High","size":"S","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":1,"actual_hours":0,"plan":"Create directory structure and README template"}' > /dev/null && echo "  ✅ Task 1.3"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P1',"title":"Create Pitch Passport documentation directory structure","description":"Create subdirectories (setup, architecture, guides, phases, testing) and README.md for Pitch Passport project","type":"Enhancement","status":"Backlog","priority":"High","size":"S","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":1,"actual_hours":0,"plan":"Create directory structure and README template"}' > /dev/null && echo "  ✅ Task 1.4"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P1',"title":"Create Serial Killers documentation directory structure","description":"Create subdirectories (setup, features, guides, phases) and README.md for Serial Killers project","type":"Enhancement","status":"Backlog","priority":"High","size":"S","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":1,"actual_hours":0,"plan":"Create directory structure and README template"}' > /dev/null && echo "  ✅ Task 1.5"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P1',"title":"Create Denick documentation directory structure","description":"Create subdirectories (admin-portal, mcp-server, guides) and README.md for Denick project","type":"Enhancement","status":"Backlog","priority":"High","size":"S","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":1,"actual_hours":0,"plan":"Create directory structure and README template"}' > /dev/null && echo "  ✅ Task 1.6"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P1',"title":"Create shared documentation directory","description":"Create shared directory with templates for architecture-overview.md, deployment-strategy.md, security-guidelines.md, api-consolidation.md, database-standards.md, development-workflow.md","type":"Enhancement","status":"Backlog","priority":"Medium","size":"S","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":1.5,"actual_hours":0,"plan":"Create shared documentation templates"}' > /dev/null && echo "  ✅ Task 1.7"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P1',"title":"Initialize git repository for docs","description":"Initialize git repository at /Users/endimac/docs/, add all files, and create initial commit","type":"Enhancement","status":"Backlog","priority":"Medium","size":"XS","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":0.5,"actual_hours":0,"plan":"Run git init, add, and commit commands"}' > /dev/null && echo "  ✅ Task 1.8"

echo ""

# ============================================================================
# PROJECT 2: Documentation Migration
# ============================================================================

echo "📦 Creating Project 2: Documentation Migration..."
P2=$(curl -s -X POST "$API/pt/projects" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Markdown Storage - Documentation Migration",
    "description": "Migrate existing documentation from project directories to centralized /Users/endimac/docs/ repository. Includes Pitch Passport, CardSparky, Serial Killers, and Denick documentation consolidation",
    "status": "Backlog",
    "shirt_size": "L",
    "site_id": 3,
    "priority": "High"
  }' | jq -r '.id')

echo "✅ Project 2 created (ID: $P2)"

# Project 2 Tasks
curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P2',"title":"Migrate Pitch Passport documentation to centralized location","description":"Move all markdown files from /Users/endimac/pitchpassport/docs/ and root directory to /Users/endimac/docs/pitch-passport/ with proper categorization (setup, architecture, guides, phases, testing)","type":"Enhancement","status":"Backlog","priority":"Critical","size":"L","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":3,"actual_hours":0,"plan":"Copy files, rename for consistency, organize by category"}' > /dev/null && echo "  ✅ Task 2.1"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P2',"title":"Migrate CardSparky documentation to centralized location","description":"Consolidate scattered markdown files from /Users/endimac/cardsparky/ to /Users/endimac/docs/cardsparky/ with proper organization by feature and phase","type":"Enhancement","status":"Backlog","priority":"High","size":"M","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":2,"actual_hours":0,"plan":"Consolidate files, organize by feature and phase"}' > /dev/null && echo "  ✅ Task 2.2"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P2',"title":"Migrate Serial Killers documentation to centralized location","description":"Consolidate existing documentation from /Users/endimac/serielkillers/ to /Users/endimac/docs/serial-killers/ with proper organization","type":"Enhancement","status":"Backlog","priority":"High","size":"M","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":2,"actual_hours":0,"plan":"Consolidate files, organize by feature and phase"}' > /dev/null && echo "  ✅ Task 2.3"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P2',"title":"Organize Denick documentation in centralized location","description":"Consolidate Denick documentation to /Users/endimac/docs/denick/ with proper organization (admin-portal, mcp-server, guides)","type":"Enhancement","status":"Backlog","priority":"Medium","size":"M","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":2,"actual_hours":0,"plan":"Consolidate files, organize by category"}' > /dev/null && echo "  ✅ Task 2.4"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P2',"title":"Update all internal links in migrated markdown files","description":"Search and replace relative links in all markdown files to point to new centralized location. Update links like ../docs/ to ../../docs/pitch-passport/guides/","type":"Enhancement","status":"Backlog","priority":"High","size":"L","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":2.5,"actual_hours":0,"plan":"Use sed or manual find-and-replace to update links"}' > /dev/null && echo "  ✅ Task 2.5"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P2',"title":"Add YAML frontmatter to all markdown files","description":"Add metadata frontmatter (title, project, category, status, last_updated, tags) to all markdown files for better tracking and integration","type":"Enhancement","status":"Backlog","priority":"High","size":"L","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":3,"actual_hours":0,"plan":"Create script to add frontmatter, execute on all files"}' > /dev/null && echo "  ✅ Task 2.6"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P2',"title":"Create machine-readable documentation index","description":"Create /Users/endimac/docs/index.json with structured index of all projects, categories, and files for programmatic access","type":"Enhancement","status":"Backlog","priority":"Medium","size":"M","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":2,"actual_hours":0,"plan":"Create JSON structure with all projects and files"}' > /dev/null && echo "  ✅ Task 2.7"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P2',"title":"Create symlinks for quick access from project directories","description":"Create symlinks in each project directory (cardsparky, pitch-passport, serielkillers, denick) pointing to centralized docs for backward compatibility","type":"Enhancement","status":"Backlog","priority":"Medium","size":"S","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":1,"actual_hours":0,"plan":"Create symlinks using ln -s command"}' > /dev/null && echo "  ✅ Task 2.8"

echo ""

# ============================================================================
# PROJECT 3: Project Tracker Integration
# ============================================================================

echo "📦 Creating Project 3: Project Tracker Integration..."
P3=$(curl -s -X POST "$API/pt/projects" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Markdown Storage - Project Tracker Integration",
    "description": "Integrate centralized markdown documentation with Denick Project Tracker. Add API endpoints, UI components, and documentation linking functionality",
    "status": "Backlog",
    "shirt_size": "L",
    "site_id": 3,
    "priority": "High"
  }' | jq -r '.id')

echo "✅ Project 3 created (ID: $P3)"

# Project 3 Tasks
curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P3',"title":"Add documentation API endpoints to Denick MCP server","description":"Add new endpoints to /Users/endimac/denick/mcp-server/index.js: GET /api/pt/projects/:id/docs, GET /api/pt/tasks/:id/docs, POST /api/pt/tasks with doc_references","type":"Enhancement","status":"Backlog","priority":"Critical","size":"L","model":"Claude Sonnet 4.5","assigned_to":"Eric","est_hours":3,"actual_hours":0,"plan":"Implement API endpoints with proper error handling"}' > /dev/null && echo "  ✅ Task 3.1"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P3',"title":"Update database schema to support documentation references","description":"Add doc_references field to projects and tasks tables, create documentation_links table for many-to-many relationships","type":"Enhancement","status":"Backlog","priority":"Critical","size":"M","model":"Claude Sonnet 4.5","assigned_to":"Eric","est_hours":2,"actual_hours":0,"plan":"Create database migrations and update schema"}' > /dev/null && echo "  ✅ Task 3.2"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P3',"title":"Add Documentation tab to project details in admin portal","description":"Add new Documentation tab to project details page in Denick admin portal showing linked markdown files with preview","type":"Enhancement","status":"Backlog","priority":"High","size":"L","model":"Claude Sonnet 4.5","assigned_to":"Eric","est_hours":3,"actual_hours":0,"plan":"Create React component for documentation tab"}' > /dev/null && echo "  ✅ Task 3.3"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P3',"title":"Add Related Documentation section to task details","description":"Add Related Documentation section to task details page showing linked markdown files with inline preview and quick navigation","type":"Enhancement","status":"Backlog","priority":"High","size":"L","model":"Claude Sonnet 4.5","assigned_to":"Eric","est_hours":3,"actual_hours":0,"plan":"Create React component for related documentation"}' > /dev/null && echo "  ✅ Task 3.4"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P3',"title":"Create drag-and-drop documentation linking interface","description":"Create interface in admin portal to link documentation files to projects and tasks. Support drag-and-drop, search, and bulk linking","type":"Enhancement","status":"Backlog","priority":"High","size":"L","model":"Claude Sonnet 4.5","assigned_to":"Eric","est_hours":4,"actual_hours":0,"plan":"Implement drag-and-drop interface with search"}' > /dev/null && echo "  ✅ Task 3.5"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P3',"title":"Create markdown preview component for admin portal","description":"Create reusable React component to render markdown files with syntax highlighting, table of contents, and navigation","type":"Enhancement","status":"Backlog","priority":"Medium","size":"M","model":"Claude Sonnet 4.5","assigned_to":"Eric","est_hours":2,"actual_hours":0,"plan":"Use markdown-to-jsx or similar library"}' > /dev/null && echo "  ✅ Task 3.6"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P3',"title":"Add documentation status tracking to admin portal","description":"Add ability to track documentation status (up-to-date, needs-review, deprecated) with last-updated dates and review history","type":"Enhancement","status":"Backlog","priority":"Medium","size":"M","model":"Claude Sonnet 4.5","assigned_to":"Eric","est_hours":2,"actual_hours":0,"plan":"Add status field to documentation_links table"}' > /dev/null && echo "  ✅ Task 3.7"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P3',"title":"Create documentation search interface","description":"Add search functionality to find documentation across all projects with filters by project, category, status, and tags","type":"Enhancement","status":"Backlog","priority":"Medium","size":"M","model":"Claude Sonnet 4.5","assigned_to":"Eric","est_hours":2,"actual_hours":0,"plan":"Implement search with Elasticsearch or similar"}' > /dev/null && echo "  ✅ Task 3.8"

echo ""

# ============================================================================
# PROJECT 4: Standards & Automation
# ============================================================================

echo "📦 Creating Project 4: Standards & Automation..."
P4=$(curl -s -X POST "$API/pt/projects" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Markdown Storage - Standards & Automation",
    "description": "Establish documentation standards, create automation tools, and set up validation. Includes naming conventions, quality standards, automated validation, and maintenance workflows",
    "status": "Backlog",
    "shirt_size": "M",
    "site_id": 3,
    "priority": "Medium"
  }' | jq -r '.id')

echo "✅ Project 4 created (ID: $P4)"

# Project 4 Tasks
curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P4',"title":"Create comprehensive documentation standards guide","description":"Create /Users/endimac/docs/STANDARDS.md with naming conventions, file organization, metadata requirements, quality checklist, and best practices","type":"Enhancement","status":"Backlog","priority":"High","size":"M","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":2,"actual_hours":0,"plan":"Write comprehensive standards document"}' > /dev/null && echo "  ✅ Task 4.1"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P4',"title":"Create markdown validation script","description":"Create /Users/endimac/docs/validate.js to validate all markdown files for frontmatter, naming conventions, broken links, and quality standards","type":"Enhancement","status":"Backlog","priority":"High","size":"M","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":2,"actual_hours":0,"plan":"Write Node.js validation script"}' > /dev/null && echo "  ✅ Task 4.2"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P4',"title":"Create documentation index generator script","description":"Create /Users/endimac/docs/generate-index.js to automatically generate index.json and README files from directory structure","type":"Enhancement","status":"Backlog","priority":"Medium","size":"M","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":2,"actual_hours":0,"plan":"Write Node.js script to generate index"}' > /dev/null && echo "  ✅ Task 4.3"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P4',"title":"Create table of contents generator for long documents","description":"Create script to automatically generate table of contents for markdown files with links to sections","type":"Enhancement","status":"Backlog","priority":"Low","size":"S","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":1,"actual_hours":0,"plan":"Write script to generate TOC"}' > /dev/null && echo "  ✅ Task 4.4"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P4',"title":"Set up git pre-commit hooks for documentation validation","description":"Create pre-commit hooks to validate markdown files before commit, check for broken links, and enforce naming conventions","type":"Enhancement","status":"Backlog","priority":"Medium","size":"S","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":1.5,"actual_hours":0,"plan":"Create .git/hooks/pre-commit script"}' > /dev/null && echo "  ✅ Task 4.5"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P4',"title":"Create documentation update workflow and guidelines","description":"Create /Users/endimac/docs/UPDATE_WORKFLOW.md with guidelines for updating documentation, review process, and approval workflow","type":"Enhancement","status":"Backlog","priority":"Medium","size":"S","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":1,"actual_hours":0,"plan":"Write workflow documentation"}' > /dev/null && echo "  ✅ Task 4.6"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P4',"title":"Set up automated documentation validation in CI/CD pipeline","description":"Add documentation validation to CI/CD pipeline to automatically check all markdown files on commit/push","type":"Enhancement","status":"Backlog","priority":"Medium","size":"M","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":2,"actual_hours":0,"plan":"Add validation step to CI/CD configuration"}' > /dev/null && echo "  ✅ Task 4.7"

curl -s -X POST "$API/pt/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"project_id":'$P4',"title":"Create quarterly documentation audit schedule","description":"Create schedule and checklist for quarterly documentation audits to ensure all docs are current, accurate, and follow standards","type":"Enhancement","status":"Backlog","priority":"Low","size":"S","model":"Claude Haiku 4.5","assigned_to":"Eric","est_hours":1,"actual_hours":0,"plan":"Create audit schedule and checklist"}' > /dev/null && echo "  ✅ Task 4.8"

echo ""
echo "✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅"
echo ""
echo "🎉 SUCCESS! All 4 projects with 32 tasks created in Denick Project Tracker!"
echo ""
echo "📊 Summary:"
echo "  Project 1 (ID: $P1): Setup & Infrastructure - 8 tasks"
echo "  Project 2 (ID: $P2): Documentation Migration - 8 tasks"
echo "  Project 3 (ID: $P3): Project Tracker Integration - 8 tasks"
echo "  Project 4 (ID: $P4): Standards & Automation - 8 tasks"
echo ""
echo "Total: 4 projects, 32 tasks, 68.5 estimated hours"
echo ""
echo "✅ All tasks assigned to Eric"
echo "✅ All tasks in Backlog status"
echo "✅ All tasks set to Enhancement type"
echo ""
echo "🚀 Next steps:"
echo "  1. Go to Denick Admin Portal (http://localhost:5173)"
echo "  2. Navigate to Project Tracker"
echo "  3. View the 4 new projects"
echo "  4. Start with Project 1 tasks"
