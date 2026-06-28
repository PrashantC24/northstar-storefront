import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();

  if (!items.length) {
    return (
      <div className="page-shell">
        <div className="container cart-empty card">
          <h1>Your cart is empty</h1>
          <p>Explore our featured products and bring home something special.</p>
          <Link to="/products" className="primary-btn">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="container cart-layout">
        <section className="cart-items">
          {items.map((item) => (
            <div className="cart-item card" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.brand}</p>
                <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="text-link" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </section>

        <aside className="checkout-summary card">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <strong>Free</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
          </div>
          <Link to="/checkout" className="primary-btn full-width">Proceed to checkout</Link>
          <button className="secondary-btn full-width" onClick={clearCart}>
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}
