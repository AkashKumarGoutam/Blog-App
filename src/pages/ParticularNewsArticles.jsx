import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase/Firebase'; // Import Firebase configuration
import LoadingComponents from '../components/LoadingComponents';
import { format } from 'date-fns'; // For date formatting
import adsImage from "../assets/Stump Stat-9.png"

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
    <div className='lg:flex lg:gap-8 bg-black text-white p-12'>
      <div>
      <h1 className="py-3 font-semibold lg:text-2xl flex justify-center">News Articles</h1>
      <div className="max-w-3xl bg-gray-900 lg:flex flex-col gap-6 items-center justify-between mx-auto p-2 text-white rounded-lg shadow-md my-">
        <div className="">
          {/* Article Image */}
          <img
            src={article?.imageURL || 'https://via.placeholder.com/600x300'}
            alt={article?.title || 'No Title'}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="">
          {/* Category */}
          <p className="text-blue-700 text-sm uppercase font-semibold tracking-wide mb-2">
            Category: {article?.category || 'Uncategorized'}
          </p>

          {/* Title */}
          <h1 className="lg:text-xl font-bold text-gray-200 mb-4 underline">
            {article?.title || 'No Title'}
          </h1>

          {/* Description */}
          <p className="text-gray-300 lg:text-lg mb-6">
            {article?.description || 'No Description Available'}
          </p>

          {/* Author and Date */}
          <div className="flex justify-between items-center text-yellow-200 text-sm mb-6">
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
    <div className='pt-32 lg:w-[30%] flex justify-center'>
        <img src={adsImage}/>
      </div>
    </div>
  );
}

export default ParticularNewsArticles;
