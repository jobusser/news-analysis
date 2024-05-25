import React, { useState, useEffect } from "react";
import { useCountry } from "../context/countryProvider";

import NewsHeader from "./info/newsHeader";
import NewsOverview from "./info/newsOverview";
import Feed from "./info/feed";

// TODO: add hide button
// possibly an info button that can also display intro text if need be
// possibly a clear all button
function News() {
  const { isData, setIsData } = useCountry();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isData) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isData]);


  return (
    <>
      {isVisible && (
        <div className="content-container">
          <NewsHeader />
          <hr className="separator" />
          <NewsOverview />
          <hr className="separator" />
          <Feed />
        </div>
      )}
    </>
  );
}

export default News;


