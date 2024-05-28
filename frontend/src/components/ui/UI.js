import React from "react";
import IntroText from "./intro";
import News from "./news";
import QueryForm from "./query_form";

function UI() {
  return (
    <>
      <div className="left UI-container">
        < QueryForm />
      </ div>
      <div className="right UI-container">
        <News />
      </ div>
    </>
  );

}

export default UI;
