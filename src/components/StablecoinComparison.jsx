import React from 'react';
import { useStablecoinData } from '../hooks/useStablecoinData';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const StablecoinComparison = () => {
  const { data, loading, error } = useStablecoinData();

  if (loading) return <div className="stablecoin-comparison">Loading...</div>;
  if (error) return <div className="stablecoin-comparison">Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div className="stablecoin-comparison">
      <h2>Stablecoin Comparison</h2>
      <div className="stablecoin-charts">
        <div>
          <h3>USDC vs USD</h3>
          <div className="chart-container">
            <Sparklines data={data.usdc.prices.map(price => price[1])} width={100} height={30}>
              <SparklinesLine color="#4caf50" />
            </Sparklines>
          </div>
          <p>Current: ${data.usdc.prices[data.usdc.prices.length - 1][1].toFixed(4)}</p>
        </div>
        <div>
          <h3>EURC vs EUR</h3>
          <div className="chart-container">
            <Sparklines data={data.eurc.prices.map(price => price[1])} width={100} height={30}>
              <SparklinesLine color="#2196f3" />
            </Sparklines>
          </div>
          <p>Current: €{data.eurc.prices[data.eurc.prices.length - 1][1].toFixed(4)}</p>
        </div>
      </div>
    </div>
  );
};

export default StablecoinComparison;
