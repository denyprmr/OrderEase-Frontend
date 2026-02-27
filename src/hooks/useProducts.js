import { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../api/api";

function useProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hasFetched = useRef(false);   // 👈 important

  useEffect(() => {

    if (hasFetched.current) return;   // 👈 stop second call
    hasFetched.current = true;

    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } 
      catch (err) {
        setError("Server not responding");
      } 
      finally {
        setLoading(false);
      }
    };

    getProducts();

  }, []);

  return { products, loading, error };
}

export default useProducts;