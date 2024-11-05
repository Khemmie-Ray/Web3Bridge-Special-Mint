import React, { useState } from "react";
import { getAnniversaryContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { isSupportedChain } from "../connection";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCircleInfo } from "react-icons/fa6";
import { ErrorDecoder } from 'ethers-decode-error'
import abi from '../constants/abi.json'

const SpecialMint = () => {
  const { chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [isOpen, setIsOpen] = useState(false);
  const errorDecoder = ErrorDecoder.create([abi])

  async function handleSpecialMint() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getAnniversaryContract(signer);

    try {
      const transaction = await contract.specialMint();
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
    } catch (err) {
      const decodedError = await errorDecoder.decode(err)
      console.error(err);
      toast.error(`Mint failed! - ${decodedError.reason}`, {
        position: "top-center",
      });
    } finally {
      setIsOpen(false)
    }
  }

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
        onClick={() => setIsOpen(true)}
      >
        Special Mint
      </button>
      {isOpen && (
        <dialog id="my_modal_1" className="modal modal-open">
          <div
            className="modal-box bg-deepBlue text-white rounded-lg text-center"
          >
            <h3 className="font-[600] font-Nunito text-[20px] text-red flex items-center justify-center mt-4"><FaCircleInfo className="text-2xl mr-4"/> Eligibility Notice!</h3>
            <p className="py-4">
            You are eligible to mint this NFT only if you have consistently minted our monthly newsletter NFTs.
            </p>
            <div className="modal-action">

              <button
                className="btn bg-red py-4 px-6 rounded-lg w-[100%] border-none hover:bg-lightPink hover:text-deepBlue"
                onClick={handleConnection}
              >
                Mint NFT
              </button>
            </div>
          </div>
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={() => setIsOpen(false)}
          ></form>
        </dialog>
      )}
    </div>
  );
};

export default SpecialMint;
