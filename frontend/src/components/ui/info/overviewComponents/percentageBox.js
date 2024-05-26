import React, { useState, useEffect } from "react";
import { useCountry } from "../../../context/countryProvider";

function convertPercentage(percentage) {
  if (typeof percentage === "number") return percentage.toFixed(2) + "%";
  return percentage;
}

function getColor(percentage) {
  if (typeof percentage === "number") {
    const intensity = Math.min(1, percentage / 10);
    const red = 255;
    const green = Math.round(255 * (1 - intensity));
    const blue = 0;
    return 'rgb(' + red + ', ' + green + ', ' + blue + ', 0.9)';

  } else {
    return 'rgb(100, 100, 100)';
  }
}


function PercentageBox() {
  const { newsOverview, worldVolume } = useCountry();

  const [percentage, setPercentage] = useState("");
  const [color, setColor] = useState("");

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  useEffect(() => {
    if (newsOverview) {
      if (!worldVolume) {
        var fraction = '?'
        setTooltipText("Other data, like a search query, is needed for coverage magnitude.");
      } else if (!newsOverview.selectedRegion) {
        // world selected
        var fraction = (newsOverview.totalInWorld !== 0) ? newsOverview.relevantInWorld / newsOverview.totalInWorld : 0;
        setTooltipText("of articles in the world relate to the search query.");

      } else if (newsOverview.selectedRegion && worldVolume[newsOverview.selectedRegion]) {
        // country with info
        var fraction = worldVolume[newsOverview.selectedRegion];
        setTooltipText(`of articles in ${newsOverview.selectedRegion} relate to the search query.`);

      } else {
        var fraction = '?';
        setTooltipText("No articles in the selected region was found");
      }
    }

    setPercentage(convertPercentage(fraction));
    setColor(getColor(fraction));
  }, [newsOverview, worldVolume]
  );


  // tooltip functionality
  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

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

  const tooltipStyle = {
    top: `${cursorY - 20}px`,
    left: `${cursorX + 20}px`,
  };

  return (
    <>
      <div
        className="percentage-box"
        style={{
          backgroundColor: color,
          opacity: tooltipVisible ? 1.0 : 0.7,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {percentage}
      </div>
      {tooltipVisible && (
        <div className="tooltip" style={tooltipStyle}>
          {tooltipText}
        </div>
      )}
    </>
  );
}

export default PercentageBox;

