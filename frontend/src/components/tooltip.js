import React, { useState, useEffect } from "react";
import { useCountry } from "./countryProvider";

function Tooltip() {
  const { hoveredCountry } = useCountry();
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);


  useEffect(() => {
    function updateCursorPosition(event) {
      setCursorX(event.clientX);
      setCursorY(event.clientY);
    }
    document.addEventListener("mousemove", updateCursorPosition);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  if (!hoveredCountry) return null;

  const tooltipStyle = {
    position: 'fixed',
    top: `${cursorY}px`,
    left: `${cursorX + 10}px`, // Offset by 10px from cursor for better visibility
    pointerEvents: 'none', // Ensure the tooltip doesn't interfere with mouse events
    zIndex: 1000, // Make sure it's on top of other elements
    background: 'white',
    border: '1px solid black',
    padding: '5px',
  };

  return <div style={tooltipStyle}>{hoveredCountry.name}</div>;
};

export default Tooltip;
