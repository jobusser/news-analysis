import React, { useState, useEffect } from "react";
import { useCountry } from "../../context/countryProvider";
import VolumeChart from "./volumeChart";

function NewsOverview() {
  const { selectedCountry, countryVolume, worldVolume } = useCountry();
  const [isReady, setIsReady] = useState(false);

  const [totalArticles, setTotalArticles] = useState("");
  const [dates, setDates] = useState("");
  const [queryArticles, setQueryArticles] = useState("");
  const [countryArticles, setCountryArticles] = useState("");

  const [percentage, setPercentage] = useState("");
  const [color, setColor] = useState("");

  const [graphData, setGraphData] = useState(null);

  // TODO: safety
  useEffect(() => {
    if (selectedCountry && countryVolume && worldVolume) {
      setTotalArticles(countryVolume.total_articles.toString());
      setDates(countryVolume.query.dates);

      // find articles relevant to query
      const fraction = worldVolume[selectedCountry.name];

      setQueryArticles(Math.round(countryVolume.relevant_articles / fraction));
      setCountryArticles(countryVolume.relevant_articles.toString());

      // set percentage and color
      setPercentage((fraction * 100).toFixed(1));

      const intensity = Math.min(1, fraction / 0.1);
      const red = 255;
      const green = Math.round(255 * (1 - intensity));
      const blue = 0;
      setColor('rgb(' + red + ', ' + green + ', ' + blue + ')');

      setGraphData(countryVolume.articles_per_day);

      setIsReady(true);

    } else {
      setTotalArticles("");
      setDates("");
      setQueryArticles("");
      setCountryArticles("");
      setPercentage("");
      setColor("");

      setGraphData(null);

      setIsReady(false);
    }
  }, [countryVolume]
  );

  return (
    <div className="content">
      {isReady && (
        <>
          <p> A total of {totalArticles} were found during {dates}.
            Of the <span> {queryArticles} </span> articles related to the search,
            <span> {countryArticles} </span> were produced in {selectedCountry.name}</p>
          <VolumeChart data={graphData} />
        </>
      )}
    </div>
  );

}

export default NewsOverview;

