import React, { useState, useEffect } from "react";
import { TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "../../firebase/Firebase"; // Adjust the path based on your project structure

const AddMatchCards = () => {
  const [matches, setMatches] = useState([]);
  const [flags, setFlags] = useState([]); // To store flag names and URLs
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

  // Add new match to Firestore
  const handleAddMatch = async () => {
    try {
      const matchCollection = collection(db, "matchcards");

      // Add new match to "matchcards" collection
      await addDoc(matchCollection, newMatch);

      // Reset form
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

      alert("Match added successfully!");
    } catch (error) {
      console.error("Error adding match:", error);
      alert("Failed to add match. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add a New Match</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <TextField
          label="Battle Name"
          value={newMatch.battleName}
          onChange={(e) => setNewMatch({ ...newMatch, battleName: e.target.value })}
          fullWidth
        />
        <TextField
          label="Slug"
          value={newMatch.slug}
          onChange={(e) => setNewMatch({ ...newMatch, slug: e.target.value })}
          fullWidth
        />
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
          label="Match Name like ODI , T20"
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
        onClick={handleAddMatch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Match
      </button>

      <h2 className="text-xl font-bold my-6">Match List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-semibold">{match.matchTitle}</h3>
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
            <p className="text-sm text-gray-700 mt-2">{match.matchName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMatchCards;
