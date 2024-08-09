import { useState, useEffect } from 'react';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useStablecoinData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchData() {
      try {
        const cachedData = localStorage.getItem('stablecoinData');
        const cachedTimestamp = localStorage.getItem('stablecoinDataTimestamp');

        if (cachedData && cachedTimestamp && Date.now() - parseInt(cachedTimestamp) < CACHE_DURATION) {
          setData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        const [usdcResponse, eurcResponse] = await Promise.all([
          fetch('https://api.coingecko.com/api/v3/coins/usd-coin/market_chart?vs_currency=usd&days=7', { signal: controller.signal }),
          fetch('https://api.coingecko.com/api/v3/coins/euro-coin/market_chart?vs_currency=eur&days=7', { signal: controller.signal })
        ]);

        if (!usdcResponse.ok || !eurcResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const usdcData = await usdcResponse.json();
        const eurcData = await eurcResponse.json();

        const newData = {
          usdc: usdcData,
          eurc: eurcData
        };

        if (isMounted) {
          setData(newData);
          setLoading(false);
          localStorage.setItem('stablecoinData', JSON.stringify(newData));
          localStorage.setItem('stablecoinDataTimestamp', Date.now().toString());
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