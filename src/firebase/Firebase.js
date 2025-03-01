import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmhkt14LxtC8hbUxM947l55RHVdAUZSJg",
  authDomain: "stumpstat-635c1.firebaseapp.com",
  projectId: "stumpstat-635c1",
  storageBucket: "stumpstat-635c1.firebasestorage.app",
  messagingSenderId: "666683005062",
  appId: "1:666683005062:web:01366b9aaac20edf711907",
  measurementId: "G-MLG3ED5DE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Function to log events
const logAnalyticsEvent = (eventName, eventParams) => {
  logEvent(analytics, eventName, eventParams);
};

export { app, analytics, logAnalyticsEvent };
