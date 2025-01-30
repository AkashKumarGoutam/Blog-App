import React from "react";

const StatAnalysis = () => {
  // Example data
  const matchDetails = {
    teamA: "India",
    teamB: "Australia",
    venue: "Wankhede Stadium",
    date: "2025-01-21",
    result: "India won by 5 wickets",
  };

  const playerStats = [
    { name: "Virat Kohli", runs: 85, wickets: 0 },
    { name: "Jasprit Bumrah", runs: 15, wickets: 3 },
    { name: "Rohit Sharma", runs: 70, wickets: 0 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Cricket Match Statistical Articles
      </h1>

      {/* Match Details */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-700 mb-2">Match Details</h2>
        <p className="text-gray-600">Teams: {matchDetails.teamA} vs {matchDetails.teamB}</p>
        <p className="text-gray-600">Venue: {matchDetails.venue}</p>
        <p className="text-gray-600">Date: {matchDetails.date}</p>
        <p className="text-gray-600">Result: {matchDetails.result}</p>
      </div>

      {/* Player Stats */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-700 mb-2">Player Stats</h2>
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2">Player</th>
              <th className="border px-4 py-2">Runs</th>
              <th className="border px-4 py-2">Wickets</th>
            </tr>
          </thead>
          <tbody>
            {playerStats.map((player, index) => (
              <tr key={index} className="text-gray-600">
                <td className="border px-4 py-2">{player.name}</td>
                <td className="border px-4 py-2">{player.runs}</td>
                <td className="border px-4 py-2">{player.wickets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar Chart (Basic Visualization) */}
      <div>
        <h2 className="text-lg font-bold text-gray-700 mb-2">Runs Chart</h2>
        <div className="flex space-x-4">
          {playerStats.map((player, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="bg-blue-500 w-8"
                style={{ height: `${player.runs * 2}px` }}
                title={`Runs: ${player.runs}`}
              ></div>
              <span className="text-sm mt-2 text-gray-600">{player.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatAnalysis;
