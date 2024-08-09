import React from 'react';
import { useGlobalMarketData } from '../hooks/useGlobalMarketData';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const MarketOverview = () => {
  const { data, loading, error } = useGlobalMarketData();

  if (loading) return <div className="market-overview">Loading...</div>;
  if (error) return <div className="market-overview">Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div className="market-overview">
      <h2>Market Overview</h2>
      <div className="market-stats">
        <div>
          <h3>Total Market Cap</h3>
          <p>${data.total_market_cap.usd.toLocaleString()}</p>
        </div>
        <div>
          <h3>24h Volume</h3>
          <p>${data.total_volume.usd.toLocaleString()}</p>
        </div>
        <div>
          <h3>Bitcoin Dominance</h3>
          <p>{data.market_cap_percentage.btc.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;