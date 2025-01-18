import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebase/Firebase";

function Subnavbar({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // State to control mobile menu visibility

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
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu and select category
  const handleCategoryClick = (categoryName) => {
    onCategorySelect(categoryName); // Pass category to parent
    setMenuOpen(false); // Close the menu
  };

  if (loading) {
    return <h1>Loading categories...</h1>;
  }

  return (
    <div className="fixed top-16 lg:top-12 w-full bg-gray-600 text-white">
      {/* Hamburger Menu */}
      <div className="flex justify-between items-center p-4 md:hidden">
        <h2 className="text-lg font-bold">Categories</h2>
        <button onClick={toggleMenu} className="text-2xl focus:outline-none">
          {menuOpen ? <>&#x2715;</> : <>&#9776;</>} {/* X (Close) and ☰ (Menu) */}
        </button>
      </div>

      {/* Categories Menu */}
      <div
        className={`flex flex-col md:flex-row md:justify-center gap-4 p-4 md:p-4 md:static absolute top-16 left-0 w-full bg-gray-600 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.name)} // Close menu on click
              className="hover:text-yellow-300 text-center"
            >
              {category.name}
            </button>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
}

export default Subnavbar;
