import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { app } from '../firebase/Firebase' // Firebase app configuration

function AllMatchCardPage() {
  const [matchCards, setMatchCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const db = getFirestore(app); // Initialize Firestore

  useEffect(() => {
    // Fetch match data from Firestore
    const fetchMatchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "matchcards"));
        const matches = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMatchCards(matches);
      } catch (error) {
        console.error("Error fetching matchcards: ", error);
      }
    };

    fetchMatchCards();
  }, [db]);

  // Filter matches based on the search query
  const filteredMatchCards = matchCards.filter((match) =>
    match.matchName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className='bg-gray-300 '>
        <div className="lg:flex lg:justify-between lg:px-12 px-10 pt-20 py-4">
          <h1 className="font-semibold py-3 underline">All Matches</h1>
          <div className="flex">
            <div className="bg-indigo-600 px-2 lg:py-1 py-3 text-gray-100 flex justify-center items-center">
              <h1>Search</h1>
            </div>
            <input
              placeholder="Search Match like ODI , T20"
              className="border border-gray-300 text-sm lg:px-4 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
          {filteredMatchCards.map((match) => (
            <div
              key={match.id}
              className="bg-white border cursor-pointer text-black rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-[90%] h-60 mx-auto my-6 p-4"
            >
              <Link to={`/match-post/${match.slug}`}>
                {/* Match Info */}
                <div className="flex w-64 px-4 justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-red-800 font-medium">
                      {match.date || "N/A"}
                    </span>
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
                <h1 className="text-sm text-gray-600 mb-4">
                  {match.stadium || "N/A"}
                </h1>

                {/* Teams Section */}
                <div className="flex flex-col gap-4">
                  {/* Team A */}
                  <div className="flex items-center gap-4">
                    <img
                      src={match.teamAImage || "https://via.placeholder.com/40"}
                      alt="Team A"
                      className="w-12 h-12 rounded-full border border-gray-300"
                    />
                    <h1 className="text-sm font-medium">
                      {match.teamA || "Team A"}
                    </h1>
                  </div>
                  {/* Team B */}
                  <div className="flex items-center gap-4">
                    <img
                      src={match.teamBImage || "https://via.placeholder.com/40"}
                      alt="Team B"
                      className="w-12 h-12 rounded-full border border-gray-300"
                    />
                    <h1 className="text-sm font-medium">
                      {match.teamB || "Team B"}
                    </h1>
                  </div>
                </div>

                {/* Winning Status */}
                <div className="text-center mt-4">
                  <h1 className="text-sm text-green-500 font-semibold">
                    {match.winningStatus || "N/A"}
                  </h1>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllMatchCardPage;
