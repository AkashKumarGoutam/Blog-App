import React, { useEffect, useState } from "react";
import { TextareaAutosize, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { getFirestore, doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebase/Firebase";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); // State for categories
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPostAndCategories = async () => {
      try {
        const db = getFirestore(app);

        // Fetch Post Data
        const postRef = doc(db, "posts", id);
        const postDoc = await getDoc(postRef);

        if (postDoc.exists()) {
          const postData = postDoc.data();
          setTitle(postData.title);
          setDescription(postData.description);
          setAuthor(postData.author);
          setImageURL(postData.imageURL);
          setCategory(postData.category || ""); // Assuming 'category' field exists
        } else {
          alert("Post not found!");
          navigate("/admin/dashboard/all-posts");
        }

        // Fetch Categories
        const categoriesCollection = collection(db, "categories");
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const fetchedCategories = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data. Please try again.");
      }
    };

    fetchPostAndCategories();
  }, [id, navigate]);

  const handleUpdate = async () => {
    if (!title || !description || !author || !imageURL || !category) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);

    try {
      const db = getFirestore(app);
      const postRef = doc(db, "posts", id);

      await updateDoc(postRef, {
        title,
        description,
        author,
        imageURL,
        category, // Include category in the update
      });

      alert("Post updated successfully!");
      navigate("/admin/dashboard/all-posts");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex pt-24 flex-col items-center px-4">
      {/* Form Section */}
      <div className="flex flex-col border-2 border-gray-300 rounded-xl py-6 px-8 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center underline mb-6">
          Edit Post
        </h1>
        <div className="space-y-4">
          {/* Title Field */}
          <TextField
            id="title"
            label="Title"
            type="text"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Description Field */}
          <TextareaAutosize
            aria-label="Post description"
            minRows={4}
            placeholder="Description"
            className="w-full border-2 border-gray-300 rounded-lg p-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Author Field */}
          <TextField
            id="author"
            label="Author"
            type="text"
            variant="outlined"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          {/* Image URL Field */}
          <TextField
            id="imageURL"
            label="Image URL"
            type="text"
            variant="outlined"
            fullWidth
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />

          {/* Category Dropdown */}
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Updating Post..." : "Update Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
