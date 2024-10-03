import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const SUPPORTED_CHAIN = 84532;

export const isSupportedChain = (chainId) =>
  Number(chainId) === SUPPORTED_CHAIN;

const baseSepolia = {
  chainId: 84532,
  name: 'basesepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.basescan.org/',
  rpcUrl: import.meta.env.VITE_ALCHEMY_RPC,
}

const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://localhost:5173',
  icons: ['https://localhost:5173']
}

export const configWeb3Modal = () => createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [baseSepolia],
  projectId: import.meta.env.VITE_PROJECT_ID,
  enableAnalytics: false,
  themeVariables: {
    '--w3m-accent': '#F90101',
  }
})
