# Markdown Storage Projects - Import Guide for Denick Project Tracker

## Overview

This guide explains how to import the 4 markdown storage projects and 32 tasks into the Denick Project Tracker admin portal.

---

## Files Available

1. **MARKDOWN_PROJECTS_FOR_TRACKER.md** - Detailed project and task descriptions
2. **MARKDOWN_PROJECTS_IMPORT.json** - JSON format for programmatic import
3. **MARKDOWN_PROJECTS_IMPORT_GUIDE.md** - This import guide

---

## Project Summary

### Project 1: Markdown Storage - Setup & Infrastructure
- **Tasks**: 8
- **Estimated Hours**: 7.5
- **Priority**: High
- **Size**: M
- **Timeline**: Week 1

### Project 2: Markdown Storage - Documentation Migration
- **Tasks**: 8
- **Estimated Hours**: 17.5
- **Priority**: High
- **Size**: L
- **Timeline**: Week 2-3

### Project 3: Markdown Storage - Project Tracker Integration
- **Tasks**: 8
- **Estimated Hours**: 22
- **Priority**: High
- **Size**: L
- **Timeline**: Week 4

### Project 4: Markdown Storage - Standards & Automation
- **Tasks**: 8
- **Estimated Hours**: 13.5
- **Priority**: Medium
- **Size**: M
- **Timeline**: Week 5

---

## Total Summary

- **Total Projects**: 4
- **Total Tasks**: 32
- **Total Estimated Hours**: 68.5 hours
- **Assigned To**: Eric
- **Site**: Denick (Site ID: 3)
- **Timeline**: 5 weeks

---

## Import Methods

### Method 1: Manual Import via Admin Portal (Recommended for First Time)

#### Step 1: Create Project 1
1. Go to Denick Admin Portal → Project Tracker
2. Click "Create New Project"
3. Fill in details:
   - **Name**: Markdown Storage - Setup & Infrastructure
   - **Description**: Create centralized documentation repository structure at /Users/endimac/docs/ with directory organization for all 4 sites (CardSparky, Pitch Passport, Serial Killers, Denick) and shared documentation
   - **Status**: Backlog
   - **Shirt Size**: M
   - **Priority**: High
   - **Model**: Claude Haiku 4.5
4. Click "Create Project"

#### Step 2: Add Tasks to Project 1
For each task in Project 1:
1. Click "Add Task"
2. Fill in all fields:
   - **Title**: [Task title]
   - **Description**: [Task description]
   - **Type**: Enhancement
   - **Status**: Backlog
   - **Priority**: [Critical/High/Medium/Low]
   - **Size**: [XS/S/M/L]
   - **Model**: Claude Haiku 4.5
   - **Assigned To**: Eric
   - **Est Hours**: [Hours]
   - **Actual Hours**: 0
   - **Plan**: [Plan description]
3. Click "Save Task"

#### Step 3: Repeat for Projects 2, 3, 4
Follow the same process for the remaining 3 projects.

---

### Method 2: Bulk Import via API (Faster)

#### Step 1: Prepare API Token
Get your API token from Denick admin portal settings.

#### Step 2: Create Projects via API

```bash
# Set variables
API_BASE="http://localhost:3001"
TOKEN="your-api-token-here"

# Create Project 1
curl -X POST "$API_BASE/api/pt/projects" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Markdown Storage - Setup & Infrastructure",
    "description": "Create centralized documentation repository structure...",
    "status": "Backlog",
    "shirt_size": "M",
    "site_id": 3,
    "priority": "High",
    "model": "Claude Haiku 4.5"
  }'

# Create Project 2
curl -X POST "$API_BASE/api/pt/projects" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Markdown Storage - Documentation Migration",
    "description": "Migrate existing documentation from project directories...",
    "status": "Backlog",
    "shirt_size": "L",
    "site_id": 3,
    "priority": "High",
    "model": "Claude Haiku 4.5"
  }'

# Create Project 3
curl -X POST "$API_BASE/api/pt/projects" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Markdown Storage - Project Tracker Integration",
    "description": "Integrate centralized markdown documentation with Denick Project Tracker...",
    "status": "Backlog",
    "shirt_size": "L",
    "site_id": 3,
    "priority": "High",
    "model": "Claude Sonnet 4.5"
  }'

# Create Project 4
curl -X POST "$API_BASE/api/pt/projects" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Markdown Storage - Standards & Automation",
    "description": "Establish documentation standards, create automation tools...",
    "status": "Backlog",
    "shirt_size": "M",
    "site_id": 3,
    "priority": "Medium",
    "model": "Claude Haiku 4.5"
  }'
```

