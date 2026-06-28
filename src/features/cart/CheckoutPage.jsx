import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { saveOrder } from '../../services/orderService';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!address.trim()) {
      return;
    }

    saveOrder({
      customer: user?.name || 'Guest',
      items,
      address,
      paymentMethod,
      total: subtotal,
    });

    clearCart();
    navigate('/orders');
  };

  return (
    <div className="py-8">
      <div className="container-custom grid grid-cols-1 md:grid-cols-12 gap-6">
        <section className="md:col-span-7 card-custom p-6">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-gray-300">Delivery address</label>
              <textarea value={address} onChange={(event) => setAddress(event.target.value)} rows="4" placeholder="Enter your delivery address" className="w-full bg-transparent border border-[#2b2226] rounded-md p-3 text-gray-100" />
            </div>
            <div>
              <label className="text-sm text-gray-300">Payment method</label>
              <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} className="w-full bg-transparent border border-[#2b2226] rounded-md p-3 text-gray-100">
                <option>Credit Card</option>
                <option>UPI</option>
                <option>Cash on Delivery</option>
              </select>
            </div>
            <button className="primary-cta" type="submit">Place order</button>
          </form>
        </section>

        <aside className="md:col-span-5 card-custom p-6">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div className="flex items-center justify-between" key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between font-semibold">
            <span>Total</span>
            <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
