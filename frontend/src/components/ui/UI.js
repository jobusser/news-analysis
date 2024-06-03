import React, { useState, useEffect } from "react";
import News from "./news";
import QueryForm from "./query_form";
import { IoList, IoInformation, IoArrowForward, IoArrowBack, IoSearch, IoClose } from "react-icons/io5";

import ClearDataButton from "./inputs/clearDataButton";
import { useCountry } from "../context/countryProvider";

function UI() {
  const { isData, isLandscape } = useCountry();

  const [showNews, setShowNews] = useState(false);
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    if (isLandscape) {
      setShowForm(false);
      setShowNews(false);
    }
  }, [isLandscape]);


  function toggleFormVisibility() {
    setShowForm(!showForm);
  }

  function toggleNewsVisibility() {
    setShowNews(!showNews);
  }

  function portraitToggleNewsVisibility() {
    setShowForm(false);
    setShowNews(!showNews);
  }

  function portraitToggleFormVisibility() {
    setShowNews(false);
    setShowForm(!showForm);
  }

  useEffect(() => {
    if (isData) setShowNews(true);
    if (!isLandscape) setShowForm(false);
  }, [isData]);




  return (
    <>
      {isLandscape ? (
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

                <News />
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
      ) : (
        <div className="middle-UI-container">
          <div className="middle">
            {(!showForm && !showNews) ? (
              <div id="portrait-buttons-container">
                <button onClick={portraitToggleFormVisibility} >
                  {showForm ? (
                    <IoClose size={20} />
                  ) : (
                    <IoSearch size={20} />
                  )}
                </button>
                <ClearDataButton id={'clear-data-button-container'} size={20} />
                <button onClick={portraitToggleNewsVisibility} >
                  {showNews ? (
                    <IoClose size={20} />
                  ) : (
                    <IoInformation size={20} />
                  )}
                </button>
              </div>

            ) : (
              <div className="content-container">
                <div id="portrait-buttons-container-show">
                  <button onClick={portraitToggleFormVisibility} >
                    {showForm ? (
                      <IoClose size={20} />
                    ) : (
                      <IoSearch size={20} />
                    )}
                  </button>
                  <ClearDataButton id={'clear-data-button-container'} size={20} />
                  <button onClick={portraitToggleNewsVisibility} >
                    {showNews ? (
                      <IoClose size={20} />
                    ) : (
                      <IoInformation size={20} />
                    )}
                  </button>
                </div>

                {showNews && (
                  <News />
                )}
                {showForm && (
                  <QueryForm />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );

}

export default UI;
