import { useState, useEffect } from 'react';

export function useGlobalMarketData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [globalResponse, bitcoinResponse] = await Promise.all([
          fetch('https://api.coingecko.com/api/v3/global'),
          fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
        ]);
        const globalData = await globalResponse.json();
        const bitcoinData = await bitcoinResponse.json();
        setData({
          ...globalData.data,
          market_cap_chart: bitcoinData.market_caps
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