import React from "react";
import heroImg from "../assets/col.svg";
import SpecialMint from "./SpecialMint";

const Hero = () => {
  return (
    <div className="bg-deepBlue rounded-lg p-8 flex flex-col lg:flex-row md:flex-row justify-between text-white w-[90%] mx-auto my-20 relative">
      <div className="lg:w-[55%] md:w-[55%] w-[100%] mb-6">
        <h1 className="font-Nunito font-[600] lg:text-[58px] md:text-[48px] text-[38px]">
          Celebrating <span className="text-red">Milestones</span>,<br />{" "}
          Rewarding Loyalty
        </h1>
        <p className="lg:w-[70%] md:w-[90%] w-[100%] my-6 lg:text-[20px] md:text-[20px] text-[18px]">
          We’re celebrating the remarkable journey of Web3bridge with our
          AnniversaryNFT collection—rewarding the community that helped us grow.
          Every NFT represents a milestone in our evolution, and each holder
          gets special rewards for being part of our story.
        </p>
        <SpecialMint />
      </div>
      <div className="w-[100%] md:w-[45%] block lg:hidden md:block mb-6 md:m-auto">
        <img src={heroImg} alt="" className="w-[100%]" />
      </div>
      <div className="absolute lg:right-10 top-1/2 transform -translate-y-1/2 hidden lg:block md:hidden">
        <img src={heroImg} alt="" className="lg:w-[90%]" />
      </div>
    </div>
  );
};

export default Hero;
