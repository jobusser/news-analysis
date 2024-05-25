import React, { useState, useEffect } from "react";
import { useCountry } from "../../context/countryProvider";
import VolumeChart from "./volumeChart";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getDateText(dateInfo) {
  if (dateInfo.isDefault) return "in the last 24 hours";
  if (dateInfo.isOneDay) return "on " + dateInfo.startDate.getDate() + " " + monthNames[dateInfo.startDate.getMonth()] + " " + dateInfo.startDate.getFullYear();

  return "from " + dateInfo.startDate.getDate().toString() + "/" + (dateInfo.startDate.getMonth() + 1).toString() + "/" + dateInfo.startDate.getFullYear().toString() +
    " to " + dateInfo.endDate.getDate().toString() + "/" + (dateInfo.endDate.getMonth() + 1).toString() + "/" + dateInfo.endDate.getFullYear().toString();
}

function NewsOverview() {
  const { newsOverview, worldVolume } = useCountry();

  const [overviewText, setOverviewText] = useState(null);
  const [percentage, setPercentage] = useState("");
  const [color, setColor] = useState("");

  const [graphData, setGraphData] = useState(null);

  // TODO: safety
  useEffect(() => {
    if (newsOverview) {
      const dateText = getDateText(newsOverview.dateInfo)
      if (newsOverview.totalInWorld === 0) {
        setOverviewText(
          <p>
            No articles were found {dateText}.
          </p>
        );
      } else if (newsOverview.relevantInWorld === 0) {
        setOverviewText(
          <p>
            Of the {newsOverview.totalInWorld} articles published online {dateText},
            no articles relate to the search query.
          </p>
        );
      } else if (!newsOverview.selectedRegion) {
        // no country was selected
        setOverviewText(
          <p>
            Of the {newsOverview.totalInWorld} articles published online {dateText},
            a total of <span>{newsOverview.relevantInWorld}</span> relate to the search query.
          </p>
        );
      } else if (newsOverview.relevantInSelectedRegion === 0) {
        setOverviewText(
          <p>
            Of the {newsOverview.totalInWorld} articles published online {dateText},
            a total of <span>{newsOverview.relevantInWorld}</span> relate to the search query.
            No articles were published in {!!(newsOverview.selectedRegion) ? newsOverview.selectedRegion : "the selected country"}.
          </p>
        );
      } else {
        setOverviewText(
          <p>
            Of the {newsOverview.totalInWorld} articles published online {dateText},
            a total of <span>{newsOverview.relevantInWorld}</span> relate to the search query.
            {!!(newsOverview.selectedRegion) ? newsOverview.selectedRegion : "The selected country"} accounted for
            <span>{newsOverview.relevantInSelectedRegion}</span> of the published articles.
          </p>
        );
      }

      if (!!(newsOverview.selectedRegion) && worldVolume) {
        const fraction = worldVolume[newsOverview.selectedRegion];
        setPercentage(fraction.toFixed(1));

        const intensity = Math.min(1, fraction / 10);
        const red = 255;
        const green = Math.round(255 * (1 - intensity));
        const blue = 0;
        setColor('rgb(' + red + ', ' + green + ', ' + blue + ', 0.9)');
      } else {
        setPercentage("0.0");
        setColor("rgb(100, 100, 100)");
      }

      setGraphData(null);
      /*
      if (selectedCountry && countryVolume && worldVolume) {
        setTotalArticles(countryVolume.total_articles.toString());
        // TODO: adjust dates from countryVolume
        setDates(countryVolume.query.dates);
  
        // find articles relevant to query
        const fraction = worldVolume[selectedCountry.name];
  
        // TODO: find out what is going on with number of articles found in query
        setQueryArticles(Math.round(countryVolume.relevant_articles / fraction));
        setCountryArticles(countryVolume.relevant_articles.toString());
  
        // set percentage and color
        setPercentage((fraction * 100).toFixed(1));
  
        const intensity = Math.min(1, fraction / 0.1);
        const red = 255;
        const green = Math.round(255 * (1 - intensity));
        const blue = 0;
        setColor('rgb(' + red + ', ' + green + ', ' + blue + ', 0.9)');
  
        setGraphData(countryVolume.articles_per_day);
  
        setIsReady(true);
        */

    } else {
      setOverviewText(null);
      setPercentage("");
      setColor("");
      setGraphData(null);

    }
  }, [newsOverview, worldVolume]
  );

  return (
    <div className="news-overview content">
      <>
        <div className="summary">
          {overviewText}
          <div className="percentage-box" style={{ backgroundColor: color }}>
            {percentage}%
          </div>
        </div>
        {graphData && (
          <VolumeChart data={graphData} />
        )}
      </>
    </div>
  );
}

export default NewsOverview;

