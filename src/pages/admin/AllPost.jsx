import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { app } from "../../firebase/Firebase";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const db = getFirestore(app);
        const postsCollection = collection(db, "posts");
        const querySnapshot = await getDocs(postsCollection);

        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert("Error fetching posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle delete post
  const handleDelete = async (postId) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      const db = getFirestore(app);
      const postRef = doc(db, "posts", postId);

      await deleteDoc(postRef);

      // Update state to remove deleted post
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post. Please try again.");
    }
  };

  if (loading) {
    return <h1>Loading posts...</h1>;
  }

  return (
    <>
      <h1 className="text-xl font-semibold underline">All Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="w-[80%] mb-5 hover:border-4 hover:border-black transition duration-300 flex justify-between items-center border-2 border-gray-300 rounded-lg p-3 mt-3"
          >
            <div className="flex flex-col justify-center w-full">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h1 className="font-bold underline">{post.title}</h1>
                  <p className="text-sm py-3">{post.description}</p>
                  {/* Display category */}
                  <p className="text-sm text-gray-500">
                    <strong>Category:</strong> {post.category || "Uncategorized"}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    to={`/edit-post/${post.id}`}
                    className="bg-black text-white p-2 rounded-sm ml-2 hover:bg-blue-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-600 text-white p-2 rounded-sm ml-2 hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex items-center mt-3">
                {post.imageURL && (
                  <img
                    src={post.imageURL}
                    alt="Post"
                    className="rounded-lg max-h-40"
                  />
                )}
              </div>
              <div className="flex justify-between text-xs px-2 mt-3">
                <h1>
                  {new Date(post.createdAt.seconds * 1000).toLocaleString()}
                </h1>
                <h1>Author: {post.author}</h1>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2>No posts available</h2>
      )}
    </>
  );
}

export default AllPost;
