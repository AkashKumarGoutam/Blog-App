import React from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom' 

function Footer() {
  return (
    <footer id="footer" className="bg-black text-gray-300 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* <!-- About Section --> */}
                <div className="animate__animated animate__fadeIn">
                    <div>
                    <img src={logo} className='w-20'/>
                    <h3 className="text-xl font-bold text-white mb-4">Stump Stat</h3>
                    </div>
                    <p className="text-gray-400 mb-4">Your comprehensive source for cricket statistics, analysis, and insights across all formats of the game.</p>
                    <div className="flex space-x-4">
                        <Link to="/"className="text-gray-400 hover:text-white transition duration-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                        </Link>
                        <Link to="/"className="text-gray-400 hover:text-white transition duration-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"></path></svg>
                        </Link>
                        <Link to="/"className="text-gray-400 hover:text-white transition duration-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                        </Link>
                    </div>
                </div>

                {/* <!-- Quick Links --> */}
                <div className="animate__animated animate__fadeIn">
                    <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-white transition duration-300">Home</Link></li>
                        <li><Link to="/all-match-card" className="hover:text-white transition duration-300">All Match Cards</Link></li>
                        <li><Link to="/all_news_articles" className="hover:text-white transition duration-300">All News Articles</Link></li>
                        <li><Link to="/about_us" className="hover:text-white transition duration-300">About Us</Link></li>
                        <li><Link to="/statistics" className="hover:text-white transition duration-300">Statistics</Link></li>
                        <li><Link to="/contact-us" className="hover:text-white transition duration-300">Contact Us</Link></li>
                    </ul>
                </div>

                {/* <!-- Cricket Formats --> */}
                <div className="animate__animated animate__fadeIn" >
                    <h3 className="text-xl font-bold text-white mb-4">Cricket Formats</h3>
                    <ul className="space-y-2">
                        <li><Link to="/"className="hover:text-white transition duration-300">Test Cricket</Link></li>
                        <li><Link to="/"className="hover:text-white transition duration-300">One Day Internationals</Link></li>
                        <li><Link to="/"className="hover:text-white transition duration-300">T20 Internationals</Link></li>
                        <li><Link to="/"className="hover:text-white transition duration-300">T20</Link></li>
                        {/* <li><Link to="/"className="hover:text-white transition duration-300">League Cricket</Link></li> */}
                    </ul>
                </div>

                {/* <!-- Contact Info --> */}
                <div className="animate__animated animate__fadeIn">
                    <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                            </svg>
                            <Link to="/">stumpstat@gmail.com</Link>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                            </svg>
                            <span>+91 7004834415</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* <!-- Bottom Bar --> */}
            <div className="border-t border-gray-800 pt-6 mt-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-400">© 2025 Stump Stat. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/"className="text-sm text-gray-400 hover:text-white transition duration-300">Privacy Policy</Link>
                        <Link to="/"className="text-sm text-gray-400 hover:text-white transition duration-300">Terms of Service</Link>
                        <Link to="/"className="text-sm text-gray-400 hover:text-white transition duration-300">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
