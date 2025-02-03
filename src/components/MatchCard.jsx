import React from "react";

function MatchCard({ match, onClick }) {
  // Format date to dd/mm/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // "en-GB" gives dd/mm/yyyy format
  };

  return (
    <div
      onClick={onClick}
      className="bg-gray-900 cursor-pointer text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-[97%] h-44 mx-auto p-4"
    >
      {/* Match Info */}
      <div className="flex w-48 justify-between items-center mb-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-yellow-200 font-medium">
            {formatDate(match.date)}
          </span>
          <span className="text-gray-100">|</span>
          <span className="text-yellow-200 font-semibold">
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
      <h1 className="text-sm text-gray-100 mb-4">{match.stadium || "N/A"}</h1>

      {/* Teams Section */}
      <div className="flex flex-col gap-2">
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
      <div className="text-end mt-2">
        <h1
          className={`text-xs ${
            match.winningStatus === "Live"
              ? "text-red-500 animate-pulse"
              : "text-green-500"
          }`}
        >
          {match.winningStatus || "N/A"}
        </h1>
      </div>
    </div>
  );
}

export default MatchCard;
