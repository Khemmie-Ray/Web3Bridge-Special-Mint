import React from "react";
import logo from "../assets/logo.svg";
import { IoLogoLinkedin } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { SiDiscord } from "react-icons/si";
import { IoLogoYoutube } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-deepBlue w-[90%] mx-auto p-6 rounded-lg flex items-start justify-between my-10 text-white lg:flex-row md:flex-row flex-col">
      <div className="lg:w-2/6 md:w-2/6 w-[100%] mb-6">
        <img src={logo} alt=""  />
        <p className="my-6">
          1/3 Adebola Gbadebo Drv. (Adebola House), Off Abadek Avenue, off Akin
          Ogunlewe Rd, Igbogbo, Ikorodu, Lagos.
        </p>
        <div className="flex lg:w-[50%] md:w-[70%] w-[100%] mb-6 justify-between text-2xl text-red">
          <a href="https://x.com/Web3Bridge" target="_blank"><BsTwitterX /></a>
          <a href="https://www.linkedin.com/company/web3bridge" target="_blank"><IoLogoLinkedin /></a>
          <a href="#" target="_blank"><SiDiscord /></a>
          <a href="https://www.youtube.com/@web3bridge" target="_blank"><IoLogoYoutube /></a>
          <a href="#" target="_blank"><FaTelegram /></a>
        </div>
        <p className="mt-4 hidden lg:block md:block">&copy; All Rights Reserved Web3Bridge</p>
      </div>
      <div className="flex lg:w-2/6 md:w-3/6 w-[100%] justify-between lg:flex-row md:flex-row flex-col">
      <div className="flex flex-col lg:w-1/2 md:w-1/2 w-[100%] mb-6 text-[16px]">
        <p className="text-[18px] font-[600] text-red mb-4">Web3Bridge</p>
        <a href="https://www.web3bridgeafrica.com/" target="_blank" className="mb-4">
          Home
        </a>
        <a href="https://www.web3bridgeafrica.com/about-us" target="_blank" className="mb-4">
          About
        </a>
        <a href="https://www.web3bridgeafrica.com/career" target="_blank">
          Career
        </a>       
      </div>
      <div className="flex flex-col lg:w-1/2 md:w-1/2 w-[100%] text-[16px]">
        <p className="text-[18px] font-[600] text-red mb-4">Education</p>
        <a href="https://www.web3bridgeafrica.com/cohorts" target="_blank" className="mb-4">
          Cohort
        </a>
        <a href="https://www.web3bridgeafrica.com/trainings" target="_blank" className="mb-4">
          Trainings
        </a>
      </div>
      </div>
      <p className="mt-4 block lg:hidden md:hidden">&copy; All Rights Reserved Web3Bridge</p>
    </footer>
  );
};

export default Footer;
