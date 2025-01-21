import React from "react";
import LatestSection from "../components/LatestSection";
import banner from "../assets/Stump Stat-4.png"
function Client() {

  return (
    <>
      <div className="">
        <div className="flex justify-center">
        <img src={banner} className="w-[96%] h-64 rounded-xl"/>
        </div>
    <LatestSection/>
      </div>
    </>
  );
}

export default Client;