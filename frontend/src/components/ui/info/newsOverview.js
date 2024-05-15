import React, { useState, useEffect } from "react";
import { useCountry } from "../../context/countryProvider";
import VolumeChart from "./volumeChart";

function NewsOverview() {
  const { countryVolume, worldVolume } = useCountry();
  const [isReady, setIsReady] = useState(false);

  const [dates, setDates] = useState("");
  const [relevantArticles, setRelevantArticles] = useState("");
  const [totalArticles, setTotalArticles] = useState("");
  const [percentage, setPercentage] = useState("");
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    if (countryVolume) {
      setDates(countryVolume.query.dates);
      setRelevantArticles(countryVolume.relevant_articles.toString());
      setTotalArticles(countryVolume.total_articles.toString());
      setPercentage((countryVolume.relevant_articles / countryVolume.total_articles).toString());
      setGraphData(countryVolume.articles_per_day);

      setIsReady(true);

    } else {
      setDates("");
      setRelevantArticles("");
      setTotalArticles("");
      setPercentage("");
      setGraphData(null);

      setIsReady(false);

    }
  }, [countryVolume]
  );

  return (
    <div className="content">
      {isReady && (
        <>
          <h2> Results overview </h2>
          <p>{dates} </p>
          <p> {relevantArticles} relevant articles out of {totalArticles}. </p>
          <p> That is {percentage} % </p>
          <VolumeChart data={graphData} />
        </>
      )}
    </div>
  );

}

export default NewsOverview;

