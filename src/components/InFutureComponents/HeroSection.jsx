import React from 'react'

function HeroSection() {
  return (
    <div>
       {/* hero section */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white animate__animated animate__fadeInLeft">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cricket Statistics &amp; Analysis
            </h1>
            <p className="text-gray-300 text-xl mb-8">
              Comprehensive coverage across all formats - T20, ODI, and Test
              matches
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#categories"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Explore Stats
              </a>
              <a
                href="#newsletter"
                className="border border-white hover:bg-white hover:text-neutral-900 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Subscribe
              </a>
            </div>
          </div>
          <div className="animate__animated animate__fadeInRight">
            <div className="bg-neutral-800 p-6 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-neutral-700 rounded-lg">
                  <h3 className="text-white text-2xl font-bold">T20</h3>
                  <p className="text-gray-300">Latest Updates</p>
                </div>
                <div className="text-center p-4 bg-neutral-700 rounded-lg">
                  <h3 className="text-white text-2xl font-bold">ODI</h3>
                  <p className="text-gray-300">Rankings</p>
                </div>
                <div className="text-center p-4 bg-neutral-700 rounded-lg">
                  <h3 className="text-white text-2xl font-bold">Test</h3>
                  <p className="text-gray-300">Analysis</p>
                </div>
                <div className="text-center p-4 bg-neutral-700 rounded-lg">
                  <h3 className="text-white text-2xl font-bold">Live</h3>
                  <p className="text-gray-300">Updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
