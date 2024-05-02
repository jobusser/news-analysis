import React, { useState, useEffect } from "react";
import { useCountry } from "../context/countryProvider";

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
    top: `${cursorY - 20}px`,
    left: `${cursorX + 20}px`,
  };

  return (
    <div className="tooltip" style={tooltipStyle}>
      {hoveredCountry.name}
    </div>
  );

}

export default Tooltip;
