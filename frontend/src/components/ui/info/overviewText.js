
import React, { useState, useEffect } from "react";
import { useCountry } from "../../context/countryProvider";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getDateText(dateInfo) {
  if (dateInfo.isDefault) return "in the last 24 hours";
  if (dateInfo.isOneDay) return "on " + dateInfo.startDate.getDate() + " " + monthNames[dateInfo.startDate.getMonth()] + " " + dateInfo.startDate.getFullYear();

  return "from " + dateInfo.startDate.getDate().toString() + "/" + (dateInfo.startDate.getMonth() + 1).toString() + "/" + dateInfo.startDate.getFullYear().toString() +
    " to " + dateInfo.endDate.getDate().toString() + "/" + (dateInfo.endDate.getMonth() + 1).toString() + "/" + dateInfo.endDate.getFullYear().toString();
}

function OverviewText() {
  const { newsOverview } = useCountry();
  const [overviewText, setOverviewText] = useState(null);

  useEffect(() => {
    if (newsOverview) {
      const dateText = getDateText(newsOverview.dateInfo);

      if (newsOverview.totalInWorld === 0) {
        if (newsOverview.selectedRegion) {
          if (newsOverview.relevantInSelectedRegion > 0) {
            setOverviewText(
              <p>
                A total of <span>{newsOverview.totalInRelevantRegion}</span> articles were published online in {newsOverview.selectedRegion} {dateText}.
              </p>
            );
          } else {
            setOverviewText(
              <p>
                No articles were found in {newsOverview.selectedRegion} {dateText}.
              </p>
            );
          }
        } else {
          setOverviewText(
            <p>
              No articles were found {dateText}.
            </p>
          );
        }
      } else if (newsOverview.relevantInWorld === 0) {
        setOverviewText(
          <p>
            Of the {newsOverview.totalInWorld} articles published online {dateText}, no articles relate to the search query.
          </p>
        );
      } else if (!newsOverview.selectedRegion) {
        setOverviewText(
          <p>
            Of the {newsOverview.totalInWorld} articles published online {dateText}, a total of <span>{newsOverview.relevantInWorld}</span> relate to the search query.
          </p>
        );
      } else if (newsOverview.relevantInSelectedRegion === 0) {
        setOverviewText(
          <p>
            Of the {newsOverview.totalInWorld} articles published online {dateText}, a total of <span>{newsOverview.relevantInWorld}</span> relate to the search query. No articles were published in {newsOverview.selectedRegion}.
          </p>
        );
      } else {
        setOverviewText(
          <p>
            Of the {newsOverview.totalInWorld} articles published online {dateText}, a total of <span>{newsOverview.relevantInWorld}</span> relate to the search query. {newsOverview.selectedRegion} accounted for <span>{newsOverview.relevantInSelectedRegion}</span> of the published articles.
          </p>
        );
      }
    } else {
      setOverviewText(null);
    }
  }, [newsOverview]);

  return (
    <div>
      {overviewText}
    </div>
  );
}

export default OverviewText;

