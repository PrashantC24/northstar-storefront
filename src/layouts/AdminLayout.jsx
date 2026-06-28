import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#050508] text-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0f0f10] border-r border-[#2b2226] flex flex-col">
        <div className="p-4 border-b border-[#2b2226] flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="text-xl font-bold text-[#f59e0b]">Admin Panel</span>
          </NavLink>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <NavLink to="/admin" end className={({isActive}) => `px-4 py-2 rounded-md ${isActive ? 'bg-[#2b2226] text-white font-semibold' : 'text-gray-400 hover:text-gray-200'}`}>
            Dashboard Overview
          </NavLink>
          <NavLink to="/admin/products/new" className={({isActive}) => `px-4 py-2 rounded-md ${isActive ? 'bg-[#2b2226] text-white font-semibold' : 'text-gray-400 hover:text-gray-200'}`}>
            Add Product
          </NavLink>
        </nav>
        
        <div className="p-4 border-t border-[#2b2226]">
          <div className="flex items-center gap-3 mb-4">
            <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full" />
            <div>
              <div className="text-sm font-semibold">{user?.name}</div>
              <div className="text-xs text-gray-400">Administrator</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-md text-gray-400 hover:bg-[#2b2226] hover:text-white transition">
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#0b0b0d]">
        <header className="sticky top-0 z-10 bg-[#0f0f10]/80 backdrop-blur-md border-b border-[#2b2226] p-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Northstar Admin</h1>
          <NavLink to="/" className="text-sm text-gray-400 hover:text-[#f59e0b]">Back to Store</NavLink>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
