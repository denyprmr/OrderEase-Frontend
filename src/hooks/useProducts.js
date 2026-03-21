import { useEffect, useState } from "react";
import { fetchProducts } from "../api/api";

const useProducts = (selectedCategory) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();

        // ✅ FILTER HERE
        const filtered = selectedCategory
          ? data.filter(
              (item) =>
                item.category?.toLowerCase() === selectedCategory
            )
          : data;

        setProducts(filtered);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  return { products, loading, error };
};

export default useProducts;