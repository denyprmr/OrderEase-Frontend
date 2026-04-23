import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/api"; // make sure this exists
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data || []);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading products...</div>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>All Products</h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {products.map((item) => (
  <div
    key={item._id || item.id}
    style={{
      border: "1px solid #ddd",
      padding: "20px",
      borderRadius: "10px",
    }}
  >
    <img
      src={item.image}
      alt={item.title}
      style={{
        width: "100%",
        height: "200px",
        objectFit: "contain",
      }}
    />

    <h3>{item.title}</h3>
    <p>₹{item.price}</p>

    <Link to={`/product/${item._id || item.id}`}>
      View Details
    </Link>
  </div>
))}
        </div>
      )}
    </div>
  );
}

export default Products;