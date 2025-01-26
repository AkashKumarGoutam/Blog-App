import React from "react";
import LatestSection from "../components/LatestSection";
import banner from "../assets/Stump Stat-8.png";
import img1 from "../assets/Blue and Red Illustrative Cricket Club Sports Logo-3.png";
import img2 from "../assets/Blue and Red Illustrative Cricket Club Sports Logo-2.png";
// import img3 from "../assets/Blue and Red Illustrative Cricket Club Sports Logo.png";

function Client() {
  return (
    <>
      <div className="">
      <div className="flex bg-black px-12 flex-col lg:flex-row items-center justify-between h-full py-12">
        <div className="lg:w-1/2 text-white space-y-6 animate__animated animate__fadeInLeft">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Your Ultimate Cricket Statistics Hub
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Real-time scores, in-depth analysis, and comprehensive cricket statistics at your fingertips.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#livescores" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition duration-300 animate__animated animate__pulse animate__infinite">
              Live Stats
            </a>
            <a href="#statistics" className="bg-neutral-700 hover:bg-neutral-600 text-white px-8 py-3 rounded-full font-semibold transition duration-300">
              View Statistics
            </a>
          </div>
          <div className="flex items-center space-x-4 mt-8">
            <div className="flex items-center">
              <span className="text-green-500 text-4xl font-bold">50K+</span>
              <span className="text-gray-400 ml-2">Active Users</span>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="flex items-center">
              <span className="text-green-500 text-4xl font-bold">100%</span>
              <span className="text-gray-400 ml-2">Real-time Data</span>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 w-96 mt-12 lg:mt-0 animate__animated animate__fadeInRight">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-30"></div>
            <div className="relative bg-neutral-00 p-6 rounded-lg shadow-xl transition duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition duration-300">
                  <h3 className="text-white font-semibold">Live Match</h3>
                  <p className="text-green-400">IND vs AUS</p>
                  <p className="text-gray-300 text-sm">1st Test - Day 2</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition duration-300">
                  <h3 className="text-white font-semibold">Latest Stats</h3>
                  <p className="text-green-400">Player Rankings</p>
                  <p className="text-gray-300 text-sm">Updated hourly</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition duration-300">
                  <h3 className="text-white font-semibold">Analysis</h3>
                  <p className="text-green-400">Match Predictions</p>
                  <p className="text-gray-300 text-sm">AI-powered insights</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition duration-300">
                  <h3 className="text-white font-semibold">Articles</h3>
                  <p className="text-green-400">Expert Commentary</p>
                  <p className="text-gray-300 text-sm">Daily updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


        <div className="flex justify-center">
          <img
            src={banner}
            className="w-full sm:h-full md:h-48 lg:h-48"
            alt="Banner"
          />
        </div>
        <LatestSection />







        <div className=" bg-black py-28  max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 animate__animated animate__fadeIn">
        <h2 className="text-3xl font-bold text-white mb-4">Cricket Statistics Hub</h2>
        <p className="text-gray-400">Comprehensive cricket statistics and rankings</p>
      </div>

      {/* <!-- Stats Categories --> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-900 rounded-lg p-6 hover:transform hover:scale-105 transition duration-300 animate__animated animate__fadeInUp">
          <div className="stats-tab active cursor-pointer" data-tab="batting">
            <h3 className="text-xl font-semibold text-white mb-4">Batting Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>Virat Kohli</span>
                <span className="text-green-500">12,898</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Joe Root</span>
                <span className="text-green-500">10,956</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Steve Smith</span>
                <span className="text-green-500">10,823</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 hover:transform hover:scale-105 transition duration-300 animate__animated animate__fadeInUp">
          <div className="stats-tab" data-tab="bowling">
            <h3 className="text-xl font-semibold text-white mb-4">Bowling Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>R Ashwin</span>
                <span className="text-green-500">442</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Nathan Lyon</span>
                <span className="text-green-500">438</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Stuart Broad</span>
                <span className="text-green-500">604</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 hover:transform hover:scale-105 transition duration-300 animate__animated animate__fadeInUp" >
          <div className="stats-tab" data-tab="teams">
            <h3 className="text-xl font-semibold text-white mb-4">Team Rankings</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>Australia</span>
                <span className="text-green-500">121</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>India</span>
                <span className="text-green-500">119</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>England</span>
                <span className="text-green-500">111</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Interactive Stats Chart --> */}
      {/* <div className="bg-neutral-800 rounded-lg p-6 mb-12 transition duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Performance Trends</h3>
          <select id="statPeriod" className="bg-neutral-700 text-white rounded-md px-4 py-2">
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div className="h-64 bg-neutral-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Interactive Chart Will Be Rendered Here</p>
        </div>
      </div> */}

      {/* <!-- Quick Stats Cards --> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-500">267</div>
          <div className="text-gray-400 text-sm">Highest Score</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-500">10/74</div>
          <div className="text-gray-400 text-sm">Best Bowling</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center transition duration-300">
          <div className="text-3xl font-bold text-green-500">264</div>
          <div className="text-gray-400 text-sm">Fastest Century</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-500">952/6</div>
          <div className="text-gray-400 text-sm">Highest Team Score</div>
        </div>
      </div>
    </div>






        {/* Image Carousel Column */}
        <div className="relative py-2 bg-black overflow-hidden h-64">
          <div className="flex absolute w-full h-full animate-scrol">
            <img src={img2} alt="Image 1" className="h-64 w-auto rounded-lg mr-4" />
            <img src={img2} alt="Image 2" className="h-64 w-auto rounded-lg mr-4" />
            <img src={img2} alt="Image 3" className="h-64 w-auto rounded-lg mr-4" />
            <img src={img2} alt="Image 4" className="h-64 w-auto rounded-lg mr-4" />
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
