import React, { useState } from 'react';
import './App.css';
import LpViewer from './components/LpViewer';

function App() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setConnected(true);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const displayAddress = () => {
    if (!walletAddress) return "Connect Wallet";
    return `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;
  };

  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard.png', activeIcon: 'dashboard-active.png' },
    { name: 'History', icon: 'history.png', activeIcon: 'history-active.png' },
    { name: 'Settings', icon: 'settings.png', activeIcon: 'settings-active.png' },
    { name: 'About', icon: 'about.png', activeIcon: 'about-active.png' }
  ];

  return (
    <div className="App">
      <img src="Ilguard_logo.svg" alt="ILGuard Logo" className="logo" />
      
      <div className="menu">
        {menuItems.map(item => (
          <div
            key={item.name}
            className={`menu-item ${activeMenuItem === item.name ? 'active' : ''}`}
            onClick={() => setActiveMenuItem(item.name)}
          >
            <img 
              src={activeMenuItem === item.name ? `/icons/${item.activeIcon}` : `/icons/${item.icon}`} 
              alt={item.name} 
              className="menu-icon" 
            />
            {item.name}
          </div>
        ))}
      </div>

      {!walletAddress ? (
        <div className="container-style">
          <div className="wallet-prompt">
            <div className="wallet-header">To get started, please connect your wallet to ILGuard.</div>
            <div className="wallet-subtext">After the wallet is connected, ILGuard will see all of your LPs and show the DEXes where they are located.</div>
          </div>
          <button onClick={connectMetaMask}>
            {displayAddress()}
          </button>
        </div>
      ) : (
        <>
          {activeMenuItem === 'Dashboard' && <LpViewer />}
          {activeMenuItem === 'History' && (
            <div className="container-style">
              <div className="wallet-header">Coming soon</div>
            </div>
          )}
          {activeMenuItem === 'Settings' && (
            <div className="container-style">
              <div className="wallet-header">Coming soon</div>
            </div>
          )}
          {activeMenuItem === 'About' && (
            <div className="container-style">
              <h2>About ILGuard</h2>
              <p>
                ILGuard v0.3 is an advanced solution designed exclusively for liquidity providers on decentralized exchanges (DEXs). 
                Powered by Uniswap v4 Hooks and real-time data from Chainlink oracles, ILGuard automatically safeguards your liquidity 
                from impermanent loss. With automated rebalancing and precise data, ILGuard maximizes your LP returns while minimizing 
                potential losses. Seamlessly connect your wallet, and let ILGuard take care of your liquidity with its preset threshold.
              </p>
            </div>
          )}
        </>
      )}

      {walletAddress && (
        <button onClick={connectMetaMask} className="connected">
          {displayAddress()}
        </button>
      )}
    </div>
  );
}

export default App;
