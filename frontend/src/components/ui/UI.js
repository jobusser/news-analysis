import React from "react";
import IntroText from "./intro";
import CountryNews from "./countryNews";

function UI() {
  return (
    <>
      <div className="left UI-container">
        <IntroText />
      </ div>
      <div className="right UI-container">
        <CountryNews />
      </ div>
    </>
  );

}

export default UI;
