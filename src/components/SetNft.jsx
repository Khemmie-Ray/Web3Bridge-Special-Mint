import React, { useState } from "react";
import { getAnniversaryContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { isSupportedChain } from "../connection";
import { getTokenContract } from "../constants/contract";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import ButtonLoader from "./loaders/ButtonLoader";

const SetNft = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [nftId, setNftId] = useState(0);
  const [nftUrl, setNftUrl] = useState("");
  const [prize, setPrize] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const changeHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        setError("File size exceeds 1MB. Please choose a smaller file.");
        setSelectedFile(null);
      } else {
        setError("");
        setSelectedFile(file);
        handleSubmission(file);
      }
    }
  };

  const handleSubmission = async (file) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const metadata = JSON.stringify({
        name: "Avatar",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      setNftUrl(`ipfs://${resData.IpfsHash}`);

      toast.success("Upload Successful", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Upload failed", {
        position: "top-center",
      });
    } finally {
      setIsUploading(false);
    }
  };

  async function handleSetNFT() {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const contract = getAnniversaryContract(signer);

    try {
      const prizeAmount = ethers.parseUnits(prize, 6);
      const transaction = await contract.setNft(nftId, nftUrl, prizeAmount);
      const receipt = await transaction.wait();

      if (receipt.status) {
        toast.success("NFT set successfully!", {
          position: "top-center",
        });
      } else {
        toast.error("NFT set failed!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("NFT set failed!", {
        position: "top-center",
      });
    } finally {
        setNftId('')
        setNftUrl('')
        setPrize('')
    }
  }

  return (
    <div className="bg-lightPink my-12 py-8 lg:px-10 md:px-8 px-4">
      <h2 className="lg:text-[24px] md:text-[20px] text-[18px] font-[600] font-Nunito my-4">
        Set NFT Pool
      </h2>
      <div className="mt-8">
        <div className="flex justify-between lg:flex-row md:flex-row flex-col">
          <div className="mb-4 lg:w-[49%] md:w-[49%] w-[100%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Token ID
            </label>
            <input
              type="text"
              onChange={(e) => setNftId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight"
              placeholder="Enter NFT ID"
            />
          </div>
          <div className="mb-4 lg:w-[49%] md:w-[49%] w-[100%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              NFT URL
            </label>
            {nftUrl ? (
              <input
                type="text"
                value={nftUrl}
                className="shadow appearance-none bg-white border rounded w-full py-3 px-3 text-gray-700 leading-tight relative"
                readOnly
              />
            ) : (
                <div className="mb-4">
                <input
                  type="file"
                  placeholder="Organization Image"
                  className={`shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${
                    isUploading ? "cursor-not-allowed" : ""
                  }`}
                  onChange={changeHandler}
                  disabled={isUploading}
                />
                {isUploading && (
                  <div className="absolute inset-0 top-0 flex items-center justify-center bg-white bg-opacity-50 rounded-lg">
                    <ButtonLoader />
                   </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mb-4 w-[100%]">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Prize
          </label>
          <input
            type="text"
            onChange={(e) => setPrize(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight"
            placeholder="Enter Prize"
          />
        </div>
        <div className="lg:w-[50%] md:w-[50%] w-[100%] mx-auto">
          <button
            type="button"
            onClick={handleSetNFT}
            className="bg-red py-4 px-6 rounded-lg text-white w-[100%]"
          >
            Set NFT
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetNft;
