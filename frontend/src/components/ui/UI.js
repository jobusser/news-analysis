import React from "react";
import IntroText from "./intro";
import CountryNews from "./countryNews";
import QueryForm from "./query_form";

function UI() {
  return (
    <>
      <div className="left UI-container">
        < QueryForm />
      </ div>
      <div className="right UI-container">
        <CountryNews />
        <IntroText />

      </ div>
    </>
  );

}

export default UI;
