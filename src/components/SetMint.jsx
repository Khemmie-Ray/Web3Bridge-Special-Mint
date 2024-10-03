import React, { useState } from 'react';
import { getAnniversaryContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { isSupportedChain } from "../connection";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetMint = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [nftData, setNftData] = useState({
    newsletterAddress: '',   
    conditions: '',          
    tokensIdToBeMinted: '',   
    mintDuration: 0           
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNftData({
      ...nftData,
      [name]: value
    });
  };

  async function handleSetMint() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const contract = getAnniversaryContract(signer);

    try {
      const { newsletterAddress, conditions, tokensIdToBeMinted, mintDuration } = nftData;

      const conditionsArray = conditions.split(',').map(Number);
      const tokensArray = tokensIdToBeMinted.split(',').map(Number);

      const transaction = await contract.setMint({
        _newsletterAddress: newsletterAddress,
        _conditions: conditionsArray,
        _tokensIdToBeMinted: tokensArray,
        _mintDuration: mintDuration,
      });
      
      const receipt = await transaction.wait();

      if (receipt.status) {
        toast.success("Mint configuration set successfully!", {
          position: "top-center",
        });
      } else {
        toast.error("Mint configuration failed!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Mint configuration failed!", {
        position: "top-center",
      });
    }
  }

  return (
    <div>
      <h2 className='lg:text-[24px] md:text-[20px] text-[18px] font-[600] font-Nunito my-4'>Set Mint Conditions</h2>
      <div className="mt-8">
      <div className='flex justify-between lg:flex-row md:flex-row flex-col'>
        <div className="mb-4 lg:w-[49%] md:w-[49%] w-[100%]">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Newsletter Address
          </label>
          <input
            type="text"
            name="newsletterAddress"
            value={nftData.newsletterAddress}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight"
            placeholder="Enter Newsletter Address"
          />
        </div>
        <div className="mb-4 lg:w-[49%] md:w-[49%] w-[100%]">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Conditions
          </label>
          <input
            type="text"
            name="conditions"
            value={nftData.conditions}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight"
            placeholder="Enter Conditions (e.g. 1,2,3)"
          />
        </div>
        </div>
        <div className='flex justify-between lg:flex-row md:flex-row flex-col'>
        <div className="mb-4 lg:w-[49%] md:w-[49%] w-[100%]">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Token ID to Mint
          </label>
          <input
            type="text"
            name="tokensIdToBeMinted"
            value={nftData.tokensIdToBeMinted}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight"
            placeholder="Enter Token IDs (e.g. 101,102,103)"
          />
        </div>
        <div className="mb-4 lg:w-[49%] md:w-[49%] w-[100%]">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mint Duration (in seconds)
          </label>
          <input
            type="number"
            name="mintDuration"
            value={nftData.mintDuration}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight"
            placeholder="Enter Mint Duration"
          />
        </div>
        </div>
        <div className='lg:w-[50%] md:w-[50%] w-[100%] mx-auto'>
        <button
          type="button"
          onClick={handleSetMint}
          className="bg-red py-4 px-6 rounded-lg text-white w-[100%]"
        >
          Set Mint
        </button>
        </div>
      </div>
    </div>
  );
}

export default SetMint;