import { useState, useEffect } from "react";

function useFetch(apiFunction) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await apiFunction();
        setData(result);
      }
      catch (err) {
        setError("API Failed");
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [apiFunction]);

  return { data, loading, error };
}

export default useFetch;