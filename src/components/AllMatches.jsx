import React, { useState, useEffect } from "react";
import { logAnalyticsEvent } from "../firebase/Firebase";
import MatchCard from "./MatchCard";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import CardSimmerEffect from "./CardSimmerEffect";

function AllMatches() {
  const [matchCards, setMatchCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore(app);

  // Track component load event
  useEffect(() => {
    logAnalyticsEvent("all_matches_loaded", { status: "Component Mounted" });

    const fetchMatchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "matchcards"));
        const matches = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sortedMatches = matches.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setMatchCards(sortedMatches.slice(0, 10)); // Limit to 10 matches

        // Log event when match data is successfully fetched
        logAnalyticsEvent("match_data_fetched", {
          count: sortedMatches.length,
        });
      } catch (error) {
        console.error("Error fetching matchcards: ", error);
        logAnalyticsEvent("match_data_fetch_error", { error: error.message });
      }
    };

    fetchMatchCards();
  }, [db]);

  useEffect(() => {
    const updateView = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 640) {
        setCardsToShow(2);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(4);
      } else if (window.innerWidth < 1280) {
        setCardsToShow(5);
      } else {
        setCardsToShow(5);
      }
    };

    updateView();
    window.addEventListener("resize", updateView);

    return () => window.removeEventListener("resize", updateView);
  }, []);

  const handleNext = () => {
    if (currentIndex + cardsToShow < matchCards.length) {
      setCurrentIndex(currentIndex + 1);
      logAnalyticsEvent("next_button_clicked", {
        current_index: currentIndex,
        new_index: currentIndex + 1,
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      logAnalyticsEvent("prev_button_clicked", {
        current_index: currentIndex,
        new_index: currentIndex - 1,
      });
    }
  };

  const handleCardClick = (matchSlug) => {
    logAnalyticsEvent("match_card_clicked", { match_slug: matchSlug });
    // alert("Opening match stats!");
    navigate(`/match-post/${matchSlug}`);
  };

  return (
    <div className="bg-black py-2">
      {matchCards.length === 0 ? (
        <CardSimmerEffect />
      ) : (
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Card Container */}
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
                  className={`px-1 lg:px-0 ${
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

          {/* Navigation */}
          {!isMobile && (
            <>
              <button
                className={`absolute top-1/2 -left-4 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-full shadow-md focus:outline-none ${
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
        </div>
      )}
    </div>
  );
}

export default AllMatches;
