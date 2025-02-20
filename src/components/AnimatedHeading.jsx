import React, { useState, useEffect } from 'react';
import './AnimatedHeading.css';

const headings = [
  "Your daily planner",
  "Plan with precision",
  "Achieve your goals",
  "Organize your day"
];

const typingSpeed = 100;    // Milliseconds per character
const pauseDuration = 2000; // Pause after full text is displayed

const AnimatedHeading = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timeout;
    const currentHeading = headings[currentIndex];

    if (displayedText.length < currentHeading.length) {
      // Type next character
      timeout = setTimeout(() => {
        setDisplayedText(currentHeading.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else {
      // When full text is displayed, wait then clear and move to next heading
      timeout = setTimeout(() => {
        setDisplayedText('');
        setCurrentIndex((currentIndex + 1) % headings.length);
      }, pauseDuration);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, currentIndex]);

  return (
    <h1 className="animated-heading">
      {displayedText}
      <span className="cursor">|</span>
    </h1>
  );
};

export default AnimatedHeading;
