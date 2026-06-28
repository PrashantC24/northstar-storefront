export function getOrders() {
  const stored = window.localStorage.getItem('northstar-orders');
  let orders = stored ? JSON.parse(stored) : [];

  if (orders.length === 0) {
    orders = generateDummyOrders();
    window.localStorage.setItem('northstar-orders', JSON.stringify(orders));
  }

  return orders;
}

export function saveOrder(order) {
  const current = getOrders();
  const next = [
    {
      ...order,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    },
    ...current,
  ];
  window.localStorage.setItem('northstar-orders', JSON.stringify(next));
  return next[0];
}

function generateDummyOrders() {
  const customerNames = [
    'Emma Watson', 'James Smith', 'Olivia Davis', 'Liam Johnson', 
    'Sophia Brown', 'Noah Wilson', 'Ava Moore', 'William Taylor',
    'Isabella Anderson', 'Mason Thomas', 'Mia Jackson', 'Ethan White',
    'Charlotte Harris', 'Alexander Martin', 'Amelia Thompson', 'Lucas Garcia',
    'Harper Martinez', 'Benjamin Robinson', 'Evelyn Clark', 'Jacob Rodriguez'
  ];
  const orders = [];
  const paymentMethods = ['Credit Card', 'UPI', 'Cash on Delivery'];
  const statuses = ['Confirmed', 'Shipped', 'Delivered'];
  const categories = ['Electronics', 'Fashion', 'Home', 'Books'];
  
  const now = new Date();
  
  for (let i = 0; i < 75; i++) {
    // Random date within the last 12 months
    const date = new Date(now.getTime() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000));
    const itemsCount = Math.floor(Math.random() * 4) + 1;
    const items = [];
    let total = 0;
    
    for (let j = 0; j < itemsCount; j++) {
      const price = Math.floor(Math.random() * 20000) + 500;
      const quantity = Math.floor(Math.random() * 2) + 1;
      items.push({
        id: crypto.randomUUID(),
        name: `Dummy Product ${Math.floor(Math.random() * 100)}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        price,
        quantity,
      });
      total += price * quantity;
    }
    
    orders.push({
      id: crypto.randomUUID(),
      customer: customerNames[Math.floor(Math.random() * customerNames.length)],
      address: '123 Dummy Street, Test City',
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      total,
      items,
      createdAt: date.toISOString(),
    });
  }
  
  // Sort descending by date
  return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
