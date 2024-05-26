import React, { useState, useEffect } from "react";
import { useCountry } from "../../../context/countryProvider";

function convertPercentage(percentage) {
  if (typeof percentage === "number") return percentage.toFixed(2);
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


  useEffect(() => {
    let fraction = '?'
    if (newsOverview) {
      if (!!(newsOverview.selectedRegion) && !!(worldVolume) && !!(worldVolume[newsOverview.selectedRegion])) {
        // country with info
        fraction = worldVolume[newsOverview.selectedRegion];
      } else {
        // world selected
        fraction = (newsOverview.totalInWorld !== 0) ? newsOverview.relevantInWorld / newsOverview.totalInWorld : 0;
      }
    }
    setPercentage(convertPercentage(fraction));
    setColor(getColor(fraction));
  }, [newsOverview, worldVolume]
  );

  return (
    <div className="percentage-box" style={{ backgroundColor: color }}>
      {percentage}%
    </div>
  );
}

export default PercentageBox;

