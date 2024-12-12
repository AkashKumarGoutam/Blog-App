import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Landing from './pages/LandingPage/Landing';
import AllPost from './pages/admin/AllPost';
import AllCategory from './pages/admin/AllCategory';
import AddPosts from './pages/admin/AddPosts';
import AddCategory from './pages/admin/AddCategory';
import Navbar from './pages/admin/Navbar';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import EditPost from './pages/admin/EditPost.jsx';
import EditCategory from './pages/admin/EditCategory.jsx';
import Client from './pages/Client.jsx';
import PostDetails from './pages/PostDetails.jsx';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Client />} />
        <Route path="/post/:id" element={<PostDetails />} />

        <Route path="/admin" element={<Login />} />

        {/* Protected/Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes */}
          <Route index element={<AllPost />} />
          <Route path="all-posts" element={<AllPost />} />
          <Route path="all-category" element={<AllCategory />} />
          <Route path="add-posts" element={<AddPosts />} />
          <Route path="add-category" element={<AddCategory />} />
        </Route>
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />

      </Routes>
    </>
  );
};

export default App;
