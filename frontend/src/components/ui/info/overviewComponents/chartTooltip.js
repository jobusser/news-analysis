import React, { useState, useEffect } from "react";

function ChartTooltip({ active, payload, label }) {
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

  if (!active || !payload || !payload.length) return null;

  const tooltipStyle = {
    top: `${cursorY - 20}px`,
    left: `${cursorX + 20}px`,
  };

  const { value, countryCoverageMagnitude, averageCoverageMagnitude, time, day } = payload[0].payload;

  return (
    <div className="tooltip" style={tooltipStyle}>
      {value !== undefined && (
        <div>{`${countryCoverageMagnitude !== undefined ? 'Country articles' : 'World articles'}: ${value}`}</div>
      )}
      {countryCoverageMagnitude !== undefined && (
        <div>{`Country Coverage: ${countryCoverageMagnitude.toFixed(2)}%`}</div>
      )}
      {averageCoverageMagnitude !== undefined && (
        <div>{`World Coverage: ${averageCoverageMagnitude.toFixed(2)}%`}</div>
      )}
      <div> <br /> {(time) ? `${time} on ${day}` : day}</div>
    </div>
  );
}

export default ChartTooltip;

