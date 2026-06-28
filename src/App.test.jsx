import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

vi.mock('./services/categoryService', () => ({
  getCategories: vi.fn(() => Promise.resolve([{ id: 1, name: 'Electronics', description: 'Test', image: '/images/category-electronics.svg' }])),
}));

vi.mock('./services/productService', () => ({
  getProducts: vi.fn(() => Promise.resolve([{ id: 1, name: 'Aurora Smartwatch', price: 24999, rating: 4.8, brand: 'Auralis', category: 'Electronics', description: 'Feature rich', image: '/images/product-watch.svg', images: ['/images/product-watch.svg'], featured: true, bestSeller: true }])),
  getFeaturedProducts: vi.fn(() => Promise.resolve([{ id: 1, name: 'Aurora Smartwatch', price: 24999, rating: 4.8, brand: 'Auralis', category: 'Electronics', description: 'Feature rich', image: '/images/product-watch.svg', images: ['/images/product-watch.svg'], featured: true, bestSeller: true }])),
  getBestSellers: vi.fn(() => Promise.resolve([{ id: 1, name: 'Aurora Smartwatch', price: 24999, rating: 4.8, brand: 'Auralis', category: 'Electronics', description: 'Feature rich', image: '/images/product-watch.svg', images: ['/images/product-watch.svg'], featured: true, bestSeller: true }])),
  getProductById: vi.fn(() => Promise.resolve({ id: 1, name: 'Aurora Smartwatch', price: 24999, rating: 4.8, brand: 'Auralis', category: 'Electronics', description: 'Feature rich', image: '/images/product-watch.svg', images: ['/images/product-watch.svg'], featured: true, bestSeller: true })),
}));

vi.mock('./services/reviewService', () => ({
  getReviews: vi.fn(() => Promise.resolve([{ id: 1, author: 'Naina', rating: 5, title: 'Great', body: 'Loved it.' }])),
}));

test('renders the shopping experience shell', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>,
  );

  expect(await screen.findByRole('link', { name: /northstar/i })).toBeInTheDocument();
  expect(await screen.findByText(/Upgrade your routine/i)).toBeInTheDocument();
});
