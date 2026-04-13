import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./App.css";

import { lazy, Suspense } from "react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import ChangePassword from "./pages/ChangePassword";
import Orders from "./pages/Orders";

// Lazy Pages
const Home = lazy(() => import("./pages/Home"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const CartPage = lazy(() => import("./pages/CartPage"));

/* =========================
   🔐 STRONG Protected Route
========================= */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken");

  // 🚨 If no token → redirect immediately
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* =========================
   📦 Layout Wrapper
========================= */
function Layout() {
  const location = useLocation();

  // cleaner logic
  const hideLayoutRoutes = ["/login", "/signup", "/forgot-password"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />

          {/* Semi Protected (you can also protect these if needed) */}
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/orders" element={<Orders />} />

          {/* 🔐 Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />

          {/* ❌ Catch unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>

      {!hideLayout && <Footer />}
    </>
  );
}

/* =========================
   🚀 App Root
========================= */
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;