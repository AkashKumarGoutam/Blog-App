import React, { useState, useEffect } from 'react';
import LoadingComponents from '../components/LoadingComponents';
import pic from "../assets/aboutPic.png";

function AboutUs() {
  const [loading, setLoading] = useState(true);

  // Simulate loading for demo purposes (remove or adjust for real data fetching)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LoadingComponents/>
    );
  }

  return (
   <div>
    <div className="bg-black text-white from-blue-50 via-white to-gray-100 min-h-screen px-6 py-10">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          About Stump Stat
        </h1>
        <p className="text-lg text-gray-200 max-w-3xl mx-auto">
        Dive into the world of cricket with real-time stats and the latest news. At Stump Stat, we bring cricket closer to you with cutting-edge technology and a passion for the game.
        </p>
      </div>

      {/* Content Section */}
      <div className="mt-12 max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              // src="https://i.pinimg.com/474x/8b/fa/72/8bfa72fd56471af37bf0d4bb88a2e623.jpg"
              src={pic}
              alt="Cricket Action"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text Section */}
          <div className="bg-gray-900 p-6 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-200 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-200 mb-4">
            We understand your love for cricket and aim to enhance your experience by offering:
            </p>
            <ul className=" space-y-3">
              <li className="flex items-center">
                <span className="text-blue-600 text-xl mr-2">✔</span>
                <span>Real-time live cricket match stats.</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 text-xl mr-2">✔</span>
                <span>Statistical analysis of teams, players, and much more.
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 text-xl mr-2">✔</span>
                <span>In-depth statistical articles across all formats of the game.
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 text-xl mr-2">✔</span>
                <span>Interactive insights and data visualizations to deepen your understanding of cricket trends.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Powered by Modern Technology
        </h2>
        <p className=" mb-6 max-w-3xl mx-auto">
          At Stump Stat, we leverage modern tools and technologies to deliver a fast, reliable, and engaging experience for all cricket fans.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-gray-900 shadow-md rounded-lg p-6 w-64 text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">React.js</h3>
            <p className="text-gray-200">Dynamic and responsive UI for seamless interaction.</p>
          </div>
          <div className="bg-gray-900 shadow-md rounded-lg p-6 w-64 text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Tailwind CSS</h3>
            <p className="text-gray-200">Beautiful, modern, and responsive design.</p>
          </div>
          <div className="bg-gray-900 shadow-md rounded-lg p-6 w-64 text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Real-Time APIs</h3>
            <p className="text-gray-200">Instant updates for live matches and stats.</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-16 text-center">
        <h3 className="text-xl text-gray-300 mb-4">
          Join us and explore cricket stats like never before!
        </h3>
        <p className="text-yellow-500 text-sm">
          &copy; 2025 <span className="text-blue-600 font-semibold">Stump Stat</span>. All rights reserved.
        </p>
      </div>
    </div>
   </div>
  );
}

export default AboutUs;
