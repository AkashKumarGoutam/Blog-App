import React from 'react'

function Features() {
  return (
    <div>
       {/* features */}
    <section id="featured" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-12 animate__animated animate__fadeIn">Featured Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* <!-- Featured Article 1 --> */}
                <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 animate__animated animate__fadeInUp">
                    <div className="p-6">
                        <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">T20</span>
                        <h3 className="text-xl font-bold text-white mt-4">Top 10 T20 Run Scorers of 2023</h3>
                        <p className="text-gray-400 mt-2">Comprehensive analysis of batting performances across all T20 internationals in 2023.</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-gray-500 text-sm">5 min read</span>
                            <button className="text-blue-400 hover:text-blue-300">Read More →</button>
                        </div>
                    </div>
                </div>

                {/* <!-- Featured Article 2 --> */}
                <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 animate__animated animate__fadeInUp">
                    <div className="p-6">
                        <span className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">ODI</span>
                        <h3 className="text-xl font-bold text-white mt-4">World Cup 2023: Statistical Highlights</h3>
                        <p className="text-gray-400 mt-2">Breaking down the numbers behind the biggest cricket tournament of the year.</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-gray-500 text-sm">8 min read</span>
                            <button className="text-green-400 hover:text-green-300">Read More →</button>
                        </div>
                    </div>
                </div>

                {/* <!-- Featured Article 3 --> */}
                <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 animate__animated animate__fadeInUp" >
                    <div className="p-6">
                        <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">Test</span>
                        <h3 className="text-xl font-bold text-white mt-4">Evolution of Test Cricket Statistics</h3>
                        <p className="text-gray-400 mt-2">How batting and bowling averages have changed over the decades.</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-gray-500 text-sm">10 min read</span>
                            <button className="text-red-400 hover:text-red-300">Read More →</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Trending Stats --> */}
            <div className="mt-16 bg-neutral-800 rounded-xl p-8 animate__animated animate__fadeIn">
                <h3 className="text-2xl font-bold text-white mb-6">Trending Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400">147.8</div>
                        <p className="text-gray-400 mt-2">Highest T20 Strike Rate</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">264</div>
                        <p className="text-gray-400 mt-2">Highest ODI Score</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-red-400">400+</div>
                        <p className="text-gray-400 mt-2">Test Wickets</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">98%</div>
                        <p className="text-gray-400 mt-2">Win Rate</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Features
