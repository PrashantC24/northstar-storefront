import { useState } from 'react';
import { addProduct } from '../../services/productService';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    brand: '',
    category: 'Electronics',
    description: '',
    image: ''
  });
  const [status, setStatus] = useState(null); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await addProduct({
        ...formData,
        price: Number(formData.price)
      });
      setStatus('success');
      setFormData({
        name: '',
        price: '',
        brand: '',
        category: 'Electronics',
        description: '',
        image: ''
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-[#f59e0b]">Add New Product</h2>
      
      {status === 'success' && (
        <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded mb-6">
          Product added successfully!
        </div>
      )}
      
      {status === 'error' && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
          Failed to add product. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-[#0b0b0d] p-6 rounded-lg border border-[#2b2226]">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#0f0f10] border border-[#2b2226] rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors"
            placeholder="e.g. Wireless Headphones"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-[#0f0f10] border border-[#2b2226] rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-400 mb-1">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              required
              value={formData.brand}
              onChange={handleChange}
              className="w-full bg-[#0f0f10] border border-[#2b2226] rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors"
              placeholder="e.g. Sony"
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-[#0f0f10] border border-[#2b2226] rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors"
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Sports">Sports</option>
            <option value="Toys">Toys</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-400 mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            required
            value={formData.image}
            onChange={handleChange}
            className="w-full bg-[#0f0f10] border border-[#2b2226] rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-[#0f0f10] border border-[#2b2226] rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors resize-none"
            placeholder="Detailed product description..."
          ></textarea>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f10] font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
