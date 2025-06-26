import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import { Product } from "../types";
import { AppContext } from "../App";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiArrowRight } from "react-icons/fi";
import LeftSlider from "../components/layout/LeftSlider";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [showcaseProducts, setShowcaseProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { addToCart, addToWishlist, isInWishlist } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3004/products");
        const data = await response.json();

        const productsArray: Product[] = Array.isArray(data)
          ? data
          : data.products || [];

        const productsWithRatings = productsArray.map((product) => ({
          ...product,
          rating: product.rating || { rate: 0, count: 0 },
        }));

        const sortedByRating = [...productsWithRatings].sort(
          (a, b) => (b.rating.rate || 0) - (a.rating.rate || 0)
        );
        setFeaturedProducts(sortedByRating.slice(0, 10));

        const shuffled = [...productsWithRatings].sort(
          () => 0.5 - Math.random()
        );
        setShowcaseProducts(shuffled.slice(0, 9));

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle category navigation
  const handleCategoryClick = (categoryName: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>New Season Collection</h1>
          <p>Discover the latest trends with up to 30% off</p>
          <Link to="/products" className="cta-button1">
            Shop Now <FiArrowRight />
          </Link>
        </div>
      </section>
      
      {/* Featured Products Slider */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="view-all">
            View All <FiArrowRight />
          </Link>
        </div>
        <Slider {...sliderSettings} className="featured-slider">
          {featuredProducts.map((product) => (
            <div key={`featured-${product._id}`} className="slider-item">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </section>
      {/* Categories Section */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div
            className="category-card men"
            // onClick={() => handleCategoryClick("Men's Clothing")}
          >
            <h3>Men's Fashion</h3>
            <p>Trendy outfits for men</p>
          </div>
          <div
            className="category-card women"
            // onClick={() => handleCategoryClick("Women's Clothing")}
          >
            <h3>Women's Fashion</h3>
            <p>Stylish collections</p>
          </div>
          <div
            className="category-card electronics"
            // onClick={() => handleCategoryClick("Electronics")}
          >
            <h3>Electronics</h3>
            <p>Latest gadgets</p>
          </div>
          <div
            className="category-card electronics"
            // onClick={() => handleCategoryClick("Jewelery")}
          >
            <h3>Jewelery</h3>
            <p>Beautiful accessories</p>
          </div>
        </div>
      </section>
      {/* Showcase Products */}
      <section className="showcase-section">
        <div className="section-header">
          <h2>Trending Now</h2>
        </div>
        <div className="products-grid">
          {showcaseProducts.map((product) => (
            <ProductCard key={`showcase-${product._id}`} product={product} />
          ))}
        </div>
      </section>
      <LeftSlider/>
      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>Limited Time Offer</h2>
          <p>Get 25% off on all orders above $100</p>
          <Link to="/products" className="cta-button1">
            Shop the Sale <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
