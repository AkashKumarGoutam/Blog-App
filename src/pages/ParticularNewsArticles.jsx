import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase/Firebase'; // Import Firebase configuration
import LoadingComponents from '../components/LoadingComponents';
import { format } from 'date-fns'; // For date formatting

function ParticularNewsArticles() {
  const { id } = useParams(); // Get the dynamic parameter from the URL
  const [article, setArticle] = useState(null); // State to store article data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const db = getFirestore(app); // Initialize Firestore

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const docRef = doc(db, 'posts', id); // Reference to the document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // Check if createdAt exists and convert to JS Date
          if (data.createdAt) {
            data.createdAt = data.createdAt.toDate(); // Convert Firestore Timestamp to JS Date
          }

          setArticle(data); // Set article data
        } else {
          setError('Article not found'); // Handle case when document doesn't exist
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to fetch the article');
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [db, id]);

  if (loading) {
    return <LoadingComponents />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="py-3 font-semibold lg:text-2xl flex justify-center">News Articles</h1>
      <div className="max-w-6xl lg:flex justify-between mx-auto p-6 bg-gray-100 rounded-lg shadow-md my-10">
        <div className="lg:w-96">
          {/* Article Image */}
          <img
            src={article?.imageURL || 'https://via.placeholder.com/600x300'}
            alt={article?.title || 'No Title'}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="w-[60%]">
          {/* Category */}
          <p className="text-black text-sm uppercase font-semibold tracking-wide mb-2">
            Category: {article?.category || 'Uncategorized'}
          </p>

          {/* Title */}
          <h1 className="lg:text-xl font-bold text-gray-800 mb-4 underline">
            {article?.title || 'No Title'}
          </h1>

          {/* Description */}
          <p className="text-gray-600 lg:text-lg mb-6">
            {article?.description || 'No Description Available'}
          </p>

          {/* Author and Date */}
          <div className="flex justify-between items-center text-gray-500 text-sm mb-6">
            <div>
              <strong>Author:</strong> {article?.author || 'Unknown'}
            </div>
            <div>
              <strong>Posted On:</strong>{' '}
              {article?.createdAt
                ? format(article.createdAt, 'dd MMMM, yyyy') // Format date using date-fns
                : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticularNewsArticles;
