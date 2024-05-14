import React, { useState, useEffect } from "react";
import { useCountry } from "../context/countryProvider";

import NewsHeader from "./info/newsHeader";
import NewsOverview from "./info/newsOverview";
import Feed from "./info/feed";

function News() {
  const { articles } = useCountry();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (articles) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [articles]);


  return (
    <>
      {isVisible && (
        <div className="news-container">
          <NewsHeader />
          <NewsOverview />
          <Feed />
        </div>
      )}
    </>
  );


}

export default News;


