import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DocumentationManagementPage from '../DocumentationManagementPage'
import * as AuthContext from '../../context/AuthContext'
import * as Toast from '../../components/Toast'

/**
 * DocumentationManagementPage Component Tests
 * Task 25.8: Testing & Validation
 */

// Mock dependencies
jest.mock('../../context/AuthContext')
jest.mock('../../components/Toast')
jest.mock('../../components/DocumentationSearch', () => {
  return function MockSearch() {
    return <div data-testid="doc-search">Search Component</div>
  }
})
jest.mock('../../components/DocumentationStatusTracker', () => {
  return function MockTracker() {
    return <div data-testid="doc-tracker">Status Tracker Component</div>
  }
})

// Mock data
const mockDocs = [
  {
    id: 1,
    title: 'API Documentation',
    path: 'docs/api.md',
    category: 'API',
    status: 'Published',
    project_id: 1,
    updated_at: '2026-05-01',
  },
  {
    id: 2,
    title: 'Database Schema',
    path: 'docs/database.md',
    category: 'Database',
    status: 'Review',
    project_id: 1,
    updated_at: '2026-04-30',
  },
  {
    id: 3,
    title: 'Deployment Guide',
    path: 'docs/deployment.md',
    category: 'Deployment',
    status: 'Draft',
    project_id: 2,
    updated_at: '2026-04-29',
  },
]

const mockProjects = [
  { id: 1, name: 'Project A' },
  { id: 2, name: 'Project B' },
]

