import React, { useState, useEffect, useCallback } from 'react'
import { authFetch } from '../../context/AuthContext'
import { useToast } from './Toast'
import DocumentationSearch from './DocumentationSearch'
import DocumentationStatusTracker from './DocumentationStatusTracker'

/**
 * DocumentationManagementPage Component
 * Dedicated management interface for documentation with search, filter, status tracking, and bulk operations
 * Task 25.7: Create Documentation Management Page
 */
export default function DocumentationManagementPage() {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [view, setView] = useState('list') // 'list', 'search', 'status'
  const [selectedDocs, setSelectedDocs] = useState(new Set())
  const [filterProject, setFilterProject] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [bulkAction, setBulkAction] = useState('')
  const [bulkProjectId, setBulkProjectId] = useState('')
  const [projects, setProjects] = useState([])
  const [bulkProcessing, setBulkProcessing] = useState(false)
  const showToast = useToast()

  const API = `${process.env.REACT_APP_API_BASE || 'http://localhost:3001'}/api/pt`

  // Load documentation list
  const loadDocumentation = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await authFetch(`${API}/documentation`)
      const data = await response.json()
      setDocs(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
      setDocs([])
    } finally {
      setLoading(false)
    }
  }, [API])

  // Load projects for bulk operations
  const loadProjects = useCallback(async () => {
    try {
      const response = await authFetch(`${API}/projects`)
      const data = await response.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to load projects:', err)
    }
  }, [API])

  useEffect(() => {
    loadDocumentation()
    loadProjects()
  }, [loadDocumentation, loadProjects])

  // Filter documentation based on criteria
  const filteredDocs = docs.filter(doc => {
    const matchesProject = !filterProject || doc.project_id === parseInt(filterProject)
    const matchesStatus = !filterStatus || doc.status === filterStatus
    const matchesCategory = !filterCategory || doc.category === filterCategory
    const matchesSearch = !searchQuery || 
      doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.path?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesProject && matchesStatus && matchesCategory && matchesSearch
  })

  // Toggle document selection
  const toggleDocSelection = (docId) => {
    const newSelected = new Set(selectedDocs)
    if (newSelected.has(docId)) {
      newSelected.delete(docId)
    } else {
      newSelected.add(docId)
    }
    setSelectedDocs(newSelected)
  }

  // Toggle all documents
  const toggleAllDocs = () => {
    if (selectedDocs.size === filteredDocs.length) {
      setSelectedDocs(new Set())
    } else {
      setSelectedDocs(new Set(filteredDocs.map(d => d.id)))
    }
  }

  // Bulk link documentation
  const handleBulkLink = async () => {
    if (selectedDocs.size === 0 || !bulkProjectId) {
      showToast('Please select documents and a project', 'error')
      return
    }

    setBulkProcessing(true)
    try {
      const selectedDocPaths = filteredDocs
        .filter(d => selectedDocs.has(d.id))
        .map(d => d.path)

      const response = await authFetch(`${API}/documentation/bulk-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doc_paths: selectedDocPaths,
          project_id: parseInt(bulkProjectId),
        }),
      })

      if (!response.ok) throw new Error('Failed to link documentation')

      showToast(`Linked ${selectedDocs.size} documents to project`, 'success')
      setSelectedDocs(new Set())
      setBulkProjectId('')
      loadDocumentation()
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error')
    } finally {
      setBulkProcessing(false)
    }
  }

  // Bulk update status
  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedDocs.size === 0) {
      showToast('Please select documents', 'error')
      return
    }

    setBulkProcessing(true)
    try {
      const updates = filteredDocs
        .filter(d => selectedDocs.has(d.id))
        .map(d => ({
          doc_path: d.path,
          status: newStatus,
        }))

      for (const update of updates) {
        await authFetch(`${API}/documentation/${encodeURIComponent(update.doc_path)}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: update.status }),
        })
      }

      showToast(`Updated ${selectedDocs.size} documents to ${newStatus}`, 'success')
      setSelectedDocs(new Set())
      loadDocumentation()
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error')
    } finally {
      setBulkProcessing(false)
    }
  }

  // Get unique categories
  const categories = [...new Set(docs.map(d => d.category).filter(Boolean))]
  const statuses = ['Draft', 'Review', 'Published', 'Archived']

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        ⏳ Loading documentation...
      </div>
    )
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>📚 Documentation Management</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Manage, search, and organize documentation across all projects
        </p>
      </div>

      {/* View Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <button
          onClick={() => setView('list')}
          style={{
            padding: '0.5rem 1rem',
            background: view === 'list' ? 'var(--blue)' : 'transparent',
            color: view === 'list' ? 'white' : 'var(--text)',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          📋 List View
        </button>
        <button
          onClick={() => setView('search')}
          style={{
            padding: '0.5rem 1rem',
            background: view === 'search' ? 'var(--blue)' : 'transparent',
            color: view === 'search' ? 'white' : 'var(--text)',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          🔍 Search
        </button>
        <button
          onClick={() => setView('status')}
          style={{
            padding: '0.5rem 1rem',
            background: view === 'status' ? 'var(--blue)' : 'transparent',
            color: view === 'status' ? 'white' : 'var(--text)',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          📊 Status Tracking
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '0.75rem 1rem',
          background: 'rgba(229, 62, 62, 0.1)',
          border: '1px solid var(--red)',
          borderRadius: 6,
          color: 'var(--red)',
          marginBottom: '1rem',
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div>
          {/* Filters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            padding: '1rem',
            background: 'var(--gray-50)',
            borderRadius: 6,
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                Search
              </label>
              <input
                type="text"
                placeholder="Search by title, path..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  fontSize: '0.85rem',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                Project
              </label>
              <select
                value={filterProject}
                onChange={e => setFilterProject(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  fontSize: '0.85rem',
                }}
              >
                <option value="">All Projects</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                Status
              </label>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  fontSize: '0.85rem',
                }}
              >
                <option value="">All Statuses</option>
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                Category
              </label>
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  fontSize: '0.85rem',
                }}
              >
                <option value="">All Categories</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedDocs.size > 0 && (
            <div style={{
              padding: '1rem',
              background: 'rgba(2, 113, 235, 0.06)',
              border: '1px solid var(--blue)',
              borderRadius: 6,
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              <span style={{ fontWeight: 600, color: 'var(--blue)' }}>
                {selectedDocs.size} selected
              </span>
              <select
                value={bulkProjectId}
                onChange={e => setBulkProjectId(e.target.value)}
                style={{
                  padding: '0.4rem 0.6rem',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  fontSize: '0.85rem',
                }}
              >
                <option value="">Select project to link...</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <button
                onClick={handleBulkLink}
                disabled={bulkProcessing || !bulkProjectId}
                style={{
                  padding: '0.4rem 0.75rem',
                  background: 'var(--blue)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  opacity: bulkProcessing || !bulkProjectId ? 0.5 : 1,
                }}
              >
                🔗 Link to Project
              </button>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                {['Draft', 'Review', 'Published', 'Archived'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleBulkStatusUpdate(status)}
                    disabled={bulkProcessing}
                    style={{
                      padding: '0.4rem 0.6rem',
                      background: 'var(--gray-100)',
                      border: '1px solid var(--border)',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      opacity: bulkProcessing ? 0.5 : 1,
                    }}
                  >
                    → {status}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Documentation Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.85rem',
              background: 'white',
              borderRadius: 6,
              overflow: 'hidden',
              border: '1px solid var(--border)',
            }}>
              <thead>
                <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', width: 40 }}>
                    <input
                      type="checkbox"
                      checked={selectedDocs.size === filteredDocs.length && filteredDocs.length > 0}
                      onChange={toggleAllDocs}
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)' }}>Title</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)' }}>Path</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)' }}>Category</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)' }}>Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No documentation found
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map(doc => (
                    <tr
                      key={doc.id}
                      style={{
                        borderBottom: '1px solid var(--border)',
                        background: selectedDocs.has(doc.id) ? 'rgba(2, 113, 235, 0.06)' : 'white',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => !selectedDocs.has(doc.id) && (e.currentTarget.style.background = 'var(--gray-50)')}
                      onMouseLeave={e => !selectedDocs.has(doc.id) && (e.currentTarget.style.background = 'white')}
                    >
                      <td style={{ padding: '0.75rem' }}>
                        <input
                          type="checkbox"
                          checked={selectedDocs.has(doc.id)}
                          onChange={() => toggleDocSelection(doc.id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td style={{ padding: '0.75rem', fontWeight: 500 }}>{doc.title || 'Untitled'}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                        {doc.path}
                      </td>
                      <td style={{ padding: '0.75rem', fontSize: '0.8rem' }}>
                        {doc.category ? (
                          <span style={{
                            display: 'inline-block',
                            padding: '0.2rem 0.5rem',
                            background: 'var(--blue)22',
                            color: 'var(--blue)',
                            borderRadius: 3,
                          }}>
                            {doc.category}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '0.2rem 0.5rem',
                          background: doc.status === 'Published' ? 'var(--green)22' : 'var(--yellow)22',
                          color: doc.status === 'Published' ? 'var(--green)' : 'var(--orange)',
                          borderRadius: 3,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}>
                          {doc.status || 'Draft'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        {doc.updated_at ? new Date(doc.updated_at).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'var(--gray-50)',
            borderRadius: 6,
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Total
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--blue)' }}>
                {docs.length}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Filtered
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)' }}>
                {filteredDocs.length}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Published
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--green)' }}>
                {docs.filter(d => d.status === 'Published').length}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                In Review
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--orange)' }}>
                {docs.filter(d => d.status === 'Review').length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search View */}
      {view === 'search' && (
        <div>
          <DocumentationSearch onSelectDoc={(doc) => {
            // Handle doc selection
            console.log('Selected doc:', doc)
          }} />
        </div>
      )}

      {/* Status Tracking View */}
      {view === 'status' && (
        <div>
          <DocumentationStatusTracker docPath="" projectId="" />
        </div>
      )}
    </div>
  )
}
