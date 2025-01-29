import React from "react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

function ContactPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Have questions or feedback? Get in touch with us!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600">
              Reach out to us for any inquiries or support.
            </p>
            <ul className="mt-4 space-y-3">
            {/* <li className="flex items-center">
                <span className="w-6 h-6 mr-3 text-blue-600">👨🏻‍🎓</span>
                <span>Akash Kumar Goutam</span>
              </li> */}
              {/* <li className="flex items-center">
                <span className="w-6 h-6 mr-3 text-blue-600">📍</span>
                <span>Alpha 2 Main Market , Greater Noida , Uttar Pradesh , 201310</span>
              </li> */}
              <li className="flex items-center">
                <span className="w-6 h-6 mr-3 text-blue-600">📧</span>
                <span>stumpstat@gmail.com</span>
              </li>
              {/* <li className="flex items-center">
                <span className="w-6 h-6 mr-3 text-blue-600">📞</span>
                <span>+91 7004834415</span>
              </li> */}
            </ul>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Follow Us
              </h3>
              <div className="flex space-x-6 mt-3">
                <a
                  href="https://www.linkedin.com/company/stump-stat/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                >
                  <FaLinkedin className="text-3xl" />
                  {/* <span>LinkedIn</span> */}
                </a>
                <a
                  href="https://x.com/StumpStat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 flex items-center space-x-2"
                >
                  {/* <FaTwitter className="text-xl" /> */}
                  <img src="https://img.icons8.com/fluency/48/twitterx--v2.png" className="w-7"/>
                  {/* <span>X</span> */}
                </a>
                {/* <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700 flex items-center space-x-2"
                >
                  <FaInstagram className="text-xl" />
                  <span>Instagram</span>
                </a> */}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Send a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-600 mb-1 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-600 mb-1 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-600 mb-1 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
