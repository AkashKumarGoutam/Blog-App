import React from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../firebase/Firebase";
import { Link } from "react-router-dom";
import logo from "../../assets/Blue and Red Illustrative Cricket Club Sports Logo-2.png"

const auth = getAuth(app);

const Navbar = () => {

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //     navigate('/'); // Redirect to login page
  //   } catch (error) {
  //     console.error('Logout failed:', error.message);
  //   }
  // };

  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen); // Toggle menu open/close
  // };

  return(
    <div className="bg-black">
        <div className="flex items-center justify-between h-16 px-8">
        <div className="flex items-center">
          <div className=" flex items-center gap-2 flex-shrink-0">
          <img src={logo} className="w-16"/>
            <span className="text-white text-xl font-bold">Stump Stat</span>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <Link to="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link to="/all-match-card"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              All Match Cards
            </Link>
            <Link to="/all_news_articles"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              All News Articles
            </Link>
            <Link to="/about_us"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </Link>
            <Link to="/statistics"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Statistics
            </Link>
            
            <Link to="/newsletter"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Newsletter
            </Link>
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="hamburger inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
};

export default Navbar;
