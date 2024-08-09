import { useState, useEffect } from 'react';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useFetchCryptoData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchData() {
      let cachedTimestamp;
      try {
        const cachedData = localStorage.getItem('cryptoData');
        cachedTimestamp = localStorage.getItem('cryptoDataTimestamp');

        if (cachedData && cachedTimestamp && Date.now() - parseInt(cachedTimestamp) < CACHE_DURATION) {
          setData(JSON.parse(cachedData));
          setLoading(false);
          setLastUpdated(parseInt(cachedTimestamp));
          return;
        }

        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d', { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();

        if (isMounted) {
          setData(jsonData);
          setLoading(false);
          const currentTime = Date.now();
          setLastUpdated(currentTime);
          localStorage.setItem('cryptoData', JSON.stringify(jsonData));
          localStorage.setItem('cryptoDataTimestamp', currentTime.toString());
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        if (isMounted) {
          const cachedData = localStorage.getItem('cryptoData');
          if (cachedData) {
            setData(JSON.parse(cachedData));
            setLastUpdated(parseInt(cachedTimestamp));
          } else {
            setError(err);
          }
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { data, loading, error, lastUpdated };
}