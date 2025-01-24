import React, { useState, useEffect } from "react";
import MatchCard from "./MatchCard";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";

function AllMatches() {
  const [matchCards, setMatchCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore(app);

  useEffect(() => {
    const fetchMatchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "matchcards"));
        const matches = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort by date (ascending)
        const sortedMatches = matches.sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );

        setMatchCards(sortedMatches);
      } catch (error) {
        console.error("Error fetching matchcards: ", error);
      }
    };

    fetchMatchCards();
  }, [db]);

  useEffect(() => {
    const updateView = () => {
      setIsMobile(window.innerWidth < 768); // Mobile view if screen width < 768px
      if (window.innerWidth < 640) {
        setCardsToShow(3);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(3);
      } else if (window.innerWidth < 1280) {
        setCardsToShow(4);
      } else {
        setCardsToShow(4);
      }
    };

    updateView();
    window.addEventListener("resize", updateView);

    return () => window.removeEventListener("resize", updateView);
  }, []);

  const handleNext = () => {
    if (currentIndex + cardsToShow < matchCards.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCardClick = (matchSlug) => {
    navigate(`/match-post/${matchSlug}`);
  };

  return (
    <div className="bg-black py-2">
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Card container */}
        <div
          className={`lg:flex overflow-hidden ${
            isMobile ? "overflow-x-auto whitespace-nowrap scrollbar-hide" : ""
          }`}
        >
          <div
            className={`flex transition-transform duration-300 ease-in-out ${
              isMobile ? "" : "relative"
            }`}
            style={
              isMobile
                ? {}
                : { transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }
            }
          >
            {matchCards.map((match) => (
              <div
                key={match.id}
                style={{ flex: `0 0 ${100 / cardsToShow}%` }}
                className={`px-5 lg:px-0 ${
                  isMobile ? "inline-block w-[calc(100%-10px)]" : ""
                }`}
              >
                <MatchCard
                  match={match}
                  onClick={() => handleCardClick(match.slug)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons for larger screens */}
        {!isMobile && (
          <>
            <button
              className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-full shadow-md focus:outline-none ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              &larr;
            </button>
            <button
              className={`absolute top-1/2 right-1 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-full shadow-md focus:outline-none ${
                currentIndex + cardsToShow >= matchCards.length
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleNext}
              disabled={currentIndex + cardsToShow >= matchCards.length}
            >
              &rarr;
            </button>
          </>
        )}

        {/* Indicators */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.max(matchCards.length - cardsToShow + 1, 0) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 mx-1 rounded-full ${
                  currentIndex === index
                    ? "bg-gray-200"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              ></button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default AllMatches;
