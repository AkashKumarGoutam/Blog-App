import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../firebase/Firebase"; // Ensure Firebase is configured correctly

function CreateCricketStatisticsHub() {
  const [battingScore, setBattingScore] = useState([
    { playerName: "", score: "" },
  ]);
  const [bowlingScore, setBowlingScore] = useState([
    { playerName: "", wicket: "" },
  ]);
  const [teamRanking, setTeamRanking] = useState([{ teamName: "", rank: "" }]);
  const [savedData, setSavedData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const db = getFirestore(app);

  // Add or update data in Firebase
  const handleAddData = async () => {
    try {
      const data = { battingScore, bowlingScore, teamRanking };

      if (isEditing && currentEditId) {
        const docRef = doc(db, "cricket statistics hub", currentEditId);
        await updateDoc(docRef, data);
        alert("Data successfully updated!");
        setIsEditing(false);
        setCurrentEditId(null);
      } else {
        await addDoc(collection(db, "cricket statistics hub"), data);
        alert("Data successfully added!");
      }

      setBattingScore([{ playerName: "", score: "" }]);
      setBowlingScore([{ playerName: "", wicket: "" }]);
      setTeamRanking([{ teamName: "", rank: "" }]);
      fetchData();
    } catch (error) {
      console.error("Error adding/updating data: ", error);
      alert("Failed to process data. Please try again.");
    }
  };

  // Fetch data from Firebase
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "cricket statistics hub")
      );
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedData(fetchedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete data from Firebase with confirmation
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!isConfirmed) return;

    try {
      const docRef = doc(db, "cricket statistics hub", id);
      await deleteDoc(docRef);
      alert("Data successfully deleted!");
      fetchData();
    } catch (error) {
      console.error("Error deleting data: ", error);
      alert("Failed to delete data. Please try again.");
    }
  };

  // Edit data
  const handleEdit = (data) => {
    setBattingScore(data.battingScore);
    setBowlingScore(data.bowlingScore);
    setTeamRanking(data.teamRanking);
    setIsEditing(true);
    setCurrentEditId(data.id);
  };

  // Handle input changes
  const handleInputChange = (type, index, field, value) => {
    const updateData = (array) =>
      array.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      );

    if (type === "batting") setBattingScore(updateData(battingScore));
    if (type === "bowling") setBowlingScore(updateData(bowlingScore));
    if (type === "ranking") setTeamRanking(updateData(teamRanking));
  };

  const addRow = (type) => {
    if (type === "batting")
      setBattingScore([...battingScore, { playerName: "", score: "" }]);
    if (type === "bowling")
      setBowlingScore([...bowlingScore, { playerName: "", wicket: "" }]);
    if (type === "ranking")
      setTeamRanking([...teamRanking, { teamName: "", rank: "" }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Cricket Statistics Hub
      </h1>

      {/* Form Sections */}
      <div className="space-y-8">
        {/* Batting Score */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Batting Score</h2>
          {battingScore.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Player Name"
                value={item.playerName}
                onChange={(e) =>
                  handleInputChange(
                    "batting",
                    index,
                    "playerName",
                    e.target.value
                  )
                }
                className="p-2 border rounded w-full"
              />
              <input
                type="number"
                placeholder="Score"
                value={item.score}
                onChange={(e) =>
                  handleInputChange("batting", index, "score", e.target.value)
                }
                className="p-2 border rounded w-full"
              />
            </div>
          ))}
          <button
            onClick={() => addRow("batting")}
            className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Player
          </button>
        </section>

        {/* Bowling Score */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Bowling Score</h2>
          {bowlingScore.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Player Name"
                value={item.playerName}
                onChange={(e) =>
                  handleInputChange(
                    "bowling",
                    index,
                    "playerName",
                    e.target.value
                  )
                }
                className="p-2 border rounded w-full"
              />
              <input
                type="number"
                placeholder="Wickets"
                value={item.wicket}
                onChange={(e) =>
                  handleInputChange("bowling", index, "wicket", e.target.value)
                }
                className="p-2 border rounded w-full"
              />
            </div>
          ))}
          <button
            onClick={() => addRow("bowling")}
            className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Add Player
          </button>
        </section>

        {/* Team Ranking */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Team Ranking</h2>
          {teamRanking.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Team Name"
                value={item.teamName}
                onChange={(e) =>
                  handleInputChange(
                    "ranking",
                    index,
                    "teamName",
                    e.target.value
                  )
                }
                className="p-2 border rounded w-full"
              />
              <input
                type="number"
                placeholder="Rank"
                value={item.rank}
                onChange={(e) =>
                  handleInputChange("ranking", index, "rank", e.target.value)
                }
                className="p-2 border rounded w-full"
              />
            </div>
          ))}
          <button
            onClick={() => addRow("ranking")}
            className="text-white bg-purple-500 px-4 py-2 rounded hover:bg-purple-600"
          >
            Add Team
          </button>
        </section>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleAddData}
        className={`w-full ${
          isEditing
            ? "bg-orange-500 hover:bg-orange-600"
            : "bg-indigo-600 hover:bg-indigo-700"
        } text-white p-3 rounded mb-8 mt-6`}
      >
        {isEditing ? "Update Data" : "Save Data"}
      </button>

      {/* Display Saved Data */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Saved Data</h2>
        {savedData.length === 0 ? (
          <p className="text-gray-500">No data available. Add some records!</p>
        ) : (
          savedData.map((data, index) => (
            <div key={index} className="mb-6 border-b pb-4">
              <h3 className="text-lg font-bold mb-2">Record {index + 1}</h3>

              {/* Batting Score */}
              <div className="mb-4">
                <h4 className="font-semibold text-blue-600">Batting Score:</h4>
                {data.battingScore.map((player, idx) => (
                  <p key={idx} className="text-gray-700">
                    {player.playerName}: {player.score}
                  </p>
                ))}
              </div>

              {/* Bowling Score */}
              <div className="mb-4">
                <h4 className="font-semibold text-green-600">Bowling Score:</h4>
                {data.bowlingScore.map((player, idx) => (
                  <p key={idx} className="text-gray-700">
                    {player.playerName}: {player.wicket}
                  </p>
                ))}
              </div>

              {/* Team Ranking */}
              <div className="mb-4">
                <h4 className="font-semibold text-purple-600">Team Ranking:</h4>
                {data.teamRanking.map((team, idx) => (
                  <p key={idx} className="text-gray-700">
                    {team.teamName}: {team.rank}
                  </p>
                ))}
              </div>

              {/* Edit/Delete Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(data)}
                  className="text-white bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(data.id)}
                  className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default CreateCricketStatisticsHub;
