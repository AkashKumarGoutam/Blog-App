import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
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
import Footer from './components/Footer.jsx';
import AllMatches from './components/AllMatches.jsx';
import AboutUs from './pages/AboutUs.jsx';
import AllNewsArticles from './pages/NewsArticles/AllNewsArticles.jsx';
import MatchScorePage from './pages/MatchScorePage.jsx';
import AddMatches from './pages/admin/AddMatchCards.jsx';
import AddMatchPosts from './pages/admin/AddMatchPosts.jsx';
import MatchPosts from './pages/MatchPosts.jsx';
import AllMatchCardPage from './pages/AllMatchCardPage.jsx';
import ParticularNewsArticles from './pages/ParticularNewsArticles.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import AddFlagImageURL from './pages/admin/AddFlagImageURL.jsx';
import ContactPage from './components/ContactPage.jsx';
import PreLoader from './components/PreLoader/PreLoader.jsx';
import StatAnalysis from './pages/StatAnalysis.jsx';

const App = () => {
  // loader state
  const [isLoading, setIsLoading] = useState(true);

   // Let create async method to fetch fake data
   useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    fakeDataFetch();
  }, []);
  
  return isLoading ? (
    <PreLoader />
  ) : ( 
    <>
      <Navbar />
      <AllMatches/>
      <ScrollToTop/>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Client />} />
        <Route path="/post/:id" element={<PostDetails />} />


        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />

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
          <Route path="add-matches" element={<AddMatches />} />
          <Route path="add-match-posts" element={<AddMatchPosts />} />
          <Route path="add-flag-imageURL" element={<AddFlagImageURL />} />
        </Route>
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
            {/* end admin routes */}

        {/* new components */}
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/all_news_articles" element={<AllNewsArticles />} />
        <Route path="/particular-news-article/:id" element={<ParticularNewsArticles />} />
        <Route path="/match_score" element={<MatchScorePage />} />
        <Route path="/match-post/:slug" element={< MatchPosts/>} />
        <Route path="/all-match-card" element={< AllMatchCardPage/>} />
        <Route path="/statistics" element={< StatAnalysis/>} />


      </Routes>
      <Footer/>
    </>
  )
};

export default App;
