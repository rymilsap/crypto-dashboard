import React, { useState } from 'react';
import { useStablecoinData } from '../hooks/useStablecoinData';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const StablecoinComparison = () => {
  const { data, loading, error } = useStablecoinData();
  const [usdcValue, setUsdcValue] = useState(null);
  const [eurcValue, setEurcValue] = useState(null);

  if (loading) return <div className="stablecoin-comparison">Loading...</div>;
  if (error) return <div className="stablecoin-comparison">Error: {error.message}</div>;
  if (!data) return null;

  const handleMouseMove = (coin, event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const index = Math.round((x / width) * (data[coin].prices.length - 1));
    const value = data[coin].prices[index][1];
    
    if (coin === 'usdc') {
      setUsdcValue(value.toFixed(4));
    } else {
      setEurcValue(value.toFixed(4));
    }
  };

  const handleMouseLeave = (coin) => {
    if (coin === 'usdc') {
      setUsdcValue(null);
    } else {
      setEurcValue(null);
    }
  };

  return (
    <div className="stablecoin-comparison">
      <h2>Stablecoin Comparison (7-day)</h2>
      <div className="stablecoin-charts">
        <div>
          <h3>USDC vs USD</h3>
          <div className="chart-container" onMouseMove={(e) => handleMouseMove('usdc', e)} onMouseLeave={() => handleMouseLeave('usdc')}>
            <Sparklines data={data.usdc.prices.map(price => price[1])} width={100} height={30} margin={5}>
              <SparklinesLine color="#4caf50" />
            </Sparklines>
          </div>
          <p>Current: ${usdcValue || data.usdc.prices[data.usdc.prices.length - 1][1].toFixed(4)}</p>
        </div>
        <div>
          <h3>EURC vs EUR</h3>
          <div className="chart-container" onMouseMove={(e) => handleMouseMove('eurc', e)} onMouseLeave={() => handleMouseLeave('eurc')}>
            <Sparklines data={data.eurc.prices.map(price => price[1])} width={100} height={30} margin={5}>
              <SparklinesLine color="#2196f3" />
            </Sparklines>
          </div>
          <p>Current: €{eurcValue || data.eurc.prices[data.eurc.prices.length - 1][1].toFixed(4)}</p>
        </div>
      </div>
    </div>
  );
};

export default StablecoinComparison;