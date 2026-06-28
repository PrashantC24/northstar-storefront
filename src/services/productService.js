import axios from 'axios';

const productApi = axios.create({ baseURL: '/mock-data' });

export async function getProducts() {
  const stored = window.localStorage.getItem('northstar-products');
  if (stored) {
    return JSON.parse(stored);
  }

  // If no products in local storage, fetch from mock json and store them
  const response = await productApi.get('/products.json');
  window.localStorage.setItem('northstar-products', JSON.stringify(response.data));
  return response.data;
}

export async function getProductById(id) {
  const products = await getProducts();
  return products.find((product) => product.id === Number(id));
}

export async function getFeaturedProducts() {
  const products = await getProducts();
  return products.filter((product) => product.featured);
}

export async function getBestSellers() {
  const products = await getProducts();
  return products.filter((product) => product.bestSeller);
}

export async function addProduct(productData) {
  const products = await getProducts();
  
  // Calculate max id
  const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
  
  const newProduct = {
    ...productData,
    id: maxId + 1,
    rating: productData.rating || 0,
    images: productData.images || [productData.image],
    featured: productData.featured || false,
    bestSeller: productData.bestSeller || false
  };

  const updatedProducts = [newProduct, ...products];
  window.localStorage.setItem('northstar-products', JSON.stringify(updatedProducts));
  return newProduct;
}
