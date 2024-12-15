import React, { useEffect, useState } from "react";
import { TextareaAutosize, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { app } from "../../firebase/Firebase";

function AddPosts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [value, setValue] = useState('');

  const [author, setAuthor] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const db = getFirestore(app);
        const categoriesCollection = collection(db, "categories");
        const querySnapshot = await getDocs(categoriesCollection);

        const fetchedCategories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Error fetching categories. Please try again.");
      }
    };

    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    if (!title || !description || !author || !imageURL || !category) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);

    try {
      const db = getFirestore(app);
      const postsCollection = collection(db, "posts");

      await addDoc(postsCollection, {
        title,
        description,
        author,
        imageURL,
        category,
        createdAt: new Date(),
      });

      alert("Post added successfully!");
      // Clear fields after successful submission
      setTitle("");
      setDescription("");
      setAuthor("");
      setImageURL("");
      setCategory("");
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Error adding post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex lg:pt-24 flex-col items-center px-4">
      {/* Form Section */}
      <div className="flex flex-col border-2 border-gray-300 rounded-xl py-6 px-8 w-full lg:max-w-lg">
        <h1 className="text-2xl font-semibold text-center underline mb-6">
          Add Posts
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
          {/* <TextareaAutosize
            aria-label="Post description"
            minRows={4}
            placeholder="Description"
            className="w-full border-2 border-gray-300 rounded-lg p-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
          </TextareaAutosize> */}
          <ReactQuill
            theme="snow"
            value={description} 
            onChange={(value) => setDescription(value)} 
            placeholder="Write your content here..."
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
          <div>
            <label htmlFor="category" className="block mb-2">
              Category
            </label>
            <select
              id="category"
              className="w-full border-2 border-gray-300 rounded-lg p-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Adding Post..." : "Add Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPosts;
