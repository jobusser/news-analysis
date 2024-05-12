import React, { useState, useEffect } from "react";
import { useCountry } from "../../context/countryProvider";

function NewsOverview() {
  const { countryVolume } = useCountry();

  const [dates, setDates] = useState("");
  const [relevantArticles, setRelevantArticles] = useState("");
  const [totalArticles, setTotalArticles] = useState("");
  const [percentage, setPercentage] = useState("");
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    if (countryVolume) {
      setDates(countryVolume.query.dates);

      setRelevantArticles(countryVolume.relevant_articles.toString());
      setTotalArticles(countryVolume.total_articles.toString());

      setPercentage((countryVolume.relevant_articles / countryVolume.total_articles).toString());

      setGraph("A graph wow! Visually appealing to me!");

    } else {
      setDates("");

      setRelevantArticles("");
      setTotalArticles("");
      setPercentage("");

      setGraph(null);
    }

  }, [countryVolume]
  );

  return (
    <>
      {countryVolume && (
        <>
          <h2> Results overview </h2>
          <p>{dates} </p>
          <p> {relevantArticles} relevant articles out of {totalArticles}. </p>
          <p> That is {percentage} % </p>
          <p> {graph} </p>
        </>
      )}
    </>
  );

}

export default NewsOverview;

