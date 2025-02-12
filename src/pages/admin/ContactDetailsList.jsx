import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebase/Firebase"; // Firebase config

const ContactDetailsList = () => {
  const [contacts, setContacts] = useState([]); // Store contact data
  const db = getFirestore(app); // Initialize Firestore

  // Fetch contact details from Firestore
  const fetchContacts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "contact details"));
      const contactData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort by timestamp (recent messages first)
      contactData.sort((a, b) => b.timestamp?.toDate() - a.timestamp?.toDate());
      
      setContacts(contactData);
    } catch (error) {
      console.error("Error fetching contacts: ", error);
    }
  };

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="mt-8 lg:px-32">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Messages</h2>

      {contacts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Message</th>
                <th className="py-2 px-4 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="text-center border-b">
                  <td className="py-2 px-4 w-full border">{contact.name}</td>
                  <td className="py-2 px-4 border">{contact.email}</td>
                  <td className="py-2 px-4 w-full border text-left">{contact.message}</td>
                  <td className="py-2 px-4 border">
                    {contact.timestamp
                      ? new Date(contact.timestamp.seconds * 1000).toLocaleString()
                      : "No timestamp"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-72">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}
    </div>
  );
};

export default ContactDetailsList;
