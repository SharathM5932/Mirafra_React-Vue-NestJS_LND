// ProductFilter.tsx
import { ChangeEvent } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { Category } from '../../types';

interface ProductFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  selectedPriceRange: { min: number; max: number };
  onClearFilters: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ProductFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onPriceRangeChange,
  selectedPriceRange,
  onClearFilters,
  searchQuery,
  onSearchChange,
}: ProductFilterProps) => {
  const priceRanges = [
    { label: 'All Prices', value: '0-Infinity' },
    { label: 'Under $20', value: '0-20' },
    { label: '$20 - $50', value: '20-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: 'Over $100', value: '100-Infinity' },
  ];

  const handlePriceRangeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [minStr, maxStr] = e.target.value.split('-');
    const min = minStr === 'Infinity' ? 0 : Number(minStr);
    const max = maxStr === 'Infinity' ? Infinity : Number(maxStr);
    onPriceRangeChange({ min, max });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const getPriceRangeValue = () => {
    if (selectedPriceRange.min === 0 && selectedPriceRange.max === Infinity) {
      return '0-Infinity';
    }
    return `${selectedPriceRange.min}-${selectedPriceRange.max === Infinity ? 'Infinity' : selectedPriceRange.max}`;
  };

  const isAnyFilterActive = Boolean(
    selectedCategory ||
    searchQuery ||
    !(selectedPriceRange.min === 0 && selectedPriceRange.max === Infinity)
  );

  return (
    <div className="product-filter">
      <div className="filter-header">
        <h3 className="filter-title">
          <FaFilter className="filter-icon" />
          Filters
        </h3>
        {isAnyFilterActive && (
          <button onClick={onClearFilters} className="clear-filters">
            <FaTimes />
            Clear all
          </button>
        )}
      </div>

      <div className="filter-sections">
        {/* Search Input */}
        <div className="filter-section">
          <h4 className="section-title">Search</h4>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        {/* Category Filter */}
        <div className="filter-section">
          <h4 className="section-title">Categories</h4>
          <div className="category-options">
            <div className="filter-option">
              <input
                type="radio"
                id="category-all"
                name="category"
                value=""
                checked={!selectedCategory}
                onChange={() => onCategoryChange('')}
              />
              <label htmlFor="category-all">All Categories</label>
            </div>
            {categories.map((category) => (
              <div key={category._id} className="filter-option">
                <input
                  type="radio"
                  id={`category-${category._id}`}
                  name="category"
                  value={category._id}
                  checked={selectedCategory === category._id}
                  onChange={() => onCategoryChange(category._id)}
                />
                <label htmlFor={`category-${category._id}`}>
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="filter-section">
          <h4 className="section-title">Price Range</h4>
          <select
            value={getPriceRangeValue()}
            onChange={handlePriceRangeChange}
            className="price-select"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;