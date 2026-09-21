import { createProduct, deleteProduct, readProducts, updateProduct } from './db.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const products = await readProducts();
      return res.status(200).json(products);
    }

    if (req.method === 'POST') {
      const product = await createProduct(req.body || {});
      return res.status(201).json(product);
    }

    if (req.method === 'PUT') {
      const productId = Number(req.query.id || req.body.id);
      const product = await updateProduct(productId, req.body || {});
      return res.status(200).json(product);
    }

    if (req.method === 'DELETE') {
      const productId = Number(req.query.id || req.body.id);
      const product = await deleteProduct(productId);
      return res.status(200).json(product);
    }

    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
