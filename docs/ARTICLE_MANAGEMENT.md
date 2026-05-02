# Article Management System

## Overview

The article management system allows you to create, read, update, and delete articles through the API. Articles can be associated with leagues and have multiple statuses (draft, published, archived).

## Database Schema

### Articles Table

```sql
CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content LONGTEXT NOT NULL,
  excerpt VARCHAR(500),
  author_id INT,
  league_id INT,
  featured_image VARCHAR(255),
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  published_at DATETIME,
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## API Endpoints

### 1. Get All Articles

**Endpoint**: `GET /api/articles`

**Query Parameters**:
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of articles per page (default: 10)
- `league_id` (optional): Filter by league ID
- `status` (optional): Filter by status (draft, published, archived) (default: published)

**Example Request**:
```bash
curl "http://localhost:5000/api/articles?page=1&limit=10&status=published"
```

**Response**:
```json
{
  "articles": [
    {
      "id": 1,
      "title": "Premier League 2024-25 Season Preview",
      "slug": "premier-league-2024-25-preview",
      "content": "<h2>What to Expect This Season</h2>...",
      "excerpt": "Get ready for an exciting Premier League season...",
      "author_id": 1,
      "league_id": 1,
      "featured_image": "https://...",
      "status": "published",
      "published_at": "2024-01-15T10:00:00Z",
      "view_count": 150,
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

---

### 2. Get Article by Slug

**Endpoint**: `GET /api/articles/:slug`

**Example Request**:
```bash
curl "http://localhost:5000/api/articles/premier-league-2024-25-preview"
```

**Response**:
```json
{
  "article": {
    "id": 1,
    "title": "Premier League 2024-25 Season Preview",
    "slug": "premier-league-2024-25-preview",
    "content": "<h2>What to Expect This Season</h2>...",
    "excerpt": "Get ready for an exciting Premier League season...",
    "author_id": 1,
    "league_id": 1,
    "featured_image": "https://...",
    "status": "published",
    "published_at": "2024-01-15T10:00:00Z",
    "view_count": 151,
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  },
  "relatedArticles": [
    {
      "id": 2,
      "title": "Manchester United's Path to Glory: Season Analysis",
      "slug": "manchester-united-season-analysis",
      ...
    }
  ]
}
```

**Note**: View count is automatically incremented when an article is fetched.

---

### 3. Get Articles by League

**Endpoint**: `GET /api/articles/league/:league_id`

**Query Parameters**:
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of articles per page (default: 10)

**Example Request**:
```bash
curl "http://localhost:5000/api/articles/league/1?page=1&limit=5"
```

**Response**:
```json
{
  "articles": [...],
  "pagination": {
    "total": 12,
    "page": 1,
    "limit": 5,
    "pages": 3
  }
}
```

---

### 4. Search Articles

**Endpoint**: `GET /api/articles/search`

**Query Parameters**:
- `q` (required): Search query (minimum 2 characters)
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 10)

**Example Request**:
```bash
curl "http://localhost:5000/api/articles/search?q=Manchester&page=1&limit=10"
```

**Response**:
```json
{
  "articles": [...],
  "pagination": {
    "total": 3,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

---

### 5. Create Article

**Endpoint**: `POST /api/articles`

**Request Body**:
```json
{
  "title": "New Article Title",
  "content": "<h2>Article Content</h2><p>This is the article content...</p>",
  "excerpt": "Brief summary of the article",
  "league_id": 1,
  "featured_image": "https://example.com/image.jpg",
  "status": "draft"
}
```

**Required Fields**:
- `title`: Article title (string)
- `content`: Article content in HTML format (string)

**Optional Fields**:
- `excerpt`: Brief summary (string, max 500 characters)
- `league_id`: Associated league ID (integer)
- `featured_image`: URL to featured image (string)
- `status`: Article status (draft, published, archived) (default: draft)

**Example Request**:
```bash
curl -X POST "http://localhost:5000/api/articles" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Article Title",
    "content": "<h2>Article Content</h2><p>This is the article content...</p>",
    "excerpt": "Brief summary",
    "league_id": 1,
    "status": "draft"
  }'
```

**Response**:
```json
{
  "id": 11,
  "title": "New Article Title",
  "slug": "new-article-title",
  "message": "Article created successfully"
}
```

**Note**: Slug is automatically generated from the title using slugify.

---

### 6. Update Article

**Endpoint**: `PUT /api/articles/:id`

**Request Body** (all fields optional):
```json
{
  "title": "Updated Title",
  "content": "<h2>Updated Content</h2>...",
  "excerpt": "Updated excerpt",
  "league_id": 2,
  "featured_image": "https://example.com/new-image.jpg",
  "status": "published"
}
```

**Example Request**:
```bash
curl -X PUT "http://localhost:5000/api/articles/1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "status": "published"
  }'
```

**Response**:
```json
{
  "id": 1,
  "slug": "updated-title",
  "message": "Article updated successfully"
}
```

**Note**: 
- If title is changed, slug is automatically regenerated
- If status is changed to "published" and article wasn't published before, published_at is set to current time
- Slug uniqueness is validated

---

### 7. Delete Article

**Endpoint**: `DELETE /api/articles/:id`

**Example Request**:
```bash
curl -X DELETE "http://localhost:5000/api/articles/1"
```

**Response**:
```json
{
  "message": "Article deleted successfully"
}
```

---

## Article Content Format

Articles use HTML format for content. Here are some recommended HTML structures:

### Basic Article Structure

```html
<h2>Main Heading</h2>
<p>Introduction paragraph with key information.</p>

