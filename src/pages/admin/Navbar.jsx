import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../../firebase/Firebase';

const auth = getAuth(app);

const Navbar = () => {
  const [user, setUser] = useState(null);
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

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200">
      {user ? (
        <div>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
      ):(
        <div>
          <h1 className="text-xl font-bold">Client Panel</h1>
          </div>
      )}
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">Welcome, {user.email}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className='flex gap-3 items-center'>
          <span className="text-gray-600">Please log in for Admin</span>
          <Link to="/admin" className='bg-black text-white p-2 rounded-lg'>Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
