import React from 'react';
import { useFetchCryptoData } from '../hooks/useFetchCryptoData';
import { Sparklines, SparklinesLine } from 'react-sparklines';

function CryptoTable() {
  const { data, loading, error } = useFetchCryptoData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
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
            <td>{coin.market_cap_rank}</td>
            <td className="coin-name-cell">
              <img src={coin.image} alt={coin.name} width="24" height="24" />
              <div>
                <span>{coin.name}</span>
                <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
              </div>
            </td>
            <td>${coin.current_price.toFixed(2)}</td>
            <td>{coin.price_change_percentage_24h.toFixed(2)}%</td>
            <td>{coin.price_change_percentage_7d_in_currency?.toFixed(2)}%</td>
            <td>${coin.market_cap.toLocaleString()}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
            <td>{coin.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</td>
            <td>
              <Sparklines data={coin.sparkline_in_7d.price.slice(-24)} width={100} height={30}>
                <SparklinesLine color={coin.price_change_percentage_24h > 0 ? "green" : "red"} />
              </Sparklines>
            </td>
            <td>
              <Sparklines data={coin.sparkline_in_7d.price} width={100} height={30}>
                <SparklinesLine color={coin.price_change_percentage_7d > 0 ? "green" : "red"} />
              </Sparklines>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CryptoTable;