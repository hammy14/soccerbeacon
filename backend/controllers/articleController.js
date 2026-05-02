const pool = require('../config/database');
const slugify = require('slugify');

// Get all articles with pagination and filtering
exports.getAllArticles = async (req, res) => {
  try {
    const { page = 1, limit = 10, league_id, status = 'published' } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (league_id) {
      query += ' AND league_id = ?';
      params.push(league_id);
    }

    query += ' ORDER BY published_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const connection = await pool.getConnection();
    const [articles] = await connection.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM articles WHERE 1=1';
    const countParams = [];

    if (status) {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }

    if (league_id) {
      countQuery += ' AND league_id = ?';
      countParams.push(league_id);
    }

    const [countResult] = await connection.query(countQuery, countParams);
    connection.release();

    res.json({
      articles,
      pagination: {
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(countResult[0].total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};

// Get single article by slug
exports.getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const connection = await pool.getConnection();
    const [articles] = await connection.query(
      'SELECT * FROM articles WHERE slug = ?',
      [slug]
    );

    if (articles.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Article not found' });
    }

    const article = articles[0];

    // Increment view count
    await connection.query(
      'UPDATE articles SET view_count = view_count + 1 WHERE id = ?',
      [article.id]
    );

    // Get related articles
    const [relatedArticles] = await connection.query(
      `SELECT * FROM articles 
       WHERE league_id = ? AND id != ? AND status = 'published'
       ORDER BY published_at DESC LIMIT 3`,
      [article.league_id, article.id]
    );

    connection.release();

    res.json({
      article,
      relatedArticles,
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
};

// Get article by ID
exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();
    const [articles] = await connection.query(
      'SELECT * FROM articles WHERE id = ?',
      [id]
    );
    connection.release();

    if (articles.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(articles[0]);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
};

// Create new article
exports.createArticle = async (req, res) => {
  try {
    const { title, content, excerpt, league_id, featured_image, status = 'draft' } = req.body;
    const author_id = req.user?.id || 1; // Default to admin if not provided

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Generate slug from title
    const slug = slugify(title, { lower: true, strict: true });

    const connection = await pool.getConnection();

    // Check if slug already exists
    const [existing] = await connection.query(
      'SELECT id FROM articles WHERE slug = ?',
      [slug]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ error: 'Article with this title already exists' });
    }

    const [result] = await connection.query(
      `INSERT INTO articles (title, slug, content, excerpt, author_id, league_id, featured_image, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        content,
        excerpt || null,
        author_id,
        league_id || null,
        featured_image || null,
        status,
        status === 'published' ? new Date() : null,
      ]
    );

    connection.release();

    res.status(201).json({
      id: result.insertId,
      title,
      slug,
      message: 'Article created successfully',
    });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
};

// Update article
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, league_id, featured_image, status } = req.body;

    const connection = await pool.getConnection();

    // Check if article exists
    const [articles] = await connection.query(
      'SELECT * FROM articles WHERE id = ?',
      [id]
    );

    if (articles.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Article not found' });
    }

    const article = articles[0];
    let slug = article.slug;

    // Generate new slug if title changed
    if (title && title !== article.title) {
      slug = slugify(title, { lower: true, strict: true });

      // Check if new slug already exists
      const [existing] = await connection.query(
        'SELECT id FROM articles WHERE slug = ? AND id != ?',
        [slug, id]
      );

      if (existing.length > 0) {
        connection.release();
        return res.status(400).json({ error: 'Article with this title already exists' });
      }
    }

    const updateFields = [];
    const updateValues = [];

    if (title) {
      updateFields.push('title = ?');
      updateValues.push(title);
    }
    if (content) {
      updateFields.push('content = ?');
      updateValues.push(content);
    }
    if (excerpt !== undefined) {
      updateFields.push('excerpt = ?');
      updateValues.push(excerpt || null);
    }
    if (league_id !== undefined) {
      updateFields.push('league_id = ?');
      updateValues.push(league_id || null);
    }
    if (featured_image !== undefined) {
      updateFields.push('featured_image = ?');
      updateValues.push(featured_image || null);
    }
    if (status) {
      updateFields.push('status = ?');
      updateValues.push(status);

      // Set published_at if publishing
      if (status === 'published' && !article.published_at) {
        updateFields.push('published_at = ?');
        updateValues.push(new Date());
      }
    }

    if (updateFields.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateFields.push('slug = ?');
    updateValues.push(slug);
    updateValues.push(id);

    await connection.query(
      `UPDATE articles SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    connection.release();

    res.json({
      id,
      slug,
      message: 'Article updated successfully',
    });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
};

// Delete article
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    // Check if article exists
    const [articles] = await connection.query(
      'SELECT * FROM articles WHERE id = ?',
      [id]
    );

    if (articles.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Article not found' });
    }

    await connection.query('DELETE FROM articles WHERE id = ?', [id]);
    connection.release();

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
};

// Get articles by league
exports.getArticlesByLeague = async (req, res) => {
  try {
    const { league_id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const connection = await pool.getConnection();
    const [articles] = await connection.query(
      `SELECT * FROM articles 
       WHERE league_id = ? AND status = 'published'
       ORDER BY published_at DESC
       LIMIT ? OFFSET ?`,
      [league_id, parseInt(limit), offset]
    );

    const [countResult] = await connection.query(
      'SELECT COUNT(*) as total FROM articles WHERE league_id = ? AND status = ?',
      [league_id, 'published']
    );

    connection.release();

    res.json({
      articles,
      pagination: {
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(countResult[0].total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching articles by league:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};

// Search articles
exports.searchArticles = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q || q.length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    const offset = (page - 1) * limit;
    const searchTerm = `%${q}%`;

    const connection = await pool.getConnection();
    const [articles] = await connection.query(
      `SELECT * FROM articles 
       WHERE (title LIKE ? OR content LIKE ? OR excerpt LIKE ?) AND status = 'published'
       ORDER BY published_at DESC
       LIMIT ? OFFSET ?`,
      [searchTerm, searchTerm, searchTerm, parseInt(limit), offset]
    );

    const [countResult] = await connection.query(
      `SELECT COUNT(*) as total FROM articles 
       WHERE (title LIKE ? OR content LIKE ? OR excerpt LIKE ?) AND status = 'published'`,
      [searchTerm, searchTerm, searchTerm]
    );

    connection.release();

    res.json({
      articles,
      pagination: {
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(countResult[0].total / limit),
      },
    });
  } catch (error) {
    console.error('Error searching articles:', error);
    res.status(500).json({ error: 'Failed to search articles' });
  }
};
