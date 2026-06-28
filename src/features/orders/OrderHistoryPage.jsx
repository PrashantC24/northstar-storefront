import { useEffect, useState } from 'react';
import { getOrders } from '../../services/orderService';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return (
    <div className="page-shell">
      <div className="container">
        <h1>Order history</h1>
        {!orders.length ? (
          <div className="card empty-state">
            <p>No orders yet. Start with a fresh cart and checkout.</p>
          </div>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <article className="card order-card" key={order.id}>
                <div className="order-header">
                  <div>
                    <h3>{order.customer}</h3>
                    <p>{order.address}</p>
                  </div>
                  <span className="pill">{order.status}</span>
                </div>
                <div className="summary-row">
                  <span>Payment</span>
                  <strong>{order.paymentMethod}</strong>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <strong>₹{order.total.toLocaleString('en-IN')}</strong>
                </div>
                <div className="order-items">
                  {order.items?.map((item) => (
                    <span key={item.id}>{item.name} × {item.quantity}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
