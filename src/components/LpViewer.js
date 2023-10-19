import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import abi from '../abi.json';
import '../App.css';

const LpViewer = () => {
    const [tokens, setTokens] = useState({ token0: '', token1: '' });

    useEffect(() => {
        loadWeb3AndData();
    }, []);

    const loadWeb3AndData = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const web3 = window.web3;
            const accounts = await web3.eth.getAccounts();
            const contractAddress = '0x1238536071E1c677A632429e3655c799b22cDA52';
            const contract = new web3.eth.Contract(abi, contractAddress);

            const balance = await contract.methods.balanceOf(accounts[0]).call();

            if (balance > 0) {
                const tokenId = await contract.methods.tokenOfOwnerByIndex(accounts[0], 0).call();
                const position = await contract.methods.positions(tokenId).call();

                const token0Contract = new web3.eth.Contract(abi, position.token0);
                const token1Contract = new web3.eth.Contract(abi, position.token1);

                let token0Name = await token0Contract.methods.symbol().call();
                let token1Name = await token1Contract.methods.symbol().call();

                setTokens({ token0: token0Name, token1: token1Name });
            }
        } else {
            alert('Please install MetaMask to use this dApp!');
        }
    };

    return (
        <div className="token-list">
          <div className="dashboard-container">
            <span className="token-item">{tokens.token0}-{tokens.token1}</span>
            <span className="token-item">
              <img src="/uni.png" alt="Uniswap Logo" className="platform-logo" />
              Uniswap v3
            </span>
          </div>
        </div>
      );
};

export default LpViewer;
