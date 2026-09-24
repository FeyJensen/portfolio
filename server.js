import express from 'express';
import dotenv from 'dotenv';

import {
  createAuthAccount,
  createProduct,
  createSession,
  deleteProduct,
  deleteSession,
  getSessionEmail,
  readProducts,
  updateProduct,
  verifyAuthLogin,
} from './api/db.js';
import { clearSessionCookieHeader, parseCookies, sessionCookieHeader, SESSION_COOKIE_NAME } from './api/cookies.js';

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

app.post('/api/auth', async (req, res) => {
  try {
    const { mode, email, password } = req.body || {};

    if (mode === 'login') {
      const account = await verifyAuthLogin({ email, password });
      const { sessionId } = await createSession(account.email);
      res.setHeader('Set-Cookie', sessionCookieHeader(sessionId));
      return res.status(200).json(account);
    }

    const account = await createAuthAccount({ email, password });
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/auth', async (req, res) => {
  const cookies = parseCookies(req);
  const email = await getSessionEmail(cookies[SESSION_COOKIE_NAME]);

  if (!email) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }

  res.json({ email });
});

app.delete('/api/auth', async (req, res) => {
  const cookies = parseCookies(req);
  await deleteSession(cookies[SESSION_COOKIE_NAME]);
  res.setHeader('Set-Cookie', clearSessionCookieHeader());
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Shop demo API running on http://localhost:${PORT}`);
});
