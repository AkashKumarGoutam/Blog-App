import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { app } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import LoadingComponents from "../../components/LoadingComponents";

function AllNewsArticles() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all news articles from Firestore
  const fetchNewsArticles = async () => {
    try {
      const db = getFirestore(app);
      const articlesCollection = collection(db, "posts");
      const articlesQuery = query(articlesCollection, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(articlesQuery);
      const fetchedArticles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Extract unique categories from the fetched articles
      const fetchedCategories = [
        "All",
        ...new Set(fetchedArticles.map((article) => article.category || "Uncategorized")),
      ];

      setNewsArticles(fetchedArticles);
      setFilteredArticles(fetchedArticles);
      setCategories(fetchedCategories); // Set categories for the dropdown
    } catch (error) {
      console.error("Error fetching news articles:", error);
      alert("Error fetching news articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsArticles();
  }, []);

  // Handle category selection change
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);

    // Filter articles based on selected category
    if (selected === "All") {
      setFilteredArticles(newsArticles);
    } else {
      const filtered = newsArticles.filter(
        (article) => article.category === selected
      );
      setFilteredArticles(filtered);
    }
  };

  if (loading) {
    return <LoadingComponents />;
  }

  const handleGoToParticularNewsArticle = (articleId) => {
    navigate(`/particular-news-article/${articleId}`);
  };

  return (
    <section className="py-2 bg-black text-white hover:shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-8">All Cricket Articles</h2>

        {/* Dropdown for categories */}
        <div className="mb-6 flex justify-center">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full max-w-md p-3 rounded-lg border-2 border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-gray-900 text-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {article.category || "Uncategorized"}
                    </span>
                    <span className="text-yellow-200 text-xs">
                      {article.createdAt?.seconds
                        ? new Date(article.createdAt.seconds * 1000).toLocaleString()
                        : "Unknown Date"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                  <p
                    className="text-gray-200 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: article.description || "No description available.",
                    }}
                  ></p>
                  <button
                    onClick={() => handleGoToParticularNewsArticle(article.id)}
                    className="text-blue-300 font-bold hover:text-white"
                  >
                    Read More →
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="text-center text-gray-400">No articles found for the selected category.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllNewsArticles;
