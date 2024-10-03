import { CgHomeAlt } from "react-icons/cg";
import { TbSettings } from "react-icons/tb";
import { BsReceipt } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg"
import { useDisconnect } from "@web3modal/ethers/react";

const Sidebar = () =>  {
  const { disconnect } = useDisconnect()

  const activeStyle = {
    backgroundColor: '#F90101',
    width: '100%',
    borderRadius: '10px',
    padding: '20px'
  };

  return (
    <div className='bg-deepBlue w-[20%] text-white p-8 py-12 h-[100vh] hidden lg:flex md:flex flex-col'>
      <img src={logo} alt='logo'className="mb-20" />
      <NavLink to="/dashboard" className="text-[14px] flex items-center py-4 mb-4 px-6" style={({isActive}) => isActive ? activeStyle : null } end><CgHomeAlt className="mr-4" />Dashboard</NavLink>
      <button className="text-[14px] mt-auto flex items-center py-4 mb-4 px-6" onClick={() => disconnect()}><TbSettings className="mr-4"  /> Log out</button>
    </div>
  );
}

export default Sidebar;