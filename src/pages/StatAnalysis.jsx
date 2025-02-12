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

          // Sort articles by timestamp (most recent first)
      articlesData.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));

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
    <div className="mt-8 lg:px-32">
      <h2 className="text-3xl uppercase font-bold mb-4 underline flex justify-center">Statistical Articles</h2>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} className="p-10 border rounded-lg my-6 bg-gray-100">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
            <p className="text-sm text-gray-500 mt-2">
              Saved on: {article.timestamp ? new Date(article.timestamp.seconds * 1000).toLocaleString() : "No timestamp"}
            </p>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-72">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
      )}
    </div>
  );
};

export default StatAnalysis;
