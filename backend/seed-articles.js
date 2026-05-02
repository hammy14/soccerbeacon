const pool = require('./config/database');
require('dotenv').config();

const articles = [
  {
    title: "Manchester United's Path to Glory: 2024-25 Season Preview",
    slug: 'manchester-united-2024-25-preview',
    content: '<h2>Manchester United\'s 2024-25 Season Preview</h2><p>Manchester United enters the 2024-25 season with renewed optimism under their new management. With strategic signings and a focus on youth development, the Red Devils aim to reclaim their position at the top of the Premier League.</p><h3>Key Signings</h3><p>The club has made several important additions to strengthen their squad, particularly in midfield and defense. These signings are expected to provide the depth and quality needed to compete for the title.</p><h3>Tactical Approach</h3><p>The new manager has implemented a more attacking style of play, emphasizing quick transitions and creative football. This approach should make Manchester United more entertaining to watch while also being more effective.</p><h3>Title Chances</h3><p>With a balanced squad and clear tactical direction, Manchester United has a genuine chance to compete for the Premier League title this season. Expect an exciting campaign ahead.</p>',
    excerpt: 'Manchester United enters the 2024-25 season with renewed optimism and strategic signings aimed at reclaiming their position at the top of the Premier League.',
    league_id: 1,
    featured_image: 'https://via.placeholder.com/800x400?text=Manchester+United',
    status: 'published'
  },
  {
    title: "Liverpool's Midfield Mastery: Tactical Analysis",
    slug: 'liverpool-midfield-mastery-analysis',
    content: '<h2>Liverpool\'s Midfield Mastery: A Tactical Deep Dive</h2><p>Liverpool\'s midfield has been the cornerstone of their success in recent seasons. This article explores the tactical nuances that make their midfield one of the most dominant in world football.</p><h3>The Pressing System</h3><p>Liverpool\'s high-pressing system relies on coordinated midfield movement. The midfielders work in tandem to cut off passing lanes and force turnovers in dangerous areas.</p><h3>Ball Progression</h3><p>The midfield\'s ability to progress the ball quickly and efficiently is crucial to Liverpool\'s attacking play. Their technical quality and positioning allow them to break down defensive structures.</p><h3>Defensive Stability</h3><p>Despite their attacking prowess, Liverpool\'s midfield provides excellent defensive cover. The balance between attack and defense is what makes them truly special.</p>',
    excerpt: 'Explore the tactical brilliance of Liverpool\'s midfield and how their coordinated pressing and ball progression make them one of the most dominant forces in football.',
    league_id: 1,
    featured_image: 'https://via.placeholder.com/800x400?text=Liverpool',
    status: 'published'
  },
  {
    title: "Arsenal's Youth Revolution: Building for the Future",
    slug: 'arsenal-youth-revolution',
    content: '<h2>Arsenal\'s Youth Revolution: Building for the Future</h2><p>Arsenal has made a significant investment in youth development, bringing through several talented young players. This article examines how the club is building a sustainable future through youth.</p><h3>Academy Success</h3><p>Arsenal\'s academy has produced several players who are now competing at the highest level. The club\'s commitment to developing young talent is evident in their recent signings and promotions.</p><h3>Integration Strategy</h3><p>The club has a clear strategy for integrating young players into the first team. Rather than rushing them, Arsenal is giving them time to develop while providing opportunities to gain experience.</p><h3>Long-term Vision</h3><p>By focusing on youth development, Arsenal is building a team that can compete for titles for years to come. This long-term approach is refreshing in modern football.</p>',
    excerpt: 'Arsenal\'s commitment to youth development is creating a sustainable future for the club, with several academy graduates now competing at the highest level.',
    league_id: 1,
    featured_image: 'https://via.placeholder.com/800x400?text=Arsenal',
    status: 'published'
  },
  {
    title: "Chelsea's Transfer Strategy: Building a Winning Squad",
    slug: 'chelsea-transfer-strategy',
    content: '<h2>Chelsea\'s Transfer Strategy: Building a Winning Squad</h2><p>Chelsea has been active in the transfer market, bringing in several high-profile signings. This article analyzes their transfer strategy and how it fits into their long-term vision.</p><h3>Investment in Quality</h3><p>Chelsea has invested heavily in bringing in experienced players who can make an immediate impact. These signings are expected to strengthen the squad significantly.</p><h3>Squad Balance</h3><p>The club has focused on maintaining a good balance between experience and youth. This approach should provide both immediate success and long-term sustainability.</p><h3>Competitive Outlook</h3><p>With their new signings, Chelsea has a strong chance of competing for the Premier League title. The squad depth and quality are impressive.</p>',
    excerpt: 'Chelsea\'s strategic transfer activity aims to build a winning squad capable of competing for the Premier League title and European honors.',
    league_id: 1,
    featured_image: 'https://via.placeholder.com/800x400?text=Chelsea',
    status: 'published'
  },
  {
    title: "Tottenham's Attacking Prowess: Goals Galore",
    slug: 'tottenham-attacking-prowess',
    content: '<h2>Tottenham\'s Attacking Prowess: Goals Galore</h2><p>Tottenham has developed into one of the most exciting attacking teams in the Premier League. This article explores their attacking philosophy and the players who make it work.</p><h3>Creative Midfield</h3><p>Tottenham\'s midfield is packed with creative talent. The ability to create chances from various positions makes them a constant threat to opposition defenses.</p><h3>Striker Quality</h3><p>The club has invested in quality strikers who can finish the chances created by the midfield. This combination of creativity and finishing is deadly.</p><h3>Exciting Football</h3><p>Tottenham plays an exciting brand of football that entertains fans. Their attacking approach makes them one of the most enjoyable teams to watch.</p>',
    excerpt: 'Tottenham\'s attacking prowess and creative football make them one of the most exciting teams in the Premier League, capable of scoring goals from anywhere.',
    league_id: 1,
    featured_image: 'https://via.placeholder.com/800x400?text=Tottenham',
    status: 'published'
  },
  {
    title: "Real Madrid's Champions League Dominance: A Legacy of Excellence",
    slug: 'real-madrid-champions-league-legacy',
    content: '<h2>Real Madrid\'s Champions League Dominance: A Legacy of Excellence</h2><p>Real Madrid\'s record in the Champions League is unmatched. This article explores the factors that have made them the most successful club in European football.</p><h3>Experience and Mentality</h3><p>Real Madrid\'s experience in big matches is unparalleled. The club\'s winning mentality and ability to perform under pressure sets them apart from other clubs.</p><h3>Quality Squad</h3><p>The club consistently attracts world-class players who are willing to compete at the highest level. This quality is evident in their performances.</p><h3>Tactical Flexibility</h3><p>Real Madrid\'s ability to adapt tactically to different opponents is a key factor in their success. The coaching staff\'s tactical acumen is crucial.</p>',
    excerpt: 'Real Madrid\'s unmatched Champions League record is built on experience, quality, and a winning mentality that sets them apart from other European clubs.',
    league_id: 2,
    featured_image: 'https://via.placeholder.com/800x400?text=Real+Madrid',
    status: 'published'
  },
  {
    title: "Barcelona's Resurgence: Building a New Era",
    slug: 'barcelona-resurgence-new-era',
    content: '<h2>Barcelona\'s Resurgence: Building a New Era</h2><p>Barcelona is in the midst of a resurgence after a difficult period. This article examines how the club is rebuilding and what the future holds.</p><h3>Youth Development</h3><p>Barcelona is focusing on developing young talent from their academy. This approach is reminiscent of their successful period under Guardiola.</p><h3>Financial Stability</h3><p>The club has made significant progress in stabilizing their finances. This stability is crucial for long-term success.</p><h3>Competitive Ambitions</h3><p>With their rebuilding efforts, Barcelona aims to return to competing for La Liga and European titles. The future looks promising.</p>',
    excerpt: 'Barcelona is undergoing a resurgence, focusing on youth development and financial stability as they build a new era of success.',
    league_id: 2,
    featured_image: 'https://via.placeholder.com/800x400?text=Barcelona',
    status: 'published'
  },
  {
    title: "Atletico Madrid's Defensive Fortress: Tactical Brilliance",
    slug: 'atletico-madrid-defensive-fortress',
    content: '<h2>Atletico Madrid\'s Defensive Fortress: Tactical Brilliance</h2><p>Atletico Madrid is known for their defensive solidity and tactical discipline. This article explores how they have built one of the most formidable defenses in football.</p><h3>Defensive Organization</h3><p>Atletico Madrid\'s defensive organization is meticulous. Every player knows their role and responsibilities, making them extremely difficult to break down.</p><h3>Counter-Attacking Threat</h3><p>While defensively strong, Atletico Madrid is also dangerous on the counter-attack. Their ability to transition quickly makes them a complete team.</p><h3>Winning Mentality</h3><p>The club\'s winning mentality and never-say-die attitude have been crucial to their success. This mentality is instilled by the coaching staff.</p>',
    excerpt: 'Atletico Madrid\'s defensive fortress is built on tactical discipline and organization, making them one of the most difficult teams to break down in football.',
    league_id: 2,
    featured_image: 'https://via.placeholder.com/800x400?text=Atletico+Madrid',
    status: 'published'
  },
  {
    title: "Sevilla's European Pedigree: A Club of Tradition",
    slug: 'sevilla-european-pedigree',
    content: '<h2>Sevilla\'s European Pedigree: A Club of Tradition</h2><p>Sevilla has established itself as a powerhouse in European football, particularly in the Europa League. This article celebrates their tradition of success.</p><h3>Europa League Success</h3><p>Sevilla\'s record in the Europa League is exceptional. The club has won the competition multiple times, establishing themselves as the most successful team in the tournament.</p><h3>Consistent Competitiveness</h3><p>Year after year, Sevilla competes at the highest level. Their consistency is a testament to their organizational structure and coaching quality.</p><h3>Player Development</h3><p>Sevilla is known for developing players who go on to succeed at bigger clubs. This ability to develop talent is a key part of their model.</p>',
    excerpt: 'Sevilla\'s European pedigree and tradition of success, particularly in the Europa League, make them one of the most respected clubs in European football.',
    league_id: 2,
    featured_image: 'https://via.placeholder.com/800x400?text=Sevilla',
    status: 'published'
  },
  {
    title: "Juventus's Pursuit of Excellence: Rebuilding for Glory",
    slug: 'juventus-pursuit-excellence',
    content: '<h2>Juventus\'s Pursuit of Excellence: Rebuilding for Glory</h2><p>Juventus is in a rebuilding phase after a period of transition. This article examines their strategy for returning to the top of Italian and European football.</p><h3>Squad Reconstruction</h3><p>Juventus has made significant changes to their squad, bringing in young talent and experienced players. This balanced approach should provide both immediate success and long-term sustainability.</p><h3>Tactical Evolution</h3><p>The club is evolving tactically under their new management. The focus is on more attacking, entertaining football while maintaining defensive solidity.</p><h3>European Ambitions</h3><p>Juventus remains ambitious in European competition. With their rebuilding efforts, they aim to return to competing for the Champions League.</p>',
    excerpt: 'Juventus is rebuilding with a focus on squad reconstruction and tactical evolution, aiming to return to the top of Italian and European football.',
    league_id: 3,
    featured_image: 'https://via.placeholder.com/800x400?text=Juventus',
    status: 'published'
  },
  {
    title: "AC Milan's Renaissance: A Return to Glory",
    slug: 'ac-milan-renaissance',
    content: '<h2>AC Milan\'s Renaissance: A Return to Glory</h2><p>AC Milan is experiencing a renaissance after years of struggle. This article explores how the club is returning to its former glory.</p><h3>Ownership and Investment</h3><p>New ownership has brought investment and a clear vision for the club. This has been crucial in their resurgence.</p><h3>Young Squad Development</h3><p>AC Milan is building around young talent, creating a team with a bright future. The development of young players is a key part of their strategy.</p><h3>Competitive Success</h3><p>The club has already achieved competitive success, winning Serie A. This success is a sign of things to come.</p>',
    excerpt: 'AC Milan\'s renaissance is built on new ownership, investment, and the development of young talent, leading to a return to competitive success.',
    league_id: 3,
    featured_image: 'https://via.placeholder.com/800x400?text=AC+Milan',
    status: 'published'
  },
  {
    title: "Inter Milan's Dominance: The Nerazzurri's Reign",
    slug: 'inter-milan-dominance',
    content: '<h2>Inter Milan\'s Dominance: The Nerazzurri\'s Reign</h2><p>Inter Milan has established itself as the dominant force in Italian football. This article examines their rise to the top and their prospects for continued success.</p><h3>Tactical Mastery</h3><p>Inter Milan\'s tactical approach under their manager is sophisticated and effective. The team\'s ability to control matches is impressive.</p><h3>Squad Quality</h3><p>The club has assembled a squad of exceptional quality. The balance between experience and youth is perfect.</p><h3>Winning Culture</h3><p>Inter Milan has developed a winning culture that permeates the entire club. This culture is crucial to their continued success.</p>',
    excerpt: 'Inter Milan\'s dominance in Italian football is built on tactical mastery, squad quality, and a winning culture that drives continued success.',
    league_id: 3,
    featured_image: 'https://via.placeholder.com/800x400?text=Inter+Milan',
    status: 'published'
  },
  {
    title: "MLS Growth: American Football's Rising Star",
    slug: 'mls-growth-american-football',
    content: '<h2>MLS Growth: American Football\'s Rising Star</h2><p>Major League Soccer continues to grow in popularity and quality. This article explores the factors driving the league\'s expansion and improvement.</p><h3>International Investment</h3><p>The influx of international investment has brought world-class players to MLS. This has significantly improved the quality of play.</p><h3>Stadium Development</h3><p>New stadiums and improved facilities are attracting fans and players. The infrastructure development is crucial to the league\'s growth.</p><h3>Youth Development</h3><p>MLS is investing in youth development, creating a pipeline of American talent. This investment will pay dividends in the future.</p>',
    excerpt: 'MLS is experiencing significant growth driven by international investment, stadium development, and a focus on youth development.',
    league_id: 4,
    featured_image: 'https://via.placeholder.com/800x400?text=MLS',
    status: 'published'
  },
  {
    title: "LAFC's Ambitions: Building a Championship Team",
    slug: 'lafc-championship-ambitions',
    content: '<h2>LAFC\'s Ambitions: Building a Championship Team</h2><p>Los Angeles FC has emerged as one of MLS\'s most ambitious clubs. This article examines their strategy for building a championship-winning team.</p><h3>Star Signings</h3><p>LAFC has attracted several star players from around the world. These signings have elevated the club\'s profile and competitive level.</p><h3>Attacking Football</h3><p>The club plays an exciting, attacking brand of football. This style has made them one of the most entertaining teams in MLS.</p><h3>Championship Prospects</h3><p>With their quality squad and attacking approach, LAFC has genuine prospects of winning the MLS Cup. The future looks bright.</p>',
    excerpt: 'LAFC is building a championship team through strategic signings and an exciting attacking style of football.',
    league_id: 4,
    featured_image: 'https://via.placeholder.com/800x400?text=LAFC',
    status: 'published'
  },
  {
    title: "Champions League: Europe's Elite Battle",
    slug: 'champions-league-elite-battle',
    content: '<h2>Champions League: Europe\'s Elite Battle</h2><p>The Champions League is the pinnacle of club football in Europe. This article explores what makes the competition so special and exciting.</p><h3>Quality of Competition</h3><p>The Champions League brings together the best clubs and players from across Europe. The quality of football is exceptional.</p><h3>Dramatic Moments</h3><p>The Champions League is known for its dramatic moments and unexpected results. These moments create memories that last a lifetime.</p><h3>Global Appeal</h3><p>The Champions League has global appeal, attracting viewers from around the world. The competition\'s prestige is unmatched.</p>',
    excerpt: 'The Champions League is the pinnacle of club football, bringing together Europe\'s elite in a competition known for quality, drama, and global appeal.',
    league_id: 5,
    featured_image: 'https://via.placeholder.com/800x400?text=Champions+League',
    status: 'published'
  },
  {
    title: "Tactical Evolution in Modern Football: A Champions League Perspective",
    slug: 'tactical-evolution-modern-football',
    content: '<h2>Tactical Evolution in Modern Football: A Champions League Perspective</h2><p>Modern football has evolved significantly in recent years. This article examines the tactical trends visible in Champions League football.</p><h3>Pressing Systems</h3><p>High-pressing systems have become increasingly prevalent in modern football. Teams use coordinated pressing to win the ball in dangerous areas.</p><h3>Positional Play</h3><p>Positional play and ball retention have become crucial to success. Teams focus on controlling the game through possession and positioning.</p><h3>Defensive Transitions</h3><p>The ability to transition quickly from defense to attack is crucial. Teams that master this transition are often the most successful.</p>',
    excerpt: 'Modern football has evolved significantly, with tactical trends including high-pressing systems, positional play, and quick defensive transitions.',
    league_id: 5,
    featured_image: 'https://via.placeholder.com/800x400?text=Tactics',
    status: 'published'
  },
  {
    title: "Young Talents to Watch: The Future of Football",
    slug: 'young-talents-future-football',
    content: '<h2>Young Talents to Watch: The Future of Football</h2><p>Football\'s future is bright with several young talents emerging. This article highlights some of the most exciting young players to watch.</p><h3>Emerging Stars</h3><p>Several young players have already made an impact at the highest level. These players are the future of football.</p><h3>Development Pathways</h3><p>The development pathways for young talent have improved significantly. Clubs are investing in youth development like never before.</p><h3>Global Talent Pool</h3><p>Talent is emerging from all corners of the globe. The global talent pool is deeper than ever before.</p>',
    excerpt: 'Football\'s future is bright with several young talents emerging from around the world, ready to make their mark on the game.',
    league_id: 5,
    featured_image: 'https://via.placeholder.com/800x400?text=Young+Talents',
    status: 'published'
  }
];

async function seedArticles() {
  try {
    console.log('Starting article seeding...');
    
    for (const article of articles) {
      const query = `
        INSERT INTO articles (title, slug, content, excerpt, league_id, featured_image, status, published_at, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;
      
      const values = [
        article.title,
        article.slug,
        article.content,
        article.excerpt,
        article.league_id,
        article.featured_image,
        article.status
      ];
      
      await pool.execute(query, values);
      console.log(`✅ Inserted: ${article.title}`);
    }
    
    console.log('\n✅ All 20 articles seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding articles:', error.message);
    process.exit(1);
  }
}

seedArticles();
