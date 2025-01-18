import React, { useState, useEffect } from "react";
import MatchCard from "./MatchCard";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase/Firebase"; // Import your Firebase app
import { useNavigate } from "react-router-dom";

function AllMatches() {
  const [matchCards, setMatchCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
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
        setMatchCards(matches);
      } catch (error) {
        console.error("Error fetching matchcards: ", error);
      }
    };

    fetchMatchCards();
  }, [db]);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else if (window.innerWidth < 1280) {
        setCardsToShow(3);
      } else {
        setCardsToShow(4);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);

    return () => window.removeEventListener("resize", updateCardsToShow);
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
        <div className="lg:flex overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            }}
          >
            {matchCards.map((match) => (
              <div
                key={match.id}
                style={{ flex: `0 0 ${100 / cardsToShow}%` }}
                className="px-5 lg:px-0"
              >
                <MatchCard
                  match={match}
                  onClick={() => handleCardClick(match.slug)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full shadow-md focus:outline-none ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          &larr;
        </button>
        <button
          className={`absolute top-1/2 right-1 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full shadow-md focus:outline-none ${
            currentIndex + cardsToShow >= matchCards.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={handleNext}
          disabled={currentIndex + cardsToShow >= matchCards.length}
        >
          &rarr;
        </button>

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
