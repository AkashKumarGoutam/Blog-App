import React from "react";
import LatestSection from "../components/LatestSection";
import banner from "../assets/Stump Stat.png";

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
      </div>
    </>
  );
}

export default Client;
