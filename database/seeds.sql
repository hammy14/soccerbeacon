-- Insert Leagues
INSERT INTO leagues (name, country, description, founded_year) VALUES
('Premier League', 'England', 'The top tier of English football, known for its competitive nature and global appeal.', 1992),
('La Liga', 'Spain', 'Spain''s top professional football division, home to some of the world''s best teams and players.', 1929),
('Serie A', 'Italy', 'Italy''s premier football league, famous for its tactical excellence and defensive prowess.', 1929),
('MLS', 'USA', 'Major League Soccer, the top professional soccer league in the United States and Canada.', 1996),
('Champions League', 'Europe', 'The premier club competition in European football, featuring the best teams from across Europe.', 1955);

-- Insert Sample Teams for Premier League
INSERT INTO teams (league_id, name, city, founded_year) VALUES
(1, 'Manchester United', 'Manchester', 1878),
(1, 'Liverpool', 'Liverpool', 1892),
(1, 'Manchester City', 'Manchester', 1880),
(1, 'Arsenal', 'London', 1886),
(1, 'Chelsea', 'London', 1905),
(1, 'Tottenham Hotspur', 'London', 1882),
(1, 'Newcastle United', 'Newcastle', 1881),
(1, 'Brighton & Hove Albion', 'Brighton', 1901),
(1, 'Aston Villa', 'Birmingham', 1874),
(1, 'West Ham United', 'London', 1895);

-- Insert Sample Teams for La Liga
INSERT INTO teams (league_id, name, city, founded_year) VALUES
(2, 'Real Madrid', 'Madrid', 1902),
(2, 'Barcelona', 'Barcelona', 1899),
(2, 'Atlético Madrid', 'Madrid', 1903),
(2, 'Sevilla', 'Seville', 1890),
(2, 'Valencia', 'Valencia', 1919),
(2, 'Real Sociedad', 'San Sebastián', 1909),
(2, 'Villarreal', 'Villarreal', 1923),
(2, 'Betis', 'Seville', 1907),
(2, 'Celta Vigo', 'Vigo', 1923),
(2, 'Osasuna', 'Pamplona', 1920);

-- Insert Sample Teams for Serie A
INSERT INTO teams (league_id, name, city, founded_year) VALUES
(3, 'Juventus', 'Turin', 1897),
(3, 'AC Milan', 'Milan', 1899),
(3, 'Inter Milan', 'Milan', 1908),
(3, 'AS Roma', 'Rome', 1927),
(3, 'Lazio', 'Rome', 1900),
(3, 'Napoli', 'Naples', 1926),
(3, 'Fiorentina', 'Florence', 1926),
(3, 'Atalanta', 'Bergamo', 1907),
(3, 'Torino', 'Turin', 1906),
(3, 'Bologna', 'Bologna', 1909);

-- Insert Sample Teams for MLS
INSERT INTO teams (league_id, name, city, founded_year) VALUES
(4, 'LA Galaxy', 'Los Angeles', 1994),
(4, 'New York Red Bulls', 'New York', 1994),
(4, 'Seattle Sounders FC', 'Seattle', 2007),
(4, 'FC Dallas', 'Dallas', 1996),
(4, 'Chicago Fire', 'Chicago', 1997),
(4, 'Toronto FC', 'Toronto', 2007),
(4, 'Houston Dynamo', 'Houston', 2000),
(4, 'San Jose Earthquakes', 'San Jose', 1996),
(4, 'Portland Timbers', 'Portland', 2011),
(4, 'LAFC', 'Los Angeles', 2018);

-- Insert Sample Users
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('admin@soccersite.com', '$2a$10$YourHashedPasswordHere', 'Admin', 'User', 'admin'),
('editor@soccersite.com', '$2a$10$YourHashedPasswordHere', 'Editor', 'User', 'editor');

-- Insert Sample Articles
INSERT INTO articles (title, slug, content, excerpt, author_id, league_id, status, published_at) VALUES
('Premier League 2024-25 Season Preview', 'premier-league-2024-25-preview', 
'<h2>What to Expect This Season</h2><p>The Premier League is gearing up for another thrilling season with new signings, tactical innovations, and fierce competition among the top teams.</p><p>Manchester City will look to defend their title, while Liverpool, Arsenal, and Manchester United aim to challenge their dominance.</p>',
'Get ready for an exciting Premier League season with our comprehensive preview.',
1, 1, 'published', NOW()),

