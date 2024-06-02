import React, { useState, useEffect } from "react";
import News from "./news";
import QueryForm from "./query_form";
import { IoList, IoInformation, IoArrowForward, IoArrowBack, IoSearch } from "react-icons/io5";

import ClearDataButton from "./inputs/clearDataButton";
import { useCountry } from "../context/countryProvider";

function UI() {
  const { isData, awaitingData } = useCountry();

  const [showNews, setShowNews] = useState(false);
  const [showForm, setShowForm] = useState(false);

  function toggleFormVisibility() {
    setShowForm(!showForm);
  }

  function toggleNewsVisibility() {
    setShowNews(!showNews);
  }

  useEffect(() => {
    if (isData) setShowNews(true);
  }, [isData]);


  return (
    <>
      <div className="left UI-container">
        {showForm ? (
          <div className="content-container">
            <div id='search-hider-container' >
              <ClearDataButton id={'clear-data-button-container'} size={20} />
              <button onClick={toggleFormVisibility} id={'search-hider'}>
                {showForm ? (
                  <IoArrowBack size={20} />
                ) : (
                  <IoSearch size={20} />
                )}
              </button>
            </div>

            < QueryForm />
          </div>
        ) : (
          <div id='search-shower-container' >
            <ClearDataButton id={'clear-data-button-container'} size={20} />
            <button onClick={toggleFormVisibility} id={'search-hider'}>
              {showForm ? (
                <IoArrowBack size={20} />
              ) : (
                <IoSearch size={20} />
              )}
            </button>
          </div>
        )}
      </ div>


      <div className="right UI-container">
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

            <News showNews={showNews} setShowNews={setShowNews} />
          </ div>
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

      </div>
    </>
  );

}

export default UI;
