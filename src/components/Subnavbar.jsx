import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase/Firebase";

function Subnavbar({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <h1>Loading categories...</h1>;
  }

  return (
    <div className="flex justify-center p-4 bg-gray-600 text-white gap-4">
      {categories.length > 0 ? (
        categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.name)}
            className="hover:text-yellow-300"
          >
            {category.name}
          </button>
        ))
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
}

export default Subnavbar;
