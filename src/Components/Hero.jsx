import React, { useRef, useEffect, useState } from 'react'
import HeroContent from './HeroContent'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import heroImg1 from '../Media/hero-1.png';
import heroImg2 from '../Media/hero-2.png';
import heroImg3 from '../Media/hero-3.png';
import heroImg4 from '../Media/hero-4.png';
import { Timeline } from 'gsap/gsap-core'
import { FaAngleLeft , FaAngleRight } from "react-icons/fa";


const Hero = () => {

  // Initial Animation
  useGSAP(() => {
    let initialAnimation = new Timeline()
    initialAnimation.to(slideRefs[0].current, {
      display: 'flex',
      duration: 0
    })
    initialAnimation.to("#shape", {
      "border-radius": "16% 84% 16% 84% / 23% 81% 19% 77%",
      duration: 0
    })
    initialAnimation.from(slideRefs[0].current.querySelectorAll('h2 span, h4 span, p span'), {
      opacity: 0,
      y: 60,
      stagger: 0.2,
    })
    initialAnimation.from('#shape', {
      opacity: 0,
    })
    initialAnimation.from(slideRefs[0].current.querySelector('button'), {
      opacity: 0,
      x: -60,
    })
    initialAnimation.from(slideRefs[0].current.querySelector('img'), {
      opacity: 0,
      duration: 0.6,
      x: 60,
    })
    initialAnimation.from('#slider-dots div', {
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
      x: 60,
    })
  });

  const borderRadiusStyles = [
    "24% 76% 24% 76% / 77% 23% 80% 20%",
    "77% 23% 80% 20% / 24% 76% 24% 76%",
    "24% 76% 24% 76% / 77% 23% 80% 20%",
    "77% 23% 80% 20% / 24% 76% 24% 76%",
  ];

  // Animation For Forward/Backward Buttons
  let buttonAnimation = (currentIndex, nextIndex) => {
    console.log(currentIndex);
    console.log(nextIndex);

    const slideGo = slides[currentIndex]
    const slideCome = slides[nextIndex]

    const randomBorderRadius = borderRadiusStyles[nextIndex % borderRadiusStyles.length];

    let btnAnimationTL = gsap.timeline();

    // Slide Going
    btnAnimationTL.to(slideGo.current.querySelector('img'), {
      opacity: 0,
      x: 60,
      duration: 0.2
    });
    btnAnimationTL.to(slideGo.current.querySelector('button'), {
      opacity: 0,
      x: -60,
      duration: 0.2
    });
    btnAnimationTL.to(slideGo.current.querySelectorAll('h2 span, h4 span, p span'), {
      opacity: 0,
      y: 60,
      stagger: 0.1,
      duration: 0.3
    });
    btnAnimationTL.to(slideGo.current, {
      display: 'none',
      duration: 0,
    });

    // Shape Animation
    gsap.to("#shape", {
      delay: 0.6,
      borderRadius: randomBorderRadius,
      duration: 1,
      ease: "power2.out",
    });

    // Next Slide
    btnAnimationTL.to(slideCome.current, {
      display: 'flex',
      duration: 0,
    });
    btnAnimationTL.from(slideCome.current.querySelectorAll('h2 span, h4 span, p span'), {
      opacity: 0,
      y: 60,
      stagger: 0.2,
      duration: 0.6
    });
    btnAnimationTL.from(slideCome.current.querySelector('button'), {
      opacity: 0,
      x: -60,
      duration: 0.3
    });
    btnAnimationTL.from(slideCome.current.querySelector('img'), {
      opacity: 0,
      x: 60,
      duration: 0.4,
      onComplete: () => {
        // Reset styles after animation for slideGo using gsap.set
        const resetElements = slideGo.current.querySelectorAll('h2 span, h4 span, p span');

        // Reset text elements
        resetElements.forEach((element) => {
          gsap.set(element, {
            opacity: 1,
            y: 0, // GSAP handles translateY as 'y' property
          });
        });

        // Reset image element
        gsap.set(slideGo.current.querySelector('img'), {
          opacity: 1,
          x: 0, // Reset to original state
        });

        // Reset button element
        gsap.set(slideGo.current.querySelector('button'), {
          opacity: 1,
          x: 0, // Reset to original state
        });

        console.log("Reset complete");
      }
    });
  } // Animation For Forward/Backward Buttons Ends

  // Function to move to the next slide
  const nextSlide = () => {
    const nextIndex = (position + 1) % slides.length;
    buttonAnimation(position, nextIndex);
    setPosition(nextIndex);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    const prevIndex = (position - 1 + slides.length) % slides.length;
    buttonAnimation(position, prevIndex);
    setPosition(prevIndex);
  };

  const slideRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const heroImgs = [heroImg1, heroImg2, heroImg3, heroImg4];
  const slides = [slideRefs[0], slideRefs[1], slideRefs[2], slideRefs[3]]; // Array of slide refs
  const [position, setPosition] = useState(0); // Current slide index

  let data = [
    {
      mainHeading: "Elevate Your Style with FashionVista",
      subText: "Discover the Latest Trends",
      para: "Explore our exclusive collection of the latest fashion trends that blend style with comfort. From timeless classics to bold new statements, find everything you need to express your unique style. Shop now and enjoy free shipping on orders over $50!",
      btn: "shop now"
    },
    {
      mainHeading: "Discover Your Style",
      para: "Explore our curated collection of men's clothing, where classic designs meet contemporary trends. From tailored suits to casual wear, find pieces that define your personal style and make a statement wherever you go.",
      subText: "Timeless Fashion for the Modern Man",
      btn: "shop for men"
    },
    {
      mainHeading: "Embrace Elegance",
      para: "Uncover a world of fashion with our stunning range of women's apparel. Whether you're searching for glamorous evening wear or everyday essentials, our selection offers elegance and comfort to match every occasion and taste.",
      subText: "Chic and Sophisticated Styles",
      btn: "shop for women"
    },
    {
      mainHeading: "Perfect Your Look",
      para: "Complete your outfits with our exclusive accessories collection. From statement jewelry to stylish bags and belts, find the perfect finishing touches that add a unique flair and elevate your fashion game to the next level.",
      subText: "Accessories That Define Your Style",
      btn: "view accessories"
    }
  ]

  return (
    <div className='relative top-0 w-full md:h-screen md:pb-0 pb-20 bg-zinc-200'>

      <button onClick={prevSlide} className='absolute top-1/2 md:left-6 left-1 z-50 rounded-full bg-orange-500 hover:bg-orange-700 text-white font-bold w-8 md:h-11 h-8 md:w-11 md:text-xl text-base justify-center text-center items-center flex'> <FaAngleLeft /></button>
      <button onClick={nextSlide} className='absolute top-1/2 md:right-6 right-1 z-50 rounded-full bg-orange-500 hover:bg-orange-700 text-white font-bold w-8 md:h-11 h-8 md:w-11 md:text-xl text-base justify-center text-center items-center flex'> <FaAngleRight /> </button>

      <div id='shape' className='md:block hidden absolute bottom-[25vh] right-[8vw] bg-orange-500 xl:w-[400px] xl:h-[400px] lg:w-[320px] lg:h-[320px] md:w-[280px] md:h-[280px]'></div>

      {data.map((elem, index) => (
        <HeroContent
          key={index}
          ref={slideRefs[index]}
          heroImg={heroImgs[index]}
          data={elem}
        />
      ))}

      <div id='slider-dots' className="flex mt-5 gap-1 absolute bottom-10 right-1/2 translate-x-1/2 z-20">
        {data.map((_, index) => (
          <div key={index} className={`rounded-full p-2 ${index === position ? 'bg-orange-500' : 'bg-orange-500/50'}`}></div>
        ))}
      </div>
    </div>
  )
}

export default Hero