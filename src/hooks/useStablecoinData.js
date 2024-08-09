import { useState, useEffect } from 'react';

export function useStablecoinData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usdcResponse, eurcResponse] = await Promise.all([
          fetch('https://api.coingecko.com/api/v3/coins/usd-coin/market_chart?vs_currency=usd&days=7'),
          fetch('https://api.coingecko.com/api/v3/coins/euro-coin/market_chart?vs_currency=eur&days=7')
        ]);
        const usdcData = await usdcResponse.json();
        const eurcData = await eurcResponse.json();
        setData({
          usdc: usdcData,
          eurc: eurcData
        });
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
