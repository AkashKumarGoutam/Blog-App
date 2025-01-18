import React from "react";

function MatchScorePage() {
  const matchDetails = {
    teams: { team1: "India", team2: "Australia" },
    venue: "Arun Jaitley Stadium, Delhi",
    date: "2025-01-14",
    result: "India won by 5 wickets",
    overs: "20 overs",
    batting: [
      { name: "Virat Kohli", runs: 85, balls: 50 },
      { name: "Rohit Sharma", runs: 45, balls: 30 },
      { name: "KL Rahul", runs: 10, balls: 15 },
    ],
    bowling: [
      { name: "Pat Cummins", overs: 4, runs: 30, wickets: 2 },
      { name: "Mitchell Starc", overs: 4, runs: 25, wickets: 3 },
      { name: "Adam Zampa", overs: 4, runs: 40, wickets: 1 },
    ],
  };

  const { teams, venue, date, result, overs, batting, bowling } = matchDetails;

  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Match Header */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 text-center">
          <h1 className="text-2xl font-bold">
            {teams.team1} vs {teams.team2}
          </h1>
          <p className="text-gray-600">{venue}, {date}</p>
          <p className="text-green-600 font-semibold mt-2">{result}</p>
        </div>

        {/* Match Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Batting Details */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Batting</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4">Player</th>
                  <th className="py-2 px-4">Runs</th>
                  <th className="py-2 px-4">Balls</th>
                  <th className="py-2 px-4">Strike Rate</th>
                </tr>
              </thead>
              <tbody>
                {batting.map((player, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{player.name}</td>
                    <td className="py-2 px-4">{player.runs}</td>
                    <td className="py-2 px-4">{player.balls}</td>
                    <td className="py-2 px-4">
                      {((player.runs / player.balls) * 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bowling Details */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Bowling</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4">Bowler</th>
                  <th className="py-2 px-4">Overs</th>
                  <th className="py-2 px-4">Runs</th>
                  <th className="py-2 px-4">Wickets</th>
                </tr>
              </thead>
              <tbody>
                {bowling.map((player, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{player.name}</td>
                    <td className="py-2 px-4">{player.overs}</td>
                    <td className="py-2 px-4">{player.runs}</td>
                    <td className="py-2 px-4">{player.wickets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Overs Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-xl font-bold mb-4">Overs Summary</h2>
          <p className="text-gray-600">
            {overs} played. Match ongoing with exciting moments!
          </p>
        </div>
      </div>
    </div>
  );
}

export default MatchScorePage;
