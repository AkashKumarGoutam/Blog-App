import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase/Firebase"; // Ensure Firebase is configured correctly

function CricketStatisticsHub() {
  const [battingStats, setBattingStats] = useState([]);
  const [bowlingStats, setBowlingStats] = useState([]);
  const [teamRankings, setTeamRankings] = useState([]);
  const [matchName, setMatchName] = useState("");

  const db = getFirestore(app);

  // Fetch data from Firestore
  const fetchStatistics = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cricket statistics hub"));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const latestData = data[0]; // Assuming you're fetching the latest entry

        setMatchName(latestData.matchName || ""); // Fetch and set matchName
        setBattingStats(latestData.battingScore || []);
        setBowlingStats(latestData.bowlingScore || []);
        setTeamRankings(latestData.teamRanking || []);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div className="bg-black py-1 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 animate__animated animate__fadeIn">
        <h2 className="text-3xl font-bold text-white mb-4">
          {matchName || ""} Cricket Statistics Hub
        </h2>
        <p className="text-gray-400">Comprehensive cricket statistics and rankings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Batting Stats */}
        <div className="bg-gray-900 rounded-lg p-6 hover:transform hover:scale-105 transition duration-300 animate__animated animate__fadeInUp">
          <h3 className="text-xl font-semibold text-white mb-4">Batting Stats</h3>
          <div className="space-y-4">
            {battingStats.length > 0 ? (
              battingStats.map((player, index) => (
                <div key={index} className="flex justify-between text-gray-300">
                  <span>{player.playerName}</span>
                  <span className="text-green-500">{player.score}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No batting stats available</p>
            )}
          </div>
        </div>

        {/* Bowling Stats */}
        <div className="bg-gray-900 rounded-lg p-6 hover:transform hover:scale-105 transition duration-300 animate__animated animate__fadeInUp">
          <h3 className="text-xl font-semibold text-white mb-4">Bowling Stats</h3>
          <div className="space-y-4">
            {bowlingStats.length > 0 ? (
              bowlingStats.map((player, index) => (
                <div key={index} className="flex justify-between text-gray-300">
                  <span>{player.playerName}</span>
                  <span className="text-green-500">{player.wicket}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No bowling stats available</p>
            )}
          </div>
        </div>

        {/* Team Rankings */}
        <div className="bg-gray-900 rounded-lg p-6 hover:transform hover:scale-105 transition duration-300 animate__animated animate__fadeInUp">
          <h3 className="text-xl font-semibold text-white mb-4">Team Rankings</h3>
          <div className="space-y-4">
            {teamRankings.length > 0 ? (
              teamRankings.map((team, index) => (
                <div key={index} className="flex justify-between text-gray-300">
                  <span>{team.teamName}</span>
                  <span className="text-green-500">{team.rank}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No team rankings available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CricketStatisticsHub;