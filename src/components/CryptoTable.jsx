import React from 'react';
import { useFetchCryptoData } from '../hooks/useFetchCryptoData';

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
        </tr>
      </thead>
      <tbody>
        {data.map((coin) => (
          <tr key={coin.id}>
            <td>{coin.market_cap_rank}</td>
            <td>{coin.name}</td>
            <td>${coin.current_price.toFixed(2)}</td>
            <td>{coin.price_change_percentage_24h.toFixed(2)}%</td>
            <td>{coin.price_change_percentage_7d_in_currency?.toFixed(2)}%</td>
            <td>${coin.market_cap.toLocaleString()}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
            <td>{coin.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CryptoTable;