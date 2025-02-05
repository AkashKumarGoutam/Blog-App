import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase/Firebase"; // Firebase app configuration
import LoadingComponents from "../components/LoadingComponents";

function AllMatchCardPage() {
  const [matchCards, setMatchCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchMatchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "matchcards"));
        const matches = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort matches by date (recent date first)
        const sortedMatches = matches.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setMatchCards(sortedMatches);
      } catch (error) {
        console.error("Error fetching matchcards: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchCards();
  }, [db]);

  // Filter matches based on the selected date
  const filteredMatchCards = matchCards.filter((match) =>
    match.date?.includes(searchQuery)
  );

  if (loading) {
    return <LoadingComponents />;
  }

   // Format date to dd/mm/yyyy
   const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // "en-GB" gives dd/mm/yyyy format
  };

  return (
    <>
      <div className="bg-black text-white">
        <div className="lg:flex lg:justify-between lg:px-12 px-10 py-6">
          <h1 className="font-semibold py-3 lg:text-3xl">All Matches</h1>
          <div className="flex">
            <div className="bg-indigo-600 px-2 lg:py-1 py-3 text-gray-100 flex justify-center items-center">
              <h1>Search</h1>
            </div>
            <input
              type="date"
              className="text-black border border-gray-300 text-sm lg:px-4 w-64"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value); // Update search query
                e.target.blur(); // Close the calendar after selecting a date
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
          {filteredMatchCards.length > 0 ? (
            filteredMatchCards.map((match) => (
              <div
                key={match.id}
                className="bg-gray-900 text-white hover:shadow-gray-600 cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-[90%] h-58 mx-auto my-2 p-2"
              >
                <Link to={`/match-post/${match.slug}`}>
                  <h1 className="font-semibold">{match.battleName}</h1>
                  <div className="flex w-64 justify-between items-center mb-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-yellow-200 font-medium">
                      {formatDate(match.date)}
                      </span>
                      <span className="text-gray-400">|</span>
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
                  <h1 className="text-sm text-gray-200 mb-1">
                    {match.stadium || "N/A"}
                  </h1>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          match.teamAImage || "https://via.placeholder.com/40"
                        }
                        alt="Team A"
                        className="w-8 h-8 rounded-full border border-gray-300"
                      />
                      <h1 className="text-sm font-medium">
                        {match.teamA || "Team A"}
                      </h1>
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          match.teamBImage || "https://via.placeholder.com/40"
                        }
                        alt="Team B"
                        className="w-8 h-8 rounded-full border border-gray-300"
                      />
                      <h1 className="text-sm font-medium">
                        {match.teamB || "Team B"}
                      </h1>
                    </div>
                  </div>
                  <div className="text-end mt-2">
                    <h1
                      className={`text-xs font-semibold ${
                        match.winningStatus === "Live"
                          ? "text-red-500 animate-pulse"
                          : "text-green-500"
                      }`}
                    >
                      {match.winningStatus || "N/A"}
                    </h1>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-4">
              <h1>No matches found for the selected date.</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AllMatchCardPage;
