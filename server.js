import express from 'express';
import dotenv from 'dotenv';

import {
  createProduct,
  deleteProduct,
  readProducts,
  updateProduct,
} from './api/db.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    mode: process.env.DATABASE_URL ? 'postgres' : 'demo',
  });
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await createProduct(req.body || {});
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await updateProduct(Number(req.params.id), req.body || {});
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await deleteProduct(Number(req.params.id));
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Shop demo API running on http://localhost:${PORT}`);
});
