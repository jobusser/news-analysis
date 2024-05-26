import React, { useState, useEffect } from "react";
import { useCountry } from "../../context/countryProvider";
import OverviewText from "./overviewComponents/overviewText";
import VolumeChart from "./overviewComponents/volumeChart";
import PercentageBox from "./overviewComponents/percentageBox";

function NewsOverview() {
  const { newsOverview, worldVolume } = useCountry();

  const [graphData, setGraphData] = useState(null);

  // TODO: safety
  useEffect(() => {
    if (newsOverview) {
      setGraphData(null);
    } else {
      setGraphData(null);

    }
  }, [newsOverview, worldVolume]
  );

  return (
    <div className="news-overview content">
      <>
        <div className="summary">
          <OverviewText />
          <PercentageBox />
        </div>
        {graphData && (
          <VolumeChart data={graphData} />
        )}
      </>
    </div>
  );
}

export default NewsOverview;

