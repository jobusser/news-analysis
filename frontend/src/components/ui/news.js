import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { IoList, IoArrowForward } from "react-icons/io5";

import { useCountry } from "../context/countryProvider";

import NewsHeader from "./info/newsHeader";
import NewsOverview from "./info/newsOverview";
import Feed from "./info/feed";

// TODO: add hide button
// possibly an info button that can also display intro text if need be
// possibly a clear all button
function News() {
  const { isData, setIsData, awaitingData } = useCountry();
  const [showNews, setShowNews] = useState(false);
  const [isDataVisible, setIsVisiblesetIsDataVisible] = useState(true);

  function toggleNewsVisibility() {
    setShowNews(!showNews);
  }

  useEffect(() => {
    if (isData) {
      setIsVisiblesetIsDataVisible(true);
    } else {
      setIsVisiblesetIsDataVisible(false);
    }
  }, [isData]);


  return (
    <div className="news content-container">
      <div id='news-hider-container' >
        <button onClick={toggleNewsVisibility} id={'news-hider'}>
          {showNews ? (
            <IoArrowForward size={20} />
          ) : (
            <IoList size={20} />
          )}
        </button>
      </div>

      {showNews && (
        <>
          {isDataVisible ? (
            <>
              <NewsHeader />
              <hr className="separator" />
              {awaitingData ? (
                <ClipLoader />
              ) : (
                <>
                  <NewsOverview />
                  <hr className="separator" />
                  <Feed />
                </>
              )}
            </>
          ) : (
            <h1>Select a country or try a search to start.</h1>
          )}
        </>
      )}
    </div>
  );
}
export default News;


