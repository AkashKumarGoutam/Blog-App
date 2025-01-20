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
    <div className="p-6 px-12">
      <h2 className="text-xl font-bold my-6">Match Posts List</h2>
      {loading ? (
        <LoadingComponents/>
      ) : matchPosts.length === 0 ? (
        <p className="text-gray-500">No match posts available for this slug.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <img
                src={post.imageUrl || "https://via.placeholder.com/150"}
                alt={post.title}
                className="w-full h-40 object-cover mt-2 rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{post.title || "Untitled"}</h3>
              <p className="text-sm text-gray-600">
                <strong>Author:</strong> {post.author || "Unknown"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date of Post:</strong>{" "}
                {post.dateOfPost
                  ? new Date(post.dateOfPost).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date of Match:</strong>{" "}
                {post.dateOfMatch
                  ? new Date(post.dateOfMatch).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Slug:</strong> {post.slug || "N/A"}
              </p>
              <hr className="my-2" />
              <div
                className="text-sm text-gray-700 mt-2"
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
