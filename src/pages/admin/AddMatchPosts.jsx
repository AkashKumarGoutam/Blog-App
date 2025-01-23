import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "../../firebase/Firebase";

const AddMatchPosts = () => {
  const [matchCards, setMatchCards] = useState([]);
  const [matchPosts, setMatchPosts] = useState([]);
  const [flags, setFlags] = useState([]);
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
  }, [db]);

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
  }, [db]);

  // Fetch flags
  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const flagsCollection = collection(db, "flags");
        const flagsSnapshot = await getDocs(flagsCollection);
        const flagsList = flagsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFlags(flagsList);
      } catch (error) {
        console.error("Error fetching flags:", error);
      }
    };

    fetchFlags();
  }, [db]);

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
      <h2 className="text-xl font-bold mb-4">Add Match Post</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <TextField
          label="Title"
          value={matchPost.title}
          onChange={(e) => setMatchPost({ ...matchPost, title: e.target.value })}
          fullWidth
        />
        <ReactQuill
          theme="snow"
          value={matchPost.description}
          onChange={(value) => setMatchPost({ ...matchPost, description: value })}
          placeholder="Write your content here..."
          className="mb-10"
        />
        <FormControl fullWidth>
          <InputLabel id="flag-label">Select Flag</InputLabel>
          <Select
            labelId="flag-label"
            value={matchPost.imageUrl}
            onChange={(e) => setMatchPost({ ...matchPost, imageUrl: e.target.value })}
          >
            {flags.map((flag) => (
              <MenuItem key={flag.id} value={flag.url}>
                {flag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Author"
          value={matchPost.author}
          onChange={(e) => setMatchPost({ ...matchPost, author: e.target.value })}
          fullWidth
        />
        <TextField
          label="Date of Match"
          type="date"
          value={matchPost.dateOfMatch}
          onChange={(e) => setMatchPost({ ...matchPost, dateOfMatch: e.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
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
      <Button variant="contained" color="primary" onClick={handleAddMatchPost}>
        Add Match Post
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
            <div className="flex justify-between items-center">
            <button className="text-sm bg-blue-800 px-2 py-1 rounded-lg text-white">Edit</button>
            <button className="text-sm bg-red-500 px-2 py-1 rounded-lg text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMatchPosts;
