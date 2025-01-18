import React from 'react'

function ComparisionSection() {
  return (
    <div>
      {/* comparison */}
    <section id="comparison" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 animate__animated animate__fadeIn">Player Comparison Tool</h2>

            {/* <!-- Comparison Tool --> */}
            <div className="bg-gray-100 rounded-xl p-8 mb-12 animate__animated animate__fadeInUp">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* <!-- Player 1 Selection --> */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800">Player 1</h3>
                        <select className="w-full p-3 border rounded-lg bg-white">
                            <option>Select Player</option>
                            <option>Virat Kohli</option>
                            <option>Steve Smith</option>
                            <option>Kane Williamson</option>
                            <option>Joe Root</option>
                        </select>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">Matches</p>
                                    <p className="text-xl font-bold">254</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">Average</p>
                                    <p className="text-xl font-bold">50.3</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">Runs</p>
                                    <p className="text-xl font-bold">12,000</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">Strike Rate</p>
                                    <p className="text-xl font-bold">92.5</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Player 2 Selection --> */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800">Player 2</h3>
                        <select className="w-full p-3 border rounded-lg bg-white">
                            <option>Select Player</option>
                            <option>Rohit Sharma</option>
                            <option>David Warner</option>
                            <option>Babar Azam</option>
                            <option>Jos Buttler</option>
                        </select>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">Matches</p>
                                    <p className="text-xl font-bold">235</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">Average</p>
                                    <p className="text-xl font-bold">48.7</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">Runs</p>
                                    <p className="text-xl font-bold">10,500</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">Strike Rate</p>
                                    <p className="text-xl font-bold">89.3</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                        Compare Stats
                    </button>
                </div>
            </div>

            {/* <!-- Comparison Charts --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate__animated animate__fadeInUp">
                {/* <!-- Batting Comparison --> */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Batting Comparison</h3>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Batting Chart Will Render Here</span>
                    </div>
                </div>

                {/* <!-- Performance Timeline --> */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Performance Timeline</h3>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Timeline Chart Will Render Here</span>
                    </div>
                </div>
            </div>

            {/* <!-- Format Filters --> */}
            <div className="mt-12 flex flex-wrap justify-center gap-4 animate__animated animate__fadeInUp">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                    Test Matches
                </button>
                <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition duration-300">
                    ODI Matches
                </button>
                <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition duration-300">
                    T20 Matches
                </button>
            </div>
        </div>
    </section>
    </div>
  )
}

export default ComparisionSection
