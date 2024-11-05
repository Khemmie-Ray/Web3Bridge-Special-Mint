import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

export const SUPPORTED_CHAIN = 84532;

export const isSupportedChain = (chainId) =>
  Number(chainId) === SUPPORTED_CHAIN;

const BaseSepolia = {
  chainId: SUPPORTED_CHAIN,
  name: "Base Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.basescan.org/",
  rpcUrl: import.meta.env.VITE_INFURA_RPC,
};

const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://localhost:5173',
  icons: ['https://localhost:5173']
}

export const configWeb3Modal = () => createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [BaseSepolia],
  projectId: import.meta.env.VITE_PROJECTID,
  enableAnalytics: false,
  themeVariables: {
    '--w3m-accent': '#F90101',
  }
})
