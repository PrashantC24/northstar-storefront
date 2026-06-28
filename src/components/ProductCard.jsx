import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="bg-[#0f0f10] border border-[#281b1e] rounded-lg-plus overflow-hidden shadow-md hover:-translate-y-1 transform transition">
      <div className="relative">
        <Link to={`/products/${product.id}`} className="block">
          <img src={product.image} alt={product.name} className="w-full h-44 object-cover" />
        </Link>
        {product.bestSeller && (
          <span className="absolute left-3 top-3 bg-[#4c113a] text-xs text-white px-2 py-1 rounded">BEST SELLER</span>
        )}
        {product.featured && (
          <span className="absolute right-3 top-3 bg-[#f59e0b] text-xs text-black px-2 py-1 rounded">FEATURED</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="pill-chip">{product.category}</span>
          <span className="text-sm text-yellow-400">★ {product.rating}</span>
        </div>
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{product.description}</p>
        {product.colors && (
          <div className="flex items-center gap-2 mt-3">
            {product.colors.slice(0,4).map((c) => (
              <span key={c} className="w-4 h-4 rounded-full border" style={{ backgroundColor: c }} />
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-[#f59e0b]">₹{product.price.toLocaleString('en-IN')}</div>
            <div className="text-xs text-gray-400">{product.brand}</div>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#4c113a] flex items-center justify-center text-white shadow" onClick={() => addToCart(product)}>
            🛒
          </button>
        </div>
      </div>
    </article>
  );
}
