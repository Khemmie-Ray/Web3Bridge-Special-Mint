import { useState, useEffect } from 'react';
// import { getNFTContract } from '../constants/contract';
import { getAnniversaryContract, getNFTContract } from '../constants/contract';
import { getProvider } from '../constants/providers';
import { isSupportedChain } from '../connection';
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";

const useFetchNftData = () => {
  const { chainId, address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  
  const [minted, setMinted] = useState(0);
  const [totalNFT, setTotalNFT] = useState(0);
  const [newsTotal, setNewsTotal] = useState(0);
  const [userMint, setUserMint] = useState(0);

  const handleFetchData = async () => {
    if (!isSupportedChain(chainId)) {
      console.error("Wrong network");
      return;
    }

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const contract = getAnniversaryContract(signer);
    const nftContract = getNFTContract(signer)

    try {
      const mintedTx = await contract.totalMints(address);
      setMinted(mintedTx);

      const totalNftTx = await contract.totalNft();
      setTotalNFT(totalNftTx);

      const newsletterTx = await nftContract.totalNft();
      setNewsTotal(newsletterTx)

      const newsMintTx = await nftContract.totalMints(address);
      setUserMint(newsMintTx)

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isConnected && chainId && walletProvider) {
      handleFetchData();
    }
  }, [isConnected, chainId, walletProvider]);

  return { minted, totalNFT, newsTotal, userMint};  
};

export default useFetchNftData;