('La Liga Tactical Analysis: The Evolution of Spanish Football', 'la-liga-tactical-analysis',
'<h2>How Spanish Football is Evolving</h2><p>La Liga continues to be a showcase for tactical excellence and technical brilliance. This season, we''re seeing new formations and strategies from top clubs.</p><p>Real Madrid and Barcelona remain the favorites, but Atlético Madrid and Sevilla are ready to challenge.</p>',
'Explore the tactical innovations shaping La Liga this season.',
1, 2, 'published', NOW()),

('Serie A: Italy''s Defensive Masterclass', 'serie-a-defensive-masterclass',
'<h2>The Art of Italian Defense</h2><p>Serie A is renowned for its defensive prowess and tactical discipline. This season promises to showcase the best of Italian football.</p><p>Juventus, Inter Milan, and AC Milan will battle for supremacy in a highly competitive league.</p>',
'Discover why Serie A is the gold standard for defensive football.',
1, 3, 'published', NOW()),

('MLS Growth: American Soccer''s Rising Star', 'mls-growth-american-soccer',
'<h2>The Rise of Soccer in America</h2><p>Major League Soccer continues to grow in popularity and quality. With new stadiums, international stars, and passionate fans, MLS is becoming a major force in world football.</p><p>Teams like LA Galaxy, Seattle Sounders, and Toronto FC are leading the charge.</p>',
'Explore how MLS is transforming American sports culture.',
1, 4, 'published', NOW()),

('Champions League: Europe''s Elite Battle for Glory', 'champions-league-elite-battle',
'<h2>The Pinnacle of Club Football</h2><p>The Champions League brings together Europe''s best clubs in a thrilling competition. This season promises drama, skill, and unforgettable moments.</p><p>From the group stage to the final, every match is crucial.</p>',
'Experience the excitement of Europe''s premier club competition.',
1, 5, 'published', NOW()),

('Manchester United''s Path to Glory: Season Analysis', 'manchester-united-season-analysis',
'<h2>Can United Reclaim Their Throne?</h2><p>Manchester United has made significant signings and tactical adjustments. Will it be enough to challenge for the title?</p><p>With a strong squad and experienced manager, United aims to return to their winning ways.</p>',
'Analyze Manchester United''s prospects for the upcoming season.',
1, 1, 'published', NOW()),

('Real Madrid''s Dominance: What Makes Them Special', 'real-madrid-dominance',
'<h2>The Kings of Europe</h2><p>Real Madrid''s success is built on a winning mentality, world-class players, and tactical excellence. Their pursuit of excellence continues.</p><p>With recent signings and a strong squad, Madrid remains the team to beat.</p>',
'Understand what makes Real Madrid the most successful club in European football.',
1, 2, 'published', NOW()),

('Juventus: The Old Lady''s Quest for Redemption', 'juventus-redemption',
'<h2>Rebuilding for Success</h2><p>Juventus is in a rebuilding phase, but their ambitions remain as high as ever. With new signings and a fresh approach, they aim to reclaim their throne in Italy.</p><p>The Serie A title is within reach for the Turin giants.</p>',
'Follow Juventus''s journey as they aim to reclaim their dominance in Serie A.',
1, 3, 'published', NOW()),

('Seattle Sounders: MLS''s Consistent Contenders', 'seattle-sounders-contenders',
'<h2>Building a Dynasty</h2><p>The Seattle Sounders have established themselves as one of MLS''s most consistent and successful franchises. Their commitment to excellence is evident in every season.</p><p>With a strong fan base and competitive squad, they continue to challenge for titles.</p>',
'Explore how Seattle Sounders became MLS''s most successful franchise.',
1, 4, 'published', NOW()),

('Barcelona''s Rebuild: Can They Return to Glory?', 'barcelona-rebuild',
'<h2>From Crisis to Comeback</h2><p>Barcelona has faced financial and sporting challenges, but their recent signings and youth development suggest a bright future.</p><p>With a renewed focus on their academy and strategic acquisitions, Barcelona aims to reclaim their place among Europe''s elite.</p>',
'Discover Barcelona''s path to redemption and their plans for the future.',
1, 2, 'published', NOW());
