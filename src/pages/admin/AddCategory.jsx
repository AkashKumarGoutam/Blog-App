import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "../../firebase/Firebase"; // Import Firebase configuration

function AddCategory() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app); // Initialize Firestore

  // Fetch Categories from Firestore
  const fetchCategories = async () => {
    try {
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

  // Add Category to Firestore
  const handleAddCategory = async () => {
    if (!category) {
      alert("Please enter a category!");
      return;
    }

    setLoading(true);

    try {
      const categoriesCollection = collection(db, "categories");
      await addDoc(categoriesCollection, {
        name: category,
        createdAt: new Date(),
      });

      alert("Category added successfully!");
      setCategory(""); // Clear input after successful submission
      fetchCategories(); // Refresh categories
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex lg:pt-24 justify-center items-center ">
      <div className="flex flex-col border-2 border-gray-300 rounded-xl py-4 px-12">
        <h1 className="text-xl font-semibold flex justify-center underline py-4">
          Add Category
        </h1>
        <input
          id="add-category"
          label="Add Category"
          type="text"
          variant="outlined"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="py-2 px-2 border"
          placeholder="enter category"
        />
        <div className="py-4 flex justify-center">
          <button
            className="bg-blue-800 text-white rounded-lg p-3"
            onClick={handleAddCategory}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </div>

        {/* Displaying categories dynamically */}
        <div className="py-24">
          <h1 className="text-xl font-semibold underline">
            All Categories
          </h1>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="border-2 border-gray-200 rounded-lg p-3 mt-2"
            >
              <h1>&rarr; {cat.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
