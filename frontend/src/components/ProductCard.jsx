import React, { useState } from 'react';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (window.confirm("Are you sure you want to update this product?")) {
      onEdit(editForm); // assumes `editForm` has `id`
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditForm({ ...product });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product.id);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      {isEditing ? (
        <>
          <input name="name" value={editForm.name} onChange={handleChange} placeholder="Name" />
          <input name="description" value={editForm.description} onChange={handleChange} placeholder="Description" />
          <input name="price" type="number" value={editForm.price} onChange={handleChange} placeholder="Price" />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p><strong>₹{product.price}</strong></p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default ProductCard;
