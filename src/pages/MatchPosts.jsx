import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { app } from "../firebase/Firebase"; // Import your Firebase app configuration
import LoadingComponents from "../components/LoadingComponents";

function MatchPosts() {
  const { slug } = useParams(); // Extract slug from route params
  const [matchPosts, setMatchPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const db = getFirestore(app);

  useEffect(() => {
    const fetchMatchPosts = async () => {
      try {
        const postsRef = collection(db, "matchposts");
        const q = query(postsRef, where("slug", "==", slug)); // Filter posts by slug
        const querySnapshot = await getDocs(q);

        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMatchPosts(posts);
      } catch (error) {
        console.error("Error fetching matchposts: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchMatchPosts();
  }, [db, slug]);

  return (
    <div className="bg-black text-white p-6 lg:px-12">
      <h2 className="text-3xl font-bold my-2 flex justify-center">Match Stats</h2>
      {loading ? (
        <LoadingComponents/>
      ) : matchPosts.length === 0 ? (
        <p className="text-gray-500">No match posts available for this slug.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 text-gray-200 shadow-md rounded-lg p-4 border border-gray-200"
            >
              <img
                src={post.imageUrl || "https://via.placeholder.com/150"}
                alt={post.title}
                className="w-full h-48 object-cover mt-2 rounded-md"
              />
              <h3 className="text-lg text-white font-semibold mt-2">{post.title || "Untitled"}</h3>
              <p className="text-xs text-gray-100">
                <strong className="text-yellow-200">Author:</strong> {post.author || "Unknown"}
              </p>
              <p className="text-xs text-gray-100">
                <strong className="text-yellow-200">Date of Post:</strong>{" "}
                {post.dateOfPost
                  ? new Date(post.dateOfPost).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-xs text-gray-100">
                <strong className="text-yellow-200">Date of Match:</strong>{" "}
                {post.dateOfMatch
                  ? new Date(post.dateOfMatch).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-xs text-gray-100">
                <strong className="text-yellow-200">Slug:</strong> {post.slug || "N/A"}
              </p>
              <hr className="my-2" />
              <div
                className="text-sm bg-gray-3 text-gray-100 mt-2"
                dangerouslySetInnerHTML={{
                  __html: post.description || "No description available.",
                }}
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MatchPosts;
