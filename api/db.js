import pg from 'pg';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { attachDatabasePool } from '@vercel/functions';

const { Pool } = pg;

const fallbackProducts = [
  {
    id: 1,
    name: 'Handmade Ceramic Mug',
    category: 'Home Goods',
    price: 24,
    stock: 18,
    description: 'A warm-toned ceramic mug with a matte finish and hand-painted glaze.',
  },
  {
    id: 2,
    name: 'Minimal Desk Lamp',
    category: 'Lighting',
    price: 64,
    stock: 9,
    description: 'Soft ambient lighting designed for focused work and cozy evenings.',
  },
  {
    id: 3,
    name: 'Leather Journal',
    category: 'Stationery',
    price: 32,
    stock: 12,
    description: 'Premium stitched journal with lined pages for notes, sketches, and planning.',
  },
];

function normalizeProduct(item) {
  return {
    id: Number(item.id),
    name: String(item.name),
    category: String(item.category),
    price: Number(item.price),
    stock: Number(item.stock),
    description: String(item.description),
  };
}

// Neon's pooled (-pooler) connection string already fans out to many clients,
// so keep a single small local pool per instance and reuse it across calls.
let cachedPool = null;

function getPool() {
  if (cachedPool) {
    return cachedPool;
  }

  const databaseUrl = String(process.env.DATABASE_URL || '').trim().replace(/^['"]|['"]$/g, '');

  if (!databaseUrl) {
    return null;
  }

  cachedPool = new Pool({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes('localhost') ? false : { rejectUnauthorized: false },
    max: 1,
    idleTimeoutMillis: 10_000,
  });

  // Ensures the pool is drained when the Vercel Fluid Compute instance suspends.
  attachDatabasePool(cachedPool);

  return cachedPool;
}

async function ensureTable() {
  const pool = getPool();

  if (!pool) {
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS shop_products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL DEFAULT 0,
      stock INTEGER NOT NULL DEFAULT 0,
      description TEXT NOT NULL
    );
  `);

  const { rowCount } = await pool.query('SELECT * FROM shop_products');

  if (rowCount === 0) {
    await pool.query(
      `INSERT INTO shop_products (name, category, price, stock, description)
       VALUES ($1, $2, $3, $4, $5), ($6, $7, $8, $9, $10), ($11, $12, $13, $14, $15)`,
      [
        'Handmade Ceramic Mug', 'Home Goods', 24, 18, 'A warm-toned ceramic mug with a matte finish and hand-painted glaze.',
        'Minimal Desk Lamp', 'Lighting', 64, 9, 'Soft ambient lighting designed for focused work and cozy evenings.',
        'Leather Journal', 'Stationery', 32, 12, 'Premium stitched journal with lined pages for notes, sketches, and planning.',
      ],
    );
  }
}

export async function readProducts() {
  const pool = getPool();

  if (!pool) {
    return [...fallbackProducts];
  }

  await ensureTable();

  const result = await pool.query(
    'SELECT * FROM shop_products ORDER BY id DESC',
  );

  return result.rows.map(normalizeProduct);
}

export async function createProduct(input = {}) {
  const payload = {
    name: String(input.name || '').trim(),
    category: String(input.category || '').trim(),
    price: Number(input.price || 0),
    stock: Number(input.stock || 0),
    description: String(input.description || '').trim(),
  };

  if (!payload.name || !payload.category || !payload.description) {
    throw new Error('Product name, category, and description are required.');
  }

  if (!process.env.DATABASE_URL) {
    const nextProduct = {
      id: Date.now(),
      ...payload,
    };

    fallbackProducts.unshift(nextProduct);
    return nextProduct;
  }

  const pool = getPool();
  await ensureTable();

  const result = await pool.query(
    'INSERT INTO shop_products (name, category, price, stock, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [payload.name, payload.category, payload.price, payload.stock, payload.description],
  );

  return normalizeProduct(result.rows[0]);
}

export async function updateProduct(id, input = {}) {
  const payload = {
    name: String(input.name || '').trim(),
    category: String(input.category || '').trim(),
    price: Number(input.price || 0),
    stock: Number(input.stock || 0),
    description: String(input.description || '').trim(),
  };

  if (!payload.name || !payload.category || !payload.description) {
    throw new Error('Product name, category, and description are required.');
  }

  if (!process.env.DATABASE_URL) {
    const index = fallbackProducts.findIndex((item) => item.id === Number(id));

    if (index === -1) {
      throw new Error('Product not found.');
    }

    fallbackProducts[index] = {
      ...fallbackProducts[index],
      ...payload,
    };

    return fallbackProducts[index];
  }

  const pool = getPool();
  await ensureTable();

  const result = await pool.query(
    `UPDATE shop_products
     SET name = $1, category = $2, price = $3, stock = $4, description = $5
     WHERE id = $6
     RETURNING *`,
    [payload.name, payload.category, payload.price, payload.stock, payload.description, Number(id)],
  );

  if (result.rowCount === 0) {
    throw new Error('Product not found.');
  }

  return normalizeProduct(result.rows[0]);
}

export async function deleteProduct(id) {
  const numericId = Number(id);

  if (!process.env.DATABASE_URL) {
    const index = fallbackProducts.findIndex((item) => item.id === numericId);

    if (index === -1) {
      throw new Error('Product not found.');
    }

    const [deleted] = fallbackProducts.splice(index, 1);
    return deleted;
  }

  const pool = getPool();
  await ensureTable();

  const result = await pool.query(
    'DELETE FROM shop_products WHERE id = $1 RETURNING *',
    [numericId],
  );

  if (result.rowCount === 0) {
    throw new Error('Product not found.');
  }

  return normalizeProduct(result.rows[0]);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fallbackAuthAccounts = new Map();

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

function verifyPassword(password, storedHash) {
  const [salt, derivedKey] = String(storedHash || '').split(':');

  if (!salt || !derivedKey) {
    return false;
  }

  const candidateKey = scryptSync(password, salt, 64).toString('hex');
  const candidateBuffer = Buffer.from(candidateKey, 'hex');
  const storedBuffer = Buffer.from(derivedKey, 'hex');

  return candidateBuffer.length === storedBuffer.length && timingSafeEqual(candidateBuffer, storedBuffer);
}

function parseCredentials(input = {}) {
  const email = String(input.email || '').trim().toLowerCase();
  const password = String(input.password || '');

  if (!EMAIL_PATTERN.test(email)) {
    throw new Error('A valid email address is required.');
  }

  if (password.length < 4) {
    throw new Error('Password must be at least 4 characters.');
  }

  return { email, password };
}

async function ensureAuthTable(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS auth_accounts (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}

export async function createAuthAccount(input = {}) {
  const { email, password } = parseCredentials(input);
  const passwordHash = hashPassword(password);

  if (!process.env.DATABASE_URL) {
    if (fallbackAuthAccounts.has(email)) {
      throw new Error('An account with that email already exists.');
    }

    fallbackAuthAccounts.set(email, { email, passwordHash });
    return { email };
  }

  const pool = getPool();
  await ensureAuthTable(pool);

  const existing = await pool.query('SELECT id FROM auth_accounts WHERE email = $1', [email]);

  if (existing.rowCount > 0) {
    throw new Error('An account with that email already exists.');
  }

  await pool.query(
    'INSERT INTO auth_accounts (email, password_hash) VALUES ($1, $2)',
    [email, passwordHash],
  );

  return { email };
}

export async function verifyAuthLogin(input = {}) {
  const { email, password } = parseCredentials(input);

  if (!process.env.DATABASE_URL) {
    const account = fallbackAuthAccounts.get(email);

    if (!account || !verifyPassword(password, account.passwordHash)) {
      throw new Error('Invalid email or password.');
    }

    return { email };
  }

  const pool = getPool();
  await ensureAuthTable(pool);

  const result = await pool.query('SELECT password_hash FROM auth_accounts WHERE email = $1', [email]);

  if (result.rowCount === 0 || !verifyPassword(password, result.rows[0].password_hash)) {
    throw new Error('Invalid email or password.');
  }

  return { email };
}

const SESSION_TTL_MS = 60 * 60 * 1000;
const fallbackSessions = new Map();

async function ensureSessionTable(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS auth_sessions (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL
    );
  `);
}

export async function createSession(email) {
  const sessionId = randomBytes(32).toString('hex');
  const expiresAt = Date.now() + SESSION_TTL_MS;

  if (!process.env.DATABASE_URL) {
    fallbackSessions.set(sessionId, { email, expiresAt });
    return { sessionId };
  }

  const pool = getPool();
  await ensureSessionTable(pool);

  await pool.query(
    'INSERT INTO auth_sessions (id, email, expires_at) VALUES ($1, $2, to_timestamp($3 / 1000.0))',
    [sessionId, email, expiresAt],
  );

  return { sessionId };
}

export async function getSessionEmail(sessionId) {
  if (!sessionId) {
    return null;
  }

  if (!process.env.DATABASE_URL) {
    const session = fallbackSessions.get(sessionId);

    if (!session || session.expiresAt < Date.now()) {
      fallbackSessions.delete(sessionId);
      return null;
    }

    return session.email;
  }

  const pool = getPool();
  await ensureSessionTable(pool);

  const result = await pool.query(
    'SELECT email FROM auth_sessions WHERE id = $1 AND expires_at > now()',
    [sessionId],
  );

  return result.rowCount > 0 ? result.rows[0].email : null;
}

export async function deleteSession(sessionId) {
  if (!sessionId) {
    return;
  }

  if (!process.env.DATABASE_URL) {
    fallbackSessions.delete(sessionId);
    return;
  }

  const pool = getPool();
  await ensureSessionTable(pool);
  await pool.query('DELETE FROM auth_sessions WHERE id = $1', [sessionId]);
}
