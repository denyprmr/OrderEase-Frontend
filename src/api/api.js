
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

  const res = await fetch( `http://localhost:3000/api/cart/${foodId}`, {
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

export const placeOrderFromCart = async (cartId) => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch("http://localhost:3000/api/order/from-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "IdempotencyKey": cartId, // 👈 using cartId
    },
    body: JSON.stringify({
      clearCart: true,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to place order");
  }

  return data;
};

// 🔐 Get Token helper
const getToken = () => localStorage.getItem("accessToken");

// 👤 GET PROFILE
export const getProfile = async () => {
  const res = await fetch("http://localhost:3000/api/user/profile", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");

  return res.json();
};

// ✏️ UPDATE PROFILE
export const updateProfile = async (data) => {
  const res = await fetch("http://localhost:3000/api/user/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Profile update failed");

  return res.json();
};

// 🔒 UPDATE PASSWORD
export const updatePassword = async (data) => {
  const res = await fetch("http://localhost:3000/api/user/password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Password update failed");

  return res.json();
};

// 📦 GET USER ORDERS
export const getUserOrders = async () => {
  const res = await fetch(
    "http://localhost:3000/api/user/orders?page=1&limit=10",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch orders");

  return res.json();
};