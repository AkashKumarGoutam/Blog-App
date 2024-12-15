import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs, deleteDoc, doc, query, orderBy, limit, startAfter } from "firebase/firestore";
import { app } from "../firebase/Firebase";
import Subnavbar from "../components/Subnavbar";

function Client() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const POSTS_LIMIT = 6; // Number of posts to fetch per page

  // Fetch posts from Firestore
  const fetchPosts = async (isInitialLoad = false) => {
    try {
      const db = getFirestore(app);
      const postsCollection = collection(db, "posts");

      let postsQuery;
      if (isInitialLoad || !lastVisible) {
        postsQuery = query(postsCollection, orderBy("createdAt", "desc"), limit(POSTS_LIMIT));
      } else {
        postsQuery = query(postsCollection, orderBy("createdAt", "desc"), startAfter(lastVisible), limit(POSTS_LIMIT));
      }

      const querySnapshot = await getDocs(postsQuery);
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts((prevPosts) => (isInitialLoad ? fetchedPosts : [...prevPosts, ...fetchedPosts]));
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === POSTS_LIMIT);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Error fetching posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial posts on component mount
  useEffect(() => {
    fetchPosts(true);
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
    <Subnavbar/>
      <div className="flex justify-center">
        <div className="p-6 lg:pt-32 pt-40 lg:w-[40%] max-w-3xl">
          <h1 className="text-xl font-semibold underline text-center mb-6">All Posts</h1>
          <div className="flex flex-col space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  to={`/post/${post.id}`}
                  key={post.id}
                  className="w-full border-2 border-gray-300 rounded-lg p-4 hover:border-black transition duration-300"
                >
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg underline mb-2">{post.title}</h1>
                    <p className="text-sm mb-2">{post.description}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      <strong>Category:</strong> {post.category || "Uncategorized"}
                    </p>
                    {post.imageURL && (
                      <img
                        src={post.imageURL}
                        alt="Post"
                        className="rounded-lg max-h-40 mb-4"
                      />
                    )}
                    <div className="flex justify-between w-full text-xs text-gray-600">
                      <span>{new Date(post.createdAt.seconds * 1000).toLocaleString()}</span>
                      <span>Author: {post.author}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h2>No posts available</h2>
            )}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => fetchPosts()}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-800"
              >
                See More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Client;