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
          <th>Last 7 days</th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin) => (
          <tr key={coin.id}>
            <td>{coin.rank}</td>
            <td>{coin.name}</td>
            <td>${coin.price.toFixed(2)}</td>
            <td>{coin.change24h.toFixed(2)}%</td>
            <td>{coin.change7d.toFixed(2)}%</td>
            <td>${coin.marketCap.toLocaleString()}</td>
            <td>${coin.volume24h.toLocaleString()}</td>
            <td>{coin.circulatingSupply.toLocaleString()}</td>
            <td>[Chart placeholder]</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CryptoTable;
