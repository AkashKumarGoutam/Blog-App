import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { app } from "../../firebase/Firebase"; // Importing app from your unchanged firebase.js file

const db = getFirestore(app);

function AddFlagImageURL() {
  const [flagImageURL, setFlagImageURL] = useState("");
  const [flagImageName, setFlagImageName] = useState("");
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingFlag, setEditingFlag] = useState(null); // Track flag being edited

  // Fetch flags from Firebase
  const fetchFlags = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "flags"));
      const flagsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFlags(flagsData);
    } catch (error) {
      console.error("Error fetching flags:", error);
    }
  };

  // Add a new flag
  const handleAddFlagImageURL = async () => {
    if (!flagImageURL || !flagImageName) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      if (editingFlag) {
        // Update the existing flag
        const flagRef = doc(db, "flags", editingFlag.id);
        await updateDoc(flagRef, {
          name: flagImageName,
          url: flagImageURL,
        });
        alert("Flag updated successfully!");
        setEditingFlag(null);
      } else {
        // Add a new flag
        await addDoc(collection(db, "flags"), {
          name: flagImageName,
          url: flagImageURL,
        });
        alert("Flag added successfully!");
      }

      setFlagImageName("");
      setFlagImageURL("");
      fetchFlags();
    } catch (error) {
      console.error("Error adding/updating flag:", error);
      alert("Failed to add or update flag.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a flag
  const handleDeleteFlag = async (flagId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this flag?");
    if (confirmDelete) {
      try {
        const flagRef = doc(db, "flags", flagId);
        await deleteDoc(flagRef);
        alert("Flag deleted successfully!");
        setFlags((prevFlags) => prevFlags.filter((flag) => flag.id !== flagId));
      } catch (error) {
        console.error("Error deleting flag:", error);
        alert("Failed to delete flag.");
      }
    }
  };

  // Handle edit
  const handleEditFlag = (flag) => {
    setFlagImageURL(flag.url);
    setFlagImageName(flag.name);
    setEditingFlag(flag);
  };

  // Fetch flags on component mount
  useEffect(() => {
    fetchFlags();
  }, []);

  return (
    <div className="flex lg:pt-2 justify-center items-center">
      <div className="flex flex-col border-2 border-gray-300 rounded-xl py-4 px-12">
        <h1 className="text-xl font-semibold flex justify-center underline py-4">
          {editingFlag ? "Edit Flag Image" : "Add Flag Image URL"}
        </h1>
        <input
          id="add-flag-imageURL"
          type="text"
          value={flagImageURL}
          onChange={(e) => setFlagImageURL(e.target.value)}
          className="py-2 px-2 border mb-4"
          placeholder="Enter Flag Image URL"
        />
        <input
          id="add-flag-name"
          type="text"
          value={flagImageName}
          onChange={(e) => setFlagImageName(e.target.value)}
          className="py-2 px-2 border mb-4"
          placeholder="Enter Flag Name"
        />
        <div className="py-4 flex justify-center">
          <button
            className="bg-blue-800 text-white rounded-lg p-3"
            onClick={handleAddFlagImageURL}
            disabled={loading}
          >
            {loading ? (editingFlag ? "Updating..." : "Adding...") : editingFlag ? "Update Flag" : "Add Flag"}
          </button>
        </div>

        <div className="py-2">
          <h1 className="text-xl font-semibold underline">All Flag Image Names</h1>
          <div className="flex flex-wrap gap-2">
            {flags.map((flag) => (
              <div
                key={flag.id}
                className="flex w-72 justify-between items-center border-2 border-gray-200 rounded-lg p-3 mt-2"
              >
                <img src={flag.url} alt={flag.name} className="w-6 h-6 rounded-full" />
                <h1 className="font-semibold">{flag.name}</h1>
                <div className="flex gap-2">
                  <button
                    className="text-sm bg-yellow-500 px-2 py-1 rounded-lg text-white"
                    onClick={() => handleEditFlag(flag)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm bg-red-500 px-2 py-1 rounded-lg text-white"
                    onClick={() => handleDeleteFlag(flag.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFlagImageURL;
