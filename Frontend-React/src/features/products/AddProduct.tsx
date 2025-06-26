import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { addProduct } from './productSlice';
import './AddProduct.css';
import { useNavigate } from 'react-router-dom';

const AddProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    name: '',
    desc: '',
    price: '',
    cat: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigateToHome = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (file) formData.append('pimg', file);
    dispatch(addProduct(formData));
    setForm({ name: '', desc: '', price: '', cat: '' });
    setFile(null);
    alert("Product added successfully");
    navigateToHome("/");
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <input name="name" placeholder="Name" onChange={handleChange} />
      <textarea name="desc" placeholder="Description" onChange={handleChange} />
      <input name="price" type="string" placeholder="Price" onChange={handleChange} />
      {/* <input name="cat" placeholder="Category" onChange={handleChange} /> */}

      <select name="cat" onChange={handleChange}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          marginTop: '10px',
          fontSize: '16px',
          backgroundColor: '#f5f7fa'
        }}>
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Beauty">Beauty</option>
        <option value="Footwear">Footwear</option>
      </select>

      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button type="submit" >Add Product</button>
    </form>
  );
};

export default AddProduct;