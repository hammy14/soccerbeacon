const pool = require('./config/database');
require('dotenv').config();

const leagues = [
  {
    name: 'Premier League',
    country: 'England',
    founded_year: 1992,
    description: 'The top tier of English football'
  },
  {
    name: 'La Liga',
    country: 'Spain',
    founded_year: 1929,
    description: 'The top tier of Spanish football'
  },
  {
    name: 'Serie A',
    country: 'Italy',
    founded_year: 1929,
    description: 'The top tier of Italian football'
  },
  {
    name: 'MLS',
    country: 'United States',
    founded_year: 1993,
    description: 'Major League Soccer - top tier of American football'
  },
  {
    name: 'Champions League',
    country: 'Europe',
    founded_year: 1955,
    description: 'European club football championship'
  }
];

async function seedLeagues() {
  try {
    console.log('Starting league seeding...');
    
    for (const league of leagues) {
      const query = `
        INSERT INTO leagues (name, country, founded_year, description, created_at)
        VALUES (?, ?, ?, ?, NOW())
      `;
      
      const values = [
        league.name,
        league.country,
        league.founded_year,
        league.description
      ];
      
      await pool.execute(query, values);
      console.log(`✅ Inserted: ${league.name}`);
    }
    
    console.log('\n✅ All 5 leagues seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding leagues:', error.message);
    process.exit(1);
  }
}

seedLeagues();
