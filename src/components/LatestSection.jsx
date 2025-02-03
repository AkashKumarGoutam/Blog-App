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
      <section id="latest" className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-gray-400 font-bold mb-6 animate__animated animate__fadeIn">
            Latest Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Latest Posts */}
            <div className="space-y-8 animate__animated animate__fadeInLeft">
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
               <div>
              <Link to="/all_news_articles" className="bg-gray-300 p-2 rounded-lg hover:bg-gray-100 hover:text-blue-800 transition duration-300">See more</Link>
            </div>
            </div>
           

            {/* Image Carousel Column */}
            {/* <div className="relative mb-96 lg:mb-0 l overflow-hidden h-full ">
              <h1 className="flex justify-center text-2xl py-4 font-semibold underline">Highlights</h1>
              <div className="flex absolute w-full h-full animate-scroll">
                <img src={img4} alt="Image 1" className="h-96 w-auto rounded-lg mr-4" />
                <img src={img4} alt="Image 2" className="h-96 w-auto rounded-lg mr-4" />
                <img src={img4} alt="Image 3" className="h-96 w-auto rounded-lg mr-4" />
                <img src={img4} alt="Image 4" className="h-96 w-auto rounded-lg mr-4" />
              </div>
            </div> */}
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
