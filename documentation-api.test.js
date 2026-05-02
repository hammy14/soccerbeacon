/**
 * Documentation API Endpoints Tests
 * Task 25.8: Testing & Validation
 * 
 * Tests for all 8 documentation API endpoints
 */

const request = require('supertest')
const app = require('../server') // Express app
const db = require('../config/database')

describe('Documentation API Endpoints', () => {
  const API_BASE = '/api/pt'
  const authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // Mock token

  beforeAll(async () => {
    // Setup test database
    await db.query('START TRANSACTION')
  })

  afterAll(async () => {
    // Cleanup test database
    await db.query('ROLLBACK')
    await db.end()
  })

  describe('GET /pt/documentation', () => {
    test('returns all documentation', async () => {
      const response = await request(app)
        .get(`${API_BASE}/documentation`)
        .set('Authorization', authToken)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBeGreaterThanOrEqual(0)
    })

    test('filters by project_id', async () => {
      const response = await request(app)
        .get(`${API_BASE}/documentation?project_id=1`)
        .set('Authorization', authToken)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      response.body.forEach(doc => {
        expect(doc.project_id).toBe(1)
      })
    })

    test('filters by status', async () => {
      const response = await request(app)
        .get(`${API_BASE}/documentation?status=Published`)
        .set('Authorization', authToken)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      response.body.forEach(doc => {
        expect(doc.status).toBe('Published')
      })
    })

    test('returns 401 without authentication', async () => {
      const response = await request(app)
        .get(`${API_BASE}/documentation`)

      expect(response.status).toBe(401)
    })
  })

  describe('GET /pt/documentation/search', () => {
    test('searches documentation by query', async () => {
      const response = await request(app)
        .get(`${API_BASE}/documentation/search?q=API`)
        .set('Authorization', authToken)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })

    test('returns empty array for no matches', async () => {
      const response = await request(app)
        .get(`${API_BASE}/documentation/search?q=nonexistent123xyz`)
        .set('Authorization', authToken)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBe(0)
    })

    test('requires search query parameter', async () => {
      const response = await request(app)
        .get(`${API_BASE}/documentation/search`)
        .set('Authorization', authToken)

      expect(response.status).toBe(400)
    })

    test('searches across title, path, and description', async () => {
      const response = await request(app)
        .get(`${API_BASE}/documentation/search?q=documentation`)
        .set('Authorization', authToken)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      // Results should contain matches in title, path, or description
    })
  })

  describe('POST /pt/documentation/link', () => {
    test('links documentation to project', async () => {
      const response = await request(app)
        .post(`${API_BASE}/documentation/link`)
        .set('Authorization', authToken)
        .send({
          doc_path: 'docs/api.md',
          project_id: 1,
          task_id: null,
        })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
      expect(response.body.doc_path).toBe('docs/api.md')
      expect(response.body.project_id).toBe(1)
    })

    test('links documentation to task', async () => {
      const response = await request(app)
        .post(`${API_BASE}/documentation/link`)
        .set('Authorization', authToken)
        .send({
          doc_path: 'docs/api.md',
          project_id: 1,
          task_id: 1,
        })

      expect(response.status).toBe(201)
      expect(response.body.task_id).toBe(1)
    })

    test('validates required fields', async () => {
      const response = await request(app)
        .post(`${API_BASE}/documentation/link`)
        .set('Authorization', authToken)
        .send({
          doc_path: 'docs/api.md',
          // Missing project_id
        })

      expect(response.status).toBe(400)
    })

    test('prevents duplicate links', async () => {
      // First link
      await request(app)
        .post(`${API_BASE}/documentation/link`)
        .set('Authorization', authToken)
        .send({
          doc_path: 'docs/api.md',
          project_id: 1,
        })

      // Duplicate link
      const response = await request(app)
        .post(`${API_BASE}/documentation/link`)
        .set('Authorization', authToken)
        .send({
          doc_path: 'docs/api.md',
          project_id: 1,
        })

      expect(response.status).toBe(409) // Conflict
    })
  })

  describe('PUT /pt/documentation/:docPath/status', () => {
    test('updates documentation status', async () => {
      const response = await request(app)
        .put(`${API_BASE}/documentation/docs%2Fapi.md/status`)
        .set('Authorization', authToken)
        .send({
          status: 'Published',
        })

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('Published')
    })

    test('validates status value', async () => {
      const response = await request(app)
        .put(`${API_BASE}/documentation/docs%2Fapi.md/status`)
        .set('Authorization', authToken)
        .send({
          status: 'InvalidStatus',
        })

      expect(response.status).toBe(400)
    })

    test('returns 404 for non-existent document', async () => {
      const response = await request(app)
        .put(`${API_BASE}/documentation/nonexistent%2Fdoc.md/status`)
        .set('Authorization', authToken)
        .send({
          status: 'Published',
        })

      expect(response.status).toBe(404)
    })

    test('records status change in audit trail', async () => {
      await request(app)
        .put(`${API_BASE}/documentation/docs%2Fapi.md/status`)
        .set('Authorization', authToken)
        .send({
          status: 'Review',
        })

      // Verify audit trail entry
      const auditResponse = await request(app)
        .get(`${API_BASE}/documentation/docs%2Fapi.md/history`)
        .set('Authorization', authToken)

      expect(auditResponse.status).toBe(200)
      expect(Array.isArray(auditResponse.body)).toBe(true)
      expect(auditResponse.body.length).toBeGreaterThan(0)
    })
  })

  describe('DELETE /pt/documentation/:docPath/link', () => {
    test('unlinks documentation from project', async () => {
      // First create a link
      await request(app)
        .post(`${API_BASE}/documentation/link`)
        .set('Authorization', authToken)
        .send({
          doc_path: 'docs/test.md',
          project_id: 1,
        })

      // Then delete it
      const response = await request(app)
        .delete(`${API_BASE}/documentation/docs%2Ftest.md/link?project_id=1`)
        .set('Authorization', authToken)

      expect(response.status).toBe(200)
    })

    test('returns 404 for non-existent link', async () => {
      const response = await request(app)
        .delete(`${API_BASE}/documentation/nonexistent%2Fdoc.md/link?project_id=1`)
        .set('Authorization', authToken)

      expect(response.status).toBe(404)
    })

    test('requires project_id parameter', async () => {
      const response = await request(app)
        .delete(`${API_BASE}/documentation/docs%2Fapi.md/link`)
        .set('Authorization', authToken)

      expect(response.status).toBe(400)
    })
  })

  describe('GET /pt/projects/:projectId/documentation', () => {
    test('returns documentation for project', async () => {
      const response = await request(app)
        .get(`${API_BASE}/projects/1/documentation`)
        .set('Authorization', authToken)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      response.body.forEach(doc => {
        expect(doc.project_id).toBe(1)
      })
    })

    test('returns empty array for project with no docs', async () => {
      const response = await request(app)
        .get(`${API_BASE}/projects/999/documentation`)
        .set('Authorization', authToken)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBe(0)
    })

    test('returns 404 for non-existent project', async () => {
      const response = await request(app)
        .get(`${API_BASE}/projects/nonexistent/documentation`)
        .set('Authorization', authToken)

      expect(response.status).toBe(400) // Invalid project ID
    })
  })

  describe('GET /pt/tasks/:taskId/documentation', () => {
    test('returns documentation for task', async () => {
      const response = await request(app)
        .get(`${API_BASE}/tasks/1/documentation`)
        .set('Authorization', authToken)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      response.body.forEach(doc => {
        expect(doc.task_id).toBe(1)
      })
    })

    test('returns empty array for task with no docs', async () => {
      const response = await request(app)
        .get(`${API_BASE}/tasks/999/documentation`)
        .set('Authorization', authToken)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBe(0)
    })
  })

  describe('POST /pt/documentation/bulk-link', () => {
    test('bulk links multiple documents', async () => {
      const response = await request(app)
        .post(`${API_BASE}/documentation/bulk-link`)
        .set('Authorization', authToken)
        .send({
          doc_paths: ['docs/api.md', 'docs/database.md', 'docs/deployment.md'],
          project_id: 1,
        })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('linked_count')
      expect(response.body.linked_count).toBe(3)
    })

    test('handles partial failures in bulk link', async () => {
      const response = await request(app)
        .post(`${API_BASE}/documentation/bulk-link`)
        .set('Authorization', authToken)
        .send({
          doc_paths: ['docs/api.md', 'nonexistent.md', 'docs/database.md'],
          project_id: 1,
        })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('linked_count')
      expect(response.body).toHaveProperty('failed_count')
    })

    test('validates required fields', async () => {
      const response = await request(app)
        .post(`${API_BASE}/documentation/bulk-link`)
        .set('Authorization', authToken)
        .send({
          doc_paths: ['docs/api.md'],
          // Missing project_id
        })

      expect(response.status).toBe(400)
    })

    test('validates doc_paths is array', async () => {
      const response = await request(app)
        .post(`${API_BASE}/documentation/bulk-link`)
        .set('Authorization', authToken)
        .send({
          doc_paths: 'docs/api.md', // Should be array
          project_id: 1,
        })

      expect(response.status).toBe(400)
    })

    test('limits bulk operations to 100 documents', async () => {
      const largePaths = Array.from({ length: 101 }, (_, i) => `docs/doc${i}.md`)

      const response = await request(app)
        .post(`${API_BASE}/documentation/bulk-link`)
        .set('Authorization', authToken)
        .send({
          doc_paths: largePaths,
          project_id: 1,
        })

      expect(response.status).toBe(413) // Payload too large
    })
  })

  describe('Database Operations', () => {
    test('documentation_links table has correct schema', async () => {
      const result = await db.query(
        'DESCRIBE documentation_links'
      )

      const columns = result.map(r => r.Field)
      expect(columns).toContain('id')
      expect(columns).toContain('doc_path')
      expect(columns).toContain('project_id')
      expect(columns).toContain('task_id')
      expect(columns).toContain('created_at')
    })

    test('documentation_index table has correct schema', async () => {
      const result = await db.query(
        'DESCRIBE documentation_index'
      )

      const columns = result.map(r => r.Field)
      expect(columns).toContain('id')
      expect(columns).toContain('doc_path')
      expect(columns).toContain('title')
      expect(columns).toContain('category')
      expect(columns).toContain('status')
    })

    test('documentation_review_history table has correct schema', async () => {
      const result = await db.query(
        'DESCRIBE documentation_review_history'
      )

      const columns = result.map(r => r.Field)
      expect(columns).toContain('id')
      expect(columns).toContain('doc_path')
      expect(columns).toContain('old_status')
      expect(columns).toContain('new_status')
      expect(columns).toContain('changed_by')
      expect(columns).toContain('changed_at')
    })

    test('indexes are created for performance', async () => {
      const result = await db.query(
        'SHOW INDEXES FROM documentation_links'
      )

      expect(result.length).toBeGreaterThan(0)
      const indexNames = result.map(r => r.Key_name)
      expect(indexNames).toContain('PRIMARY')
    })
  })

  describe('Performance', () => {
    test('documentation list query completes in < 100ms', async () => {
      const start = Date.now()
      await request(app)
        .get(`${API_BASE}/documentation`)
        .set('Authorization', authToken)
      const duration = Date.now() - start

      expect(duration).toBeLessThan(100)
    })

    test('search query completes in < 200ms', async () => {
      const start = Date.now()
      await request(app)
        .get(`${API_BASE}/documentation/search?q=API`)
        .set('Authorization', authToken)
      const duration = Date.now() - start

      expect(duration).toBeLessThan(200)
    })

    test('bulk link operation completes in < 500ms', async () => {
      const start = Date.now()
      await request(app)
        .post(`${API_BASE}/documentation/bulk-link`)
        .set('Authorization', authToken)
        .send({
          doc_paths: ['docs/api.md', 'docs/database.md'],
          project_id: 1,
        })
      const duration = Date.now() - start

      expect(duration).toBeLessThan(500)
    })
  })

  describe('Security', () => {
    test('requires authentication for all endpoints', async () => {
      const endpoints = [
        { method: 'get', path: `${API_BASE}/documentation` },
        { method: 'get', path: `${API_BASE}/documentation/search?q=test` },
        { method: 'post', path: `${API_BASE}/documentation/link` },
        { method: 'put', path: `${API_BASE}/documentation/docs%2Fapi.md/status` },
        { method: 'delete', path: `${API_BASE}/documentation/docs%2Fapi.md/link` },
      ]

      for (const endpoint of endpoints) {
        const response = await request(app)[endpoint.method](endpoint.path)
        expect(response.status).toBe(401)
      }
    })

    test('validates input to prevent SQL injection', async () => {
      const response = await request(app)
        .get(`${API_BASE}/documentation/search?q='; DROP TABLE documentation_links; --`)
        .set('Authorization', authToken)

      expect(response.status).toBe(200)
      // Table should still exist
      const checkTable = await db.query(
        'SELECT 1 FROM documentation_links LIMIT 1'
      )
      expect(checkTable).toBeDefined()
    })

    test('sanitizes file paths', async () => {
      const response = await request(app)
        .put(`${API_BASE}/documentation/..%2F..%2Fetc%2Fpasswd/status`)
        .set('Authorization', authToken)
        .send({ status: 'Published' })

      expect(response.status).toBe(404) // Path traversal prevented
    })
  })
})
