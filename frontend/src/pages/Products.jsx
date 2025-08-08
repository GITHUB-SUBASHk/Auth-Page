import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '' });

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/products', form);
      setForm({ name: '', description: '', price: '' });
      fetchProducts();
    } catch (err) {
      alert('Error adding product');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert('Error deleting product');
    }
  };

  const handleEdit = async (updatedProduct) => {
    try {
      await API.put(`/products/${updatedProduct.id}`, updatedProduct);
      fetchProducts();
    } catch (err) {
      alert('Error updating product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>

      <div>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
}
