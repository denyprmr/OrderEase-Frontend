import React, { memo } from "react";

import useProducts from "../hooks/useProducts";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { addItemToCart } from "../redux/slices/cartSlice";



// ✅ Lazy Image
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";



function Products() {
  const dispatch = useDispatch();

  const navigate = useNavigate();



  // ✅ Redux category state
  const { selectedCategory } = useSelector(
    (state) => state.products
  );



  // ✅ Fetch products
  const {
    products,
    loading,
    error,
  } = useProducts(selectedCategory);



  // ✅ Redux auth state
  const { user } = useSelector(
    (state) => state.auth
  );



  /* =========================
     ADD TO CART
  ========================= */

  const handleAddToCart = (
    e,
    product
  ) => {
    e.stopPropagation();



    if (!user) {
      alert("Please login first!");

      navigate("/login");

      return;
    }



    dispatch(
      addItemToCart(product)
    );
  };



  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return <p>Loading products...</p>;
  }



  /* =========================
     ERROR
  ========================= */

  if (error) {
    return <p>{error}</p>;
  }



  return (
    <section className="products">

      <h2>
        Trending Products
      </h2>



      <div className="product-grid">

        {products.map(
          (product, index) => {
            const productId =
              product._id ||
              product.id ||
              index;

            return (
              <div
                key={productId}
                className="product-card"
              >

                {/* PRODUCT LINK */}
                <Link
                  to={`/product/${productId}`}
                  className="product-link"
                >

                  {/* IMAGE */}
                  <div className="product-image">
                    <LazyLoadImage
                      src={product.image}
                      alt={product.name}
                      effect="blur"
                      placeholderSrc="/placeholder.png"
                    />
                  </div>



                  {/* INFO */}
                  <div className="product-info">

                    <span className="category">
                      {product.category}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p className="description">
                      {
                        product.description
                      }
                    </p>

                    <p className="price">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>



                {/* ADD TO CART */}
                <button
                  className="btn btn-primary"
                  onClick={(e) =>
                    handleAddToCart(
                      e,
                      product
                    )
                  }
                >
                  {user
                    ? "Add To Cart"
                    : "Login to Add"}
                </button>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}



// ✅ Prevent unnecessary rerenders
export default memo(Products);