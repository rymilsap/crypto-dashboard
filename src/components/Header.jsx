import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/logo.png" alt="RYCap" className="logo" />
        <nav>
          <ul>
            <li><a href="#">Cryptocurrencies</a></li>
            <li><a href="#">Exchanges</a></li>
            <li><a href="#">Portfolio</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
