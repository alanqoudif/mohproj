const sqlite3 = require('sqlite3');
const { promisify } = require('util');
const { randomUUID } = require('crypto');

async function setupDb() {
  const db = new sqlite3.Database('./db.sqlite');
  const run = promisify(db.run.bind(db));

  // Enable foreign keys
  await run('PRAGMA foreign_keys = ON');

  // Create tables
  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      email_verified INTEGER,
      image TEXT,
      hashed_password TEXT,
      role TEXT DEFAULT 'USER',
      created_at INTEGER DEFAULT (unixepoch()),
      updated_at INTEGER DEFAULT (unixepoch())
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS specialties (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      created_at INTEGER DEFAULT (unixepoch()),
      updated_at INTEGER DEFAULT (unixepoch())
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS consultants (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      specialty_id TEXT NOT NULL,
      bio TEXT NOT NULL,
      experience INTEGER NOT NULL,
      rating REAL DEFAULT 0,
      created_at INTEGER DEFAULT (unixepoch()),
      updated_at INTEGER DEFAULT (unixepoch()),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (specialty_id) REFERENCES specialties(id) ON DELETE CASCADE
    )
  `);

  // Insert initial specialties
  const specialties = [
    {
      id: randomUUID(),
      name: 'استشارات طبية',
      description: 'احصل على استشارات طبية من متخصصين معتمدين',
    },
    {
      id: randomUUID(),
      name: 'استشارات تقنية',
      description: 'حلول تقنية واستشارات من خبراء تكنولوجيا المعلومات',
    },
    {
      id: randomUUID(),
      name: 'استشارات نفسية',
      description: 'دعم نفسي واستشارات من أخصائيين نفسيين معتمدين',
    },
  ];

  for (const specialty of specialties) {
    await run(
      'INSERT OR IGNORE INTO specialties (id, name, description) VALUES (?, ?, ?)',
      [specialty.id, specialty.name, specialty.description]
    );
  }

  console.log('Database setup completed!');
  db.close();
}

setupDb().catch(console.error);