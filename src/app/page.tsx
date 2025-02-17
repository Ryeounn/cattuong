"use client";
import { useState } from "react";
import { faTruck, faCircleCheck, faEnvelope, faFaceKissWinkHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Banner from "./banner/banner";
import Benefit from "./benefit/benefit";
import Product from "./products/product";
import ContactFor from "./contact/contact";
import Nav from "./nav/nav";

export default function Home() {
  const images = [
    '/assets/images/apps/banner1.png',
    '/assets/images/apps/3.png'
  ];
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    setCurrentIndex(isFirstSlide ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
  };

  return (
    <>
      <div id="banner">
        <Banner />
      </div>
      <div id="nav">
        <Nav/>
      </div>
      {/* <div id="products">
        <Product />
      </div> */}
      <div id="benefit">
        <Benefit />
      </div>
      {/* <div id="contact">
        <ContactFor />
      </div> */}
      {/* <div className="relative w-full overflow-hidden top-[-60px] sm:top-[40px]">
        <div
          className="flex transition-transform duration-700 sm:relative relative sm:z-[-1]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full !sm:h-[100px] flex-shrink-0"
            >
              <Image
                src={image}
                loading="lazy"
                alt={`Slide ${index}`}
                className="w-full h-full object-cover sm:h-[200px] sm:object-cover"
                width={360}
                height={150}
              />
            </div>
          ))}
        </div>
        
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full sm:z-30 sm:-translate-y-[2rem]"
        >
          ‹
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full sm:z-30 sm:-translate-y-[2rem]"
        >
          ›
        </button>
      </div> */}

      {/*  */}
    </>
  );
}
