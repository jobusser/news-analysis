import React, { useState, useEffect } from "react";
import { IoList, IoInformation, IoArrowForward } from "react-icons/io5";

import { useCountry } from "../context/countryProvider";

import IntroInfo from "./info/introInfo";
import NewsHeader from "./info/newsHeader";
import NewsOverview from "./info/newsOverview";
import Feed from "./info/feed";

function News() {
  const { isData, awaitingData } = useCountry();
  const [showNews, setShowNews] = useState(false);
  const [isDataVisible, setIsDataVisible] = useState(true);

  function toggleNewsVisibility() {
    setShowNews(!showNews);
  }

  useEffect(() => {
    if (isData) {
      setIsDataVisible(true);
      setShowNews(true);
    } else {
      setIsDataVisible(false);
    }
  }, [isData]);


  return (
    <>
      {showNews ? (
        <div className="content-container">
          <div id='news-hider-container' >
            <button onClick={toggleNewsVisibility} id={'news-hider'}>
              {showNews ? (
                <IoArrowForward size={20} />
              ) : (
                <IoList size={20} />
              )}
            </button>
          </div>

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
        </div>
      ) : (

        <div id='news-shower-container' >
          <button onClick={toggleNewsVisibility} id={'news-hider'}>
            {showNews ? (
              <IoArrowForward size={20} />
            ) : (
              <IoInformation size={20} />
            )}
          </button>
        </div>
      )}
    </>
  );
}
export default News;


