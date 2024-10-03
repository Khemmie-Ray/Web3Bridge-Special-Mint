import { useState, useEffect } from 'react';
import { getAnniversaryContract } from '../constants/contract';
import { getProvider } from '../constants/providers';
import { isSupportedChain } from '../connection';
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";

const useOwnerAddress = () => {
  const { chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [ownerAddress, setOwnerAddress] = useState('');

  useEffect(() => {
    async function fetchOwnerAddress() {
      if (!isSupportedChain(chainId)) {
        console.error("Wrong network");
        return;
      }
      try {
        const provider = getProvider(walletProvider);
        const signer = await provider.getSigner();
        const contract = getAnniversaryContract(signer);
        const owner = await contract.owner();
        setOwnerAddress(owner);
      } catch (error) {
        console.error("Failed to fetch owner address", error);
      }
    }

    if (isConnected && chainId && walletProvider) {
      fetchOwnerAddress();
    }
  }, [isConnected, chainId, walletProvider]);

  return ownerAddress;
};

export default useOwnerAddress;