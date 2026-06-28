import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function MainLayout() {
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#050508] to-[#0b0b0d] text-gray-100">
      <header className="sticky top-0 z-30 bg-[#050508]/90 backdrop-blur-md">
        <div className="container-custom flex items-center justify-between py-4">
          <NavLink to="/" className="flex items-center gap-3">
            <img src="/images/logo.svg" alt="Northstar" className="w-10 h-10" />
            <span className="text-xl font-bold">Northstar</span>
          </NavLink>

          <button
            className="md:hidden text-gray-200 text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          <nav
            className={`flex flex-col md:flex-row items-center gap-3 ${
              menuOpen
                ? 'absolute top-full left-0 right-0 bg-[#0a0a0e]/95 backdrop-blur-md p-6 border-b border-[#1b1b1b] flex flex-col'
                : 'hidden md:flex'
            }`}
          >
            <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>Shop</NavLink>
            <NavLink to="/orders" className="nav-link" onClick={() => setMenuOpen(false)}>Orders</NavLink>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {user?.role === 'admin' && (
                  <NavLink to="/admin" className="nav-link text-[#f59e0b]">Admin Panel</NavLink>
                )}
                <NavLink to="/cart" className="nav-link">Cart ({itemCount})</NavLink>
                <NavLink to="/profile" className="nav-link">Profile</NavLink>
                <button onClick={logout} className="nav-link">Logout</button>
              </div>
            ) : (
              <>
                <NavLink to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</NavLink>
                <NavLink to="/register" className="primary-cta" onClick={() => setMenuOpen(false)}>Sign up</NavLink>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-8 border-t border-[#1b1b1b]">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© 2026 Northstar. Crafted for fast, delightful shopping.</p>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>Free shipping</span>
            <span>Secure checkout</span>
            <span>24/7 support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
