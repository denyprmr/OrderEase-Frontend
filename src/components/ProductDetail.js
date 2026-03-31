import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../api/api";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const { addItemToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  
const handleBuyNow = async () => {
  try {
    await addItemToCart(product); // same logic as cart
    window.location.href = "/cart"; // redirect
  } catch (err) {
    console.error(err);
  }
};
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

          <h1 className="product-title">{product.name}</h1>

          <p className="product-description">
            {product.description}
          </p>

          <div className="product-price">
            ₹{product.price}
          </div>

          <div className="product-buttons">
            <button
  className="btn btn-primary"
  onClick={handleBuyNow}
>
  Buy Now
</button>

            <button
              className="btn btn-primary"
              onClick={() => addItemToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;