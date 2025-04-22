import { useGSAP } from '@gsap/react';
import { Timeline } from 'gsap/gsap-core';
import React, { useEffect, useRef } from 'react'
import { IoMenu } from "react-icons/io5";


const Navbar = () => {

  const navbar = useRef()

  useGSAP(()=>{
    let nav = new Timeline()
    nav.from('#logo',{
      y:-30,
      duration:0.6,
      opacity:0
    })
    nav.from('#nav-links li',{
      opacity:0,
      y:-20,
      duration:.6,
      stagger:0.1
    })
    nav.from('#nav-btn button',{
      opacity:0,
      x:30,
      duration:.4,
      stagger:0.1
    })
  })

  // ---> Navbar scroll hide/show
  var lastScrollTop;
  let navOnScroll = (scrollTop) => {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop <= "100") {
      navbar.current.style.top = '0px';
      navbar.current.style.background = 'transparent';
    }
    else if (scrollTop > lastScrollTop) {
      navbar.current.style.top = '-100px';
      navbar.current.style.background = 'transparent';
    }
    else {
      navbar.current.style.top = '0';
      navbar.current.style.background = '#d4d4d8';  //zinc-300
    }
    lastScrollTop = scrollTop;
  }
  useEffect(() => {
    window.addEventListener('scroll', navOnScroll);
  }, []);

  return (
    <div ref={navbar} className="z-50 w-full transition-all flex justify-between md:px-20 px-8 items-end fixed top-0 py-3">
      <div id='logo' className="flex items-end gap-2">
        <img className='lg:w-10 w-8 lg:h-10 h-8' src="logo.png" alt="" />
        <span className='fontplay lg:text-3xl md:text-2xl text-xl self-end capitalize text-orange-500 font-bold'>FashionVista</span>
      </div>
      <ul id='nav-links' className='hidden md:flex gap-4'>
        {["home", "about-us", "Shop", "Blog"].map((elem, index) => {
          return <li key={index} className='text-base font-bold capitalize text-nowrap text-orange-500 cursor-pointer hover:text-orange-600' >{elem}</li>
        })}
      </ul>
      <div id='nav-btn' className='hidden md:flex gap-4'>
        {["search", "cart"].map((elem, index) => {
          return <button key={index} className='bg-orange-500 text-white px-4 capitalize py-1 rounded-full text-base font-bold  hover:bg-orange-600'>{elem}</button>
        })}
      </div>
      <button id="small-screen" className='md:hidden block items-end'>
        <IoMenu className='text-orange-500 text-2xl'/>
      </button>
    </div>
  )
}

export default Navbar