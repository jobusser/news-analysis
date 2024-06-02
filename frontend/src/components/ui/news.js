import React, { useState, useEffect } from "react";

import { useCountry } from "../context/countryProvider";

import IntroInfo from "./info/introInfo";
import NewsHeader from "./info/newsHeader";
import NewsOverview from "./info/newsOverview";
import Feed from "./info/feed";

function News() {
  const { isData, awaitingData } = useCountry();
  const [isDataVisible, setIsDataVisible] = useState(true);


  useEffect(() => {
    if (isData) {
      setIsDataVisible(true);
    } else {
      setIsDataVisible(false);
    }
  }, [isData]);


  return (
    <>
      {isDataVisible ? (
        <>
          <NewsHeader />
          <hr className="separator" />
          {!awaitingData && (
            <>
              <NewsOverview />
              <hr className="separator" />
              <Feed />
            </>
          )}
        </>
      ) : (
        <IntroInfo />
      )}
    </>
  )
}
export default News;


