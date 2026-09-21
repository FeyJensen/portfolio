import pg from 'pg';

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

function getPool() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
  });
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
