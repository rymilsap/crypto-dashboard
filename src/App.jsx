import React from 'react';
import Header from './components/Header';
import MarketOverview from './components/MarketOverview';
import CryptoTable from './components/CryptoTable';

function App() {
  return (
    <div className="App">
      <Header />
      <MarketOverview />
      <CryptoTable />
    </div>
  );
}

export default App;