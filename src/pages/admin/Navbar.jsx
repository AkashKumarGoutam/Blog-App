import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../../firebase/Firebase';

const auth = getAuth(app);

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu open/close
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-200 shadow-md">
      {/* Logo/Title and Hamburger */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">{user ? "Admin Panel" : "Client Panel"}</h1>
        <button
          className="md:hidden focus:outline-none text-2xl"
          onClick={toggleMenu}
        >
          {menuOpen ? <>&#x2715;</> : <>&#9776;</>}
        </button>
      </div>

      {/* Navbar Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-gray-200 p-4 flex flex-col gap-4 md:flex md:flex-row md:static md:w-auto md:p-0 md:bg-transparent ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        {user ? (
          <>
            <span className="text-sm text-gray-700">Welcome, {user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <span className="text-gray-600">Please log in for Admin</span>
            <Link
              to="/admin"
              className="bg-black text-white p-2 rounded-lg text-center"
              onClick={toggleMenu}
            >
              Admin
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
