import React, { useEffect, useState } from 'react'
import { getNFTContract } from '../constants/contract'
import { getProvider } from '../constants/providers'
import { isSupportedChain } from '../connection'
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import ClaimReward from './ClaimReward';

const NFTData = () => {
  const { chainId, address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider()
  const [minted, setMinted] = useState(0)
  const [totalNFT, setTotalNFT] = useState(0)

  async function handleFetchData() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getNFTContract(signer);

    try {
      const transaction = await contract.totalMints(address);
      setMinted(transaction)
      const tx = await contract.totalNft();
      setTotalNFT(tx)

    } catch (error) {
      console.error(error);
    } 
  };

  useEffect(() => {
    if (isConnected && chainId && walletProvider) {
      handleFetchData();
    }
  }, [isConnected, chainId, walletProvider]);

  console.log("hello", minted, totalNFT)

  return (
    <div className="my-14">
    <div className='flex justify-between w-[90%] mx-auto flex-col lg:flex-row md:flex-row items-center'>
    <h2 className='font-Nunito lg:text-[48px] md:text-[38px] text-[28px] font-[600] mb-6 self-center'>
    NFT <span className='text-red'>Analytics</span></h2>
    <ClaimReward />
    </div>
    <div className="w-[90%] mx-auto flex flex-col text-center lg:flex-row md:flex-row justify-between">
      <div className="lg:w-[23%] md:w-[23%] w-[100%] p-8 rounded-lg bg-lightPink flex justify-center items-center shadow-lg flex-col mb-6">
          <p className="lg:text-[48px] md:text-[38px] text-[32px] font-[700]">0</p>
          <p>Newsletter</p>
      </div>
      <div className="lg:w-[23%] md:w-[23%] w-[100%] p-8 rounded-lg bg-lightPink flex justify-center items-center shadow-lg flex-col mb-6">
          <p className="lg:text-[48px] md:text-[38px] text-[32px] font-[700]">{isConnected ? Number(totalNFT) : 0 }</p>
          <p>Unique NFT</p>
      </div>
      <div className="lg:w-[23%] md:w-[23%] w-[100%] p-8 rounded-lg bg-lightPink flex justify-center items-center shadow-lg flex-col mb-6">
          <p className="lg:text-[48px] md:text-[38px] text-[32px] font-[700]">{isConnected ? Number(minted) : 0 }</p>
          <p>Minted by Me</p>
      </div>
      <div className="lg:w-[23%] md:w-[23%] w-[100%] p-8 rounded-lg bg-lightPink flex justify-center items-center shadow-lg flex-col mb-6">
          <p className="lg:text-[48px] md:text-[38px] text-[32px] font-[700]">0</p>
          <p>Special Mint</p>
      </div>
    </div>
    </div>
  )
}

export default NFTData