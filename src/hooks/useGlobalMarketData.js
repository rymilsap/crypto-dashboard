import { useState, useEffect } from 'react';


const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useGlobalMarketData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchData() {
      try {
        const cachedData = localStorage.getItem('globalMarketData');
        const cachedTimestamp = localStorage.getItem('globalMarketDataTimestamp');

        if (cachedData && cachedTimestamp && Date.now() - parseInt(cachedTimestamp) < CACHE_DURATION) {
          setData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        const [globalResponse, bitcoinResponse] = await Promise.all([
          fetch('https://api.coingecko.com/api/v3/global', { signal: controller.signal }),
          fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7', { signal: controller.signal })
        ]);

        if (!globalResponse.ok || !bitcoinResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const globalData = await globalResponse.json();
        const bitcoinData = await bitcoinResponse.json();

        const newData = {
          ...globalData.data,
          market_cap_chart: bitcoinData.market_caps
        };

        if (isMounted) {
          setData(newData);
          setLoading(false);
          localStorage.setItem('globalMarketData', JSON.stringify(newData));
          localStorage.setItem('globalMarketDataTimestamp', Date.now().toString());
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        if (isMounted) {
          setError(err);
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

  return { data, loading, error };
}