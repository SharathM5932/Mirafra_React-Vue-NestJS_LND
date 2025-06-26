// category.d.ts
export interface Category {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CategoryResponse {
  message: string;
  categories: Category[];
}

export interface SingleCategoryResponse {
  message: string;
  category: Category;
}