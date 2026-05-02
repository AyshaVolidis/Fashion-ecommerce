const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const fetchOptions = {
  credentials: 'include'
};

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`, fetchOptions);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const fetchProduct = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, fetchOptions);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

export const signup = async (name, email, password) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
    ...fetchOptions
  });
  if (!res.ok) throw new Error('Signup failed');
  return res.json();
};

export const signin = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    ...fetchOptions
  });
  if (!res.ok) throw new Error('Signin failed');
  return res.json();
};

export const getMe = async () => {
  const res = await fetch(`${API_URL}/auth/me`, fetchOptions);
  if (!res.ok) throw new Error('Failed to fetch user info');
  return res.json();
};

export const logout = async () => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    ...fetchOptions
  });
  if (!res.ok) throw new Error('Logout failed');
  return res.json();
};

export const checkout = async (cartItems, userInfo) => {
  const res = await fetch(`${API_URL}/orders/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartItems, userInfo }),
    ...fetchOptions
  });
  if (!res.ok) throw new Error('Checkout failed');
  return res.json();
};

export const getUserOrders = async () => {
  const res = await fetch(`${API_URL}/orders/my-orders`, fetchOptions);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
};

