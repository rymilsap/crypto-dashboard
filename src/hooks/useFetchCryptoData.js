import { useState, useEffect } from 'react';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useFetchCryptoData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    async function fetchData() {
      let cachedTimestamp;
      try {
        const cachedData = localStorage.getItem('cryptoTableData');
        cachedTimestamp = localStorage.getItem('cryptoTableDataTimestamp');

        if (cachedData && cachedTimestamp && Date.now() - parseInt(cachedTimestamp) < CACHE_DURATION) {
          setData(JSON.parse(cachedData));
          setLoading(false);
          setLastUpdated(parseInt(cachedTimestamp));
          return;
        }

        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h,7d',
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
          setLoading(false);
          const currentTime = Date.now();
          setLastUpdated(currentTime);
          localStorage.setItem('cryptoTableData', JSON.stringify(result));
          localStorage.setItem('cryptoTableDataTimestamp', currentTime.toString());
        }
      } catch (error) {
        if (isMounted && error.name !== 'AbortError') {
          setError(error);
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