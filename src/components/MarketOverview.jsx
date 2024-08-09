import React from 'react';
import { useGlobalMarketData } from '../hooks/useGlobalMarketData';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const MarketOverview = () => {
  const { data, loading, error } = useGlobalMarketData();

  if (loading) return <div className="market-overview">Loading...</div>;
  if (error) return <div className="market-overview">Error: {error.message}</div>;
  if (!data) return null;

  const marketCapData = data.market_cap_chart.map(item => item[1]);
  const last24hChange = ((marketCapData[marketCapData.length - 1] - marketCapData[marketCapData.length - 25]) / marketCapData[marketCapData.length - 25] * 100).toFixed(2);
  const last7dChange = ((marketCapData[marketCapData.length - 1] - marketCapData[0]) / marketCapData[0] * 100).toFixed(2);

  const renderReferenceLines = (data, interval) => {
    const lines = [];
    for (let i = interval; i < data.length; i += interval) {
      const x = (i / data.length) * 100;
      lines.push(<line key={i} x1={`${x}%`} x2={`${x}%`} y1="0" y2="100%" stroke="#ffffff" strokeOpacity="0.2" />);
    }
    return lines;
  };

  return (
    <div className="market-overview">
      <h2>Market Overview</h2>
      <div className="market-stats">
        <div>
          <h3>Total Market Cap</h3>
          <p>${(data.total_market_cap.usd / 1e9).toFixed(2)}B</p>
        </div>
        <div>
          <h3>24h Volume</h3>
          <p>${(data.total_volume.usd / 1e9).toFixed(2)}B</p>
        </div>
        <div>
          <h3>Active Cryptocurrencies</h3>
          <p>{data.active_cryptocurrencies}</p>
        </div>
        <div>
          <h3>Bitcoin Dominance</h3>
          <p>{data.market_cap_percentage.btc.toFixed(2)}%</p>
        </div>
        <div>
          <h3>ETH Dominance</h3>
          <p>{data.market_cap_percentage.eth.toFixed(2)}%</p>
        </div>
      </div>
      <div className="market-charts">
        <div>
          <div className="chart-header">
            <h3>24h Market Cap</h3>
            <span className={last24hChange >= 0 ? 'positive' : 'negative'}>
              {last24hChange}%
            </span>
          </div>
          <div className="chart-container">
            <svg width="100%" height="30" style={{position: 'absolute', top: 0, left: 0}}>
              {renderReferenceLines(marketCapData.slice(-24), 6)}
            </svg>
            <Sparklines data={marketCapData.slice(-24)} width={100} height={30}>
              <SparklinesLine color={last24hChange >= 0 ? "#4caf50" : "#f44336"} />
            </Sparklines>
          </div>
        </div>
        <div>
          <div className="chart-header">
            <h3>7d Market Cap</h3>
            <span className={last7dChange >= 0 ? 'positive' : 'negative'}>
              {last7dChange}%
            </span>
          </div>
          <div className="chart-container">
            <svg width="100%" height="30" style={{position: 'absolute', top: 0, left: 0}}>
              {renderReferenceLines(marketCapData.slice(-7), 1)}
            </svg>
            <Sparklines data={marketCapData} width={100} height={30}>
              <SparklinesLine color={last7dChange >= 0 ? "#4caf50" : "#f44336"} />
            </Sparklines>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;