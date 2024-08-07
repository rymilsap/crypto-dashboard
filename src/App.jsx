import React from 'react';
import Header from './components/Header';
import MarketOverview from './components/MarketOverview';
import TrendingSection from './components/TrendingSection';
import CryptoTable from './components/CryptoTable';

function App() {
  return (
    <div className="App">
      <Header />
      <MarketOverview />
      <TrendingSection />
      <CryptoTable />
    </div>
  );
}

export default App;