import React from 'react'

function NewslatterSection() {
  return (
    <div>
      {/* newsletter */}
    <section id="newsletter" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-neutral-800 rounded-xl p-8 md:p-12 shadow-xl animate__animated animate__fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Stay Updated with Cricket Stats</h2>
                        <p className="text-gray-400">Subscribe to our newsletter and receive:</p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                Weekly Statistical Analysis
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                Match Predictions
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                Performance Insights
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                Exclusive Content
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <form id="newsletter-form" className="space-y-4">
                            <div className="animate__animated animate__fadeInUp">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                                <input type="text" id="name" name="name" className="mt-1 block w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name"/>
                            </div>

                            <div className="animate__animated animate__fadeInUp" aria-controls>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                                <input type="email" id="email" name="email" className="mt-1 block w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email"/>
                            </div>

                            <div className="animate__animated animate__fadeInUp">
                                <label htmlFor="format" className="block text-sm font-medium text-gray-300">Preferred Format</label>
                                <select id="format" name="format" className="mt-1 block w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select format</option>
                                    <option value="test">Test Cricket</option>
                                    <option value="odi">ODI</option>
                                    <option value="t20">T20</option>
                                    <option value="all">All Formats</option>
                                </select>
                            </div>

                            <div className="flex items-center mt-4 animate__animated animate__fadeInUp" >
                                <input type="checkbox" id="terms" name="terms" className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-neutral-600 rounded"/>
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                                    I agree to receive email updates
                                </label>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 animate__animated animate__fadeInUp">
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default NewslatterSection
