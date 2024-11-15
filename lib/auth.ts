import { get, run } from './db';
import { compare, hash } from 'bcryptjs';
import { randomUUID } from 'crypto';

export async function createUser({ 
  email, 
  password,
  name 
}: { 
  email: string;
  password: string;
  name?: string;
}) {
  const hashedPassword = await hash(password, 12);
  const id = randomUUID();

  await run(
    'INSERT INTO users (id, email, hashed_password, name) VALUES (?, ?, ?, ?)',
    [id, email, hashedPassword, name]
  );

  const user = await getUserById(id);
  if (!user) throw new Error('Failed to create user');

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

export async function getUserByEmail(email: string) {
  return get('SELECT * FROM users WHERE email = ?', [email]);
}

export async function getUserById(id: string) {
  return get('SELECT * FROM users WHERE id = ?', [id]);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}