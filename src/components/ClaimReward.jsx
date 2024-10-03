import React from "react";
import { getAnniversaryContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { isSupportedChain } from "../connection";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClaimReward = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function handleClaim() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getAnniversaryContract(signer);

    try {
      const transaction = await contract.claimReward();
      const receipt = await transaction.wait();

      if (receipt.status) {
        toast.success("Claim successful!", {
          position: "top-center",
        });
      } else {
        toast.error("Claim failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Claim failed!", {
        position: "top-center",
      });
    }
  }

  return (
    <div>
      <button
        className="btn bg-red text-white py-4 px-6 rounded-lg w-[100%] border-none hover:bg-lightPink hover:text-deepBlue"
        onClick={handleClaim}
      >
        Claim Reward
      </button>
    </div>
  );
};

export default ClaimReward;
