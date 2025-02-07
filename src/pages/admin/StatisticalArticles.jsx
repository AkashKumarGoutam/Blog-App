import React, { useState, useEffect } from "react";
import { app } from "../../firebase/Firebase"; // Import app
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore(app);

function StatisticalArticles() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageURL: "",
    winners: [],
  });

  const [articles, setArticles] = useState([]);

  // Fetch data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "StatisticalArticles"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setArticles(data);
    };
    fetchData();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Winners Input
  const handleWinnerChange = (index, field, value) => {
    const updatedWinners = [...formData.winners];
    updatedWinners[index][field] = value;
    setFormData({ ...formData, winners: updatedWinners });
  };

  // Add a New Winner Row
  const addWinnerRow = () => {
    setFormData({
      ...formData,
      winners: [...formData.winners, { year: "", winner: "", runnerUp: "", venue: "" }],
    });
  };

  // Submit Data to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "StatisticalArticles"), formData);
      alert("Article added successfully!");
      setFormData({ title: "", description: "", imageURL: "", winners: [] });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Statistical Article</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <h3 className="text-lg font-semibold">Winners and Runners-Up</h3>
        {formData.winners.map((winner, index) => (
          <div key={index} className="grid grid-cols-4 gap-2">
            <input
              type="text"
              value={winner.year}
              onChange={(e) => handleWinnerChange(index, "year", e.target.value)}
              placeholder="Year"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={winner.winner}
              onChange={(e) => handleWinnerChange(index, "winner", e.target.value)}
              placeholder="Winner"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={winner.runnerUp}
              onChange={(e) => handleWinnerChange(index, "runnerUp", e.target.value)}
              placeholder="Runner-Up"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={winner.venue}
              onChange={(e) => handleWinnerChange(index, "venue", e.target.value)}
              placeholder="Venue"
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addWinnerRow}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add Winner
        </button>

        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          Save Article
        </button>
      </form>

      {/* Display Saved Data */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Saved Articles</h3>
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="border p-4 rounded">
                <h4 className="text-lg font-bold">{article.title}</h4>
                <p>{article.description}</p>
                <img src={article.imageURL} alt={article.title} className="w-40 h-40 mt-2" />
                <h5 className="mt-2 font-semibold">Winners and Runners-Up:</h5>
                <table className="w-full border mt-2">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-1">Year</th>
                      <th className="border p-1">Winner</th>
                      <th className="border p-1">Runner-Up</th>
                      <th className="border p-1">Venue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {article.winners.map((winner, idx) => (
                      <tr key={idx}>
                        <td className="border p-1">{winner.year}</td>
                        <td className="border p-1">{winner.winner}</td>
                        <td className="border p-1">{winner.runnerUp}</td>
                        <td className="border p-1">{winner.venue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatisticalArticles;
