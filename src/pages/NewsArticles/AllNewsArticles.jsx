import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { app } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import LoadingComponents from "../../components/LoadingComponents";

function AllNewsArticles() {
  const [newsArticles, setNewsArticles] = useState([]);
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

      setNewsArticles(fetchedArticles);
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

  if (loading) {
    return (
      <LoadingComponents/>
    );
  }

  const handleGoToParticularNewsArticle = (articleId) => {
    navigate(`/particular-news-article/${articleId}`);
  };

  return (
    <section className="py-20 bg-black text-white hover:shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">All News Articles</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
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
                    {new Date(article.createdAt.seconds * 1000).toLocaleString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                <p className="text-gray-200 mb-4 line-clamp-3">{article.description}</p>
                <button
                  onClick={() => handleGoToParticularNewsArticle(article.id)}
                  className="text-blue-300 font-bold hover:text-white"
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllNewsArticles;
