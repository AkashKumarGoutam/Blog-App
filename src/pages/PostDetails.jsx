import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase/Firebase";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const db = getFirestore(app);
        const postRef = doc(db, "posts", id);
        const postSnapshot = await getDoc(postRef);

        if (postSnapshot.exists()) {
          setPost(postSnapshot.data());
        } else {
          console.error("Post not found");
          alert("Post not found.");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("Error fetching post. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold">Loading post...</h1>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold">Post not found</h1>
      </div>
    );
  }

  return (
    <>
    <div className="p-6 bg-blue-200 h-screen">
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">
        <span className="font-semibold">Author:</span> {post.author}
      </p>
      <p className="text-gray-700 text-lg leading-relaxed mb-6">{post.description}</p>
      {post.imageURL && (
        <div className="w-full flex justify-center mb-6">
          <img
            src={post.imageURL}
            alt="Post"
            className="rounded-lg max-h-96 shadow-md"
          />
        </div>
      )}
      <p className="text-sm text-gray-500">
        <span className="font-semibold">Published on:</span>{" "}
        {new Date(post.createdAt.seconds * 1000).toLocaleString()}
      </p>
    </div></div></>
  );
}

export default PostDetails;
