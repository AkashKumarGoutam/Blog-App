import React, { useState, useEffect } from 'react';
import arrow from '../assets/arrow.png';

function NavigateOnTopArrow() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / windowHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const topScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed z-50 lg:bottom-10 bottom-20 right-8">
      <div
        className="relative w-12 h-12 flex items-center justify-center"
        style={{
          background: `conic-gradient(
            #4CAF50 ${scrollProgress}%, 
            #E5E7EB ${scrollProgress}%
          )`,
          borderRadius: '50%',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <button
          onClick={topScroll}
          aria-label="Scroll to top"
          className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center shadow-md transform hover:scale-110 transition duration-300"
        >
          <img
            src={arrow}
            alt="Scroll to top"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}

export default NavigateOnTopArrow;
