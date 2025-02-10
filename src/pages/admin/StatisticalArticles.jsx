import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { 
  getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc 
} from "firebase/firestore";
import { app } from "../../firebase/Firebase"; // Import Firebase config

const db = getFirestore(app); // Initialize Firestore

function StatisticalArticles() {
  const [description, setDescription] = useState("");
  const [articles, setArticles] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSaveToFirebase = async () => {
    try {
      if (editId) {
        const articleRef = doc(db, "articles", editId);
        await updateDoc(articleRef, { content: description });
        alert("Document successfully updated!");
        setEditId(null);
      } else {
        const docRef = await addDoc(collection(db, "statistical articles"), {
          content: description,
          timestamp: new Date(),
        });
        alert("Document successfully written with ID: " + docRef.id);
      }
      setDescription("");
      fetchArticles();
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("Error saving document");
    }
  };

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "articles", id));
      alert("Document successfully deleted!");
      fetchArticles();
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Error deleting document");
    }
  };

  const handleEdit = (article) => {
    setEditId(article.id);
    setDescription(article.content);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      <Editor
        apiKey="587u878u71mwjy1wl7oz0f6yd21jqs0rf35njdoijkju5kwx"
        textareaName="content"
        init={{
          plugins: [
            "anchor", "autolink", "charmap", "codesample", "emoticons", "image", "link", "lists", "media", "searchreplace", "table", "visualblocks", "wordcount",
            "checklist", "mediaembed", "casechange", "export", "formatpainter", "pageembed", "a11ychecker", "tinymcespellchecker", "permanentpen", "powerpaste", "advtable", "advcode", "editimage", "advtemplate", "ai", "mentions", "tinycomments", "tableofcontents", "footnotes", "mergetags", "autocorrect", "typography", "inlinecss", "markdown", "importword", "exportword", "exportpdf"
          ],
          toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
        }}
        initialValue="Enter your article content here"
        onEditorChange={(content) => setDescription(content)}
        value={description}
      />

      <div className="preview mt-4">
        <h2>Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      
      <button 
        onClick={handleSaveToFirebase} 
        className="bg-blue-800 text-white uppercase my-4 rounded-lg p-2"
      >
        {editId ? "Update Article" : "Save Article"}
      </button>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Saved Articles</h2>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="p-4 border rounded-lg mb-4 bg-gray-100">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
              <p className="text-sm text-gray-500 mt-2">
                Saved on: {article.timestamp ? new Date(article.timestamp.seconds * 1000).toLocaleString() : "No timestamp"}
              </p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleEdit(article)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
}

export default StatisticalArticles;
