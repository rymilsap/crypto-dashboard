import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/logo.png" alt="CoinMarketCap Logo" className="logo" />
        <nav>
          <ul>
            <li><a href="#">Cryptocurrencies</a></li>
            <li><a href="#">Exchanges</a></li>
            <li><a href="#">NFT</a></li>
            <li><a href="#">Cryptown</a></li>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">Watchlist</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Learn</a></li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="connect-wallet-btn">Connect Wallet</button>
      </div>
    </header>
  );
};

export default Header;