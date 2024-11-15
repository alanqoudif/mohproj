import sqlite3 from 'sqlite3';
import { promisify } from 'util';

let db: sqlite3.Database;

export async function getDb() {
  if (!db) {
    db = new sqlite3.Database('./db.sqlite');
    db.run = promisify(db.run.bind(db));
    db.get = promisify(db.get.bind(db));
    db.all = promisify(db.all.bind(db));
    
    // Enable foreign keys
    await db.run('PRAGMA foreign_keys = ON');
  }
  return db;
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const db = await getDb();
  return db.all(sql, params);
}

export async function get<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
  const db = await getDb();
  return db.get(sql, params);
}

export async function run(sql: string, params: any[] = []): Promise<void> {
  const db = await getDb();
  await db.run(sql, params);
}

export async function setupDb() {
  const db = await getDb();
  
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
}