#### Step 3: Create Tasks via API

```bash
# For each task, use:
curl -X POST "$API_BASE/api/pt/tasks" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": 21,
    "title": "Task title",
    "description": "Task description",
    "type": "Enhancement",
    "status": "Backlog",
    "priority": "High",
    "size": "S",
    "model": "Claude Haiku 4.5",
    "assigned_to": "Eric",
    "est_hours": 1,
    "actual_hours": 0,
    "plan": "Task plan"
  }'
```

---

### Method 3: JSON Import Script

#### Step 1: Create Import Script

Create `/Users/endimac/denick/import-projects.js`:

```javascript
const fs = require('fs');
const fetch = require('node-fetch');

const API_BASE = process.env.API_BASE || 'http://localhost:3001';
const API_TOKEN = process.env.API_TOKEN || '';

async function importProjects() {
  const data = JSON.parse(fs.readFileSync('./MARKDOWN_PROJECTS_IMPORT.json', 'utf8'));
  
  for (const project of data.projects) {
    console.log(`Creating project: ${project.name}`);
    
    // Create project
    const projectRes = await fetch(`${API_BASE}/api/pt/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: project.name,
        description: project.description,
        status: project.status,
        shirt_size: project.shirt_size,
        site_id: project.site_id,
        priority: project.priority,
        model: project.model
      })
    });
    
    const projectData = await projectRes.json();
    const projectId = projectData.id;
    
    console.log(`✅ Project created with ID: ${projectId}`);
    
    // Create tasks
    for (const task of project.tasks) {
      console.log(`  Creating task: ${task.title}`);
      
      const taskRes = await fetch(`${API_BASE}/api/pt/tasks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: projectId,
          title: task.title,
          description: task.description,
          type: task.type,
          status: task.status,
          priority: task.priority,
          size: task.size,
          model: task.model,
          assigned_to: task.assigned_to,
          est_hours: task.est_hours,
          actual_hours: task.actual_hours,
          plan: task.plan
        })
      });
      
      const taskData = await taskRes.json();
      console.log(`  ✅ Task created with ID: ${taskData.id}`);
    }
  }
  
  console.log('\n✅ All projects and tasks imported successfully!');
}

importProjects().catch(err => {
  console.error('❌ Import failed:', err);
  process.exit(1);
});
```

#### Step 2: Run Import Script

```bash
cd /Users/endimac/denick
API_TOKEN="your-token-here" node import-projects.js
```

---

## Task Fields Reference

### Type Options
- Enhancement
- Bug
- Change Request

### Status Options
- Idea
- Backlog
- In Progress
- In Review
- Done

### Priority Options
- Low
- Medium
- High
- Critical

### Size Options
- XS
- S
- M
- L
- XL

### Model Options
- Auto
- Claude Sonnet 4.5
- Claude Sonnet 4
- Claude Haiku 4.5
- Deepseek 3.2
- MiniMac M2.5
- MiniMac M2.1
- GLM 5
- Owen Code Next

---

## Project Details

### Project 1: Setup & Infrastructure (8 tasks, 7.5 hours)

1. Create root directory structure (0.5h)
2. Create master README (1h)
3. Create CardSparky docs structure (1h)
4. Create Pitch Passport docs structure (1h)
5. Create Serial Killers docs structure (1h)
6. Create Denick docs structure (1h)
7. Create shared docs directory (1.5h)
8. Initialize git repository (0.5h)

### Project 2: Documentation Migration (8 tasks, 17.5 hours)

1. Migrate Pitch Passport docs (3h)
2. Migrate CardSparky docs (2h)
3. Migrate Serial Killers docs (2h)
4. Organize Denick docs (2h)
5. Update internal links (2.5h)
6. Add metadata/frontmatter (3h)
7. Create documentation index (2h)
8. Create symlinks (1h)

### Project 3: Project Tracker Integration (8 tasks, 22 hours)

1. Add documentation API endpoints (3h)
2. Update database schema (2h)
3. Add Documentation tab to project details (3h)
4. Add Related Documentation section to tasks (3h)
5. Create documentation linking interface (4h)
6. Create markdown preview component (2h)
7. Add documentation status tracking (2h)
8. Create documentation search interface (2h)

### Project 4: Standards & Automation (8 tasks, 13.5 hours)

1. Create documentation standards guide (2h)
2. Create markdown validation script (2h)
3. Create documentation index generator (2h)
4. Create table of contents generator (1h)
5. Set up pre-commit hooks (1.5h)
6. Create documentation update workflow (1h)
7. Set up automated validation in CI/CD (2h)
8. Create quarterly audit schedule (1h)

---

## Verification Checklist

After importing, verify:

- [ ] All 4 projects created in Project Tracker
- [ ] All 32 tasks created with correct fields
- [ ] All tasks assigned to Eric
- [ ] All estimated hours correct
- [ ] All priorities set correctly
- [ ] All sizes set correctly
- [ ] All models set correctly
- [ ] All statuses set to Backlog
- [ ] All types set to Enhancement
- [ ] Projects visible in admin portal
- [ ] Tasks visible in project details
- [ ] Can filter by project
- [ ] Can filter by priority
- [ ] Can filter by size
- [ ] Can filter by model

---

## Next Steps After Import

1. **Review Projects** - Go through each project in admin portal
2. **Verify Tasks** - Check all 32 tasks are created correctly
3. **Start Project 1** - Begin with Setup & Infrastructure
4. **Track Progress** - Update task status as work progresses
5. **Link Documentation** - Once docs are created, link them to tasks

---

## Troubleshooting

### Projects Not Appearing
- Check API token is valid
- Verify site_id is correct (3 for Denick)
- Check API is running on port 3001

### Tasks Not Creating
- Verify project_id is correct
- Check all required fields are provided
- Verify assigned_to value matches user in system

### Import Script Errors
- Install node-fetch: `npm install node-fetch`
- Check API_TOKEN environment variable is set
- Verify JSON file is valid

---

## Support

For questions about:
- **Project details**: See MARKDOWN_PROJECTS_FOR_TRACKER.md
- **JSON format**: See MARKDOWN_PROJECTS_IMPORT.json
- **Implementation**: See MARKDOWN_IMPLEMENTATION_GUIDE.md

---

## Summary

| Item | Count |
|------|-------|
| Projects | 4 |
| Tasks | 32 |
| Estimated Hours | 68.5 |
| Timeline | 5 weeks |
| Assigned To | Eric |
| Site | Denick |

---

**Import Guide Version**: 1.0  
**Created**: May 1, 2026  
**Status**: Ready for Import  
**Recommended Method**: Method 1 (Manual) for first time, then Method 3 (Script) for future imports

---

## Quick Start

1. ✅ Review MARKDOWN_PROJECTS_FOR_TRACKER.md
2. ✅ Choose import method (Manual, API, or Script)
3. ✅ Follow import steps
4. ✅ Verify all projects and tasks created
5. ✅ Start with Project 1 tasks
6. ✅ Track progress in admin portal

**Ready to import? Start with Method 1 (Manual Import) for best results!**
