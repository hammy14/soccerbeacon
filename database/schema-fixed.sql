-- Create Database
CREATE DATABASE IF NOT EXISTS soccer_site;
USE soccer_site;

-- Users Table (must be first since articles references it)
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
  is_active BOOLEAN DEFAULT TRUE,
  last_login DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- Leagues Table
CREATE TABLE IF NOT EXISTS leagues (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  country VARCHAR(100) NOT NULL,
  logo_url VARCHAR(255),
  description TEXT,
  founded_year INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_country (country)
);

-- Teams Table
CREATE TABLE IF NOT EXISTS teams (
  id INT PRIMARY KEY AUTO_INCREMENT,
  league_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  logo_url VARCHAR(255),
  founded_year INT,
  city VARCHAR(100),
  stadium VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE CASCADE,
  INDEX idx_league_id (league_id),
  UNIQUE KEY unique_team_league (league_id, name)
);

-- Players Table
CREATE TABLE IF NOT EXISTS players (
  id INT PRIMARY KEY AUTO_INCREMENT,
  team_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(50),
  number INT,
  nationality VARCHAR(100),
  date_of_birth DATE,
  height INT,
  weight INT,
  photo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  INDEX idx_team_id (team_id)
);

-- Matches Table
CREATE TABLE IF NOT EXISTS matches (
  id INT PRIMARY KEY AUTO_INCREMENT,
  league_id INT NOT NULL,
  home_team_id INT NOT NULL,
  away_team_id INT NOT NULL,
  match_date DATETIME NOT NULL,
  status ENUM('scheduled', 'live', 'finished', 'postponed', 'cancelled') DEFAULT 'scheduled',
  home_score INT,
  away_score INT,
  venue VARCHAR(100),
  referee VARCHAR(100),
  attendance INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE CASCADE,
  FOREIGN KEY (home_team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (away_team_id) REFERENCES teams(id) ON DELETE CASCADE,
  INDEX idx_league_id (league_id),
  INDEX idx_match_date (match_date),
  INDEX idx_status (status)
);

-- Standings Table
CREATE TABLE IF NOT EXISTS standings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  league_id INT NOT NULL,
  team_id INT NOT NULL,
  position INT,
  played INT DEFAULT 0,
  won INT DEFAULT 0,
  drawn INT DEFAULT 0,
  lost INT DEFAULT 0,
  goals_for INT DEFAULT 0,
  goals_against INT DEFAULT 0,
  goal_difference INT DEFAULT 0,
  points INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE CASCADE,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  UNIQUE KEY unique_league_team (league_id, team_id),
  INDEX idx_league_id (league_id),
  INDEX idx_position (position)
);

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE SET NULL,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_published_at (published_at),
  INDEX idx_league_id (league_id)
);

-- Article Tags Table
CREATE TABLE IF NOT EXISTS article_tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  article_id INT NOT NULL,
  tag VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  INDEX idx_article_id (article_id),
  INDEX idx_tag (tag)
);

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  INDEX idx_email (email)
);

-- Create indexes for better query performance
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX idx_matches_home_team ON matches(home_team_id);
CREATE INDEX idx_matches_away_team ON matches(away_team_id);
