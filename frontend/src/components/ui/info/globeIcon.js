import React, { useState, useEffect } from "react";
import { FaGlobeAfrica, FaGlobeEurope, FaGlobeAsia, FaGlobeAmericas } from "react-icons/fa";

function GlobeIcon({ size }) {
  const icons = [FaGlobeAfrica, FaGlobeEurope, FaGlobeAsia, FaGlobeAmericas];
  const [currentIconIndex, setCurrentIconIndex] = useState(Math.floor(Math.random() * icons.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex(Math.floor(Math.random() * icons.length));
    }, 5000); // Change every 15 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [icons.length]);

  const CurrentIcon = icons[currentIconIndex];
  return <CurrentIcon size={size} />;
}

export default GlobeIcon;
