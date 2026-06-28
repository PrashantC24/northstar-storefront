import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../services/productService';
import { useAuth } from '../../context/AuthContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    async function loadProduct() {
      const selected = await getProductById(id);
      if (selected) {
        setProduct(selected);
        setActiveImage(selected.image);
      }
    }

    loadProduct();
  }, [id]);

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart(product);
    navigate('/checkout');
  };

  if (!product) {
    return <div className="container page-shell">Loading product...</div>;
  }

  return (
    <div className="py-8">
      <div className="container-custom grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6 card-custom p-4">
          <img src={activeImage} alt={product.name} className="w-full h-96 object-cover rounded-md" />
          <div className="flex gap-2 mt-3">
            {product.images?.map((image) => (
              <button key={image} className="w-20 h-20 rounded-md overflow-hidden" onClick={() => setActiveImage(image)}>
                <img src={image} alt={`${product.name} view`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 card-custom p-6">
          <span className="pill-chip">{product.category}</span>
          <h1 className="text-2xl font-bold mt-2">{product.name}</h1>
          <p className="text-gray-400 mt-2">{product.description}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <span className="text-yellow-400 font-semibold">★ {product.rating}</span>
              <span className="text-sm text-gray-400">{product.brand}</span>
            </div>
            <div className="text-2xl font-bold text-[#f59e0b]">₹{product.price.toLocaleString('en-IN')}</div>
          </div>

          {product.colors && (
            <div className="mt-4">
              <div className="text-sm text-gray-300 mb-2">Available colors</div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button key={c} className="w-8 h-8 rounded-full border" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button className="primary-cta" onClick={() => addToCart(product)}>Add to cart</button>
            <button onClick={handleBuyNow} className="inline-flex items-center px-4 py-2 bg-[#1b1720] text-gray-300 rounded-md hover:bg-[#2b2226] transition">Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
