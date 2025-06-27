// services/productService.ts

import axios from 'axios';

const API_URL = 'http://localhost:3002/products';


// Create a new product
export const addProduct = async (productData: any) => {
    const response = await axios.post(`${API_URL}/add`, productData);
    return response.data;
};


// Update a product by ID
export const updateProduct = async (id: string, updatedData: any) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
};


// Get a product by ID
export const getProductById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Get all products
export const getAllProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};




// Delete a product by ID
export const removeProduct = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
