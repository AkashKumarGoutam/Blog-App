import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { app } from "../firebase/Firebase";
import { Link } from "react-router-dom";
import LoadingComponents from "./LoadingComponents";
import img4 from "../assets/Ads.png";

function LatestSection() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest posts from Firestore
  const fetchLatestPosts = async () => {
    try {
      const db = getFirestore(app);
      const postsCollection = collection(db, "posts");
      const postsQuery = query(postsCollection, orderBy("createdAt", "desc"), limit(3)); // Fetch only 2 latest posts

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
      <section id="latest" className="bg-black pb-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl text-gray-400 font-bold mb-6 text-center animate__animated animate__fadeIn">
      Latest Articles
    </h2>

    <div className="flex flex-col items-center">
      {/* Latest Posts */}
      <div className="w-full md:w-3/4 lg:w-3/4 space-y-8 animate__animated animate__fadeInLeft">
        {latestPosts.map((post) => (
          <article
            key={post.id}
            className="bg-gray-900 text-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Latest
                </span>
                <span className="text-yellow-200 text-sm">
                  {new Date(post.createdAt.seconds * 1000).toLocaleString()}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p
                className="text-gray-200 mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: post.description || "No description available.",
                }}
              ></p>
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
        <div className="flex justify-center">
          <Link
            to="/all_news_articles"
            className="bg-gray-300 p-2 rounded-lg hover:bg-gray-100 hover:text-blue-800 transition duration-300"
          >
            See more
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* <style>
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
      </style> */}
    </div>
  );
}

export default LatestSection;
