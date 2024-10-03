import { ethers } from "ethers";
import contractAbi from './abi.json'
import nftAbi from './nft.json'
import tokenAbi from './usdc.json'

export const getAnniversaryContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS ,
        contractAbi,
        providerOrSigner
    );

export const getNFTContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_WEB3BRIDGENFT_ADDRESS,
        nftAbi,
        providerOrSigner
    );

export const getTokenContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_USDC_ADDRESS,
        tokenAbi,
        providerOrSigner
    );