import React from 'react'
import logo from '../assets/logo.svg'
import mobileLogo from '../assets/mark.svg'

const Header = () => {
  return (
    <header className='bg-deepBlue w-[90%] mx-auto p-6 rounded-lg flex items-center justify-between my-10'>
        <img src={logo} alt="" className='hidden lg:block md:block'/>
        <img src={mobileLogo} alt="" className='block lg:hidden md:hidden w-[40px]'/>
        <w3m-button />
    </header>
  )
}

export default Header