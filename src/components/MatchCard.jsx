import React from "react";

function MatchCard({ match, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white cursor-pointer text-black rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-[90%] h-60 mx-auto my-6 p-4"
    >
      {/* Match Info */}
      <div className="flex w-64 px-4 justify-between items-center mb-4">
        <div className="flex  items-center gap-2 text-xs">
          <span className="text-red-800 font-medium">{match.date || "N/A"}</span>
          <span className="text-gray-400">|</span>
          <span className="text-yellow-700 font-semibold">
            {match.matchName || "N/A"}
          </span>
          <img
          src="https://crex.live/assets/icon/rightArrow.svg"
          alt="arrow"
          className="w-3 h-3"
        />
        </div>
        
      </div>

      {/* Stadium Info */}
      <h1 className="text-sm text-gray-600 mb-4">{match.stadium || "N/A"}</h1>

      {/* Teams Section */}
      <div className="flex flex-col gap-4">
        {/* Team A */}
        <div className="flex items-center gap-4">
          <img
            src={match.teamAImage || "https://via.placeholder.com/40"}
            alt="Team A"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
          <h1 className="text-sm font-medium">{match.teamA || "Team A"}</h1>
        </div>
        {/* Team B */}
        <div className="flex items-center gap-4">
          <img
            src={match.teamBImage || "https://via.placeholder.com/40"}
            alt="Team B"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
          <h1 className="text-sm font-medium">{match.teamB || "Team B"}</h1>
        </div>
      </div>

      {/* Winning Status */}
      <div className="text-center mt-4">
        <h1 className="text-sm text-green-500 font-semibold">
          {match.winningStatus || "N/A"}
        </h1>
      </div>
    </div>
  );
}

export default MatchCard;
