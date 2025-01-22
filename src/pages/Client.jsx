import React from "react";
import LatestSection from "../components/LatestSection";
import banner from "../assets/Stump Stat.png";
import img1 from "../assets/Blue and Red Illustrative Cricket Club Sports Logo-3.png";
import img2 from "../assets/Blue and Red Illustrative Cricket Club Sports Logo-2.png";
import img3 from "../assets/Blue and Red Illustrative Cricket Club Sports Logo.png";

function Client() {
  return (
    <>
      <div className="">
        <div className="flex justify-center">
          <img
            src={banner}
            className="w-full sm:h-32 md:h-32 lg:h-64"
            alt="Banner"
          />
        </div>
        <LatestSection />
        {/* Image Carousel Column */}
        <div className="relative my-4 overflow-hidden h-64">
          <div className="flex absolute w-full h-full animate-scrol">
            <img src={img1} alt="Image 1" className="h-64 w-auto rounded-lg mr-4" />
            <img src={img2} alt="Image 2" className="h-64 w-auto rounded-lg mr-4" />
            <img src={img3} alt="Image 3" className="h-64 w-auto rounded-lg mr-4" />
            <img src={img1} alt="Image 4" className="h-64 w-auto rounded-lg mr-4" />
          </div>
        </div>

        <style>
          {`
            @keyframes scrol {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            .animate-scrol {
              animation: scrol 20s linear infinite;
            }
          `}
        </style>
      </div>
    </>
  );
}

export default Client;
