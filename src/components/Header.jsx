import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  font-family: 'Orbitron', sans-serif;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.h1`
  font-size: 24px;
  background: linear-gradient(45deg, #8a2be2, #da70d6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const Tagline = styled.span`
  font-size: 12px;
  color: #b19cd9;
  margin-left: 10px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItem = styled.button`
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 25px;
  font-weight: 500;
  transition: color 0.3s ease;
  font-size: 16px;
  font-family: 'Orbitron', sans-serif;

  &:hover {
    color: #da70d6;
  }
`;

const SocialIcon = styled.a`
  color: #fff;
  font-size: 20px;
  margin-left: 15px;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: #da70d6;
  }
`;

const Header = () => {
  const scrollToCryptoTable = () => {
    const cryptoTable = document.getElementById('crypto-table');
    if (cryptoTable) {
      cryptoTable.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeaderWrapper>
      <Logo>
        <LogoText>RyCoinCap</LogoText>
        <Tagline>Crypto Market Intelligence</Tagline>
      </Logo>
      <Nav>
        <NavItem onClick={scrollToCryptoTable}>Cryptocurrencies</NavItem>
        {/* <NavItem href="#">Exchanges</NavItem> */}
        {/* <NavItem href="#">Portfolio</NavItem> */}
        <SocialIcon href="https://github.com/rymilsap" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </SocialIcon>
        <SocialIcon href="https://linkedin.com/in/ryanmilsap/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </SocialIcon>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
