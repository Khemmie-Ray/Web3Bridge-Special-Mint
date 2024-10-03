import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import webImg from '../assets/web3.svg'
import NFTData from "../components/NFTData";
import Footer from "../components/Footer";
import { Navigate } from "react-router-dom";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useOwnerAddress from "../Hooks/useOwnerAddress";

const Home = () => {
  const { width, height } = useWindowSize();
  const { address, isConnected } = useWeb3ModalAccount()
  const ownerAddress = useOwnerAddress()

  return isConnected  && ownerAddress === address ? <Navigate to={'/dashboard'} /> : (
    <div>
      <div>
        <Confetti width={width} height={height} />
        <Header />
        <Hero />
      </div>
    <NFTData />
     <section className="pt-20 bg-lightPink">
        <div className="flex justify-between w-[90%] mx-auto flex-col lg:flex-row md:flex-row">
        <div className="lg:w-[45%] md:w-[45%] w-[100%] order-2 lg:order-1 md:order-1 mb-6">
            <h2 className='font-Nunito lg:text-[48px] md:text-[38px] text-[28px] font-[600] mb-6 self-center'>
            The <span className='text-red'>journey</span>, so far</h2>
            <p>It’s been a remarkable journey—from our humble beginnings to becoming a key player in the Web3 space, driving innovation and education across the ecosystem. As we reflect on our achievements, we want to honor those who have supported us every step of the way.</p>
            <p className="my-6">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet illum perspiciatis hic ad excepturi aliquam minus dolores sint, alias veritatis odit eius fugit vel ab.</p>
            <p className="my-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo sit debitis commodi optio ratione dolore odit repudiandae vel suscipit harum tempore ducimus officia beatae, dolores numquam aut tempora, at natus! Voluptatem debitis non quaerat tempore. Hic, dolor temporibus? Vero, at.</p>
            <p className="my-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum dolorum, non molestias dolore praesentium illum fugiat perspiciatis iure id alias rerum itaque atque repellendus totam, error cum corrupti quam quae assumenda nam incidunt. Minus architecto, ad consectetur sapiente dolorum aut?</p>
        </div>
        <div className="lg:w-[48%] md:w-[48%] w-[100%] order-1 lg:order-2 md:order-2 mb-6">
            <img src={webImg} alt="" />
        </div>
        </div>
     </section>
     <Footer />
    </div>
  );
};

export default Home;
