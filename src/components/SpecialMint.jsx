import React, { useState } from 'react';
import { getAnniversaryContract } from '../constants/contract';
import { getProvider } from '../constants/providers';
import { isSupportedChain } from '../connection';
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SpecialMint = () => {
  const { chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [isOpen, setIsOpen] = useState(false);

  async function handleSpecialMint() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getAnniversaryContract(signer);

    try {  
      const transaction = await contract.specialMint();
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      if (receipt.status) {
        toast.success("Mint successful!", {
          position: "top-center",
        });
      } else {
        toast.error("Mint failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Mint failed!", {
        position: "top-center",
      });
    }
  };

  const handleConnection = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first", {
        position: "top-right",
      });
    } else {
      handleSpecialMint();
    }
  };

  return (
    <div>
      <button
        className="btn bg-red py-4 px-6 rounded-lg lg:w-[50%] md:w-[50%] w-[100%] border-none hover:bg-lightPink hover:text-deepBlue"
        onClick={handleConnection}
      >
        Special Mint
      </button>
      {/* {isOpen && (
        <dialog id="my_modal_1" className="modal modal-open">
          <div
            className="modal-box bg-deepBlue text-white rounded-lg"
            style={{ backgroundColor: '#003366' }} // Add solid deep blue background here
          >
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </div>
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={() => setIsOpen(false)}
          ></form>
        </dialog>
      )} */}
    </div>
  );
};

export default SpecialMint;
