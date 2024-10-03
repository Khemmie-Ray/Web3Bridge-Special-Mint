import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import {
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import useOwnerAddress from '../Hooks/useOwnerAddress';

const Layout = () => {
  const { chainId, address, isConnected } = useWeb3ModalAccount();
  const ownerAddress = useOwnerAddress()

  return !isConnected  && ownerAddress !== address ? (
    <Navigate to={"/"} />
  ) : (
    <div className='flex justify-between'>
        <Sidebar />
        <div className='h-[100vh] overflow-y-scroll w-[100%] lg:w-[80%]'>
        <Outlet />
        </div>
    </div>
  )
}

export default Layout