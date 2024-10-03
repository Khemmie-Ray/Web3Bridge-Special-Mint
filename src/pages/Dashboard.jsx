import React, { useState, useEffect } from 'react'
import SetMint from '../components/SetMint'
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import useFetchNftData from '../Hooks/useFetchNftData';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const { isConnected } = useWeb3ModalAccount()
  const { minted, totalNFT } = useFetchNftData();

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Morning');
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting('Afternoon');
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreeting('Evening');
    } else {
      setGreeting('Night')
    }
  }, []);

  return (
    <main className='py-8 lg:px-12 md:px-8 px-6'>
      <section className='flex justify-between items-center mb-14 lg:flex-row md:flex-row flex-col'>
        <div>
          <h2 className='lg:text-[38px] md:text-[28px] text-[22px] font-[600] font-Nunito'>Good {greeting} <span className='text-red'> Admin</span></h2>
        </div>
        <w3m-button />
      </section>
      <section className='flex justify-between lg:flex-row md:flex-row flex-col'>
      <div className="lg:w-[23%] md:w-[23%] w-[100%] p-8 rounded-lg bg-lightPink flex justify-center items-center shadow-lg flex-col mb-6">
          <p className="lg:text-[48px] md:text-[38px] text-[32px] font-[700]">0</p>
          <p>Newsletter</p>
      </div>
      <div className="lg:w-[23%] md:w-[23%] w-[100%] p-8 rounded-lg bg-lightPink flex justify-center items-center shadow-lg flex-col mb-6">
          <p className="lg:text-[48px] md:text-[38px] text-[32px] font-[700]">{Number(totalNFT)}</p>
          <p>Unique NFT</p>
      </div>
      <div className="lg:w-[23%] md:w-[23%] w-[100%] p-8 rounded-lg bg-lightPink flex justify-center items-center shadow-lg flex-col mb-6">
          <p className="lg:text-[48px] md:text-[38px] text-[32px] font-[700]">0</p>
          <p>Total Mints</p>
      </div>
      <div className="lg:w-[23%] md:w-[23%] w-[100%] p-8 rounded-lg bg-lightPink flex justify-center items-center shadow-lg flex-col mb-6">
          <p className="lg:text-[48px] md:text-[38px] text-[32px] font-[700]">0</p>
          <p>Reward Amount</p>
      </div>
      </section>
      <section>
        <SetMint />
      </section>
    </main>
  )
}

export default Dashboard