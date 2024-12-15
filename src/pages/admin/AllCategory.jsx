import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { app } from "../../firebase/Firebase"; // Firebase configuration file

function AllCategory() {
  const [categories, setCategories] = useState([]);

  // Fetch categories from Firestore
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

  // Delete category from Firestore
  const handleDeleteCategory = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
      const db = getFirestore(app);
      const categoryDoc = doc(db, "categories", id); // Reference to the document
      await deleteDoc(categoryDoc);

      alert("Category deleted successfully!");
      // Update the state to reflect the deletion
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Error deleting category. Please try again.");
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <h1 className="text-xl lg:pt-24 font-semibold underline">All Category</h1>
      {categories.length > 0 ? (
        categories.map((category) => (
          <div
            key={category.id}
            className="flex justify-between items-center border-2 border-gray-300 rounded-lg p-3 mt-3"
          >
            <h1 className="w-96">{category.name}</h1>
            <Link
              to={`/edit-category/${category.id}`}
              className="bg-black text-white p-2 rounded-sm ml-2 hover:bg-blue-800"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="bg-red-500 text-white p-2 rounded-sm ml-2 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No categories found!</p>
      )}
    </>
  );
}

export default AllCategory;
