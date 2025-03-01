import React, { useState } from "react";
import { logAnalyticsEvent } from "../firebase/Firebase";
import { FaLinkedin } from "react-icons/fa";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase/Firebase"; // Import Firebase config

const ContactPage = () => {
  const db = getFirestore(app); // Initialize Firestore

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [success, setSuccess] = useState(false); // Success message state

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    logAnalyticsEvent("form_submission", { form_name: "Contact Us Submitted" });
    setLoading(true);
    try {
      await addDoc(collection(db, "contact details"), {
        ...formData,
        timestamp: new Date(), // Store timestamp
      });
      setSuccess(true); // Show success message
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
        <p className="text-center text-gray-600 mb-8">Have questions or feedback? Get in touch with us!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center">
                <span className="w-6 h-6 mr-3 text-blue-600">👨🏻‍🎓</span>
                <span>Vishwesh Gaur</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 mr-3 text-blue-600">📧</span>
                <span>stumpstat@gmail.com</span>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
              <div className="flex space-x-6 mt-3">
                <a
                  href="https://www.linkedin.com/company/stump-stat/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                >
                  <FaLinkedin className="text-3xl" />
                </a>
                <a
                  href="https://x.com/StumpStat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 flex items-center space-x-2"
                >
                  <img src="https://img.icons8.com/fluency/48/twitterx--v2.png" className="w-7" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send a Message</h2>
            {success && (
              <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
                Message sent successfully!
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-600 mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-600 mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-600 mb-1 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
