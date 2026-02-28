import axiosInstance from "./axiosInstance";

// PRODUCTS API
export const fetchProducts = async () => {
  const response = await fetch("http://localhost:3000/api/public/menu");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : data.data;
};



// CATEGORIES API
export const fetchCategories = async () => {
  const response = await fetch("http://localhost:3000/api/public/categories");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : data.data;
};

// Signup API
export const signupUser = async (userData) => {
  const response = await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error("Signup Failed");
  }

  return await response.json();
};

// 🔥 LOGIN API
export const loginUser = async (userData) => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Login Failed");
  }

  return await response.json();
};

//Cart API

// 🔥 ADD TO CART
export const addToCart = async (productId, quantity) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch("http://localhost:3000/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,  // 🔥 IMPORTANT
    },
    body: JSON.stringify({
      foodId: productId,
      quantity,
    }),
  });
  return response.json();
};

export const getToCart = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch("http://localhost:3000/api/cart", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  const data = await response.json();

  console.log("Cart Data:", data);  // ✅ log actual data

  return data;
};

// 🔥 UPDATE CART ITEM
export const updateCartItem = async (foodId, quantity) => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch("http://localhost:3000/api/cart", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ foodId, quantity }),
  });

  return res.json();
};

// 🔥 REMOVE FROM CART
export const removeCartAPI = async () => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`http://localhost:3000/api/cart`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};