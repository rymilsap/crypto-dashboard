import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/logo.png" alt="RyCoinCap" className="logo" />
        <nav>
          <ul>
            <li><a href="#">Cryptocurrencies</a></li>
            <li><a href="#">Exchanges</a></li>
            <li><a href="#">Portfolio</a></li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <a href="https://github.com/rymilsap" target="_blank" rel="noopener noreferrer">
          <FaGithub className="social-icon" />
        </a>
        <a href="https://linkedin.com/in/ryanmilsap/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="social-icon" />
        </a>
      </div>
    </header>
  );
};

export default Header;
