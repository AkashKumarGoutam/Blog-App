import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page when location changes
    window.scrollTo(0, 0);
  }, [location]);

  return null; // This component doesn't render anything, it just triggers the scroll
};

export default ScrollToTop;