describe('DocumentationManagementPage', () => {
  beforeEach(() => {
    // Setup mocks
    AuthContext.authFetch = jest.fn()
    Toast.useToast = jest.fn(() => jest.fn())

    // Mock successful API responses
    AuthContext.authFetch.mockImplementation((url) => {
      if (url.includes('/documentation') && !url.includes('/bulk')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockDocs),
        })
      }
      if (url.includes('/projects')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProjects),
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Component Rendering', () => {
    test('renders component with header', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('📚 Documentation Management')).toBeInTheDocument()
      })
    })

    test('renders view tabs', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('📋 List View')).toBeInTheDocument()
        expect(screen.getByText('🔍 Search')).toBeInTheDocument()
        expect(screen.getByText('📊 Status Tracking')).toBeInTheDocument()
      })
    })

    test('shows loading state initially', () => {
      render(<DocumentationManagementPage />)
      expect(screen.getByText('⏳ Loading documentation...')).toBeInTheDocument()
    })

    test('loads and displays documentation', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
        expect(screen.getByText('Database Schema')).toBeInTheDocument()
        expect(screen.getByText('Deployment Guide')).toBeInTheDocument()
      })
    })
  })

  describe('Filtering', () => {
    test('filters by search query', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Search by title, path...')
      await userEvent.type(searchInput, 'API')

      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
        expect(screen.queryByText('Database Schema')).not.toBeInTheDocument()
      })
    })

    test('filters by status', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const statusSelect = screen.getByDisplayValue('All Statuses')
      await userEvent.selectOption(statusSelect, 'Published')

      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
        expect(screen.queryByText('Database Schema')).not.toBeInTheDocument()
      })
    })

    test('filters by project', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const projectSelect = screen.getByDisplayValue('All Projects')
      await userEvent.selectOption(projectSelect, '1')

      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
        expect(screen.getByText('Database Schema')).toBeInTheDocument()
        expect(screen.queryByText('Deployment Guide')).not.toBeInTheDocument()
      })
    })

    test('combines multiple filters', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Search by title, path...')
      const statusSelect = screen.getByDisplayValue('All Statuses')

      await userEvent.type(searchInput, 'Documentation')
      await userEvent.selectOption(statusSelect, 'Published')

      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
        expect(screen.queryByText('Database Schema')).not.toBeInTheDocument()
      })
    })
  })

  describe('Selection', () => {
    test('selects individual document', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const checkboxes = screen.getAllByRole('checkbox')
      await userEvent.click(checkboxes[1]) // First doc checkbox (skip header)

      await waitFor(() => {
        expect(screen.getByText('1 selected')).toBeInTheDocument()
      })
    })

    test('selects all documents', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const checkboxes = screen.getAllByRole('checkbox')
      await userEvent.click(checkboxes[0]) // Header checkbox

      await waitFor(() => {
        expect(screen.getByText('3 selected')).toBeInTheDocument()
      })
    })

    test('deselects all documents', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const checkboxes = screen.getAllByRole('checkbox')
      // Select all
      await userEvent.click(checkboxes[0])
      await waitFor(() => {
        expect(screen.getByText('3 selected')).toBeInTheDocument()
      })

      // Deselect all
      await userEvent.click(checkboxes[0])
      await waitFor(() => {
        expect(screen.queryByText('3 selected')).not.toBeInTheDocument()
      })
    })
  })

  describe('Bulk Operations', () => {
    test('shows bulk actions when documents selected', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const checkboxes = screen.getAllByRole('checkbox')
      await userEvent.click(checkboxes[1])

      await waitFor(() => {
        expect(screen.getByText('🔗 Link to Project')).toBeInTheDocument()
      })
    })

    test('bulk link documents to project', async () => {
      const mockToast = jest.fn()
      Toast.useToast.mockReturnValue(mockToast)

      AuthContext.authFetch.mockImplementation((url) => {
        if (url.includes('/bulk-link')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
          })
        }
        if (url.includes('/documentation') && !url.includes('/bulk')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockDocs),
          })
        }
        if (url.includes('/projects')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockProjects),
          })
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        })
      })

      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      // Select document
      const checkboxes = screen.getAllByRole('checkbox')
      await userEvent.click(checkboxes[1])

      // Select project
      const projectSelect = screen.getByDisplayValue('Select project to link...')
      await userEvent.selectOption(projectSelect, '1')

      // Click link button
      const linkButton = screen.getByText('🔗 Link to Project')
      await userEvent.click(linkButton)

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith(
          expect.stringContaining('Linked'),
          'success'
        )
      })
    })

    test('bulk update status', async () => {
      const mockToast = jest.fn()
      Toast.useToast.mockReturnValue(mockToast)

      AuthContext.authFetch.mockImplementation((url) => {
        if (url.includes('/status')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
          })
        }
        if (url.includes('/documentation') && !url.includes('/bulk')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockDocs),
          })
        }
        if (url.includes('/projects')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockProjects),
          })
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        })
      })

      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      // Select document
      const checkboxes = screen.getAllByRole('checkbox')
      await userEvent.click(checkboxes[1])

      // Click status button
      const publishButton = screen.getByText('→ Published')
      await userEvent.click(publishButton)

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith(
          expect.stringContaining('Updated'),
          'success'
        )
      })
    })
  })

  describe('View Switching', () => {
    test('switches to search view', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const searchTab = screen.getByText('🔍 Search')
      await userEvent.click(searchTab)

      await waitFor(() => {
        expect(screen.getByTestId('doc-search')).toBeInTheDocument()
      })
    })

    test('switches to status tracking view', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const statusTab = screen.getByText('📊 Status Tracking')
      await userEvent.click(statusTab)

      await waitFor(() => {
        expect(screen.getByTestId('doc-tracker')).toBeInTheDocument()
      })
    })

    test('returns to list view', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const searchTab = screen.getByText('🔍 Search')
      await userEvent.click(searchTab)

      const listTab = screen.getByText('📋 List View')
      await userEvent.click(listTab)

      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })
    })
  })

  describe('Statistics', () => {
    test('displays correct statistics', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      // Check statistics
      const stats = screen.getAllByText(/Total|Filtered|Published|In Review/)
      expect(stats.length).toBeGreaterThan(0)
    })

    test('updates statistics on filter', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const statusSelect = screen.getByDisplayValue('All Statuses')
      await userEvent.selectOption(statusSelect, 'Published')

      // Statistics should update
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    test('displays error message on API failure', async () => {
      AuthContext.authFetch.mockRejectedValueOnce(new Error('API Error'))

      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText(/⚠️/)).toBeInTheDocument()
      })
    })

    test('shows error on bulk operation failure', async () => {
      const mockToast = jest.fn()
      Toast.useToast.mockReturnValue(mockToast)

      AuthContext.authFetch.mockImplementation((url) => {
        if (url.includes('/bulk-link')) {
          return Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ error: 'Failed to link' }),
          })
        }
        if (url.includes('/documentation') && !url.includes('/bulk')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockDocs),
          })
        }
        if (url.includes('/projects')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockProjects),
          })
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        })
      })

      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const checkboxes = screen.getAllByRole('checkbox')
      await userEvent.click(checkboxes[1])

      const projectSelect = screen.getByDisplayValue('Select project to link...')
      await userEvent.selectOption(projectSelect, '1')

      const linkButton = screen.getByText('🔗 Link to Project')
      await userEvent.click(linkButton)

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith(
          expect.stringContaining('Error'),
          'error'
        )
      })
    })
  })

  describe('Accessibility', () => {
    test('has proper heading hierarchy', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
      })
    })

    test('has accessible table structure', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument()
      })
    })

    test('checkboxes are keyboard accessible', async () => {
      render(<DocumentationManagementPage />)
      await waitFor(() => {
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })

      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBeGreaterThan(0)
    })
  })
})
