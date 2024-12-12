import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../../firebase/Firebase"; // Firebase configuration file

function EditCategory() {
  const { id } = useParams(); // Get category ID from URL
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch category details by ID
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const db = getFirestore(app);
        const categoryDoc = doc(db, "categories", id);
        const categorySnap = await getDoc(categoryDoc);

        if (categorySnap.exists()) {
          const categoryData = categorySnap.data();
          setName(categoryData.name);
        } else {
          alert("Category not found!");
          navigate("/all-category");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        alert("Error fetching category. Please try again.");
      }
    };

    fetchCategory();
  }, [id, navigate]);

  // Handle category update
  const handleUpdate = async () => {
    if (!name) {
      alert("Category name cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      const db = getFirestore(app);
      const categoryDoc = doc(db, "categories", id);

      await updateDoc(categoryDoc, {
        name,
      });

      alert("Category updated successfully!");
      navigate("/admin/dashboard/all-category");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Error updating category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4">
      <div className="flex flex-col border-2 border-gray-300 rounded-xl py-6 px-8 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center underline mb-6">
          Edit Category
        </h1>
        <div className="space-y-4">
          {/* Category Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            className="border-2 border-gray-300 rounded-lg p-3 w-full"
          />
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
