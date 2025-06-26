import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import ProductFilter from "../components/products/ProductFilter";
import { Product, Category } from "../types";
import { AppContext } from "../App";
import "../App.css";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const { addToCart, addToWishlist, isInWishlist } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3004/products");
        const data = await response.json();
        setProducts(data.products || data || []);
        console.log('Fetched products:', data.products?.length || data.length || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3006/categories");
        const data = await response.json();
        setCategories(data.categories || data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Check for category in URL params
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams, categories]);

  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply single category filter
    if (selectedCategory) {
      result = result.filter((product) => {
        if (typeof product.category === 'string') {
          return product.category === selectedCategory;
        } else {
          return product.category?._id === selectedCategory;
        }
      });
    }

    // Apply multiple categories filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => {
        if (typeof product.category === 'string') {
          return selectedCategories.includes(product.category);
        } else {
          return product.category && selectedCategories.includes(product.category._id);
        }
      });
    }

    // Apply price range filter
    result = result.filter(
      (product) =>
        (priceRange.min === null || product.price >= priceRange.min) && 
        (priceRange.max === null || product.price <= priceRange.max)
    );

    console.log('Filtered products count:', result.length);
    setFilteredProducts(result);
  }, [products, selectedCategory, selectedCategories, priceRange, searchQuery]);

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedCategories([]);
    setPriceRange({ min: null, max: null });
    setSearchQuery("");
  };

  const toggleCategoryFilter = (categoryId: string) => {
    setSelectedCategories(prev => {
      const index = prev.indexOf(categoryId);
      if (index === -1) {
        return [...prev, categoryId];
      } else {
        return prev.filter(id => id !== categoryId);
      }
    });
  };

  const getCategoryName = (product: Product): string => {
    if (!product.category) return '';
    if (typeof product.category === 'string') {
      const category = categories.find(c => c._id === product.category);
      return category?.name || '';
    }
    return product.category.name;
  };

  return (
    <div className="products-page">
      <div className="product-filter-container">
        <ProductFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onPriceRangeChange={(range) => setPriceRange({
            min: range.min,
            max: range.max === Infinity ? null : range.max
          })}
          selectedPriceRange={{
            min: priceRange.min !== null ? priceRange.min : 0,
            max: priceRange.max !== null ? priceRange.max : Infinity
          }}
          onClearFilters={clearAllFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />        
      </div>

      <div className="products-grid-container">
        <div className="products-header">
          <h1 className="page-title">Our Products</h1>
          <p className="products-count">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {isLoading ? (
          <div className="loading-state">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            {(selectedCategory || searchQuery || priceRange.min !== null || priceRange.max !== null) && (
              <button onClick={clearAllFilters} className="clear-filters-btn">
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;