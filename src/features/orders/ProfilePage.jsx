import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getOrders } from '../../services/orderService';

export default function ProfilePage() {
  const { user } = useAuth();
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    setOrderCount(getOrders().length);
  }, []);

  return (
    <div className="page-shell">
      <div className="container profile-layout">
        <section className="card profile-card">
          <div className="profile-avatar">
            <img src={user?.avatar} alt={user?.name} />
          </div>
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
          <div className="profile-stats">
            <div className="stat-card card">
              <strong>{orderCount}</strong>
              <span>Orders</span>
            </div>
            <div className="stat-card card">
              <strong>4.9</strong>
              <span>Member rating</span>
            </div>
          </div>
        </section>
        <section className="card profile-details">
          <h2>Preferences</h2>
          <p>You're currently enjoying early access to new arrivals, premium offers, and free express delivery on select items.</p>
        </section>
      </div>
    </div>
  );
}
