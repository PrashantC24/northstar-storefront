import React, { useEffect, useState, useMemo } from 'react';
import { getOrders } from '../../services/orderService';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { format, parseISO, isValid } from 'date-fns';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('executive');

  useEffect(() => {
    // The prompt snippet indicates getOrders() is synchronous or returns a direct array.
    // If it's a promise, you'd typically await it, but we follow the exact snippet provided.
    const fetchedOrders = getOrders();
    if (fetchedOrders && typeof fetchedOrders.then === 'function') {
      fetchedOrders.then(data => setOrders(data || [])).catch(console.error);
    } else {
      setOrders(fetchedOrders || []);
    }
  }, []);

  const kpis = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    return { totalOrders, totalRevenue, averageOrderValue };
  }, [orders]);

  const revenueTrendData = useMemo(() => {
    const grouped = {};
    orders.forEach(order => {
      if (!order.createdAt) return;
      try {
        const date = typeof order.createdAt === 'string' ? parseISO(order.createdAt) : new Date(order.createdAt);
        if (!isValid(date)) return;
        const month = format(date, 'MMM yyyy');
        if (!grouped[month]) grouped[month] = 0;
        grouped[month] += (order.total || 0);
      } catch (e) {
        console.error("Invalid date format", e);
      }
    });
    return Object.keys(grouped).map(month => ({ month, revenue: grouped[month] }));
  }, [orders]);

  const categorySalesData = useMemo(() => {
    const grouped = {};
    orders.forEach(order => {
      if (!order.items) return;
      order.items.forEach(item => {
        const cat = item.category || 'Uncategorized';
        if (!grouped[cat]) grouped[cat] = 0;
        grouped[cat] += (item.price || 0) * (item.quantity || 1);
      });
    });
    return Object.keys(grouped).map(name => ({ name, sales: grouped[name] }));
  }, [orders]);

  const paymentMethodData = useMemo(() => {
    const grouped = {};
    orders.forEach(order => {
      const method = order.paymentMethod || 'Unknown';
      if (!grouped[method]) grouped[method] = 0;
      grouped[method] += 1;
    });
    return Object.keys(grouped).map(name => ({ name, value: grouped[name] }));
  }, [orders]);

  const customerGrowthData = useMemo(() => {
    // Using orders as proxy for new customers
    const grouped = {};
    orders.forEach(order => {
      if (!order.createdAt) return;
      try {
        const date = typeof order.createdAt === 'string' ? parseISO(order.createdAt) : new Date(order.createdAt);
        if (!isValid(date)) return;
        const month = format(date, 'MMM yyyy');
        if (!grouped[month]) grouped[month] = 0;
        grouped[month] += 1; // 1 order = 1 customer for this proxy
      } catch (e) {}
    });
    return Object.keys(grouped).map(month => ({ month, customers: grouped[month] }));
  }, [orders]);

  // Requested colors: #f59e0b (Amber), #e11d48 (Rose), #0ea5e9 (Sky), #10b981 (Emerald)
  const COLORS = ['#f59e0b', '#e11d48', '#0ea5e9', '#10b981', '#a855f7', '#6366f1'];

  const chartTheme = {
    gridStroke: '#2b2226',
    tooltipContentStyle: { backgroundColor: '#0f0f10', borderColor: '#2b2226', color: '#fff', borderRadius: '8px' },
    axisStroke: '#71717a',
    axisText: '#a1a1aa'
  };

  const tabs = [
    { id: 'executive', label: 'Executive' },
    { id: 'sales', label: 'Sales' },
    { id: 'product', label: 'Product' },
    { id: 'customer', label: 'Customer' },
  ];

  return (
    <div style={{ padding: '2rem', color: '#fff', minHeight: '100vh', boxSizing: 'border-box' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-0.025em' }}>Admin Dashboard</h1>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', borderBottom: '2px solid #2b2226', paddingBottom: '1rem', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: activeTab === tab.id ? '#f59e0b' : 'transparent',
              color: activeTab === tab.id ? '#0f0f10' : '#a1a1aa',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? '700' : '500',
              transition: 'all 0.2s ease',
              fontSize: '1rem',
              boxShadow: activeTab === tab.id ? '0 4px 14px 0 rgba(245, 158, 11, 0.39)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ backgroundColor: '#0f0f10', border: '1px solid #2b2226', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
          <h3 style={{ color: '#a1a1aa', fontSize: '0.875rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Total Revenue</h3>
          <p style={{ fontSize: '2.25rem', fontWeight: '800', color: '#f59e0b' }}>${kpis.totalRevenue.toFixed(2)}</p>
        </div>
        <div style={{ backgroundColor: '#0f0f10', border: '1px solid #2b2226', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
          <h3 style={{ color: '#a1a1aa', fontSize: '0.875rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Total Orders</h3>
          <p style={{ fontSize: '2.25rem', fontWeight: '800', color: '#e11d48' }}>{kpis.totalOrders}</p>
        </div>
        <div style={{ backgroundColor: '#0f0f10', border: '1px solid #2b2226', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
          <h3 style={{ color: '#a1a1aa', fontSize: '0.875rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Average Order Value</h3>
          <p style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0ea5e9' }}>${kpis.averageOrderValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        
        {/* Revenue Trend Line Chart */}
        {(activeTab === 'executive' || activeTab === 'sales') && (
          <div style={{ backgroundColor: '#0f0f10', border: '1px solid #2b2226', borderRadius: '1rem', padding: '1.5rem', height: '420px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontWeight: '700', fontSize: '1.25rem', color: '#e4e4e7' }}>Revenue Trend</h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} vertical={false} />
                  <XAxis dataKey="month" stroke={chartTheme.axisStroke} tick={{ fill: chartTheme.axisText, fontSize: 12 }} tickMargin={12} axisLine={false} tickLine={false} />
                  <YAxis stroke={chartTheme.axisStroke} tick={{ fill: chartTheme.axisText, fontSize: 12 }} tickMargin={12} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                  <Tooltip contentStyle={chartTheme.tooltipContentStyle} itemStyle={{ color: '#f59e0b', fontWeight: 'bold' }} cursor={{ stroke: '#2b2226', strokeWidth: 2 }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#f59e0b" strokeWidth={4} dot={{ r: 4, fill: '#0f0f10', stroke: '#f59e0b', strokeWidth: 2 }} activeDot={{ r: 7, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Category Sales Bar Chart */}
        {(activeTab === 'executive' || activeTab === 'product' || activeTab === 'sales') && (
          <div style={{ backgroundColor: '#0f0f10', border: '1px solid #2b2226', borderRadius: '1rem', padding: '1.5rem', height: '420px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontWeight: '700', fontSize: '1.25rem', color: '#e4e4e7' }}>Category Sales</h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categorySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} vertical={false} />
                  <XAxis dataKey="name" stroke={chartTheme.axisStroke} tick={{ fill: chartTheme.axisText, fontSize: 12 }} tickMargin={12} axisLine={false} tickLine={false} />
                  <YAxis stroke={chartTheme.axisStroke} tick={{ fill: chartTheme.axisText, fontSize: 12 }} tickMargin={12} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                  <Tooltip contentStyle={chartTheme.tooltipContentStyle} itemStyle={{ color: '#0ea5e9', fontWeight: 'bold' }} cursor={{ fill: '#2b2226', opacity: 0.5 }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="sales" name="Sales" fill="#0ea5e9" radius={[6, 6, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Customer Growth Area Chart */}
        {(activeTab === 'executive' || activeTab === 'customer') && (
          <div style={{ backgroundColor: '#0f0f10', border: '1px solid #2b2226', borderRadius: '1rem', padding: '1.5rem', height: '420px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontWeight: '700', fontSize: '1.25rem', color: '#e4e4e7' }}>Customer Growth</h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={customerGrowthData}>
                  <defs>
                    <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} vertical={false} />
                  <XAxis dataKey="month" stroke={chartTheme.axisStroke} tick={{ fill: chartTheme.axisText, fontSize: 12 }} tickMargin={12} axisLine={false} tickLine={false} />
                  <YAxis stroke={chartTheme.axisStroke} tick={{ fill: chartTheme.axisText, fontSize: 12 }} tickMargin={12} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={chartTheme.tooltipContentStyle} itemStyle={{ color: '#10b981', fontWeight: 'bold' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="customers" name="New Customers" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorCustomers)" activeDot={{ r: 7, strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Payment Methods Pie Chart */}
        {(activeTab === 'executive' || activeTab === 'sales' || activeTab === 'customer') && (
          <div style={{ backgroundColor: '#0f0f10', border: '1px solid #2b2226', borderRadius: '1rem', padding: '1.5rem', height: '420px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontWeight: '700', fontSize: '1.25rem', color: '#e4e4e7' }}>Payment Methods</h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={chartTheme.tooltipContentStyle} itemStyle={{ color: '#fff', fontWeight: 'bold' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={130}
                    innerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    stroke="none"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
