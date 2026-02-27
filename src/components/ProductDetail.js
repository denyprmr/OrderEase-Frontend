import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../api/api";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProducts().then((data) => {
      const foundProduct = data.find(
        (item) => String(item._id || item.id) === String(id)
      );
      setProduct(foundProduct);
    });
  }, [id]);

  if (!product) return <div className="loader">Loading...</div>;

  return (
    <section className="product-detail-page">
  <div className="product-detail-container">

    <div className="product-image-wrapper">
      <img src={product.image} alt={product.name} />
    </div>

    <div className="product-info-section">
      <span className="product-category">
        {product.category}
      </span>

      <h1 className="product-title">
        {product.name}
      </h1>

      <p className="product-description">
        {product.description}
      </p>

      <div className="product-price">
        ₹{product.price}
      </div>

      <div className="product-buttons">
        <button className="btn-primary">Buy Now</button>
        <button className="btn-outline">Add to Cart</button>
      </div>
    </div>

  </div>
</section>

  );
}

export default ProductDetail;
