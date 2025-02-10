import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase/Firebase"; // Import Firebase config

const StatAnalysis = () => {
  const [articles, setArticles] = useState([]); // Store fetched articles
  const db = getFirestore(app); // Initialize Firestore

  // Function to Fetch Data from Firestore
  const fetchArticles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "statistical articles"));
      const articlesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articlesData);
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  };

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="mt-8 px-32">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Statistical Articles</h2>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} className="p-4 border rounded-lg mb-4 bg-gray-100">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
            <p className="text-sm text-gray-500 mt-2">
              Saved on: {article.timestamp ? new Date(article.timestamp.seconds * 1000).toLocaleString() : "No timestamp"}
            </p>
          </div>
        ))
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default StatAnalysis;
