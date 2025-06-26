export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  status: "available" | "out-of-stock" | "discontinued";
  createdAt: string;
  rating: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: number;
  role: string[];
  createdAt: string;
  modifiedAt: string;
}
