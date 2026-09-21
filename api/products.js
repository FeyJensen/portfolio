import { createProduct, deleteProduct, readProducts, updateProduct } from './db.js';

export default async function handler(req, res) {
  try {
    const idFromRequest = Number(req.query?.id ?? req.params?.id ?? req.body?.id);

    if (req.method === 'GET') {
      const products = await readProducts();
      return res.status(200).json(products);
    }

    if (req.method === 'POST') {
      const product = await createProduct(req.body || {});
      return res.status(201).json(product);
    }

    if (req.method === 'PUT') {
      if (!Number.isFinite(idFromRequest)) {
        return res.status(400).json({ error: 'Product id is required.' });
      }

      const product = await updateProduct(idFromRequest, req.body || {});
      return res.status(200).json(product);
    }

    if (req.method === 'DELETE') {
      if (!Number.isFinite(idFromRequest)) {
        return res.status(400).json({ error: 'Product id is required.' });
      }

      const product = await deleteProduct(idFromRequest);
      return res.status(200).json(product);
    }

    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
