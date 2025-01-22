import React from "react";
import "./PreLoader.css";
import logo from "../../assets/Blue and Red Illustrative Cricket Club Sports Logo-2.png"

const PreLoader = () => {
  return (
    <div className="loader">
      <div className="svg-wrapper">
        {/* copy svg image and past it here */}
        <img src={logo} alt="logo" className="w-20 h-20"/>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default PreLoader;