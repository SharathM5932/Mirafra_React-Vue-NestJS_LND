import axios from 'axios';

const API_URL = 'http://localhost:3002/products';

export const getProductById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const getAllProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};


export const createProduct = async (productData: any) => {
    const response = await axios.post("http://localhost:3002/products/add", productData);
    return response.data;
};

export const updateProduct = async (id: string, updatedData: any) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
};

export const deleteProduct = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
