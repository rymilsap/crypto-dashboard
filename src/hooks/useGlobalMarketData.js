import { useState, useEffect } from 'react';

export function useGlobalMarketData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/global');
        const jsonData = await response.json();
        setData(jsonData.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
