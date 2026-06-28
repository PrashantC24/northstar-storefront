import { lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';

const HomePage = lazy(() => import('./features/products/HomePage'));
const LoginPage = lazy(() => import('./features/auth/LoginPage'));
const RegisterPage = lazy(() => import('./features/auth/RegisterPage'));
const ProductListPage = lazy(() => import('./features/products/ProductListPage'));
const ProductDetailPage = lazy(() => import('./features/products/ProductDetailPage'));
const CartPage = lazy(() => import('./features/cart/CartPage'));
const CheckoutPage = lazy(() => import('./features/cart/CheckoutPage'));
const OrderHistoryPage = lazy(() => import('./features/orders/OrderHistoryPage'));
const ProfilePage = lazy(() => import('./features/orders/ProfilePage'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminRoute = lazy(() => import('./routes/AdminRoute'));
const AdminDashboard = lazy(() => import('./features/admin/AdminDashboard'));
const AddProductPage = lazy(() => import('./features/admin/AddProductPage'));

function NotFoundPage() {
  return (
    <div className="page-shell">
      <div className="container" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <h1 style={{ fontSize: '5rem', fontWeight: 800, color: '#f59e0b', lineHeight: 1 }}>404</h1>
        <p style={{ fontSize: '1.25rem', color: '#9ca3af', margin: '1rem 0 2rem' }}>
          Oops — the page you're looking for doesn't exist.
        </p>
        <Link to="/" className="primary-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div className="loading-shell">Loading experience...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products/new" element={<AddProductPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
