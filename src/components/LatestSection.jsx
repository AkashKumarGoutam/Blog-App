import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { app } from "../firebase/Firebase";
import { Link } from "react-router-dom";
import LoadingComponents from "./LoadingComponents";
import img1 from "../assets/Blue and Red Illustrative Cricket Club Sports Logo-3.png";
import img2 from "../assets/Blue and Red Illustrative Cricket Club Sports Logo-2.png";
import img3 from "../assets/Blue and Red Illustrative Cricket Club Sports Logo.png";

function LatestSection() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest posts from Firestore
  const fetchLatestPosts = async () => {
    try {
      const db = getFirestore(app);
      const postsCollection = collection(db, "posts");
      const postsQuery = query(postsCollection, orderBy("createdAt", "desc"), limit(2)); // Fetch only 2 latest posts

      const querySnapshot = await getDocs(postsQuery);
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLatestPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching latest posts:", error);
      alert("Error fetching latest posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  if (loading) {
    return <LoadingComponents />;
  }

  return (
    <div>
      {/* Latest Section */}
      <section id="latest" className="pt-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-6 animate__animated animate__fadeIn">
            Latest Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Latest Posts */}
            <div className="space-y-8 animate__animated animate__fadeInLeft">
              {latestPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                        Latest
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(post.createdAt.seconds * 1000).toLocaleString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Category: {post.category || "Uncategorized"}
                      </span>
                      <Link
                        to={`/particular-news-article/${post.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Image Carousel Column */}
            <div className="relative my-4 overflow-hidden h-64">
              <div className="flex absolute w-full h-full animate-scroll">
                <img src={img1} alt="Image 1" className="h-64 w-auto rounded-lg mr-4" />
                <img src={img2} alt="Image 2" className="h-64 w-auto rounded-lg mr-4" />
                <img src={img3} alt="Image 3" className="h-64 w-auto rounded-lg mr-4" />
                <img src={img1} alt="Image 4" className="h-64 w-auto rounded-lg mr-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

export default LatestSection;
