import React from 'react'

const Dashboard = () => {
  return (
    <main className='py-8 lg:px-12 md:px-8 px-6'>
      <section className='flex justify-between items-center mb-14'>
        <div>
          <h2>Good afternoon Admin</h2>
        </div>
        <w3m-button />
      </section>
      <section className='flex justify-between'>
      <div className="lg:w-[23%] md:w-[23%] w-[100%] p-8 rounded-lg bg-lightPink flex justify-center items-center shadow-lg flex-col mb-6">
          <p className="lg:text-[48px] md:text-[38px] text-[32px] font-[700]">0</p>
          <p>Newsletter</p>
      </div>
      <div className="lg:w-[23%] md:w-[23%] w-[100%] p-8 rounded-lg bg-lightPink flex justify-center items-center shadow-lg flex-col mb-6">
          <p className="lg:text-[48px] md:text-[38px] text-[32px] font-[700]">0</p>
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
    </main>
  )
}

export default Dashboard