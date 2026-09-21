import { useEffect, useState } from 'react';

function buildApiUrl(path) {
  const configuredBase = import.meta.env.VITE_API_URL;

  if (configuredBase) {
    return `${configuredBase.replace(/\/$/, '')}${path}`;
  }

  if (typeof window === 'undefined') {
    return path;
  }

  return `${window.location.origin}${path}`;
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const contentType = response.headers.get('content-type') || '';
  const rawBody = await response.text();

  let payload = null;

  if (rawBody) {
    try {
      payload = contentType.includes('application/json') ? JSON.parse(rawBody) : rawBody;
    } catch {
      payload = rawBody;
    }
  }

  if (!response.ok) {
    const message = typeof payload === 'string' ? payload : payload?.error || `Request failed with ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export default function ShopDemoPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  });

  const [editingId, setEditingId] = useState(null);

  const fetchListings = async () => {
    try {
      const data = await fetchJson(buildApiUrl('/api/products'));
      setListings(Array.isArray(data) ? data : []);
      setError('');
    } catch (fetchError) {
      setError(fetchError.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const totalInventory = listings.reduce((sum, item) => sum + Number(item.stock || 0), 0);
  const totalValue = listings.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.stock || 0), 0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', price: '', stock: '', description: '' });
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanedListing = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
      description: formData.description.trim(),
    };

    if (!cleanedListing.name || !cleanedListing.category || !cleanedListing.description) {
      return;
    }

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = buildApiUrl(
        editingId ? `/api/products?id=${editingId}` : '/api/products',
      );

      await fetchJson(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedListing),
      });

      await fetchListings();
      resetForm();
    } catch (submitError) {
      setError(submitError.message || 'Unable to save product.');
    }
  };

  const handleEdit = (listing) => {
    setEditingId(listing.id);
    setFormData({
      name: listing.name,
      category: listing.category,
      price: String(listing.price),
      stock: String(listing.stock),
      description: listing.description,
    });
  };

  const handleDelete = async (id) => {
    try {
      await fetchJson(buildApiUrl(`/api/products?id=${id}`), {
        method: 'DELETE',
      });

      await fetchListings();

      if (editingId === id) {
        resetForm();
      }
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete product.');
    }
  };

  return (
    <div className="shop-demo-page">
      <div className="shop-demo-shell">
        <header className="shop-demo-header">
          <span className="eyebrow">Full-stack demo</span>
          <h1>Shop listings dashboard.</h1>
          <p>
            A real CRUD workflow powered by a Node.js API and PostgreSQL-ready data layer. This app demonstrates how a frontend interface connects to backend logic and persisted data.
          </p>
        </header>

        <section className="shop-demo-stats">
          <div className="shop-stat-card">
            <span>Total listings</span>
            <strong>{listings.length}</strong>
          </div>
          <div className="shop-stat-card">
            <span>Inventory</span>
            <strong>{totalInventory}</strong>
          </div>
          <div className="shop-stat-card">
            <span>Stock value</span>
            <strong>${totalValue}</strong>
          </div>
        </section>

        {error && <p className="shop-error">{error}</p>}

        <div className="shop-demo-grid">
          <form className="shop-form" onSubmit={handleSubmit}>
            <h2>{editingId ? 'Edit listing' : 'Create a listing'}</h2>

            <label>
              Product name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Scented Candle"
              />
            </label>

            <label>
              Category
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Home Goods"
              />
            </label>

            <div className="shop-form-row">
              <label>
                Price
                <input
                  type="number"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="25"
                />
              </label>

              <label>
                Stock
                <input
                  type="number"
                  min="0"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="10"
                />
              </label>
            </div>

            <label>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short product description"
                rows="4"
              />
            </label>

            <div className="shop-form-actions">
              <button type="submit" className="primary-btn shop-submit-btn">
                {editingId ? 'Update listing' : 'Add listing'}
              </button>

              {editingId && (
                <button type="button" className="secondary-btn" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="shop-listings">
            {loading ? (
              <div className="shop-item-card"><p>Loading listings...</p></div>
            ) : (
              listings.map((listing) => (
                <article key={listing.id} className="shop-item-card">
                  <div className="shop-item-header">
                    <span className="shop-tag">{listing.category}</span>
                    <span className="shop-price">${listing.price}</span>
                  </div>

                  <h3>{listing.name}</h3>
                  <p>{listing.description}</p>

                  <div className="shop-item-meta">
                    <span>Stock: {listing.stock}</span>
                    <span>ID: {String(listing.id).slice(-4)}</span>
                  </div>

                  <div className="shop-item-actions">
                    <button type="button" className="secondary-btn shop-action-btn" onClick={() => handleEdit(listing)}>
                      Edit
                    </button>
                    <button type="button" className="shop-delete-btn" onClick={() => handleDelete(listing.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
