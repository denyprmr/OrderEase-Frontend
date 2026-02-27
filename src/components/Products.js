import React, { useContext } from "react";
import useProducts from "../hooks/useProducts";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Products({ selectedCategory }) {

  const { products, loading, error } = useProducts(selectedCategory);
  const { addItemToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    if (!token) {
      alert("Please login first!");
      navigate("/login");   // 🔥 redirect to login
      return;
    }

    addItemToCart(product); // only logged in user can call API
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="products">
      <h2>Trending Products</h2>

      <div className="product-grid">
        {products.map((product, index) => {

          const productId = product._id || product.id || index;

          return (
            <div key={productId} className="product-card">

              <Link
                to={`/product/${productId}`}
                className="product-link"
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="product-info">
                  <span className="category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="description">{product.description}</p>
                  <p className="price">₹{product.price}</p>
                </div>
              </Link>

              {/* Updated Button */}
              <button
                className="add-btn"
                onClick={(e) => handleAddToCart(e, product)}
                disabled={!token}
              >
                {token ? "Add To Cart" : "Login to Add"}
              </button>

            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Products;