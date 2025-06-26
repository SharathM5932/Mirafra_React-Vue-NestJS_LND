import { useQueries } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdInventory } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

import ProductCard from "./ProductCard";
import axiosInstanceProducts from "../../utils/axiosInstanceProducts";
import type { RootState } from "../../app/store.ts";

import "react-loading-skeleton/dist/skeleton.css";
import "../../style/product.css";

// Types
interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
  sellerId: string;
}

const MyProducts = () => {
  const sellerId = useSelector((state: RootState) => state.auth.userId);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sort") || "";
  const categoryId = searchParams.get("category") || "";

  // Making the GET req. for category and product at a time
  const [
    { data: categories, isLoading: isCategoriesLoading },
    { data: products, isLoading: isProductsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["category"],
        queryFn: async () => {
          const response = await axiosInstanceProducts.get("/category");
          return response.data as { data: { categories: Category[] } };
        },
      },
      {
        queryKey: ["products", sortValue, categoryId, sellerId],
        queryFn: async ({ queryKey }) => {
          const [, sortValue, categoryId, sellerId] = queryKey as [
            string,
            string,
            string,
            string
          ];
          const response = await axiosInstanceProducts.get(
            `/myproducts/${sellerId}`,
            {
              params: { sortValue, categoryId },
            }
          );
          return response.data as { data: { products: Product[] } };
        },
      },
    ],
  });

  const handleSortChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sort: selectedSort,
    });
  };

  const handleCategoryChanges = (selectedCategoryId: string) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      category: selectedCategoryId,
    });
  };

  // framer motion animation states
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <div className="product_container">
      {/* Category */}
      <div className="categories">
        <h2>Categories</h2>
        <div className="category">
          {isCategoriesLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  animate="visible"
                  custom={idx}
                  variants={fadeIn}
                >
                  <Skeleton
                    height={30}
                    width={200}
                    style={{ marginBottom: 10 }}
                  />
                </motion.div>
              ))}
            </>
          ) : (
            <>
              <motion.p
                onClick={() => handleCategoryChanges("")}
                className={categoryId === "" ? "category_active" : ""}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={0}
              >
                All Categories
              </motion.p>
              {categories?.data?.categories.map((cat, idx) => (
                <motion.p
                  key={cat._id}
                  onClick={() => handleCategoryChanges(cat._id)}
                  className={categoryId === cat._id ? "category_active" : ""}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  custom={idx + 1}
                >
                  {cat.name}
                </motion.p>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="product_list">
        <div className="product_list_header">
          <h2>Products</h2>
          <select
            name="sort"
            id="sort"
            className="products_sorting"
            value={sortValue}
            onChange={handleSortChanges}
          >
            <option value="">Relevance</option>
            <option value="desc">Price HIGH TO LOW</option>
            <option value="asc">Price LOW TO HIGH</option>
          </select>
        </div>

        {isProductsLoading ? (
          <div className="product_card_container">
            {Array.from({ length: 8 }).map((_, idx) => (
              <motion.article
                className="product_card"
                key={idx}
                initial="hidden"
                animate="visible"
                custom={idx}
                variants={fadeIn}
              >
                <div className="product_card_image">
                  <Skeleton height={200} />
                </div>
                <div className="product_card_details">
                  <h1 className="product_card_title">
                    <Skeleton width={`80%`} height={24} />
                  </h1>
                  <p className="product_card_description">
                    <Skeleton count={2} height={14} />
                  </p>
                  <div className="product_info">
                    <h3 className="product_card_price">
                      <Skeleton width={100} height={20} />
                    </h3>
                    <h3 className="stock">
                      <Skeleton width={80} height={20} />
                    </h3>
                  </div>
                  <div className="product_btn">
                    <Skeleton
                      width={100}
                      height={35}
                      style={{ marginRight: 10 }}
                    />
                    <Skeleton width={100} height={35} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="product_card_container">
            {products?.data?.products?.length === 0 ? (
              <motion.div
                className="no_products"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "20px",
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                  color: "#555",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  marginTop: "20px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <MdInventory size={26} style={{ color: "#888" }} />
                <span>
                  You haven&apos;t added any products in this category yet.
                  Start listing to attract buyers!
                </span>
              </motion.div>
            ) : (
              products?.data?.products.map((product, idx) => (
                <motion.div
                  key={product._id}
                  initial="hidden"
                  animate="visible"
                  custom={idx}
                  variants={fadeIn}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
