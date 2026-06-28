import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../services/productService';
import FilterDrawer from '../../components/FilterDrawer';

const ITEMS_PER_PAGE = 12;

export default function ProductListPage() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProducts() {
      const allProducts = await getProducts();
      setProducts(allProducts);
    }

    loadProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');

    if (category) {
      setSelectedCategory(category);
    }
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = [product.name, product.brand, product.category]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesColor = selectedColors.length === 0 || (product.colors && product.colors.some((c) => selectedColors.includes(c)));
      const matchesPrice = product.price <= maxPrice;
      const matchesRating = product.rating >= minRating;

      return matchesSearch && matchesCategory && matchesBrand && matchesColor && matchesPrice && matchesRating;
    });

    const sorted = [...filtered].sort((left, right) => {
      if (sortBy === 'price-low') return left.price - right.price;
      if (sortBy === 'price-high') return right.price - left.price;
      if (sortBy === 'rating') return right.rating - left.rating;
      return right.featured - left.featured;
    });

    return sorted;
  }, [products, searchTerm, selectedCategory, selectedBrands, selectedColors, maxPrice, minRating, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedCategory, selectedBrands, selectedColors, maxPrice, minRating, sortBy]);

  const categories = ['All', ...new Set(products.map((product) => product.category))];
  const brands = [...new Set(products.map((product) => product.brand))];
  const allColors = [...new Set(products.flatMap((p) => p.colors || []))];
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="py-8">
      <div className="container-custom grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="hidden md:block md:col-span-3">
          <div className="card-custom p-4 filter-accent sticky top-24" style={{maxHeight: '70vh', overflow: 'auto'}}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button className="text-sm text-gray-400" onClick={() => {
                setSearchTerm(''); setSelectedCategory('All'); setSelectedBrands([]); setSelectedColors([]); setMaxPrice(50000); setMinRating(0); setSortBy('featured');
              }}>Clear</button>
            </div>

            <label className="block text-sm text-gray-300 mb-2">Search</label>
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search products" className="w-full bg-transparent border border-[#2b2226] rounded-md p-2 text-gray-100 mb-4" />

            <label className="block text-sm text-gray-300 mb-2">Category</label>
            <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="w-full bg-transparent border border-[#2b2226] rounded-md p-2 text-gray-100 mb-4">
              {categories.map((category) => (
                <option key={category} value={category} className="bg-[#0b0b0d]">{category}</option>
              ))}
            </select>

            <label className="block text-sm text-gray-300 mb-2">Brand</label>
            <div className="mb-4 space-y-2">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedBrands((s) => [...s, brand]);
                      else setSelectedBrands((s) => s.filter((b) => b !== brand));
                    }}
                    className="form-checkbox h-4 w-4 text-[#f59e0b] bg-transparent border-gray-600"
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>

            <label className="block text-sm text-gray-300 mb-2">Price up to ₹{maxPrice.toLocaleString('en-IN')}</label>
            <input type="range" min="1000" max="50000" step="1000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full mb-4" />

            <label className="block text-sm text-gray-300 mb-2">Minimum rating</label>
            <select value={minRating} onChange={(event) => setMinRating(Number(event.target.value))} className="w-full bg-transparent border border-[#2b2226] rounded-md p-2 text-gray-100 mb-4">
              <option value={0}>Any</option>
              <option value={4}>4+</option>
              <option value={4.5}>4.5+</option>
            </select>
          </div>
        </aside>
        <section className="md:col-span-9">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Discover products</h2>
              <p className="text-sm text-gray-400">Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} items</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setDrawerOpen(true)} className="md:hidden bg-[#1b1720] px-3 py-2 rounded-md text-sm">
                Filters
              </button>
              <label className="text-sm text-gray-300">Sort by</label>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="bg-transparent border border-[#2b2226] rounded-md p-2 text-gray-100">
                <option value="featured" className="bg-[#0b0b0d]">Featured</option>
                <option value="price-low" className="bg-[#0b0b0d]">Price: Low to High</option>
                <option value="price-high" className="bg-[#0b0b0d]">Price: High to Low</option>
                <option value="rating" className="bg-[#0b0b0d]">Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md bg-[#1b1720] text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#2b2226] transition"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-md text-sm font-semibold transition ${
                    page === currentPage
                      ? 'bg-[#f59e0b] text-black'
                      : 'bg-[#1b1720] text-gray-300 hover:bg-[#2b2226]'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md bg-[#1b1720] text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#2b2226] transition"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
      <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="p-2">
          <label className="block text-sm text-gray-300 mb-2">Search</label>
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search products" className="w-full bg-transparent border border-[#2b2226] rounded-md p-2 text-gray-100 mb-4" />

          <label className="block text-sm text-gray-300 mb-2">Category</label>
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="w-full bg-transparent border border-[#2b2226] rounded-md p-2 text-gray-100 mb-4">
            {['All', ...categories.filter(c => c !== 'All')].map((category) => (
              <option key={category} value={category} className="bg-[#0b0b0d]">{category}</option>
            ))}
          </select>

            <label className="block text-sm text-gray-300 mb-2">Brand</label>
          <div className="mb-4 space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 text-gray-200">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={(e) => {
                    if (e.target.checked) setSelectedBrands((s) => [...s, brand]);
                    else setSelectedBrands((s) => s.filter((b) => b !== brand));
                  }}
                  className="form-checkbox h-4 w-4 text-[#f59e0b] bg-transparent border-gray-600"
                />
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>

            <label className="block text-sm text-gray-300 mb-2">Colors</label>
            <div className="flex gap-2 flex-wrap mb-4">
              {allColors.map((color) => (
                <button
                  key={color}
                  aria-label={`Filter color ${color}`}
                  onClick={() => {
                    if (selectedColors.includes(color)) setSelectedColors((s) => s.filter((c) => c !== color));
                    else setSelectedColors((s) => [...s, color]);
                  }}
                  className={`w-8 h-8 rounded-full border ${selectedColors.includes(color) ? 'ring-2 ring-offset-1 ring-[#f59e0b]' : 'border-[#1f1b1d]'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

          <label className="block text-sm text-gray-300 mb-2">Price up to ₹{maxPrice.toLocaleString('en-IN')}</label>
          <input type="range" min="1000" max="50000" step="1000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full mb-4" />

          <div className="flex gap-2">
            <button className="primary-cta flex-1" onClick={() => setDrawerOpen(false)}>Apply</button>
            <button className="ml-2 px-4 py-2 rounded-md bg-[#1b1720] text-gray-300" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedBrands([]); setSelectedColors([]); setMaxPrice(50000); setMinRating(0); setSortBy('featured'); setDrawerOpen(false); }}>Clear</button>
          </div>
        </div>
      </FilterDrawer>
    </div>
  );
}