<h3>Subheading</h3>
<p>Content paragraph with details.</p>

<ul>
  <li>Bullet point 1</li>
  <li>Bullet point 2</li>
  <li>Bullet point 3</li>
</ul>

<h3>Another Section</h3>
<p>More content here.</p>

<blockquote>
  <p>Important quote or highlight</p>
</blockquote>

<p>Conclusion paragraph.</p>
```

### With Images

```html
<h2>Article Title</h2>
<img src="https://example.com/image.jpg" alt="Image description" style="max-width: 100%; height: auto;">
<p>Content after image.</p>
```

### With Links

```html
<p>Read more about <a href="/articles/related-article">related topic</a>.</p>
```

---

## Article Statuses

### Draft
- Not visible to public
- Can be edited and published later
- Used for work in progress

### Published
- Visible to public
- Appears in article listings
- Can be edited (updates published_at if needed)
- View count is tracked

### Archived
- Not visible to public
- Kept for historical records
- Can be republished if needed

---

## Best Practices

### 1. SEO Optimization
- Use descriptive titles (50-60 characters)
- Write compelling excerpts (150-160 characters)
- Include relevant keywords naturally
- Use proper heading hierarchy (h2, h3, h4)

### 2. Content Structure
- Start with a clear introduction
- Use subheadings to break up content
- Keep paragraphs short (2-3 sentences)
- Use bullet points for lists
- End with a strong conclusion

### 3. Images
- Use high-quality images
- Optimize image size (compress before uploading)
- Always include alt text
- Use descriptive filenames

### 4. Internal Linking
- Link to related articles
- Use descriptive anchor text
- Avoid excessive linking (2-3 per article)

### 5. Publishing
- Always set excerpt for better previews
- Associate with relevant league
- Use featured image for visual appeal
- Publish during peak traffic times

---

## Article Templates

### League Preview Template

```html
<h2>What to Expect This Season</h2>
<p>Introduction about the league and season.</p>

<h3>Key Teams</h3>
<p>Discuss the main contenders.</p>

<h3>Notable Transfers</h3>
<p>Highlight important player movements.</p>

<h3>Tactical Trends</h3>
<p>Discuss emerging tactical approaches.</p>

<h3>Predictions</h3>
<p>Make predictions for the season.</p>
```

### Team Profile Template

```html
<h2>Team Overview</h2>
<p>Brief history and background.</p>

<h3>Current Squad</h3>
<p>Key players and their roles.</p>

<h3>Recent Performance</h3>
<p>Recent form and achievements.</p>

<h3>Season Outlook</h3>
<p>Expectations for the upcoming season.</p>
```

### Match Analysis Template

```html
<h2>Pre-Match Analysis</h2>
<p>Context and importance of the match.</p>

<h3>Team Form</h3>
<p>Recent performance of both teams.</p>

<h3>Key Matchups</h3>
<p>Important player or tactical matchups.</p>

<h3>Prediction</h3>
<p>Match prediction and reasoning.</p>
```

---

## Error Handling

### Common Errors

**400 Bad Request**
```json
{
  "error": "Title and content are required"
}
```

**404 Not Found**
```json
{
  "error": "Article not found"
}
```

**500 Internal Server Error**
```json
{
  "error": "Failed to create article"
}
```

---

## Performance Tips

1. **Pagination**: Always use pagination for list endpoints to reduce load
2. **Caching**: Cache frequently accessed articles
3. **Search**: Use full-text search for better performance
4. **Indexing**: Database indexes are set on slug, status, and published_at
5. **View Count**: View count is incremented efficiently with UPDATE query

---

## Future Enhancements

- [ ] Article categories/tags
- [ ] Author profiles
- [ ] Comments system
- [ ] Article scheduling
- [ ] Revision history
- [ ] Collaborative editing
- [ ] Article recommendations
- [ ] Social media integration
- [ ] Email notifications
- [ ] Article analytics

---

## Testing

### Test Creating an Article

```bash
curl -X POST "http://localhost:5000/api/articles" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Article",
    "content": "<h2>Test</h2><p>This is a test article.</p>",
    "excerpt": "Test excerpt",
    "league_id": 1,
    "status": "published"
  }'
```

### Test Getting All Articles

```bash
curl "http://localhost:5000/api/articles?status=published&limit=5"
```

### Test Searching

```bash
curl "http://localhost:5000/api/articles/search?q=Manchester"
```

### Test Getting by Slug

```bash
curl "http://localhost:5000/api/articles/test-article"
```

### Test Updating

```bash
curl -X PUT "http://localhost:5000/api/articles/1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Test Article"
  }'
```

### Test Deleting

```bash
curl -X DELETE "http://localhost:5000/api/articles/1"
```

---

## Next Steps

1. Set up database and run schema.sql
2. Run seeds.sql to populate initial data
3. Start backend server: `npm run dev`
4. Test endpoints using curl or Postman
5. Integrate with frontend in Phase 3
6. Set up admin portal for article management
