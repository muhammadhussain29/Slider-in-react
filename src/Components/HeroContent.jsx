import React, { forwardRef } from 'react'

const HeroContent = forwardRef((props, ref) => {
    return (
        <div ref={ref} className='z-10 md:h-screen h-full hidden md:flex-row flex-col justify-between md:items-center items-start bg-transparent pt-28 md:pt-0 md:mx-20 mx-12'>
            <div className="md:w-1/2">
                <h4 className=" text-lg md:text-2xl lg:text-3xl text-zinc-700 overflow-y-hidden tracking-tight"><span className='inline-block'>{props.data.subText}</span></h4>
                <h2 className='text-2xl md:text-4xl lg:text-6xl font-bold capitalize text-orange-500 '><span className='inline-block'>{props.data.mainHeading}</span></h2>
                <p className="text-sm md:text-base lg:text-lg text-zinc-700 my-4 overflow-y-hidden"><span className='inline-block'>{props.data.para}</span></p>
                <button className='md:text-lg text-base capitalize font-bold rounded-full md:px-5 md:py-2 px-3 py-2 bg-orange-500 text-white hover:bg-orange-700'>{props.data.btn}</button>
            </div>
            <div className="absolute z-10 right-[5vw] self-end md:block hidden">
                <img src={props.heroImg} alt="" className='xl:h-[600px] lg:h-[500px] md:h-[400px] mr-16' />
            </div>
        </div>
    )
})

export default HeroContent