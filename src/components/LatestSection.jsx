import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { app } from "../firebase/Firebase";
import { Link } from "react-router-dom";
import LoadingComponents from "./LoadingComponents";

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
    return (
      <LoadingComponents/>
    );
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
                    <div>
                      {/* <img
                        src={post.imageURL}
                        alt="Post"
                        className="rounded-lg max-h-40 mb-4 w-full"
                      /> */}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500">
                          Category : {post.category || "Uncategorized"}
                        </span>
                      </div>
                      <Link to={`/particular-news-article/${post.id}`} className="text-blue-600 hover:text-blue-800">Read More →</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Live Updates Column */}
            <div className="animate__animated animate__fadeInRight">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6">Live Updates</h3>

                <div className="space-y-4">
                  {/* Live Update Item */}
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-red-600">LIVE</span>
                      <span className="text-xs text-gray-500">Updated now</span>
                    </div>
                    <p className="font-medium">IND vs AUS - Test Match Day 3</p>
                    <div className="mt-2 text-sm text-gray-600">
                      Latest bowling figures: 5/45 (15 overs)
                    </div>
                  </div>

                  {/* Recent Stats Updates */}
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Batting Milestone</h4>
                      <p className="text-sm text-gray-600">
                        Player reaches 10,000 ODI runs
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">Team Record</h4>
                      <p className="text-sm text-gray-600">
                        Highest T20 partnership record set
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold">Rankings Update</h4>
                      <p className="text-sm text-gray-600">
                        New World No.1 Test Bowler
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    View All Updates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LatestSection;
