import React, { useState, useEffect } from "react";
import { TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { app } from "../../firebase/Firebase"; // Adjust the path based on your project structure

const AddMatchCards = () => {
  const [matches, setMatches] = useState([]);
  const [flags, setFlags] = useState([]);
  const [newMatch, setNewMatch] = useState({
    battleName: "",
    slug: "",
    teamA: "",
    teamAImage: "",
    teamB: "",
    teamBImage: "",
    date: "",
    stadium: "",
    matchName: "",
    winningStatus: "",
  });
  const [editingMatchId, setEditingMatchId] = useState(null); // To track the match being edited

  const db = getFirestore(app);

  // Fetch matches from Firestore
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matchCollection = collection(db, "matchcards");
        const matchSnapshot = await getDocs(matchCollection);
        const matchList = matchSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMatches(matchList);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, [db]);

  // Fetch flags from Firestore
  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const flagsCollection = collection(db, "flags");
        const flagsSnapshot = await getDocs(flagsCollection);
        const flagsList = flagsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFlags(flagsList);
      } catch (error) {
        console.error("Error fetching flags:", error);
      }
    };

    fetchFlags();
  }, [db]);

  // Add or update match in Firestore
  const handleAddOrUpdateMatch = async () => {
    try {
      const matchCollection = collection(db, "matchcards");

      if (editingMatchId) {
        // Update existing match
        const matchDoc = doc(db, "matchcards", editingMatchId);
        await updateDoc(matchDoc, newMatch);
        alert("Match updated successfully!");
      } else {
        // Add new match
        await addDoc(matchCollection, newMatch);
        alert("Match added successfully!");
      }

      // Reset form and state
      setNewMatch({
        battleName: "",
        slug: "",
        teamA: "",
        teamAImage: "",
        teamB: "",
        teamBImage: "",
        date: "",
        stadium: "",
        matchName: "",
        winningStatus: "",
      });
      setEditingMatchId(null);
    } catch (error) {
      console.error("Error adding/updating match:", error);
      alert("Failed to add/update match. Please try again.");
    }
  };

  // Delete match from Firestore
  const handleDeleteMatch = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this match?");
    if (!confirmDelete) return;

    try {
      const matchDoc = doc(db, "matchcards", id);
      await deleteDoc(matchDoc);
      alert("Match deleted successfully!");
      setMatches(matches.filter((match) => match.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting match:", error);
      alert("Failed to delete match. Please try again.");
    }
  };

  // Edit match
  const handleEditMatch = (match) => {
    setNewMatch(match); // Populate the form with match details
    setEditingMatchId(match.id); // Set the ID of the match being edited
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{editingMatchId ? "Edit Match" : "Add a New Match"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Form fields */}
        <TextField
          label="Battle Name"
          value={newMatch.battleName}
          onChange={(e) => setNewMatch({ ...newMatch, battleName: e.target.value })}
          fullWidth
        />
        {/* Other fields */}
        <TextField
          label="Slug"
          value={newMatch.slug}
          onChange={(e) => setNewMatch({ ...newMatch, slug: e.target.value })}
          fullWidth
        />
        {/* Team A and Flag */}
        <TextField
          label="Team A"
          value={newMatch.teamA}
          onChange={(e) => setNewMatch({ ...newMatch, teamA: e.target.value })}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="teamAImage-label">Select Flag for Team A</InputLabel>
          <Select
            labelId="teamAImage-label"
            value={newMatch.teamAImage}
            onChange={(e) => setNewMatch({ ...newMatch, teamAImage: e.target.value })}
          >
            {flags.map((flag) => (
              <MenuItem key={flag.id} value={flag.url}>
                {flag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Team B and Flag */}
        <TextField
          label="Team B"
          value={newMatch.teamB}
          onChange={(e) => setNewMatch({ ...newMatch, teamB: e.target.value })}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="teamBImage-label">Select Flag for Team B</InputLabel>
          <Select
            labelId="teamBImage-label"
            value={newMatch.teamBImage}
            onChange={(e) => setNewMatch({ ...newMatch, teamBImage: e.target.value })}
          >
            {flags.map((flag) => (
              <MenuItem key={flag.id} value={flag.url}>
                {flag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Additional fields */}
        <TextField
          label="Date"
          type="date"
          value={newMatch.date}
          onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Stadium"
          value={newMatch.stadium}
          onChange={(e) => setNewMatch({ ...newMatch, stadium: e.target.value })}
          fullWidth
        />
        <TextField
          label="Match Name like ODI, T20"
          value={newMatch.matchName}
          onChange={(e) => setNewMatch({ ...newMatch, matchName: e.target.value })}
          fullWidth
        />
        <TextField
          label="Winning Status"
          value={newMatch.winningStatus}
          onChange={(e) => setNewMatch({ ...newMatch, winningStatus: e.target.value })}
          fullWidth
        />
      </div>
      <button
        onClick={handleAddOrUpdateMatch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {editingMatchId ? "Update Match" : "Add Match"}
      </button>

      <h2 className="text-xl font-bold my-6">Match List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-semibold">{match.battleName}</h3>
            <p className="text-sm text-gray-600">{match.stadium}</p>
            <p className="text-sm text-gray-600">{match.date}</p>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                <img
                  src={match.teamAImage}
                  alt={match.teamA}
                  className="w-10 h-10 rounded-full"
                />
                <span className="ml-2">{match.teamA}</span>
              </div>
              <div className="flex items-center">
                <img
                  src={match.teamBImage}
                  alt={match.teamB}
                  className="w-10 h-10 rounded-full"
                />
                <span className="ml-2">{match.teamB}</span>
              </div>
            </div>
            <p className="text-sm font-semibold mt-2">
              {match.winningStatus || "Status not available"}
            </p>
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => handleEditMatch(match)}
                className="text-sm bg-blue-500 px-2 py-1 rounded-lg text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteMatch(match.id)}
                className="text-sm bg-red-500 px-2 py-1 rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMatchCards;
