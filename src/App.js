import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import "./App.css";

import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import ChangePassword from "./pages/ChangePassword";
import Orders from "./pages/Orders";

// Lazy Pages
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() =>
  import("./components/ProductDetail")
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage")
);
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword")
);
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const CartPage = lazy(() =>
  import("./pages/CartPage")
);
const Offers = lazy(() => import("./pages/Offers"));



/* =========================
   🔐 Protected Route
========================= */

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}



/* =========================
   📦 Layout Wrapper
========================= */

function Layout() {
  const location = useLocation();

  const hideLayoutRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
  ];

  const hideLayout =
    hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/offers"
            element={<Offers />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetail />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />



          {/* SEMI PROTECTED */}
          <Route
            path="/change-password"
            element={<ChangePassword />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />



          {/* 🔐 PROTECTED ROUTES */}

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



          {/* ❌ UNKNOWN ROUTES */}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </Suspense>

      {!hideLayout && <Footer />}
    </>
  );
}



/* =========================
   🚀 APP ROOT
========================= */

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;