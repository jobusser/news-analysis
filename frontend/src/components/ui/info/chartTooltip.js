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

  return (
    <div className="tooltip" style={tooltipStyle}>
      {`${payload[0].value} articles`}
      <br />
      {`${payload[0].payload.time} on ${payload[0].payload.day}`}
    </div>
  );
}

export default ChartTooltip;

