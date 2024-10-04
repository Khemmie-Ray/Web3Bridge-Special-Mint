import React, { useState } from 'react'
import logo from '../assets/mark.svg'
import { Sling as Hamburger } from "hamburger-react";
import { NavLink } from 'react-router-dom';
import { CgHomeAlt } from "react-icons/cg";

const MobileNav = () => {
  const [isOpen, setOpen] = useState(false);

  const activeStyle = {
    backgroundColor: '#F90101',
    width: '100%',
    borderRadius: '10px',
    padding: '20px'
  };

  return (
    <header className='flex items-center justify-between lg:hidden md:hidden w-[90%] bg-deepBlue rounded-lg py-4 px-4 mx-auto my-4'>
        <img src={logo} alt="" className='w-[50px]'/>
        <Hamburger toggled={isOpen} toggle={setOpen} color="#427142" direction="right"/>
      {isOpen && (
        <div className="bg-white text-[rgb(15,22,15)] p-8 py-12 h-[100vh] w-[100%] absolute top-28 left-0 bg-baseBlack/70 z-50">
            <w3m-button />
            <NavLink to="/dashboard" className="text-[14px] text-white font-[600] my-6 flex items-center py-4 mb-4 px-6" style={({isActive}) => isActive ? activeStyle : null } end><CgHomeAlt className="mr-4" />Dashboard</NavLink>
            </div>)}
    </header>
  )
}

export default MobileNav