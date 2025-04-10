import { useState, useEffect } from "react";

export const useFetchData = <T>(fetchFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(`Failed to load data: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { data, loading, error, setData };
};
