import React from 'react'

function CricketCategories() {
  return (
    <div>
      {/* cricket categories section */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 animate__animated animate__fadeIn">Cricket Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* <!-- T20 Card --> */}
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden animate__animated animate__fadeInUp">
                    <div className="bg-blue-600 h-2"></div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4">T20 Cricket</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                Batting Statistics
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                Bowling Analysis
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                Team Rankings
                            </li>
                        </ul>
                        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                            View T20 Stats
                        </button>
                    </div>
                </div>

                {/* <!-- ODI Card --> */}
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden animate__animated animate__fadeInUp" >
                    <div className="bg-blue-600 h-2"></div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4">ODI Cricket</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                World Cup Stats
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                Player Records
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                Series Analysis
                            </li>
                        </ul>
                        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">
                            View ODI Stats
                        </button>
                    </div>
                </div>

                {/* <!-- Test Card --> */}
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden animate__animated animate__fadeInUp">
                    <div className="bg-blue-600 h-2"></div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4">Test Cricket</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                Historical Data
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                Match Analysis
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                Career Statistics
                            </li>
                        </ul>
                        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300">
                            View Test Stats
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default CricketCategories
