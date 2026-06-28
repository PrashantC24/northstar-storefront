import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/SectionHeading';
import HeroBanner from '../../components/HeroBanner';
import ProductCard from '../../components/ProductCard';
import ReviewCard from '../../components/ReviewCard';
import { getCategories } from '../../services/categoryService';
import { getFeaturedProducts, getBestSellers, getProducts } from '../../services/productService';
import { getReviews } from '../../services/reviewService';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [cats, featured, sellers, allProducts, reviewData] = await Promise.all([
        getCategories(),
        getFeaturedProducts(),
        getBestSellers(),
        getProducts(),
        getReviews(),
      ]);
      setCategories(cats);
      setFeaturedProducts(featured);
      setBestSellers(sellers);
      setProducts(allProducts);
      setReviews(reviewData);
    }

    loadData();
  }, []);

  const heroSlides = [
    {
      title: 'Upgrade your routine with premium essentials',
      subtitle: 'Discover curated gadgets, fashion picks, and home upgrades at irresistible prices.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      cta: 'Shop now',
    },
    {
      title: 'Fresh arrivals for every season',
      subtitle: 'Elevated fashion, home accents, and tech essentials in one place.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
      cta: 'Browse new arrivals',
    },
    {
      title: 'Built for fast, delightfully simple shopping',
      subtitle: 'Find what fits your lifestyle with curated product collections and quick checkout.',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80',
      cta: 'Shop bestsellers',
    },
  ];

  return (
    <div className="py-8">
      <div className="container-custom">
        <HeroBanner slides={heroSlides} />

        <section className="mt-8">
          <SectionHeading title="Shop by category" linkTo="/products" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {categories.map((category) => (
              <Link to={`/products?category=${encodeURIComponent(category.name)}`} className="block card-custom p-4" key={category.id}>
                <img src={category.image} alt={category.name} className="w-full h-36 object-cover rounded-md" />
                <h3 className="mt-2 text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-400">{category.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionHeading title="Featured products" linkTo="/products" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionHeading title="Best sellers" linkTo="/products" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-8 card-custom p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm text-[#f59e0b] font-bold">Limited-time offer</p>
            <h2 className="text-xl font-bold mt-1">Save up to 30% on premium tech bundles</h2>
            <p className="text-gray-400 mt-1">Shop across electronics, wearables, and accessories for a smarter setup this season.</p>
          </div>
          <a href="/products" className="primary-cta w-fit">Claim offer</a>
        </section>

        <section className="mt-8">
          <SectionHeading title="What customers say" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
