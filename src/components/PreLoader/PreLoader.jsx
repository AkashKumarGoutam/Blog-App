import React from "react";
import "./PreLoader.css";
import logo from "../../assets/logo.png";

const PreLoader = () => {
  return (
    <div className="loader">
      <div className="svg-wrapper">
        {/* copy svg image and past it here */}
        <img src={logo} alt="logo" className="w-20 h-20"/>
        <div className="flex justify-center items-center my-2">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
      </div>
    </div>
  );
};

export default PreLoader;