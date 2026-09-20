import { useEffect, useState } from 'react';

import { initialShopListings } from '../data/portfolioData';

export default function ShopDemoPage() {
  const [listings, setListings] = useState(() => {
    if (typeof window === 'undefined') {
      return initialShopListings;
    }

    const saved = window.localStorage.getItem('shop-demo-listings');
    return saved ? JSON.parse(saved) : initialShopListings;
  });

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    window.localStorage.setItem('shop-demo-listings', JSON.stringify(listings));
  }, [listings]);

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

  const handleSubmit = (event) => {
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

    if (editingId) {
      setListings((current) =>
        current.map((listing) =>
          listing.id === editingId ? { ...listing, ...cleanedListing } : listing,
        ),
      );
    } else {
      setListings((current) => [
        {
          id: Date.now(),
          ...cleanedListing,
        },
        ...current,
      ]);
    }

    resetForm();
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

  const handleDelete = (id) => {
    setListings((current) => current.filter((listing) => listing.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <div className="shop-demo-page">
      <div className="shop-demo-shell">
        <header className="shop-demo-header">
          <span className="eyebrow">Front-end demo</span>
          <h1>Shop listings dashboard.</h1>
          <p>
            A simple CRUD demo that lets you create, edit, and remove product listings. While this is a front-end-only demo, it simulates a real-world dashboard experience with form validation, state management, and local storage persistence.
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
            {listings.map((listing) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
