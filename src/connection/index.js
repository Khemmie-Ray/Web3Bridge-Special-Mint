import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { baseSepolia } from '@reown/appkit/networks';

const projectId = import.meta.env.VITE_PROJECT_ID;

const networks = [baseSepolia];

const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

export const configWallet = () =>  createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true 
  },
  themeVariables: {
    '--w3m-accent': '#F90101',
    '--w3m-border-radius-master': '20',
  }
})