import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { app } from "../../firebase/Firebase";

const AddMatchPosts = () => {
  const [matchCards, setMatchCards] = useState([]);
  const [matchPosts, setMatchPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [matchPost, setMatchPost] = useState({
    title: "",
    description: "",
    imageUrl: "",
    author: "",
    dateOfPost: "",
    dateOfMatch: "",
    slug: "",
    matchCardId: "",
  });

  const db = getFirestore(app);

  // Fetch match cards
  useEffect(() => {
    const fetchMatchCards = async () => {
      try {
        const matchCardsCollection = collection(db, "matchcards");
        const matchCardsSnapshot = await getDocs(matchCardsCollection);
        const matchCardsList = matchCardsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMatchCards(matchCardsList);
      } catch (error) {
        console.error("Error fetching match cards:", error);
      }
    };

    fetchMatchCards();
  }, []);

  // Fetch match posts
  useEffect(() => {
    const fetchMatchPosts = async () => {
      try {
        const matchPostsCollection = collection(db, "matchposts");
        const matchPostsSnapshot = await getDocs(matchPostsCollection);
        const matchPostsList = matchPostsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMatchPosts(matchPostsList);
      } catch (error) {
        console.error("Error fetching match posts:", error);
      }
    };

    fetchMatchPosts();
  }, []);

  // Delete match post
  const handleDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "matchposts", postId));
      setMatchPosts(matchPosts.filter((post) => post.id !== postId));
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post. Please try again.");
    }
  };

  // Edit match post
  const handleEditPost = (post) => {
    setMatchPost({
      title: post.title || "",
      description: post.description || "",
      imageUrl: post.imageUrl || "",
      author: post.author || "",
      dateOfPost: post.dateOfPost || "",
      dateOfMatch: post.dateOfMatch || "",
      slug: post.slug || "",
      matchCardId: post.matchCardId || "",
    });
    setCurrentPostId(post.id);
    setIsEditing(true);
  };

  // Save edited post
  const handleSaveEdit = async () => {
    if (!currentPostId) {
      alert("No post selected for editing!");
      return;
    }

    try {
      const postRef = doc(db, "matchposts", currentPostId);
      await updateDoc(postRef, {
        ...matchPost,
        dateOfPost: new Date().toISOString(),
      });

      const updatedPosts = matchPosts.map((post) =>
        post.id === currentPostId ? { ...post, ...matchPost, dateOfPost: new Date().toISOString() } : post
      );

      setMatchPosts(updatedPosts);
      alert("Post updated successfully!");
      setIsEditing(false);
      setMatchPost({
        title: "",
        description: "",
        imageUrl: "",
        author: "",
        dateOfPost: "",
        dateOfMatch: "",
        slug: "",
        matchCardId: "",
      });
      setCurrentPostId(null);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update the post. Please try again.");
    }
  };

  // Add new match post
  const handleAddMatchPost = async () => {
    try {
      if (!matchPost.slug || !matchPost.matchCardId) {
        alert("Please select a match slug.");
        return;
      }

      const matchPostsCollection = collection(db, "matchposts");
      await addDoc(matchPostsCollection, {
        ...matchPost,
        dateOfPost: new Date().toISOString(),
      });

      setMatchPost({
        title: "",
        description: "",
        imageUrl: "",
        author: "",
        dateOfPost: "",
        dateOfMatch: "",
        slug: "",
        matchCardId: "",
      });

      alert("Match post added successfully!");

      const matchPostsSnapshot = await getDocs(matchPostsCollection);
      const matchPostsList = matchPostsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMatchPosts(matchPostsList);
    } catch (error) {
      console.error("Error adding match post:", error);
      alert("Failed to add match post. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Match Stats" : "Add Match Stats"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          placeholder="Title"
          className="border border-gray-300 p-2 rounded-md"
          value={matchPost.title}
          onChange={(e) => setMatchPost({ ...matchPost, title: e.target.value })}
        />
        <ReactQuill
          theme="snow"
          value={matchPost.description}
          onChange={(value) => setMatchPost({ ...matchPost, description: value })}
          placeholder="Write your content here..."
          className="mb-10"
        />
        <input
          placeholder="Image URL"
          className="border border-gray-300 p-2 rounded-md"
          value={matchPost.imageUrl}
          onChange={(e) => setMatchPost({ ...matchPost, imageUrl: e.target.value })}
        />
        <input
          placeholder="Author"
          className="border border-gray-300 p-2 rounded-md"
          value={matchPost.author}
          onChange={(e) => setMatchPost({ ...matchPost, author: e.target.value })}
        />
        <input
          className="border border-gray-300 p-2 rounded-md"
          placeholder="Date of Match"
          type="date"
          value={matchPost.dateOfMatch}
          onChange={(e) => setMatchPost({ ...matchPost, dateOfMatch: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel id="slug-label">Slug</InputLabel>
          <Select
            labelId="slug-label"
            value={matchPost.slug}
            onChange={(e) => {
              const selectedMatch = matchCards.find((match) => match.slug === e.target.value);
              setMatchPost({
                ...matchPost,
                slug: e.target.value,
                matchCardId: selectedMatch ? selectedMatch.id : "",
              });
            }}
          >
            {matchCards.map((match) => (
              <MenuItem key={match.id} value={match.slug}>
                {match.slug}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={isEditing ? handleSaveEdit : handleAddMatchPost}
      >
        {isEditing ? "Save Changes" : "Add Match Stats"}
      </Button>

      <h2 className="text-xl font-bold my-6">Match Posts List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <img src={post.imageUrl} alt={post.title} className="w-full h-40 object-cover mt-2 rounded-md" />
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600">Author: {post.author}</p>
            <p className="text-sm text-gray-600">Date of Post: {new Date(post.dateOfPost).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Date of Match: {new Date(post.dateOfMatch).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Slug: {post.slug}</p>
            <hr />
            <div
              className="text-sm text-gray-700 mt-2"
              dangerouslySetInnerHTML={{ __html: post.description }}
            ></div>
            <div className="flex justify-between items-center mt-4">
              <button
                className="text-sm bg-blue-800 px-2 py-1 rounded-md text-white"
                onClick={() => handleEditPost(post)}
              >
                Edit
              </button>
              <button
                className="text-sm bg-red-600 px-2 py-1 rounded-md text-white"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMatchPosts;
