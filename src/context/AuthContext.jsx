import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = window.localStorage.getItem('northstar-user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('northstar-user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('northstar-user');
    }
  }, [user]);

  const login = (email, password) => {
    if (!email || !password) {
      return false;
    }

    const isAdmin = email === 'admin@northstar.com' && password === 'admin123';
    
    const profile = {
      id: crypto.randomUUID(),
      name: isAdmin ? 'Admin' : email.split('@')[0],
      email,
      role: isAdmin ? 'admin' : 'customer',
      avatar: isAdmin 
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' 
        : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    };

    setUser(profile);
    return true;
  };

  const register = (name, email, password) => {
    if (!name || !email || !password) {
      return false;
    }

    const profile = {
      id: crypto.randomUUID(),
      name,
      email,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    };

    setUser(profile);
    return true;
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({ user, login, register, logout, isAuthenticated: Boolean(user) }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
