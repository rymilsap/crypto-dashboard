import React from 'react';
import { useFetchCryptoData } from '../hooks/useFetchCryptoData';
import { Sparklines, SparklinesLine } from 'react-sparklines';

function CryptoTable() {
  const { data, loading, error, lastUpdated } = useFetchCryptoData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div id="crypto-table" className="crypto-table-container">
      {lastUpdated && <div className="last-updated">Last updated: {new Date(lastUpdated).toLocaleString()}</div>}
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Volume(24h)</th>
            <th>Circulating Supply</th>
            <th>24 Hour</th>
            <th>7 Day</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.market_cap_rank || 'N/A'}</td>
              <td className="coin-name-cell">
                <img src={coin.image} alt={coin.name} width="24" height="24" />
                <div>
                  <span>{coin.name}</span>
                  <span className="coin-symbol">{coin.symbol?.toUpperCase()}</span>
                </div>
              </td>
              <td>${coin.current_price?.toFixed(2) || 'N/A'}</td>
              <td style={{ color: (coin.price_change_percentage_24h || 0) > 0 ? 'green' : 'red' }}>
                {(coin.price_change_percentage_24h || 0) > 0 ? '▲' : '▼'}{Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
              </td>
              <td style={{ color: (coin.price_change_percentage_7d_in_currency || 0) > 0 ? 'green' : 'red' }}>
                {(coin.price_change_percentage_7d_in_currency || 0) > 0 ? '▲' : '▼'}{Math.abs(coin.price_change_percentage_7d_in_currency || 0).toFixed(2)}%
              </td>
              <td>${coin.market_cap?.toLocaleString() || 'N/A'}</td>
              <td>${coin.total_volume?.toLocaleString() || 'N/A'}</td>
              <td>{coin.circulating_supply?.toLocaleString()} {coin.symbol?.toUpperCase()}</td>
              <td>
                {coin.sparkline_in_7d?.price && (
                  <Sparklines data={coin.sparkline_in_7d.price.slice(-24)} width={100} height={30}>
                    <SparklinesLine color={(coin.price_change_percentage_24h || 0) > 0 ? "green" : "red"} />
                  </Sparklines>
                )}
              </td>
              <td>
                {coin.sparkline_in_7d?.price && (
                  <Sparklines data={coin.sparkline_in_7d.price} width={100} height={30}>
                    <SparklinesLine color={(coin.price_change_percentage_7d_in_currency || 0) > 0 ? "green" : "red"} />
                  </Sparklines>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoTable;