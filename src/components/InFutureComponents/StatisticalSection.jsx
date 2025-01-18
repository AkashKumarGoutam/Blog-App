import React from 'react'

function StatisticalSection() {
  return (
    <div>
      {/* statiscal section */}
    <section id="statistics" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-12 animate__animated animate__fadeIn">Statistical Analysis</h2>

            {/* <!-- Stats Tabs --> */}
            <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <button className="stats-tab active bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300" data-tab="batting">
                        Batting Stats
                    </button>
                    <button className="stats-tab bg-neutral-800 text-white px-6 py-2 rounded-full hover:bg-neutral-700 transition duration-300" data-tab="bowling">
                        Bowling Stats
                    </button>
                    <button className="stats-tab bg-neutral-800 text-white px-6 py-2 rounded-full hover:bg-neutral-700 transition duration-300" data-tab="teams">
                        Team Rankings
                    </button>
                </div>

                {/* <!-- Stats Content --> */}
                <div className="stats-content" id="batting-stats">
                    <div className="bg-neutral-800 rounded-xl p-6 animate__animated animate__fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-neutral-700 rounded-lg p-4">
                                <h3 className="text-xl font-bold text-white mb-4">Top Run Scorers</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-300">
                                        <span>Virat Kohli</span>
                                        <span>12,000+</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Joe Root</span>
                                        <span>10,000+</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Steve Smith</span>
                                        <span>8,000+</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-neutral-700 rounded-lg p-4">
                                <h3 className="text-xl font-bold text-white mb-4">Highest Averages</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-300">
                                        <span>Don Bradman</span>
                                        <span>99.94</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Marnus Labuschagne</span>
                                        <span>54.31</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Kane Williamson</span>
                                        <span>52.62</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-neutral-700 rounded-lg p-4">
                                <h3 className="text-xl font-bold text-white mb-4">Strike Rates</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-300">
                                        <span>Jos Buttler</span>
                                        <span>150.2</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Glenn Maxwell</span>
                                        <span>148.5</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Suryakumar Yadav</span>
                                        <span>147.8</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Interactive Chart Section --> */}
            <div className="mt-12 bg-neutral-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Performance Trends</h3>
                <div className="w-full h-64 bg-neutral-700 rounded-lg p-4">
                    {/* <!-- Chart placeholder --> */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Interactive Chart Will Be Rendered Here
                    </div>
                </div>
            </div>

            {/* <!-- Quick Stats --> */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-neutral-800 rounded-lg p-4 text-center animate__animated animate__fadeInUp">
                    <div className="text-3xl font-bold text-blue-400">50+</div>
                    <p className="text-gray-400 mt-2">Countries</p>
                </div>
                <div className="bg-neutral-800 rounded-lg p-4 text-center animate__animated animate__fadeInUp" >
                    <div className="text-3xl font-bold text-green-400">10K+</div>
                    <p className="text-gray-400 mt-2">Matches</p>
                </div>
                <div className="bg-neutral-800 rounded-lg p-4 text-center animate__animated animate__fadeInUp">
                    <div className="text-3xl font-bold text-yellow-400">1M+</div>
                    <p className="text-gray-400 mt-2">Data Points</p>
                </div>
                <div className="bg-neutral-800 rounded-lg p-4 text-center animate__animated animate__fadeInUp" >
                    <div className="text-3xl font-bold text-red-400">100%</div>
                    <p className="text-gray-400 mt-2">Accuracy</p>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default StatisticalSection
